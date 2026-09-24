import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const rows = await query(`SELECT * FROM job_applications ORDER BY applied_at DESC;`);
    return NextResponse.json(rows);
  } catch (err: any) {
    console.error("[Job Applications API] GET error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const positionTitle = (body.positionTitle || body.position_title || body.position || "General Applicant").trim();
    const name = (body.name || "").trim();
    const email = (body.email || "").trim();
    const phone = (body.phone || "").trim();
    const experience = (body.experience || "").trim();
    const location = (body.location || "").trim();

    if (!name || !email) {
      return NextResponse.json(
        { success: false, message: "Applicant name and email are required." },
        { status: 400 }
      );
    }

    const applicationRef = `APP-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const rows = await query(
      `INSERT INTO job_applications (
        application_ref, position_title, name, email, phone, experience, location, status, applied_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
      RETURNING *;`,
      [
        applicationRef,
        positionTitle,
        name,
        email,
        phone || null,
        experience || null,
        location || null,
        "UNDER_REVIEW",
      ]
    );

    return NextResponse.json({
      success: true,
      applicationRef: rows[0]?.application_ref || applicationRef,
      message: "Application registered successfully with HR division.",
      positionTitle,
      data: rows[0],
    });
  } catch (err: any) {
    console.error("[Job Applications API] POST error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to submit job application" },
      { status: 500 }
    );
  }
}
