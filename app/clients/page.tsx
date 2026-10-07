import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { clients as fallbackClients } from "@/data/site";
import { query } from "@/lib/db";
import { ArrowRight, ChevronRight } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Clients & Prequalifications | CandelaConstruction Private Limited",
  description: "Trusted by India's premier public and private energy corporations: GAIL, IOCL, ONGC, Adani Total Gas, Torrent Gas, GSPL, BPCL, and HPCL — Trust delivered.",
};

export default async function ClientsPage() {
  let clientList: any[] = [];
  try {
    const rows = await query("SELECT * FROM clients ORDER BY name ASC;");
    if (rows ) {
      clientList = rows;
    }
  } catch (err) {
    console.error("Failed to load clients in ClientsPage:", err);
  }

  if (clientList.length === 0) {
    clientList = fallbackClients;
  }

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
              <span className="text-[#9E7444] font-semibold">CLIENTS</span>
            </div>

            <div className="max-w-3xl space-y-4">
              <span className="text-xs font-mono text-[#9E7444] font-bold uppercase tracking-wider">
                TIER-1 ENERGY ACCREDITATIONS
              </span>
              <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-[#242424] tracking-tight">
                Trusted by National Energy & Infrastructure Leaders
              </h1>
              <p className="text-base sm:text-lg text-[#4A4D50] leading-relaxed">
                We have earned repeat contract awards from India's largest public sector utilities and private concessionaires by delivering uncompromised quality on high-pressure pipeline assets.
              </p>
            </div>
          </Container>
        </section>

        {/* ── Clients Directory ── */}
        <section className="py-20 border-b border-[#D9D9D9]">
          <Container>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {clientList.map((c: any) => {
                const logoText = c.code || c.logoText || c.name.slice(0, 5).toUpperCase();
                return (
                  <div
                    key={c.id || c.name}
                    className="bg-white border border-[#D9D9D9] hover:border-[#C69C6D] p-8 rounded-2xl flex flex-col justify-between transition group shadow-sm hover:shadow-lg"
                  >
                    <div>
                      <div className="text-3xl font-heading font-black text-[#242424] group-hover:text-[#9E7444] transition-colors">
                        {logoText}
                      </div>
                      <h3 className="font-heading font-bold text-base text-[#242424] mt-4 leading-snug">
                        {c.name}
                      </h3>
                    <div className="text-xs font-mono text-[#9E7444] mt-1 font-semibold">
                      {c.sector}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#D9D9D9] flex items-center justify-between text-[11px] font-mono text-[#6B6F73]">
                    <span>STATUS:</span>
                    <span className="text-emerald-700 font-bold">APPROVED EPC VENDOR</span>
                  </div>
                </div>
              );
            })}
            </div>
          </Container>
        </section>

        {/* ── Sectors & Prequalifications ── */}
        <section className="py-20 bg-[#F3EFE7] border-b border-[#D9D9D9]">
          <Container>
            <SectionHeading
              eyebrow="SECTORS SERVED"
              title="Infrastructure Verticals Under Our EPC Purview"
              description="Deploying specialized pipeline equipment across distinct energy and industrial domains."
            />

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <div className="bg-white border border-[#D9D9D9] p-6 rounded-xl space-y-3 shadow-sm hover:shadow-md transition">
                <span className="text-xs font-mono text-[#9E7444] font-bold uppercase">SECTOR 01</span>
                <h3 className="font-heading font-bold text-xl text-[#242424]">
                  Natural Gas Transmission Trunklines
                </h3>
                <p className="text-xs text-[#4A4D50] leading-relaxed">
                  Heavy-wall large-diameter steel pipelines (up to 48" OD) operating at 90 to 120 bar transporting gas across interstate corridors to fertilizer, power, and regional distribution grids.
                </p>
              </div>

              <div className="bg-white border border-[#D9D9D9] p-6 rounded-xl space-y-3 shadow-sm hover:shadow-md transition">
                <span className="text-xs font-mono text-cyan-800 font-bold uppercase">SECTOR 02</span>
                <h3 className="font-heading font-bold text-xl text-[#242424]">
                  City Gas Distribution (CGD) Networks
                </h3>
                <p className="text-xs text-[#4A4D50] leading-relaxed">
                  Urban steel trunk headers and extensive MDPE PE-100 electrofusion networks supplying clean piped natural gas (PNG) to domestic kitchens and compressed natural gas (CNG) to transport fleets.
                </p>
              </div>

              <div className="bg-white border border-[#D9D9D9] p-6 rounded-xl space-y-3 shadow-sm hover:shadow-md transition">
                <span className="text-xs font-mono text-emerald-700 font-bold uppercase">SECTOR 03</span>
                <h3 className="font-heading font-bold text-xl text-[#242424]">
                  Refinery & Industrial Piping Tie-Ins
                </h3>
                <p className="text-xs text-[#4A4D50] leading-relaxed">
                  High-pressure gas delivery lines, scraper receiver stations, and interconnecting manifolds executed inside operating petroleum refinery blast zones under strict SIMOPS safety regimes.
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/contact#rfq"
                className="inline-flex items-center gap-2 bg-[#C69C6D] hover:bg-[#B08554] text-[#242424] font-bold px-8 py-3.5 rounded-xl text-sm transition shadow-sm shadow-[#C69C6D]/20 active:scale-95"
              >
                <span>Request Commercial Prequalification Dossier</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
