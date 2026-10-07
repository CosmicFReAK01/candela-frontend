import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { leadershipTeam as fallbackLeadership, whyChooseUsPillars as fallbackWhyChooseUs, stats } from "@/data/site";
import { fetchStats } from "@/lib/api";
import { query } from "@/lib/db";
import { Award, ArrowRight, CheckCircle2, ChevronRight, ShieldCheck } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About Us | CandelaConstruction Private Limited — Trust delivered.",
  description: "Company overview, executive leadership, vision, and core engineering philosophy behind CandelaConstruction Private Limited.",
};

export default async function AboutPage() {
  const dbStats = await fetchStats();
  const displayStats = dbStats ? [
    { value: dbStats.totalKmConstructed || stats[0].value, label: stats[0].label },
    { value: dbStats.hddCrossingsRecord ? `${dbStats.hddCrossingsRecord}` : stats[1].value, label: stats[1].label },
    { value: dbStats.safeManHoursMillions || stats[2].value, label: stats[2].label },
    { value: dbStats.activeSpreads || stats[3].value, label: stats[3].label },
  ] : stats;

  let aboutContent: any = null;
  let leadershipFromDb: any[] | null = null;
  try {
    const rows = await query("SELECT about_content FROM site_settings WHERE id = 'default'");
    if (rows  && rows[0].about_content) {
      aboutContent = rows[0].about_content;
    }
    const leaderRows = await query("SELECT * FROM executive_leadership ORDER BY display_order ASC, id ASC;");
    if (leaderRows ) {
      leadershipFromDb = leaderRows;
    }
  } catch (err) {
    console.error("Failed to load about_content or executive_leadership:", err);
  }

  // Heritage defaults
  const heritage = aboutContent?.heritage || {
    eyebrow: "OUR HERITAGE",
    title: "Three Decades of Engineering Excellence",
    paragraphs: [
      "Founded in 1994, CandelaConstruction Private Limited began as a specialized pipeline engineering consultancy and has grown into a premier pan-India EPC contractor capable of mobilizing multiple heavy mechanized spreads simultaneously.",
      "We have successfully constructed and charged over 3,850 kilometers of transmission pipelines operating up to ANSI Class 900 pressure ratings (120 Bar). Our company-owned equipment fleet includes 350-ton Vermeer HDD rigs, Caterpillar 587T sidebooms, and CRC-Evans automatic dual-torch welding systems."
    ],
    stats: [
      { metric: "100%", label: "Asset Ownership", sub: "No third-party rig dependency" },
      { metric: "Zero Failure", label: "Hydrotesting Record", sub: "100% first-time pressure pass" }
    ]
  };

  // Pillars defaults
  const pillars = Array.isArray(aboutContent?.pillars) && aboutContent.pillars.length > 0 ? aboutContent.pillars : [
    {
      title: "Turnkey EPC Execution",
      desc: "End-to-end delivery from route cadastral survey and design to hydrostatic commissioning and nitrogen inerting."
    },
    {
      title: "Complex Terrain Capability",
      desc: "Proven mastery over basalt hard rock Deccan plateaus, tidal river estuaries, desert sands, and congested urban zones."
    },
    {
      title: "Strict Code Compliance",
      desc: "Execution strictly governed by ASME B31.8, API 1104, PNGRB T4S, and OISD-141 regulations."
    }
  ];

  // Vision & Mission defaults
  const vision = aboutContent?.vision || {
    title: "To Be India's Most Trusted Energy Infrastructure Partner",
    desc: "We aspire to engineer, construct, and safeguard the pipelines that deliver clean natural gas and vital hydrocarbons to every industrial corridor, power generation plant, and domestic household in the nation with zero harm to human life and the natural environment."
  };

  const mission = aboutContent?.mission || {
    title: "Precision Engineering, Zero Rework, Absolute Safety",
    desc: "To deploy industry-leading trenchless technology, automated welding systems, and digital quality oversight to execute high-pressure pipelines ahead of client schedules, while setting the benchmark for environmental restoration and worker health."
  };

  // Executive Governance & Leadership defaults
  const governance = aboutContent?.governance || {
    eyebrow: "EXECUTIVE GOVERNANCE",
    title: "Seasoned Leadership & Corporate Governance Council",
    desc: "Our board of directors and technical steering committee enforce rigorous fiduciary accountability, statutory code compliance, and environmental stewardship across all pan-India operations.",
    framework: [
      {
        code: "GOV-01",
        title: "Statutory & Technical Compliance Charter",
        desc: "Full adherence to PNGRB T4S, ASME B31.8, API 1104, and OISD-141 regulations overseen directly by dedicated Quality Committees."
      },
      {
        code: "GOV-02",
        title: "Board-Mandated Stop-Work Authority",
        desc: "Every engineer, contractor, and welder holds immediate, penalty-free authority to halt operations if safety or environmental standards are breached."
      },
      {
        code: "GOV-03",
        title: "Independent Third-Party Quality Audits",
        desc: "Engagement of accredited inspection agencies (TUV, DNV, Lloyd's Register, EIL) for mandatory pre-weld, NDT, and hydrotest validations."
      },
      {
        code: "GOV-04",
        title: "Anti-Bribery, Ethics & Transparent Procurement",
        desc: "Zero-tolerance anti-corruption policy with end-to-end digital audit trails for public sector and private operator tender submissions."
      }
    ]
  };

  const governanceFramework = Array.isArray(governance.framework) && governance.framework.length > 0
    ? governance.framework
    : [
        {
          code: "GOV-01",
          title: "Statutory & Technical Compliance Charter",
          desc: "Full adherence to PNGRB T4S, ASME B31.8, API 1104, and OISD-141 regulations overseen directly by dedicated Quality Committees."
        },
        {
          code: "GOV-02",
          title: "Board-Mandated Stop-Work Authority",
          desc: "Every engineer, contractor, and welder holds immediate, penalty-free authority to halt operations if safety or environmental standards are breached."
        },
        {
          code: "GOV-03",
          title: "Independent Third-Party Quality Audits",
          desc: "Engagement of accredited inspection agencies (TUV, DNV, Lloyd's Register, EIL) for mandatory pre-weld, NDT, and hydrotest validations."
        },
        {
          code: "GOV-04",
          title: "Anti-Bribery, Ethics & Transparent Procurement",
          desc: "Zero-tolerance anti-corruption policy with end-to-end digital audit trails for public sector and private operator tender submissions."
        }
      ];

  const leadershipList = Array.isArray(aboutContent?.leadership)
    ? aboutContent.leadership
    : (leadershipFromDb || fallbackLeadership);

  // Why Choose Us defaults
  const whyUsList = Array.isArray(aboutContent?.whyChooseUs) && aboutContent.whyChooseUs.length > 0
    ? aboutContent.whyChooseUs
    : fallbackWhyChooseUs;

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
              <span className="text-[#9E7444] font-semibold">ABOUT US</span>
            </div>

            <div className="max-w-3xl space-y-4">
              <span className="text-xs font-mono text-[#9E7444] font-bold uppercase tracking-wider">
                CORPORATE PROFILE & GOVERNANCE
              </span>
              <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-[#242424] tracking-tight">
                Pioneering Engineering Behind India's Energy Arteries
              </h1>
              <p className="text-base sm:text-lg text-[#4A4D50] leading-relaxed">
                Over three decades of specialized execution in high-pressure cross-country transmission trunklines, trenchless river HDD crossings, and city gas distribution networks.
              </p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-[#D9D9D9]">
              {displayStats.map((s) => (
                <div key={s.label}>
                  <div className="font-mono text-2xl sm:text-3xl font-bold text-[#9E7444]">{s.value}</div>
                  <div className="text-xs text-[#242424] font-semibold mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* ── Section 1: Company Overview & Heritage ── */}
        <section className="py-20 border-b border-[#D9D9D9]">
          <Container>
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <span className="text-xs font-mono font-bold text-[#9E7444] uppercase tracking-widest">
                    {heritage.eyebrow || "OUR HERITAGE"}
                  </span>
                  <h2 className="font-heading font-bold text-3xl text-[#242424] mt-1">
                    {heritage.title}
                  </h2>
                </div>
                {Array.isArray(heritage.paragraphs) ? (
                  heritage.paragraphs.map((p: string, idx: number) => (
                    <p key={idx} className={idx === 0 ? "text-sm sm:text-base text-[#4A4D50] leading-relaxed" : "text-sm text-[#6B6F73] leading-relaxed"}>
                      {p}
                    </p>
                  ))
                ) : (
                  <p className="text-sm sm:text-base text-[#4A4D50] leading-relaxed">{heritage.paragraphs}</p>
                )}

                {Array.isArray(heritage.stats) && (
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    {heritage.stats.map((st: any, i: number) => (
                      <div key={i} className="bg-white border border-[#D9D9D9] p-4 rounded-xl shadow-sm">
                        <div className={`font-mono font-bold text-xl ${i === 1 ? "text-emerald-700" : "text-[#9E7444]"}`}>
                          {st.metric}
                        </div>
                        <div className="text-xs text-[#242424] mt-0.5 font-bold">{st.label}</div>
                        <div className="text-[10px] text-[#6B6F73]">{st.sub}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="lg:col-span-6 bg-white border border-[#D9D9D9] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
                <div className="flex items-center justify-between pb-4 border-b border-[#D9D9D9]">
                  <span className="font-mono text-xs font-bold text-[#242424]">CORE OPERATIONAL PILLARS</span>
                  <span className="text-[11px] font-mono text-[#9E7444] font-bold">EPC CLASS-A</span>
                </div>

                <div className="space-y-4 text-xs text-[#4A4D50]">
                  {pillars.map((pil: any, i: number) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#9E7444] mt-0.5 shrink-0" />
                      <div>
                        <strong className="text-[#242424] block font-sans text-sm">{pil.title}</strong>
                        {pil.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* ── Section 2: Vision & Mission ── */}
        <section id="vision" className="py-20 bg-[#F3EFE7] border-b border-[#D9D9D9]">
          <Container>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white border border-[#D9D9D9] p-8 rounded-2xl space-y-4 shadow-sm">
                <span className="text-xs font-mono font-bold text-[#9E7444] uppercase tracking-wider">
                  OUR VISION
                </span>
                <h3 className="font-heading font-bold text-2xl text-[#242424]">
                  {vision.title}
                </h3>
                <p className="text-sm text-[#4A4D50] leading-relaxed">
                  {vision.desc}
                </p>
              </div>

              <div className="bg-white border border-[#D9D9D9] p-8 rounded-2xl space-y-4 shadow-sm">
                <span className="text-xs font-mono font-bold text-cyan-800 uppercase tracking-wider">
                  OUR MISSION
                </span>
                <h3 className="font-heading font-bold text-2xl text-[#242424]">
                  {mission.title}
                </h3>
                <p className="text-sm text-[#4A4D50] leading-relaxed">
                  {mission.desc}
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* ── Section 3: Executive Governance & Leadership Team ── */}
        <section id="leadership" className="py-20 border-b border-[#D9D9D9]">
          <Container>
            <SectionHeading
              eyebrow={governance.eyebrow || "EXECUTIVE GOVERNANCE"}
              title={governance.title || "Seasoned Leadership & Corporate Governance Council"}
              description={governance.desc || "Our board of directors and technical steering committee enforce rigorous fiduciary accountability, statutory code compliance, and environmental stewardship across all pan-India operations."}
            />

            {/* Corporate Governance Framework Grid */}
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {governanceFramework.map((g: any, idx: number) => (
                <div
                  key={idx}
                  className="bg-[#F8F4EC] border border-[#D9D9D9] hover:border-[#C69C6D] rounded-xl p-5 space-y-2.5 transition group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-[#9E7444] bg-[#C69C6D]/15 px-2 py-0.5 rounded border border-[#C69C6D]/30">
                      {g.code || `GOV-0${idx + 1}`}
                    </span>
                    <ShieldCheck className="w-4 h-4 text-[#9E7444] group-hover:scale-110 transition-transform" />
                  </div>
                  <h4 className="font-heading font-bold text-sm text-[#242424] leading-snug">
                    {g.title}
                  </h4>
                  <p className="text-xs text-[#4A4D50] leading-relaxed">
                    {g.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Board of Directors Sub-heading */}
            <div className="mt-16 pt-10 border-t border-[#D9D9D9]">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-xs font-mono font-bold text-[#9E7444] uppercase tracking-wider block">
                    GOVERNING COUNCIL
                  </span>
                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#242424]">
                    Board of Directors & Executive Leadership Team
                  </h3>
                </div>
                <span className="text-xs font-mono text-[#6B6F73] hidden sm:block">
                  {leadershipList.length} Technical & Operating Directors
                </span>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {leadershipList.map((leader: any) => (
                  <div
                    key={leader.name}
                    className="bg-white border border-[#D9D9D9] rounded-xl p-6 flex flex-col justify-between hover:border-[#C69C6D] transition group shadow-sm hover:shadow-md"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-full bg-[#F8F4EC] border border-[#D9D9D9] flex items-center justify-center font-heading font-bold text-[#9E7444] text-lg group-hover:bg-[#C69C6D] group-hover:text-white transition-colors">
                        {leader.name.split(" ")[0]?.[0] || ""}{leader.name.split(" ")[1]?.[0] || ""}
                      </div>

                      <h3 className="font-heading font-bold text-lg text-[#242424] mt-4 leading-snug">
                        {leader.name}
                      </h3>
                      <div className="text-xs font-mono text-[#9E7444] font-bold mt-0.5">
                        {leader.role}
                      </div>
                      <div className="text-[11px] font-mono text-[#6B6F73] mt-1">
                        {leader.experience}
                      </div>

                      <p className="text-xs text-[#4A4D50] mt-3 leading-relaxed">
                        {leader.background}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* ── Section 4: Why Choose Us (6 Pillars) ── */}
        <section id="why-us" className="py-20 bg-[#F3EFE7] border-b border-[#D9D9D9]">
          <Container>
            <SectionHeading
              eyebrow="MEASURABLE VALUE"
              title="Why Clients Choose CandelaConstruction for High-Consequence EPC"
              description="Measurable capabilities and our hallmark pledge — 'Trust delivered.' — ensuring projects are completed safely, on specification, and on schedule."
            />

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {whyUsList.map((p: any, i: number) => (
                <div
                  key={p.title || i}
                  className="bg-white border border-[#D9D9D9] p-6 rounded-xl space-y-3 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#9E7444] font-bold uppercase">
                      PILLAR 0{i + 1}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#242424] bg-[#F8F4EC] px-2 py-0.5 rounded border border-[#D9D9D9]">
                      {p.metric}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-lg text-[#242424]">
                    {p.title}
                  </h3>
                  <p className="text-xs text-[#4A4D50] leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* ── Section 5: Quality & HSE Statement ── */}
        <section id="quality" className="py-20 border-b border-[#D9D9D9]">
          <Container>
            <div className="bg-white border border-[#D9D9D9] rounded-2xl p-8 sm:p-12 shadow-xl max-w-4xl mx-auto space-y-6">
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-[#9E7444]" />
                <div>
                  <span className="text-xs font-mono font-bold text-[#9E7444] uppercase tracking-widest">
                    MANAGEMENT COMMITMENT
                  </span>
                  <h3 className="font-heading font-bold text-2xl text-[#242424]">
                    Corporate Quality & HSE Charter
                  </h3>
                </div>
              </div>

              <blockquote className="text-sm sm:text-base text-[#4A4D50] italic border-l-2 border-[#C69C6D] pl-4 py-1 leading-relaxed">
                "We hold that no pipeline project schedule or commercial objective can ever supersede the safety of human beings, the preservation of agricultural topsoil, or the structural integrity of pressurized hydrocarbon containment."
              </blockquote>

              <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-[#D9D9D9] text-xs font-mono text-[#6B6F73] font-semibold">
                <div>ISO 9001:2015 Quality</div>
                <div>ISO 14001:2015 Environment</div>
                <div>ISO 45001:2018 Safety</div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  href="/contact#rfq"
                  className="bg-[#C69C6D] hover:bg-[#B08554] text-[#242424] font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition flex items-center gap-2 shadow-sm"
                >
                  <span>Request Corporate Dossier / RFQ</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/projects"
                  className="bg-[#F8F4EC] hover:bg-[#EAE4D8] text-[#242424] font-semibold px-6 py-3 rounded-xl text-xs transition border border-[#D9D9D9]"
                >
                  Explore Project Portfolio
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
