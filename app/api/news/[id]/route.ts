import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

interface RouteProps {
  params: Promise<{ id: string }>;
}

export async function GET(_req: Request, { params }: RouteProps) {
  const { id } = await params;

  try {
    const rows = await query(
      `SELECT * FROM corporate_news WHERE id = $1 LIMIT 1;`,
      [id]
    );

    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: "News article not found" }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (err: any) {
    console.error(`[API news/${id}] GET error:`, err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
