import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const rows = await query("SELECT * FROM site_settings WHERE id = 'default' LIMIT 1");
    if (rows.length === 0) {
      return NextResponse.json({
        id: "default",
        company_name: "CandelaConstruction Private Limited",
        tagline: "Trust delivered.",
        control_room_hotline: "1800-180-9999",
        compliance_codes: "PNGRB / ASME B31.8 / API 1104",
        safe_hours: "28.4M LTI-Free Safe Hours",
        iso_badges: "ISO 9001:2015, ISO 14001, ISO 45001",
        contact_email: "tenders@candelaconstruction.com",
        emergency_phone: "+91 1800-180-9999",
        office_address: "Candela Tower, Corporate Corridor, SG Highway, Ahmedabad, Gujarat - 380054",
        hero_title: "Building the Infrastructure Behind India's Energy Future",
        hero_subtitle: "Specialized pipeline construction, engineering and infrastructure solutions for natural gas, hydrocarbons and industrial applications.",
      });
    }
    const { admin_passkey, ...safeSettings } = rows[0];
    return NextResponse.json(safeSettings);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const {
      company_name,
      tagline,
      control_room_hotline,
      compliance_codes,
      safe_hours,
      iso_badges,
      contact_email,
      emergency_phone,
      office_address,
      hero_title,
      hero_subtitle,
      about_content,
      capabilities_content,
      home_content,
      regional_bases,
    } = body;

    const sql = `
      UPDATE site_settings
      SET 
        company_name = COALESCE($1, company_name),
        tagline = COALESCE($2, tagline),
        control_room_hotline = COALESCE($3, control_room_hotline),
        compliance_codes = COALESCE($4, compliance_codes),
        safe_hours = COALESCE($5, safe_hours),
        iso_badges = COALESCE($6, iso_badges),
        contact_email = COALESCE($7, contact_email),
        emergency_phone = COALESCE($8, emergency_phone),
        office_address = COALESCE($9, office_address),
        hero_title = COALESCE($10, hero_title),
        hero_subtitle = COALESCE($11, hero_subtitle),
        about_content = COALESCE($12::jsonb, about_content),
        capabilities_content = COALESCE($13::jsonb, capabilities_content),
        home_content = COALESCE($14::jsonb, home_content),
        regional_bases = COALESCE($15::jsonb, regional_bases),
        updated_at = NOW()
      WHERE id = 'default'
      RETURNING *;
    `;

    const rows = await query(sql, [
      company_name,
      tagline,
      control_room_hotline,
      compliance_codes,
      safe_hours,
      iso_badges,
      contact_email,
      emergency_phone,
      office_address,
      hero_title,
      hero_subtitle,
      about_content ? JSON.stringify(about_content) : null,
      capabilities_content ? JSON.stringify(capabilities_content) : null,
      home_content ? JSON.stringify(home_content) : null,
      regional_bases ? JSON.stringify(regional_bases) : null,
    ]);

    // Automatically sync executive_leadership table if leadership array is updated
    if (about_content && Array.isArray(about_content.leadership)) {
      try {
        await query("DELETE FROM executive_leadership;");
        for (let i = 0; i < about_content.leadership.length; i++) {
          const m = about_content.leadership[i];
          const img = m.photo_url || m.image_url || "";
          await query(
            `INSERT INTO executive_leadership (id, name, role, designation, experience, committee, qualifications, background, email, linkedin, image_url, display_order, created_at, updated_at)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW(), NOW());`,
            [
              i + 1,
              m.name || "",
              m.role || "",
              m.designation || m.role || "",
              m.experience || "",
              m.committee || "",
              m.qualifications || "",
              m.background || "",
              m.email || "",
              m.linkedin || "",
              img,
              i + 1,
            ]
          );
        }
      } catch (syncErr) {
        console.error("[Settings API] Warning: Failed to sync executive_leadership table:", syncErr);
      }
    }

    const { admin_passkey, ...safeUpdated } = rows[0] || {};
    return NextResponse.json({ success: true, data: safeUpdated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

