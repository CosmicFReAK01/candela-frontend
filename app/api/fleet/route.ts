import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const rows = await query("SELECT * FROM equipment ORDER BY name ASC;");
    return NextResponse.json(rows);
  } catch (err: any) {
    console.error("[API fleet] error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
