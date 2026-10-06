import fs from "fs";

async function main() {
  console.log("Loading static data from data/site.ts...");
  const site = await import("../data/site.ts");

  let sql = `-- =========================================================================
-- CandelaConstruction Static Data Ingestion Script
-- Target Database: PostgreSQL (GasPipeline port 5433)
-- Generated automatically from data/site.ts
-- =========================================================================

BEGIN;

-- Clear previous seeded entries
DELETE FROM project_scope;
DELETE FROM project_challenges;
DELETE FROM project_execution;
DELETE FROM project_highlights;
DELETE FROM projects;

DELETE FROM service_bullets;
DELETE FROM service_subcategories;
DELETE FROM services;

DELETE FROM equipment;
DELETE FROM corporate_news;
DELETE FROM job_positions;
DELETE FROM state_footprints;
DELETE FROM sub_districts;
DELETE FROM district_corridors;

`;

  const esc = (val) => {
    if (val === null || val === undefined) return "NULL";
    return `'${String(val).replace(/'/g, "''")}'`;
  };

  // 1. PROJECTS & Child Collections
  console.log(`Processing ${site.projects.length} projects...`);
  for (const p of site.projects) {
    sql += `INSERT INTO projects (id, slug, cat, tag, tag_color, title, meta, diameter, length, wall_thickness, pressure, duration, location, state, client, project_type, status, short_desc, description, spec_label, spec_value)
VALUES (${esc(p.id)}, ${esc(p.slug)}, ${esc(p.cat)}, ${esc(p.tag)}, ${esc(p.tagColor)}, ${esc(p.title)}, ${esc(p.meta)}, ${esc(p.diameter)}, ${esc(p.length)}, ${esc(p.wallThickness)}, ${esc(p.pressure)}, ${esc(p.duration)}, ${esc(p.location)}, ${esc(p.state)}, ${esc(p.client)}, ${esc(p.projectType)}, ${esc(p.status)}, ${esc(p.shortDesc)}, ${esc(p.description)}, ${esc(p.specLabel)}, ${esc(p.specValue)});\n`;

    if (p.scopeOfWork && Array.isArray(p.scopeOfWork)) {
      for (const item of p.scopeOfWork) {
        sql += `INSERT INTO project_scope (project_id, scope_item) VALUES (${esc(p.id)}, ${esc(item)});\n`;
      }
    }

    if (p.keyChallenges && Array.isArray(p.keyChallenges)) {
      for (const item of p.keyChallenges) {
        sql += `INSERT INTO project_challenges (project_id, challenge_item) VALUES (${esc(p.id)}, ${esc(item)});\n`;
      }
    }

    if (p.execution && Array.isArray(p.execution)) {
      for (const item of p.execution) {
        sql += `INSERT INTO project_execution (project_id, execution_item) VALUES (${esc(p.id)}, ${esc(item)});\n`;
      }
    }

    if (p.highlights && Array.isArray(p.highlights)) {
      for (const item of p.highlights) {
        sql += `INSERT INTO project_highlights (project_id, highlight_item) VALUES (${esc(p.id)}, ${esc(item)});\n`;
      }
    }
  }

  // 2. SERVICES & Child Collections
  console.log(`Processing ${site.services.length} services...`);
  for (const s of site.services) {
    sql += `INSERT INTO services (id, n, icon, title, slug, text, standard, color)
VALUES (${esc(s.id)}, ${esc(s.n)}, ${esc(s.icon)}, ${esc(s.title)}, ${esc(s.slug)}, ${esc(s.text)}, ${esc(s.standard)}, ${esc(s.color)});\n`;

    if (s.bullets && Array.isArray(s.bullets)) {
      for (const b of s.bullets) {
        sql += `INSERT INTO service_bullets (service_id, bullet) VALUES (${esc(s.id)}, ${esc(b)});\n`;
      }
    }

    if (s.subcategories && Array.isArray(s.subcategories)) {
      for (const sub of s.subcategories) {
        sql += `INSERT INTO service_subcategories (service_id, subcategory) VALUES (${esc(s.id)}, ${esc(sub)});\n`;
      }
    }
  }

  // 3. EQUIPMENT
  console.log(`Processing ${site.fleetEquipment.length} equipment items...`);
  for (const eq of site.fleetEquipment) {
    const make = eq.name.split(" ")[0] || "OEM Standard";
    sql += `INSERT INTO equipment (name, application, capacity, units, make)
VALUES (${esc(eq.name)}, ${esc(eq.application)}, ${esc(eq.capacity)}, ${esc(eq.quantity || 'Available')}, ${esc(eq.specs || make)});\n`;
  }

  // 4. CORPORATE NEWS
  console.log(`Processing ${site.corporateNews.length} news articles...`);
  for (const n of site.corporateNews) {
    const category = n.tag || "Corporate Milestone";
    const excerpt = n.summary || n.title;
    const content = n.summary || n.title;
    const readTime = "3 min read";
    sql += `INSERT INTO corporate_news (id, title, date, category, read_time, excerpt, content)
VALUES (${esc(n.id)}, ${esc(n.title)}, ${esc(n.date)}, ${esc(category)}, ${esc(readTime)}, ${esc(excerpt)}, ${esc(content)});\n`;
  }

  // 5. JOB POSITIONS
  console.log(`Processing ${site.openPositions.length} job positions...`);
  for (const j of site.openPositions) {
    sql += `INSERT INTO job_positions (id, title, department, location, experience, type, job_desc)
VALUES (${esc(j.id)}, ${esc(j.title)}, ${esc(j.department)}, ${esc(j.location)}, ${esc(j.experience)}, ${esc(j.type)}, ${esc(j.desc)});\n`;
  }

  // 6. STATE FOOTPRINTS & DISTRICT CORRIDORS
  console.log(`Processing ${site.indiaProjectStates.length} regional district corridors...`);
  for (const st of site.indiaProjectStates) {
    const kmNum = typeof st.pipelineKm === 'number' ? st.pipelineKm : (parseFloat(String(st.pipelineKm).replace(/[^0-9.]/g, "")) || 0);
    const spreadsNum = st.projectsCount || 0;
    sql += `INSERT INTO state_footprints (id, name, projects, km, status)
VALUES (${esc(st.id)}, ${esc(st.name)}, ${spreadsNum}, ${kmNum}, 'Active Operations');\n`;

    sql += `INSERT INTO district_corridors (id, slug, district_name, state_name, regional_hub, total_pipeline_laid_km, active_spreads_count, hdd_rigs_deployed, is_active)
VALUES (gen_random_uuid(), ${esc(st.id)}, ${esc(st.name)}, 'Bihar', ${esc(st.activeSites?.[0] || 'Central Base')}, ${kmNum}, ${spreadsNum}, 4, true)
ON CONFLICT (slug) DO UPDATE SET
  district_name = EXCLUDED.district_name,
  regional_hub = EXCLUDED.regional_hub,
  total_pipeline_laid_km = EXCLUDED.total_pipeline_laid_km,
  active_spreads_count = EXCLUDED.active_spreads_count;\n`;

    if (st.subDistricts && Array.isArray(st.subDistricts)) {
      for (const sub of st.subDistricts) {
        sql += `INSERT INTO sub_districts (id, district_id, sub_district_name, block_type, corridor_km, terrain_classification)
SELECT gen_random_uuid(), id, ${esc(sub)}, 'Tehsil', 45.0, 'Alluvial Plain / RoW'
FROM district_corridors WHERE slug = ${esc(st.id)};\n`;
      }
    }
  }

  sql += `
COMMIT;
`;

  const outPath = "./scripts/seed.sql";
  fs.writeFileSync(outPath, sql);
  console.log(`Successfully generated ${outPath} (${sql.length} bytes).`);
}

main().catch(err => {
  console.error("Error generating seed script:", err);
  process.exit(1);
});
