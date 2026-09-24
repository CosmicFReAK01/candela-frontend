import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      companyName,
      contactPerson,
      email,
      phone,
      location,
      approxLength,
      diameter,
      projectType,
      description,
    } = body;

    if (!companyName || !email) {
      return NextResponse.json(
        { error: "Company name and official email are required" },
        { status: 400 }
      );
    }

    // Generate formal enterprise RFQ tracking reference: RFQ-2026-XXXX
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const referenceNo = `RFQ-2026-${randomSuffix}`;

    const rows = await query(
      `INSERT INTO rfq_enquiries (
        reference_no,
        company_name,
        contact_person,
        email,
        phone,
        location,
        approx_length,
        diameter,
        project_type,
        description,
        status,
        created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'PENDING_REVIEW', NOW())
      RETURNING *;`,
      [
        referenceNo,
        companyName.trim(),
        (contactPerson || "").trim(),
        email.trim(),
        (phone || "").trim(),
        (location || "").trim(),
        (approxLength || "").trim(),
        (diameter || "").trim(),
        projectType || "Cross Country Pipeline",
        (description || "").trim(),
      ]
    );

    const rfq = rows[0];

    return NextResponse.json({
      success: true,
      referenceNo: rfq.reference_no,
      message: "Request for Quotation registered successfully in commercial database.",
      status: rfq.status || "PENDING_REVIEW",
      estimatedTurnaround: "48-Hour Response",
      timestamp: rfq.created_at,
      data: rfq,
    });
  } catch (err: any) {
    console.error("[API rfq] POST error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to register RFQ enquiry" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const rows = await query(
      `SELECT * FROM rfq_enquiries ORDER BY created_at DESC;`
    );
    return NextResponse.json(rows);
  } catch (err: any) {
    console.error("[API rfq] GET error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
