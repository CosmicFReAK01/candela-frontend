import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  try {
    let sql = `
      SELECT p.*, COALESCE(
        (SELECT json_agg(scope_item) FROM project_scope WHERE project_id = p.id), '[]'::json
      ) as "scopeOfWork"
      FROM projects p
    `;
    const params: any[] = [];

    if (category && category !== "all") {
      sql += ` WHERE p.cat = $1`;
      params.push(category);
    }

    sql += ` ORDER BY p.title ASC;`;

    const rows = await query(sql, params);
    return NextResponse.json(rows);
  } catch (err: any) {
    console.error("[API projects] GET error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
