import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const rows = await query(
      `SELECT 
        id, 
        title, 
        department, 
        location, 
        experience, 
        type, 
        job_desc as "desc" 
       FROM job_positions 
       ORDER BY title ASC;`
    );
    return NextResponse.json(rows);
  } catch (err: any) {
    console.error("[API careers] GET error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
