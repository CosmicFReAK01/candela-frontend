import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

const MAX_DOCUMENT_SIZE = 25 * 1024 * 1024; // 25MB limit

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

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
    const contentType = req.headers.get("content-type") || "";
    let companyName = "";
    let contactPerson = "";
    let email = "";
    let phone = "";
    let location = "";
    let projectType = "Cross Country Pipeline";
    let diameter = "";
    let approxLength = "";
    let description = "";

    let documentUrl: string | null = null;
    let documentName: string | null = null;
    let documentSize: string | null = null;

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      companyName = (formData.get("companyName")?.toString() || formData.get("company_name")?.toString() || "").trim();
      contactPerson = (formData.get("contactPerson")?.toString() || formData.get("contact_person")?.toString() || "").trim();
      email = (formData.get("email")?.toString() || "").trim();
      phone = (formData.get("phone")?.toString() || "").trim();
      location = (formData.get("location")?.toString() || "").trim();
      projectType = (formData.get("projectType")?.toString() || formData.get("project_type")?.toString() || "Cross Country Pipeline").trim();
      diameter = (formData.get("diameter")?.toString() || "").trim();
      approxLength = (formData.get("approxLength")?.toString() || formData.get("approx_length")?.toString() || "").trim();
      description = (formData.get("description")?.toString() || "").trim();

      const docFile = (formData.get("document") || formData.get("file")) as File | null;
      if (docFile && typeof docFile === "object" && "size" in docFile && docFile.size > 0) {
        if (docFile.size > MAX_DOCUMENT_SIZE) {
          return NextResponse.json(
            { success: false, message: "NIT/BOQ document exceeds maximum 25MB limit." },
            { status: 400 }
          );
        }

        const arrayBuffer = await docFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64Data = buffer.toString("base64");
        const docMimeType = docFile.type || "application/octet-stream";
        const mediaId = `rfq_doc_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

        await query(
          `INSERT INTO media_assets (id, filename, mime_type, size_bytes, data, created_at)
           VALUES ($1, $2, $3, $4, $5, NOW())
           ON CONFLICT (id) DO UPDATE SET
             filename = EXCLUDED.filename,
             mime_type = EXCLUDED.mime_type,
             size_bytes = EXCLUDED.size_bytes,
             data = EXCLUDED.data;`,
          [mediaId, docFile.name || "NIT_BOQ_Document.pdf", docMimeType, docFile.size, base64Data]
        );

        documentUrl = `/api/media/${mediaId}`;
        documentName = docFile.name || "NIT_BOQ_Document";
        documentSize = formatBytes(docFile.size);
      }
    } else {
      const body = await req.json();
      companyName = (body.companyName || body.company_name || "").trim();
      contactPerson = (body.contactPerson || body.contact_person || "").trim();
      email = (body.email || "").trim();
      phone = (body.phone || "").trim();
      location = (body.location || "").trim();
      projectType = (body.projectType || body.project_type || "Cross Country Pipeline").trim();
      diameter = (body.diameter || "").trim();
      approxLength = (body.approxLength || body.approx_length || "").trim();
      description = (body.description || "").trim();
      documentUrl = body.documentUrl || body.document_url || null;
      documentName = body.documentName || body.document_name || null;
      documentSize = body.documentSize || body.document_size || null;

      // Also support JSON base64 upload if provided
      if (body.documentData && body.documentFilename) {
        const raw = body.documentData.includes("base64,") ? body.documentData.split("base64,")[1] : body.documentData;
        const buffer = Buffer.from(raw, "base64");
        if (buffer.length > MAX_DOCUMENT_SIZE) {
          return NextResponse.json(
            { success: false, message: "NIT/BOQ document exceeds maximum 25MB limit." },
            { status: 400 }
          );
        }
        const mediaId = `rfq_doc_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
        await query(
          `INSERT INTO media_assets (id, filename, mime_type, size_bytes, data, created_at)
           VALUES ($1, $2, $3, $4, $5, NOW())`,
          [mediaId, body.documentFilename, body.documentMimeType || "application/octet-stream", buffer.length, raw]
        );
        documentUrl = `/api/media/${mediaId}`;
        documentName = body.documentFilename;
        documentSize = formatBytes(buffer.length);
      }
    }

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
        document_url, document_name, document_size,
        status, created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, NOW())
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
        documentUrl,
        documentName,
        documentSize,
        "PENDING_REVIEW",
      ]
    );

    return NextResponse.json({
      success: true,
      referenceNo: rows[0]?.reference_no || referenceNo,
      message: "Your project dossier and procurement specifications have been registered with CandelaConstruction Central Tendering Division.",
      status: "PENDING_REVIEW",
      estimatedTurnaround: "48-Hour Response",
      documentUrl,
      documentName,
      documentSize,
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

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const documentOnly = searchParams.get("documentOnly") === "true";

    if (!id) {
      return NextResponse.json({ error: "Missing 'id' parameter" }, { status: 400 });
    }

    // Lookup existing RFQ to check for attached document in media_assets
    const rfqRows = await query(`SELECT document_url FROM rfq_enquiries WHERE id::text = $1::text;`, [id]);
    if (rfqRows.length > 0 && rfqRows[0]?.document_url) {
      const match = rfqRows[0].document_url.match(/\/api\/media\/(.+)/);
      if (match && match[1]) {
        await query(`DELETE FROM media_assets WHERE id = $1;`, [match[1]]);
      }
    }

    if (documentOnly) {
      await query(
        `UPDATE rfq_enquiries SET document_url = NULL, document_name = NULL, document_size = NULL WHERE id::text = $1::text;`,
        [id]
      );
      return NextResponse.json({ success: true, message: `Document removed for RFQ ${id}` });
    }

    await query(`DELETE FROM rfq_enquiries WHERE id::text = $1::text;`, [id]);
    return NextResponse.json({ success: true, message: `RFQ ${id} deleted successfully` });
  } catch (err: any) {
    console.error("[RFQ API] DELETE error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
