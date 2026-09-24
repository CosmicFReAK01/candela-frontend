import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { query } from "@/lib/db";
import {
  hashSecret,
  verifySecret,
  createSessionToken,
  parseAndValidateToken,
  ensureAdminAuthInitialized,
} from "@/lib/auth";

const SESSION_COOKIE_NAME = "candela_admin_token";

export async function POST(req: Request) {
  try {
    // Ensure table and credentials exist
    await ensureAdminAuthInitialized();

    const body = await req.json();
    const { action } = body;

    const cookieStore = await cookies();

    switch (action) {
      // ──────────────────────────────────────────────────────────
      // 1. VERIFY CURRENT SESSION
      // ──────────────────────────────────────────────────────────
      case "verify": {
        const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
        if (!token) {
          return NextResponse.json({ authenticated: false });
        }

        const parsed = parseAndValidateToken(token);
        if (!parsed.valid || parsed.version === undefined) {
          return NextResponse.json({ authenticated: false, reason: "invalid_or_expired" });
        }

        const rows = await query(`SELECT session_version, last_login, last_password_change FROM admin_auth WHERE id = 'default' LIMIT 1;`);
        if (rows.length === 0 || rows[0].session_version !== parsed.version) {
          return NextResponse.json({ authenticated: false, reason: "session_revoked" });
        }

        return NextResponse.json({
          authenticated: true,
          sessionVersion: rows[0].session_version,
          lastLogin: rows[0].last_login,
          lastPasswordChange: rows[0].last_password_change,
        });
      }

      // ──────────────────────────────────────────────────────────
      // 2. ADMIN LOGIN
      // ──────────────────────────────────────────────────────────
      case "login": {
        const { password } = body;
        if (!password) {
          return NextResponse.json({ error: "Password is required" }, { status: 400 });
        }

        const rows = await query(`SELECT * FROM admin_auth WHERE id = 'default' LIMIT 1;`);
        if (rows.length === 0) {
          return NextResponse.json({ error: "Authentication system uninitialized" }, { status: 500 });
        }

        const authRecord = rows[0];

        // Check if account is locked
        if (authRecord.locked_until && new Date(authRecord.locked_until) > new Date()) {
          const waitMinutes = Math.ceil((new Date(authRecord.locked_until).getTime() - Date.now()) / 60000);
          return NextResponse.json(
            { error: `Too many failed attempts. Console locked for ${waitMinutes} more minutes.` },
            { status: 429 }
          );
        }

        const isValid = verifySecret(password, authRecord.password_hash, authRecord.password_salt);
        if (!isValid) {
          const failed = (authRecord.failed_attempts || 0) + 1;
          let lockSql = "failed_attempts = $1";
          let lockParams: any[] = [failed];

          if (failed >= 5) {
            // Lock out for 15 minutes after 5 consecutive failed attempts
            const lockUntil = new Date(Date.now() + 15 * 60 * 1000).toISOString();
            lockSql = "failed_attempts = $1, locked_until = $2";
            lockParams = [failed, lockUntil];
          }

          await query(`UPDATE admin_auth SET ${lockSql} WHERE id = 'default';`, lockParams);
          return NextResponse.json(
            { error: failed >= 5 ? "Account locked for 15 minutes due to repeated failed logins." : "Invalid admin password." },
            { status: 401 }
          );
        }

        // Reset failed attempts and update last login
        await query(
          `UPDATE admin_auth SET failed_attempts = 0, locked_until = NULL, last_login = CURRENT_TIMESTAMP WHERE id = 'default';`
        );

        // Issue signed session token
        const token = createSessionToken(authRecord.session_version);
        cookieStore.set(SESSION_COOKIE_NAME, token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 24 * 60 * 60, // 24 hours
        });

        return NextResponse.json({
          success: true,
          message: "Authenticated successfully",
          sessionVersion: authRecord.session_version,
        });
      }

      // ──────────────────────────────────────────────────────────
      // 3. LOGOUT
      // ──────────────────────────────────────────────────────────
      case "logout": {
        cookieStore.delete(SESSION_COOKIE_NAME);
        return NextResponse.json({ success: true, message: "Logged out successfully" });
      }

      // ──────────────────────────────────────────────────────────
      // 4. CHANGE PASSWORD (AUTHENTICATED ADMIN ONLY)
      // ──────────────────────────────────────────────────────────
      case "change-password": {
        const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
        if (!token) {
          return NextResponse.json({ error: "Unauthorized. Please log in first." }, { status: 401 });
        }

        const parsed = parseAndValidateToken(token);
        if (!parsed.valid || parsed.version === undefined) {
          return NextResponse.json({ error: "Session invalid or expired." }, { status: 401 });
        }

        const rows = await query(`SELECT * FROM admin_auth WHERE id = 'default' LIMIT 1;`);
        if (rows.length === 0 || rows[0].session_version !== parsed.version) {
          return NextResponse.json({ error: "Session has been revoked." }, { status: 401 });
        }

        const { currentPassword, newPassword } = body;
        if (!currentPassword || !newPassword) {
          return NextResponse.json({ error: "Current password and new password are required." }, { status: 400 });
        }

        if (newPassword.length < 8) {
          return NextResponse.json({ error: "New password must be at least 8 characters long." }, { status: 400 });
        }

        // Verify current password against hash
        const isCurrentValid = verifySecret(currentPassword, rows[0].password_hash, rows[0].password_salt);
        if (!isCurrentValid) {
          return NextResponse.json({ error: "Current password does not match." }, { status: 400 });
        }

        // Hash new password with a fresh salt
        const newHashed = hashSecret(newPassword);
        // Increment session_version to terminate all OTHER active browser sessions
        const newVersion = rows[0].session_version + 1;

        await query(
          `UPDATE admin_auth SET 
             password_hash = $1, 
             password_salt = $2, 
             session_version = $3, 
             last_password_change = CURRENT_TIMESTAMP,
             failed_attempts = 0,
             locked_until = NULL
           WHERE id = 'default';`,
          [newHashed.hash, newHashed.salt, newVersion]
        );

        // Issue new token for the current browser so the admin stays logged in
        const newToken = createSessionToken(newVersion);
        cookieStore.set(SESSION_COOKIE_NAME, newToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 24 * 60 * 60,
        });

        return NextResponse.json({
          success: true,
          message: "Admin password updated successfully. All other active sessions have been terminated.",
        });
      }

      // ──────────────────────────────────────────────────────────
      // 5. MASTER RECOVERY (EMERGENCY BREAK-GLASS OVERRIDE)
      // ──────────────────────────────────────────────────────────
      case "recover": {
        const { recoveryKey, newPassword } = body;
        if (!recoveryKey) {
          return NextResponse.json({ error: "Master Recovery Key is required." }, { status: 400 });
        }

        const rows = await query(`SELECT * FROM admin_auth WHERE id = 'default' LIMIT 1;`);
        if (rows.length === 0) {
          return NextResponse.json({ error: "Authentication system uninitialized." }, { status: 500 });
        }

        const authRecord = rows[0];
        const normalizedKey = recoveryKey.trim().toUpperCase();

        const isKeyValid = verifySecret(normalizedKey, authRecord.master_recovery_hash, authRecord.master_recovery_salt);
        if (!isKeyValid) {
          return NextResponse.json({ error: "Invalid Master Recovery Key." }, { status: 401 });
        }

        // Increment session_version to FORCIBLY LOG OUT EVERYONE on any device
        const newVersion = authRecord.session_version + 1;

        let updateSql = `
          UPDATE admin_auth SET 
            session_version = $1, 
            failed_attempts = 0, 
            locked_until = NULL,
            last_login = CURRENT_TIMESTAMP
        `;
        const updateParams: any[] = [newVersion];

        // If a new password was provided in recovery, set it immediately
        if (newPassword && newPassword.length >= 8) {
          const newHashed = hashSecret(newPassword);
          updateSql += `, password_hash = $2, password_salt = $3, last_password_change = CURRENT_TIMESTAMP`;
          updateParams.push(newHashed.hash, newHashed.salt);
        }

        updateSql += ` WHERE id = 'default';`;
        await query(updateSql, updateParams);

        // Issue fresh session token for the Master Recovery user
        const masterToken = createSessionToken(newVersion);
        cookieStore.set(SESSION_COOKIE_NAME, masterToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 24 * 60 * 60,
        });

        return NextResponse.json({
          success: true,
          message: "Master Recovery Key verified! All existing sessions across all devices have been forcibly terminated.",
          sessionVersion: newVersion,
        });
      }

      default:
        return NextResponse.json({ error: `Unknown action '${action}'` }, { status: 400 });
    }
  } catch (err: any) {
    console.error("[Auth API] Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
