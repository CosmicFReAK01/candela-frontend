import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const rows = await query("SELECT * FROM corporate_news ORDER BY id DESC;");
    return NextResponse.json(rows);
  } catch (err: any) {
    console.error("[API news] error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
