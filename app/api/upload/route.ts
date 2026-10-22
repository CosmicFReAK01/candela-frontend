import { NextResponse } from "next/server";
import { query } from "@/lib/db";

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/svg+xml",
  "image/gif",
]);

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB limit

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";

    let filename = "profile-photo.jpg";
    let mimeType = "image/jpeg";
    let base64Data = "";
    let sizeBytes = 0;

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file") as File | null;

      if (!file) {
        return NextResponse.json({ error: "No file uploaded in 'file' field" }, { status: 400 });
      }

      filename = file.name || "profile.jpg";
      mimeType = file.type || "image/jpeg";
      sizeBytes = file.size;

      if (!ALLOWED_MIME_TYPES.has(mimeType.toLowerCase())) {
        return NextResponse.json(
          { error: `Unsupported image format (${mimeType}). Allowed: JPG, PNG, WebP, AVIF, SVG.` },
          { status: 400 }
        );
      }

      if (sizeBytes > MAX_FILE_SIZE) {
        return NextResponse.json({ error: "File exceeds 10MB size limit." }, { status: 400 });
      }

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      base64Data = buffer.toString("base64");
    } else {
      // JSON body (base64 Data URL or data)
      const body = await req.json();
      const { dataUrl, rawBase64, filename: reqFilename, mimeType: reqMimeType } = body;

      if (!dataUrl && !rawBase64) {
        return NextResponse.json({ error: "Missing image data" }, { status: 400 });
      }

      filename = reqFilename || "profile.jpg";

      if (dataUrl && dataUrl.startsWith("data:")) {
        const matches = dataUrl.match(/^data:([a-zA-Z0-9/+-]+);base64,(.+)$/);
        if (matches) {
          mimeType = matches[1];
          base64Data = matches[2];
        } else {
          return NextResponse.json({ error: "Invalid data URL format" }, { status: 400 });
        }
      } else {
        base64Data = rawBase64 || dataUrl;
        mimeType = reqMimeType || "image/jpeg";
      }

      if (!ALLOWED_MIME_TYPES.has(mimeType.toLowerCase())) {
        return NextResponse.json(
          { error: `Unsupported image format (${mimeType}). Allowed: JPG, PNG, WebP, AVIF, SVG.` },
          { status: 400 }
        );
      }

      const buffer = Buffer.from(base64Data, "base64");
      sizeBytes = buffer.length;

      if (sizeBytes > MAX_FILE_SIZE) {
        return NextResponse.json({ error: "Image exceeds 10MB size limit." }, { status: 400 });
      }
    }

    const id = `lead_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    await query(
      `INSERT INTO media_assets (id, filename, mime_type, size_bytes, data, created_at)
       VALUES ($1, $2, $3, $4, $5, NOW())
       ON CONFLICT (id) DO UPDATE SET
         filename = EXCLUDED.filename,
         mime_type = EXCLUDED.mime_type,
         size_bytes = EXCLUDED.size_bytes,
         data = EXCLUDED.data;`,
      [id, filename, mimeType, sizeBytes, base64Data]
    );

    const publicUrl = `/api/media/${id}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      id,
      filename,
      mime_type: mimeType,
      size_bytes: sizeBytes,
    });
  } catch (err: any) {
    console.error("[Upload API] Error:", err);
    return NextResponse.json({ error: err.message || "Failed to upload image" }, { status: 500 });
  }
}
