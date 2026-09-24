import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const rows = await query("SELECT * FROM hse_metrics ORDER BY recorded_date DESC LIMIT 1;");
    return NextResponse.json(rows[0] || null);
  } catch (err: any) {
    console.error("[API hse] error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
