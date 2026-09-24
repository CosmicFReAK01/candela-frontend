import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

interface RouteProps {
  params: Promise<{ slug: string }>;
}

export async function GET(_req: Request, { params }: RouteProps) {
  const { slug } = await params;

  try {
    const rows = await query(
      `SELECT p.*, COALESCE(
        (SELECT json_agg(scope_item) FROM project_scope WHERE project_id = p.id), '[]'::json
      ) as "scopeOfWork"
      FROM projects p
      WHERE p.slug = $1 OR p.id = $1
      LIMIT 1;`,
      [slug]
    );

    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (err: any) {
    console.error(`[API projects/${slug}] GET error:`, err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
