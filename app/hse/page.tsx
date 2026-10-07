import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { certifications, hseMetrics } from "@/data/site";
import { query } from "@/lib/db";
import { ShieldCheck, HeartPulse, TreePine, Award, ChevronRight } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "HSE & Quality Management | CandelaConstruction Private Limited",
  description: "Occupational health, safety systems, zero-spill environmental management, QA/QC testing regimes, and ISO 9001/14001/45001 certifications — Trust delivered.",
};

export default async function HSEPage() {
  let dbHse: any = null;
  try {
    const rows = await query("SELECT * FROM hse_metrics ORDER BY recorded_date DESC LIMIT 1;");
    if (rows ) {
      dbHse = rows[0];
    }
  } catch (err) {
    console.error("Failed to query HSE in HSEPage:", err);
  }

  const safeHours = dbHse?.safe_man_hours 
    ? (Number(dbHse.safe_man_hours) >= 1000000 
        ? `${(Number(dbHse.safe_man_hours) / 1000000).toFixed(1)}M` 
        : `${Number(dbHse.safe_man_hours).toLocaleString()}`)
    : hseMetrics.safeManHours;

  const ltifr = dbHse?.ltifr !== undefined ? Number(dbHse.ltifr).toFixed(2) : hseMetrics.ltifr;
  const envRest = dbHse?.environmental_restoration_pct !== undefined ? `${Math.round(Number(dbHse.environmental_restoration_pct))}%` : hseMetrics.environmentalRestoration;
  const goldenRules = dbHse?.golden_rules_count ? `${dbHse.golden_rules_count} Rules` : hseMetrics.goldenSafetyRules;

  return (
    <>
      <Navbar />
      <main className="bg-[#F8F4EC] text-[#242424]">
        {/* ── Sub-Page Hero Header ── */}
        <section className="relative py-16 lg:py-24 bg-[#F3EFE7] border-b border-[#D9D9D9] overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#C69C6D_1px,transparent_1px)] [background-size:28px_28px] opacity-20 pointer-events-none" />
          <Container className="relative z-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-mono text-[#6B6F73] mb-4">
              <Link href="/" className="hover:text-[#242424] transition">HOME</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-[#9E7444] font-semibold">HSE & QUALITY</span>
            </div>

            <div className="max-w-3xl space-y-4">
              <span className="text-xs font-mono text-amber-500 font-bold uppercase tracking-wider text-[#9E7444]">
                SAFETY, SUSTAINABILITY & GOVERNANCE
              </span>
              <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-[#242424] tracking-tight">
                Health, Safety, Environment & Quality Management
              </h1>
              <p className="text-base sm:text-lg text-[#4A4D50] leading-relaxed">
                Pipeline construction is an intrinsically high-risk industrial endeavor. Our operations are governed by an institutionalized Zero Harm philosophy and integrated ISO management systems.
              </p>
            </div>

            {/* Metrics */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#D9D9D9]">
              <div>
                <div className="font-mono text-3xl font-extrabold text-emerald-700">{safeHours}</div>
                <div className="text-xs text-[#242424] mt-0.5 font-semibold">Safe Man-Hours (LTI Free)</div>
              </div>
              <div>
                <div className="font-mono text-3xl font-extrabold text-[#9E7444]">{ltifr}</div>
                <div className="text-xs text-[#242424] mt-0.5 font-semibold">Lost Time Injury Rate</div>
              </div>
              <div>
                <div className="font-mono text-3xl font-extrabold text-cyan-800">{envRest}</div>
                <div className="text-xs text-[#242424] mt-0.5 font-semibold">Agricultural Land Restored</div>
              </div>
              <div>
                <div className="font-mono text-3xl font-extrabold text-emerald-700">{goldenRules}</div>
                <div className="text-xs text-[#242424] mt-0.5 font-semibold">Golden Safety Rules</div>
              </div>
            </div>
          </Container>
        </section>

        {/* ── 4 Major Sections: Health, Safety, Environment, Quality ── */}
        <section className="py-20 border-b border-[#D9D9D9]">
          <Container>
            <div className="space-y-16">
              
              {/* 1. Health */}
              <div id="health" className="bg-white border border-[#D9D9D9] rounded-2xl p-8 sm:p-12 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-red-700">
                    <HeartPulse className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-red-700 font-bold uppercase tracking-widest">
                      PILLAR 01
                    </span>
                    <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#242424]">
                      Occupational Health & Worker Welfare
                    </h2>
                  </div>
                </div>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <p className="text-sm text-[#4A4D50] leading-relaxed">
                    We recognize that our field personnel operate in demanding climates—from blistering 50°C Rajasthan desert summers to dense monsoon river basins. Our comprehensive health management system protects workforce well-being through proactive medical surveillance.
                  </p>
                  <div className="bg-[#F8F4EC] border border-[#D9D9D9] p-5 rounded-xl space-y-2 text-xs text-[#242424]">
                    <div className="font-mono text-[#242424] font-bold uppercase">KEY HEALTH STANDARDS:</div>
                    <ul className="space-y-1.5 text-[#6B6F73]">
                      <li>• 24/7 on-site medical dispensaries & mobile ambulances at each spread</li>
                      <li>• Heat-stress prevention protocols: shaded rest stations & electrolyte supply</li>
                      <li>• Ergonomic lifting training and automated pipe handling lifters</li>
                      <li>• High hygiene standards for catering, potable drinking water, and field camps</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 2. Safety */}
              <div id="safety" className="bg-white border border-[#D9D9D9] rounded-2xl p-8 sm:p-12 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#F8F4EC] border border-[#C69C6D]/40 flex items-center justify-center text-[#9E7444]">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#9E7444] font-bold uppercase tracking-widest">
                      PILLAR 02
                    </span>
                    <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#242424]">
                      Industrial Safety & Hazard Control
                    </h2>
                  </div>
                </div>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <p className="text-sm text-[#4A4D50] leading-relaxed">
                    Every task on our pipeline Right-of-Way is analyzed for risk before work commences. Our Permit-to-Work (PTW) system ensures that high-risk activities such as deep ditch trenching, controlled blasting, heavy sideboom tandem lifts, and hydrostatic pressurization are strictly supervised.
                  </p>
                  <div className="bg-[#F8F4EC] border border-[#D9D9D9] p-5 rounded-xl space-y-2 text-xs text-[#242424]">
                    <div className="font-mono text-[#242424] font-bold uppercase">MANDATORY SAFETY PROTOCOLS:</div>
                    <ul className="space-y-1.5 text-[#6B6F73]">
                      <li>• Daily morning toolbox talks (TBT) before any equipment ignition</li>
                      <li>• Strict dynamic Job Safety Analysis (JSA) for non-routine operations</li>
                      <li>• Trench collapse shoring and continuous barricading along public roads</li>
                      <li>• 100% certified PPE: flame-retardant coveralls, safety harnesses & steel toes</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 3. Environment */}
              <div id="environment" className="bg-white border border-[#D9D9D9] rounded-2xl p-8 sm:p-12 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                    <TreePine className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-emerald-700 font-bold uppercase tracking-widest">
                      PILLAR 03
                    </span>
                    <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#242424]">
                      Environmental Stewardship & Land Restoration
                    </h2>
                  </div>
                </div>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <p className="text-sm text-[#4A4D50] leading-relaxed">
                    Our ecological objective is straightforward: leave the construction corridor in better condition than we found it. We practice rigorous topsoil segregation, preserving the fertile organic horizon, and reinstating natural surface drainage patterns.
                  </p>
                  <div className="bg-[#F8F4EC] border border-[#D9D9D9] p-5 rounded-xl space-y-2 text-xs text-[#242424]">
                    <div className="font-mono text-[#242424] font-bold uppercase">ENVIRONMENTAL SAFEGUARDS:</div>
                    <ul className="space-y-1.5 text-[#6B6F73]">
                      <li>• Top 300mm agricultural topsoil stripped and stockpiled separately</li>
                      <li>• Non-disruptive HDD technology avoiding riverbed and aquatic habitat disturbance</li>
                      <li>• Closed-loop hydrotest water filtration and neutralization prior to release</li>
                      <li>• Trench fauna escape ramps ensuring local wildlife safety</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 4. Quality Management */}
              <div id="quality" className="bg-white border border-[#D9D9D9] rounded-2xl p-8 sm:p-12 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#F8F4EC] border border-[#D9D9D9] flex items-center justify-center text-[#9E7444]">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#9E7444] font-bold uppercase tracking-widest">
                      PILLAR 04
                    </span>
                    <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#242424]">
                      Quality Assurance & Testing Documentation
                    </h2>
                  </div>
                </div>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <p className="text-sm text-[#4A4D50] leading-relaxed">
                    We maintain total traceability for every pipe joint, welding consumable, and test certificate. Our Quality Control regime incorporates hold points witnessed by third-party inspection agencies (TPIA) including DNV, TÜV, EIL, and Lloyd's Register.
                  </p>
                  <div className="bg-[#F8F4EC] border border-[#D9D9D9] p-5 rounded-xl space-y-2 text-xs text-[#242424]">
                    <div className="font-mono text-[#242424] font-bold uppercase">QA/QC REGIMES:</div>
                    <ul className="space-y-1.5 text-[#6B6F73]">
                      <li>• 100% girth weld non-destructive examination (PAUT / AUT / Radiography)</li>
                      <li>• 25 kV high-voltage holiday spark testing on all field joint coatings</li>
                      <li>• Calibrated electronic deadweight testers for 24-hour hydrotest holds</li>
                      <li>• Complete digital as-built dossier handed over to client engineering teams</li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          </Container>
        </section>

        {/* ── Certifications Wall ── */}
        <section id="certifications" className="py-20 bg-[#F3EFE7] border-b border-[#D9D9D9]">
          <Container>
            <SectionHeading
              eyebrow="ACCREDITATIONS"
              title="Audited ISO Integrated Management Systems"
              description="Independently audited and certified by international conformity assessment bodies."
            />

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {certifications.map((c) => (
                <div
                  key={c.code}
                  className="bg-white border border-[#D9D9D9] p-8 rounded-2xl space-y-4 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-[#9E7444] text-lg">
                      {c.code}
                    </span>
                    <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
                      {c.badge}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-xl text-[#242424]">
                    {c.title}
                  </h3>
                  <p className="text-xs text-[#5A5E62] leading-relaxed">
                    {c.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
