import { NextResponse } from "next/server";
import { query } from "@/lib/db";

interface RouteProps {
  params: Promise<{ module: string }>;
}

// ── GET /api/admin/[module] ──
export async function GET(req: Request, { params }: RouteProps) {
  const { module } = await params;

  try {
    switch (module) {
      case "projects": {
        const rows = await query(`
          SELECT p.*, COALESCE(
            (SELECT json_agg(scope_item) FROM project_scope WHERE project_id = p.id), '[]'::json
          ) as "scopeOfWork"
          FROM projects p
          ORDER BY p.title ASC;
        `);
        return NextResponse.json(rows);
      }

      case "services": {
        const rows = await query(`
          SELECT s.*, COALESCE(
            (SELECT json_agg(bullet) FROM service_bullets WHERE service_id = s.id), '[]'::json
          ) as bullets
          FROM services s
          ORDER BY s.n ASC;
        `);
        return NextResponse.json(rows);
      }

      case "fleet":
      case "equipment": {
        const rows = await query(`SELECT * FROM equipment ORDER BY name ASC;`);
        return NextResponse.json(rows);
      }

      case "careers": {
        const rows = await query(`SELECT * FROM job_positions ORDER BY title ASC;`);
        return NextResponse.json(rows);
      }

      case "news":
      case "newss": {
        const rows = await query(`SELECT * FROM corporate_news ORDER BY id DESC;`);
        return NextResponse.json(rows);
      }

      case "clients": {
        const rows = await query(`SELECT * FROM clients ORDER BY name ASC;`);
        return NextResponse.json(rows);
      }

      case "rfq": {
        const rows = await query(`SELECT * FROM rfq_enquiries ORDER BY created_at DESC;`);
        return NextResponse.json(rows);
      }

      case "applications": {
        const rows = await query(`SELECT * FROM job_applications ORDER BY applied_at DESC;`);
        return NextResponse.json(rows);
      }

      case "hse": {
        const rows = await query(`SELECT * FROM hse_metrics ORDER BY recorded_date DESC LIMIT 1;`);
        return NextResponse.json(rows[0] || null);
      }

      case "leadership":
      case "executive_leadership": {
        const rows = await query(`SELECT * FROM executive_leadership ORDER BY display_order ASC, id ASC;`);
        return NextResponse.json(rows);
      }

      default:
        return NextResponse.json({ error: `Unknown module '${module}'` }, { status: 400 });
    }
  } catch (err: any) {
    console.error(`[Admin API] GET error on module ${module}:`, err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// ── POST /api/admin/[module] ──
export async function POST(req: Request, { params }: RouteProps) {
  const { module } = await params;
  const body = await req.json();

  try {
    switch (module) {
      case "projects": {
        const id = body.id || `proj-${Date.now().toString(36)}`;
        const slug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        const rows = await query(
          `INSERT INTO projects (id, slug, cat, tag, tag_color, title, meta, diameter, length, wall_thickness, pressure, duration, location, state, client, project_type, status, short_desc, description, spec_label, spec_value)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)
           RETURNING *;`,
          [
            id,
            slug,
            body.cat || "cross-country",
            body.tag || "CROSS-COUNTRY TRUNKLINE",
            body.tagColor || "amber",
            body.title,
            body.meta || `Length: ${body.length || "TBD"} | ${body.diameter || "TBD"}`,
            body.diameter || "",
            body.length || "",
            body.wallThickness || "",
            body.pressure || "",
            body.duration || "",
            body.location || "",
            body.state || "",
            body.client || "",
            body.projectType || "",
            body.status || "Completed",
            body.shortDesc || "",
            body.description || "",
            body.specLabel || "Welding",
            body.specValue || "100% PAUT / AUT",
          ]
        );

        if (Array.isArray(body.scopeOfWork)) {
          for (const item of body.scopeOfWork) {
            if (item && item.trim()) {
              await query(`INSERT INTO project_scope (project_id, scope_item) VALUES ($1, $2);`, [id, item.trim()]);
            }
          }
        }
        return NextResponse.json({ success: true, data: rows[0] });
      }

      case "services": {
        const id = body.id || `svc-${Date.now().toString(36)}`;
        const slug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        const rows = await query(
          `INSERT INTO services (id, n, icon, title, slug, text, standard, color)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
           RETURNING *;`,
          [
            id,
            body.n || "11",
            body.icon || "pipeline",
            body.title,
            slug,
            body.text || "",
            body.standard || "ASME B31.8 / API 1104",
            body.color || "amber",
          ]
        );

        if (Array.isArray(body.bullets)) {
          for (const b of body.bullets) {
            if (b && b.trim()) {
              await query(`INSERT INTO service_bullets (service_id, bullet) VALUES ($1, $2);`, [id, b.trim()]);
            }
          }
        }
        return NextResponse.json({ success: true, data: rows[0] });
      }

      case "fleet":
      case "equipment": {
        const units = body.units || body.quantity || "1 Unit";
        const quantity = body.quantity || body.units || "1 Unit";
        const make = body.make || body.specs || "";
        const specs = body.specs || body.make || "";
        const category = body.category || "Heavy Machinery";
        const rows = await query(
          `INSERT INTO equipment (name, application, capacity, make, units, category, specs, quantity)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
           ON CONFLICT (name) DO UPDATE SET
             application = EXCLUDED.application,
             capacity = EXCLUDED.capacity,
             make = EXCLUDED.make,
             units = EXCLUDED.units,
             category = EXCLUDED.category,
             specs = EXCLUDED.specs,
             quantity = EXCLUDED.quantity
           RETURNING *;`,
          [body.name, body.application || "", body.capacity || "", make, units, category, specs, quantity]
        );
        return NextResponse.json({ success: true, data: rows[0] });
      }

      case "careers": {
        const id = body.id || `job-${Date.now().toString(36)}`;
        const rows = await query(
          `INSERT INTO job_positions (id, title, department, location, experience, type, job_desc)
           VALUES ($1, $2, $3, $4, $5, $6, $7)
           RETURNING *;`,
          [
            id,
            body.title,
            body.department || "Engineering",
            body.location || "Pan-India",
            body.experience || "3-5 Years",
            body.type || "Full-Time",
            body.job_desc || body.desc || "",
          ]
        );
        return NextResponse.json({ success: true, data: rows[0] });
      }

      case "news":
      case "newss": {
        const id = body.id || `news-${Date.now().toString(36)}`;
        const rows = await query(
          `INSERT INTO corporate_news (id, title, date, category, read_time, excerpt, content)
           VALUES ($1, $2, $3, $4, $5, $6, $7)
           RETURNING *;`,
          [
            id,
            body.title,
            body.date || "September 2026",
            body.category || body.tag || "MILESTONE",
            body.read_time || body.readTime || "3 min read",
            body.excerpt || body.summary || "",
            body.content || body.summary || "",
          ]
        );
        return NextResponse.json({ success: true, data: rows[0] });
      }

      case "clients": {
        const rawCode = (body.code && body.code.trim().toUpperCase()) || (body.name ? body.name.replace(/[^A-Za-z0-9]/g, "").slice(0, 10).toUpperCase() : "OP");
        const rows = await query(
          `INSERT INTO clients (code, name, sector, logo_url, is_tier1)
           VALUES ($1, $2, $3, $4, $5)
           ON CONFLICT (code) DO UPDATE SET
             name = EXCLUDED.name,
             sector = EXCLUDED.sector,
             logo_url = EXCLUDED.logo_url,
             is_tier1 = EXCLUDED.is_tier1
           RETURNING *;`,
          [rawCode, body.name?.trim() || "", body.sector?.trim() || "National Gas & Transmission", body.logo_url || "", body.is_tier1 ?? true]
        );
        return NextResponse.json({ success: true, data: rows[0] });
      }

      case "leadership":
      case "executive_leadership": {
        const rows = await query(
          `INSERT INTO executive_leadership (name, role, background, experience, display_order)
           VALUES ($1, $2, $3, $4, $5)
           RETURNING *;`,
          [body.name, body.role, body.background, body.experience || "", body.display_order || 0]
        );
        return NextResponse.json({ success: true, data: rows[0] });
      }

      default:
        return NextResponse.json({ error: `Unknown module '${module}'` }, { status: 400 });
    }
  } catch (err: any) {
    console.error(`[Admin API] POST error on module ${module}:`, err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// ── PUT /api/admin/[module] ──
export async function PUT(req: Request, { params }: RouteProps) {
  const { module } = await params;
  const body = await req.json();

  try {
    switch (module) {
      case "projects": {
        const id = body.id;
        if (!id) return NextResponse.json({ error: "Missing project id" }, { status: 400 });

        const rows = await query(
          `UPDATE projects SET
             title = COALESCE($1, title),
             client = COALESCE($2, client),
             diameter = COALESCE($3, diameter),
             length = COALESCE($4, length),
             pressure = COALESCE($5, pressure),
             location = COALESCE($6, location),
             state = COALESCE($7, state),
             status = COALESCE($8, status),
             cat = COALESCE($9, cat),
             tag = COALESCE($10, tag),
             short_desc = COALESCE($11, short_desc),
             description = COALESCE($12, description),
             duration = COALESCE($13, duration),
             spec_label = COALESCE($14, spec_label),
             spec_value = COALESCE($15, spec_value)
           WHERE id = $16 OR slug = $16
           RETURNING *;`,
          [
            body.title,
            body.client,
            body.diameter,
            body.length,
            body.pressure,
            body.location,
            body.state,
            body.status,
            body.cat,
            body.tag,
            body.shortDesc || body.short_desc,
            body.description,
            body.duration,
            body.specLabel || body.spec_label,
            body.specValue || body.spec_value,
            id,
          ]
        );

        if (Array.isArray(body.scopeOfWork)) {
          await query(`DELETE FROM project_scope WHERE project_id = $1;`, [rows[0]?.id || id]);
          for (const item of body.scopeOfWork) {
            if (item && item.trim()) {
              await query(`INSERT INTO project_scope (project_id, scope_item) VALUES ($1, $2);`, [rows[0]?.id || id, item.trim()]);
            }
          }
        }
        return NextResponse.json({ success: true, data: rows[0] });
      }

      case "services": {
        const id = body.id;
        if (!id) return NextResponse.json({ error: "Missing service id" }, { status: 400 });

        const rows = await query(
          `UPDATE services SET
             title = COALESCE($1, title),
             text = COALESCE($2, text),
             standard = COALESCE($3, standard),
             color = COALESCE($4, color),
             n = COALESCE($5, n)
           WHERE id = $6 OR slug = $6
           RETURNING *;`,
          [body.title, body.text, body.standard, body.color, body.n, id]
        );

        if (Array.isArray(body.bullets)) {
          await query(`DELETE FROM service_bullets WHERE service_id = $1;`, [rows[0]?.id || id]);
          for (const b of body.bullets) {
            if (b && b.trim()) {
              await query(`INSERT INTO service_bullets (service_id, bullet) VALUES ($1, $2);`, [rows[0]?.id || id, b.trim()]);
            }
          }
        }
        return NextResponse.json({ success: true, data: rows[0] });
      }

      case "fleet":
      case "equipment": {
        const units = body.units || body.quantity || "1 Unit";
        const quantity = body.quantity || body.units || "1 Unit";
        const make = body.make || body.specs || "";
        const specs = body.specs || body.make || "";
        const category = body.category || "Heavy Machinery";
        const targetName = body._originalName || body.name;
        let rows = await query(
          `UPDATE equipment SET
             name = COALESCE($1, name),
             application = COALESCE($2, application),
             capacity = COALESCE($3, capacity),
             make = COALESCE($4, make),
             units = COALESCE($5, units),
             category = COALESCE($6, category),
             specs = COALESCE($7, specs),
             quantity = COALESCE($8, quantity)
           WHERE name = $9
           RETURNING *;`,
          [body.name, body.application, body.capacity, make, units, category, specs, quantity, targetName]
        );
        if (!rows || rows.length === 0) {
          rows = await query(
            `INSERT INTO equipment (name, application, capacity, make, units, category, specs, quantity)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
             ON CONFLICT (name) DO UPDATE SET
               application = EXCLUDED.application,
               capacity = EXCLUDED.capacity,
               make = EXCLUDED.make,
               units = EXCLUDED.units,
               category = EXCLUDED.category,
               specs = EXCLUDED.specs,
               quantity = EXCLUDED.quantity
             RETURNING *;`,
            [body.name, body.application || "", body.capacity || "", make, units, category, specs, quantity]
          );
        }
        return NextResponse.json({ success: true, data: rows ? rows[0] : null });
      }

      case "careers": {
        const id = body.id;
        if (!id) return NextResponse.json({ error: "Missing job id" }, { status: 400 });

        const rows = await query(
          `UPDATE job_positions SET
             title = COALESCE($1, title),
             department = COALESCE($2, department),
             location = COALESCE($3, location),
             experience = COALESCE($4, experience),
             type = COALESCE($5, type),
             job_desc = COALESCE($6, job_desc)
           WHERE id = $7
           RETURNING *;`,
          [body.title, body.department, body.location, body.experience, body.type, body.job_desc || body.desc, id]
        );
        return NextResponse.json({ success: true, data: rows[0] });
      }

      case "news":
      case "newss": {
        const id = body.id;
        if (!id) return NextResponse.json({ error: "Missing news id" }, { status: 400 });

        const rows = await query(
          `UPDATE corporate_news SET
             title = COALESCE($1, title),
             date = COALESCE($2, date),
             category = COALESCE($3, category),
             read_time = COALESCE($4, read_time),
             excerpt = COALESCE($5, excerpt),
             content = COALESCE($6, content)
           WHERE id = $7
           RETURNING *;`,
          [body.title, body.date, body.category || body.tag, body.read_time || body.readTime, body.excerpt || body.summary, body.content || body.summary, id]
        );
        return NextResponse.json({ success: true, data: rows[0] });
      }

      case "clients": {
        const id = body.id;
        if (!id) return NextResponse.json({ error: "Missing client id" }, { status: 400 });

        const name = body.name !== undefined ? (body.name?.trim() || null) : null;
        const sector = body.sector !== undefined ? (body.sector?.trim() || null) : null;
        const code = body.code !== undefined ? (body.code?.trim().toUpperCase() || null) : null;
        const logo_url = body.logo_url !== undefined ? body.logo_url : null;
        const is_tier1 = body.is_tier1 !== undefined ? body.is_tier1 : null;

        const rows = await query(
          `UPDATE clients SET
             name = COALESCE($1, name),
             sector = COALESCE($2, sector),
             code = COALESCE($3, code),
             logo_url = COALESCE($4, logo_url),
             is_tier1 = COALESCE($5, is_tier1)
           WHERE id::text = $6 OR code = $6
           RETURNING *;`,
          [name, sector, code, logo_url, is_tier1, id]
        );
        return NextResponse.json({ success: true, data: rows[0] });
      }

      case "rfq": {
        const id = body.id;
        const rows = await query(
          `UPDATE rfq_enquiries SET
             status = COALESCE($1, status),
             admin_notes = COALESCE($2, admin_notes)
           WHERE id::text = $3::text RETURNING *;`,
          [body.status, body.admin_notes || body.notes, id]
        );
        return NextResponse.json({ success: true, data: rows[0] });
      }

      case "applications": {
        const id = body.id;
        const rows = await query(
          `UPDATE job_applications SET
             status = COALESCE($1, status),
             admin_notes = COALESCE($2, admin_notes)
           WHERE id::text = $3::text RETURNING *;`,
          [body.status, body.admin_notes || body.notes, id]
        );
        return NextResponse.json({ success: true, data: rows[0] });
      }

      case "hse": {
        let rows = await query(
          `UPDATE hse_metrics SET
             safe_man_hours = COALESCE($1, safe_man_hours),
             ltifr = COALESCE($2, ltifr),
             environmental_restoration_pct = COALESCE($3, environmental_restoration_pct),
             golden_rules_count = COALESCE($4, golden_rules_count),
             training_hours = COALESCE($5, training_hours)
           RETURNING *;`,
          [body.safe_man_hours, body.ltifr, body.environmental_restoration_pct, body.golden_rules_count, body.training_hours]
        );
        if (!rows || rows.length === 0) {
          rows = await query(
            `INSERT INTO hse_metrics (safe_man_hours, ltifr, environmental_restoration_pct, golden_rules_count, training_hours)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *;`,
            [body.safe_man_hours || 28400000, body.ltifr || 0.00, body.environmental_restoration_pct || 100, body.golden_rules_count || 14, body.training_hours || 42000]
          );
        }
        return NextResponse.json({ success: true, data: rows[0] });
      }

      case "leadership":
      case "executive_leadership": {
        const id = body.id;
        const rows = await query(
          `UPDATE executive_leadership SET
             name = COALESCE($1, name),
             role = COALESCE($2, role),
             background = COALESCE($3, background),
             experience = COALESCE($4, experience),
             display_order = COALESCE($5, display_order),
             updated_at = NOW()
           WHERE id::text = $6::text RETURNING *;`,
          [body.name, body.role, body.background, body.experience, body.display_order, id]
        );
        return NextResponse.json({ success: true, data: rows[0] });
      }

      default:
        return NextResponse.json({ error: `Unknown module '${module}'` }, { status: 400 });
    }
  } catch (err: any) {
    console.error(`[Admin API] PUT error on module ${module}:`, err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// ── DELETE /api/admin/[module] ──
export async function DELETE(req: Request, { params }: RouteProps) {
  const { module } = await params;
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing 'id' query parameter" }, { status: 400 });
  }

  try {
    switch (module) {
      case "projects": {
        await query(`DELETE FROM projects WHERE id = $1 OR slug = $1;`, [id]);
        return NextResponse.json({ success: true, message: `Project ${id} deleted` });
      }

      case "services": {
        await query(`DELETE FROM services WHERE id = $1 OR slug = $1;`, [id]);
        return NextResponse.json({ success: true, message: `Service ${id} deleted` });
      }

      case "fleet":
      case "equipment": {
        await query(`DELETE FROM equipment WHERE name = $1;`, [id]);
        return NextResponse.json({ success: true, message: `Equipment ${id} deleted` });
      }

      case "careers": {
        await query(`DELETE FROM job_positions WHERE id = $1;`, [id]);
        return NextResponse.json({ success: true, message: `Position ${id} deleted` });
      }

      case "news":
      case "newss": {
        await query(`DELETE FROM corporate_news WHERE id = $1;`, [id]);
        return NextResponse.json({ success: true, message: `News ${id} deleted` });
      }

      case "clients": {
        await query(`DELETE FROM client_approvals WHERE client_id::text = $1;`, [id]);
        await query(`DELETE FROM clients WHERE id::text = $1 OR code = $1;`, [id]);
        return NextResponse.json({ success: true, message: `Client ${id} deleted` });
      }

      case "rfq": {
        await query(`DELETE FROM rfq_enquiries WHERE id::text = $1::text;`, [id]);
        return NextResponse.json({ success: true, message: `RFQ ${id} deleted` });
      }

      case "applications": {
        await query(`DELETE FROM job_applications WHERE id::text = $1::text;`, [id]);
        return NextResponse.json({ success: true, message: `Application ${id} deleted` });
      }

      case "leadership":
      case "executive_leadership": {
        await query(`DELETE FROM executive_leadership WHERE id::text = $1::text;`, [id]);
        return NextResponse.json({ success: true, message: `Leader ${id} deleted` });
      }

      default:
        return NextResponse.json({ error: `Unknown module '${module}'` }, { status: 400 });
    }
  } catch (err: any) {
    console.error(`[Admin API] DELETE error on module ${module}:`, err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
