import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      positionTitle,
      name,
      email,
      phone,
      experience,
      location,
    } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Candidate full name and email address are required" },
        { status: 400 }
      );
    }

    // Generate formal candidate tracking application ref: APP-2026-XXXX
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const applicationRef = `APP-2026-${randomSuffix}`;

    const rows = await query(
      `INSERT INTO job_applications (
        application_ref,
        name,
        email,
        phone,
        position_title,
        experience,
        location,
        status,
        applied_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, 'RECEIVED', NOW())
      RETURNING *;`,
      [
        applicationRef,
        name.trim(),
        email.trim(),
        (phone || "").trim(),
        positionTitle || "Pipeline Engineering Candidate",
        (experience || "").trim(),
        (location || "").trim(),
      ]
    );

    const appRecord = rows[0];

    return NextResponse.json({
      success: true,
      applicationRef: appRecord.application_ref,
      message: "Job Application submitted successfully to HR Division.",
      positionTitle: appRecord.position_title,
      status: appRecord.status || "RECEIVED",
      timestamp: appRecord.applied_at,
      data: appRecord,
    });
  } catch (err: any) {
    console.error("[API careers/apply] POST error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to submit job application" },
      { status: 500 }
    );
  }
}
