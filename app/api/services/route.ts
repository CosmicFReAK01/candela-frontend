import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const rows = await query(`
      SELECT s.*, COALESCE(
        (SELECT json_agg(bullet) FROM service_bullets WHERE service_id = s.id), '[]'::json
      ) as bullets
      FROM services s
      ORDER BY s.n ASC;
    `);
    return NextResponse.json(rows);
  } catch (err: any) {
    console.error("[API services] GET error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
