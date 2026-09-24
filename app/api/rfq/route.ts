import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const rows = await query(`SELECT * FROM rfq_enquiries ORDER BY created_at DESC;`);
    return NextResponse.json(rows);
  } catch (err: any) {
    console.error("[RFQ API] GET error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const companyName = (body.companyName || body.company_name || "").trim();
    const contactPerson = (body.contactPerson || body.contact_person || "").trim();
    const email = (body.email || "").trim();
    const phone = (body.phone || "").trim();
    const location = (body.location || "").trim();
    const projectType = (body.projectType || body.project_type || "Cross Country Pipeline").trim();
    const diameter = (body.diameter || "").trim();
    const approxLength = (body.approxLength || body.approx_length || "").trim();
    const description = (body.description || "").trim();

    if (!companyName || !email) {
      return NextResponse.json(
        { success: false, message: "Company name and email are required." },
        { status: 400 }
      );
    }

    const referenceNo = `RFQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const rows = await query(
      `INSERT INTO rfq_enquiries (
        reference_no, company_name, contact_person, email, phone,
        location, project_type, diameter, approx_length, description,
        status, created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW())
      RETURNING *;`,
      [
        referenceNo,
        companyName,
        contactPerson || null,
        email,
        phone || null,
        location || null,
        projectType || null,
        diameter || null,
        approxLength || null,
        description || null,
        "PENDING_REVIEW",
      ]
    );

    return NextResponse.json({
      success: true,
      referenceNo: rows[0]?.reference_no || referenceNo,
      message: "Your project dossier has been registered in our central tendering system.",
      status: "PENDING_REVIEW",
      estimatedTurnaround: "48-Hour Response",
      data: rows[0],
    });
  } catch (err: any) {
    console.error("[RFQ API] POST error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to submit RFQ" },
      { status: 500 }
    );
  }
}
