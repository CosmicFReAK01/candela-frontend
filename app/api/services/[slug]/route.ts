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
      `SELECT s.*, COALESCE(
        (SELECT json_agg(bullet) FROM service_bullets WHERE service_id = s.id), '[]'::json
      ) as bullets
      FROM services s
      WHERE s.slug = $1 OR s.id = $1
      LIMIT 1;`,
      [slug]
    );

    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (err: any) {
    console.error(`[API services/${slug}] GET error:`, err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
