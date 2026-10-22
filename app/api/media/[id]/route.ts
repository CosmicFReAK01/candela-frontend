import { NextResponse } from "next/server";
import { query } from "@/lib/db";

interface RouteProps {
  params: Promise<{ id: string }>;
}

export async function GET(req: Request, { params }: RouteProps) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "Missing media ID" }, { status: 400 });
  }

  try {
    const rows = await query<{ mime_type: string; data: string; filename: string }>(
      `SELECT mime_type, data, filename FROM media_assets WHERE id = $1 LIMIT 1;`,
      [id]
    );

    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: "Media asset not found" }, { status: 404 });
    }

    const { mime_type, data, filename } = rows[0];

    // Data can be stored as raw base64 or data URL (data:image/jpeg;base64,...)
    const base64Data = data.includes("base64,") ? data.split("base64,")[1] : data;
    const buffer = Buffer.from(base64Data, "base64");

    // ETag caching
    const ifNoneMatch = req.headers.get("if-none-match");
    const etag = `"${id}"`;
    if (ifNoneMatch === etag) {
      return new Response(null, { status: 304 });
    }

    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type": mime_type || "image/jpeg",
        "Content-Length": buffer.length.toString(),
        "Cache-Control": "public, max-age=31536000, immutable",
        "ETag": etag,
        ...(filename ? { "Content-Disposition": `inline; filename="${encodeURIComponent(filename)}"` } : {}),
      },
    });
  } catch (err: any) {
    console.error("[Media API] GET error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: RouteProps) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "Missing media ID" }, { status: 400 });
  }

  try {
    await query(`DELETE FROM media_assets WHERE id = $1;`, [id]);
    return NextResponse.json({ success: true, message: `Media ${id} removed` });
  } catch (err: any) {
    console.error("[Media API] DELETE error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
