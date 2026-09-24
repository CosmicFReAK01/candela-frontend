import crypto from "crypto";
import { query } from "./db";

const AUTH_SECRET = process.env.AUTH_SECRET || "candela-pipeline-auth-hmac-secret-2026-v1-secure";

export interface AdminAuthRecord {
  id: string;
  password_hash: string;
  password_salt: string;
  master_recovery_hash: string;
  master_recovery_salt: string;
  session_version: number;
  failed_attempts: number;
  locked_until: string | null;
  last_login: string | null;
  last_password_change: string | null;
}

/**
 * Derives a salted cryptographic hash using Node.js scrypt.
 */
export function hashSecret(secret: string, customSalt?: string): { hash: string; salt: string } {
  const salt = customSalt || crypto.randomBytes(32).toString("hex");
  const derived = crypto.scryptSync(secret, salt, 64);
  return {
    hash: derived.toString("hex"),
    salt,
  };
}

/**
 * Constant-time comparison to prevent timing-attack vulnerability.
 */
export function verifySecret(secret: string, expectedHash: string, salt: string): boolean {
  try {
    const derived = crypto.scryptSync(secret, salt, 64);
    const expectedBuffer = Buffer.from(expectedHash, "hex");
    if (derived.length !== expectedBuffer.length) {
      return false;
    }
    return crypto.timingSafeEqual(derived, expectedBuffer);
  } catch {
    return false;
  }
}

/**
 * Generates a formatted, high-entropy Master Recovery Key.
 * Format: CANDELA-REC-XXXX-XXXX-XXXX-XXXX
 */
export function generateMasterRecoveryKey(): string {
  const bytes = crypto.randomBytes(16).toString("hex").toUpperCase();
  const chunk1 = bytes.slice(0, 4);
  const chunk2 = bytes.slice(4, 8);
  const chunk3 = bytes.slice(8, 12);
  const chunk4 = bytes.slice(12, 16);
  return `CANDELA-REC-${chunk1}-${chunk2}-${chunk3}-${chunk4}`;
}

/**
 * Creates an HMAC-SHA256 signed session token containing session_version and expiration.
 */
export function createSessionToken(sessionVersion: number): string {
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
  const payload = JSON.stringify({
    role: "admin",
    version: sessionVersion,
    exp: expiresAt,
    nonce: crypto.randomBytes(16).toString("hex"),
  });
  const b64Payload = Buffer.from(payload).toString("base64url");
  const signature = crypto
    .createHmac("sha256", AUTH_SECRET)
    .update(b64Payload)
    .digest("base64url");
  return `${b64Payload}.${signature}`;
}

/**
 * Validates the HMAC signature and timestamp of a session token.
 */
export function parseAndValidateToken(token: string): { valid: boolean; version?: number; expired?: boolean } {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return { valid: false };
    const [b64Payload, signature] = parts;
    const expectedSignature = crypto
      .createHmac("sha256", AUTH_SECRET)
      .update(b64Payload)
      .digest("base64url");

    if (
      signature.length !== expectedSignature.length ||
      !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))
    ) {
      return { valid: false };
    }

    const payload = JSON.parse(Buffer.from(b64Payload, "base64url").toString("utf8"));
    if (Date.now() > payload.exp) {
      return { valid: false, expired: true };
    }

    return { valid: true, version: payload.version };
  } catch {
    return { valid: false };
  }
}

/**
 * Ensures the admin_auth table exists and initializes default credentials if missing.
 */
export async function ensureAdminAuthInitialized(): Promise<{ initialRecoveryKey?: string; isNew: boolean }> {
  await query(`
    CREATE TABLE IF NOT EXISTS admin_auth (
      id VARCHAR(50) PRIMARY KEY DEFAULT 'default',
      password_hash TEXT NOT NULL,
      password_salt TEXT NOT NULL,
      master_recovery_hash TEXT NOT NULL,
      master_recovery_salt TEXT NOT NULL,
      session_version INT NOT NULL DEFAULT 1,
      failed_attempts INT NOT NULL DEFAULT 0,
      locked_until TIMESTAMP WITH TIME ZONE NULL,
      last_login TIMESTAMP WITH TIME ZONE NULL,
      last_password_change TIMESTAMP WITH TIME ZONE NULL,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const existing = await query(`SELECT * FROM admin_auth WHERE id = 'default' LIMIT 1;`);
  if (existing.length > 0) {
    return { isNew: false };
  }

  // Create initial admin password and master recovery key
  const initialPassword = process.env.INITIAL_ADMIN_PASSWORD || "CandelaAdmin#2026!";
  const initialRecoveryKey = generateMasterRecoveryKey();

  const pwdHashed = hashSecret(initialPassword);
  const recHashed = hashSecret(initialRecoveryKey);

  await query(
    `INSERT INTO admin_auth (
      id, password_hash, password_salt, master_recovery_hash, master_recovery_salt, session_version
    ) VALUES ($1, $2, $3, $4, $5, $6);`,
    ['default', pwdHashed.hash, pwdHashed.salt, recHashed.hash, recHashed.salt, 1]
  );

  return { initialRecoveryKey, isNew: true };
}

/**
 * Verifies active session by checking cookie token against the live DB session_version.
 */
export async function verifyCurrentAdminSession(cookieToken: string | undefined): Promise<boolean> {
  if (!cookieToken) return false;
  const parsed = parseAndValidateToken(cookieToken);
  if (!parsed.valid || parsed.version === undefined) return false;

  const rows = await query(`SELECT session_version FROM admin_auth WHERE id = 'default' LIMIT 1;`);
  if (rows.length === 0) return false;

  // If session_version in token is less than current DB session_version, session is revoked!
  return parsed.version === rows[0].session_version;
}
