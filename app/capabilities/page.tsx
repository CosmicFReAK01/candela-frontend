import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { fleetEquipment as fallbackFleet } from "@/data/site";
import { query } from "@/lib/db";
import { ArrowRight, ChevronRight, Wrench, ShieldCheck, CheckCircle2 } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Engineering Capabilities & Equipment Fleet | CandelaConstruction Private Limited",
  description: "Company-owned heavy pipeline construction equipment, automatic dual-torch welding systems, 350-ton HDD rigs, certified manpower, and execution methodology — Trust delivered.",
};

export default async function CapabilitiesPage() {
  let fleetList: any[] = [];
  try {
    const rows = await query("SELECT * FROM equipment ORDER BY name ASC;");
    if (rows ) {
      fleetList = rows;
    }
  } catch (err) {
    console.error("Failed to load equipment from DB:", err);
  }

  if (fleetList.length === 0) {
    fleetList = fallbackFleet;
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
              <span className="text-[#9E7444] font-semibold">CAPABILITIES</span>
            </div>

            <div className="max-w-3xl space-y-4">
              <span className="text-xs font-mono text-[#9E7444] font-bold uppercase tracking-wider">
                OWNED MACHINERY FLEET & ASSET REGISTER
              </span>
              <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-[#242424] tracking-tight">
                Industrial Muscle & High-Tech Execution Fleet
              </h1>
              <p className="text-base sm:text-lg text-[#4A4D50] leading-relaxed">
                By investing in 100% company-owned heavy equipment spreads and certified in-house engineering specialists, we eliminate third-party mobilization delays.
              </p>
            </div>
          </Container>
        </section>

        {/* ── Equipment Fleet Section ── */}
        <section id="equipment" className="py-20 border-b border-[#D9D9D9]">
          <Container>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <SectionHeading
                eyebrow="OWNED MACHINERY FLEET"
                title="Mechanized Spreads for Pipe Diameters up to 48 Inches"
                description="Our heavy asset register includes premier global manufacturers (Caterpillar, Vermeer, Herrenknecht, CRC-Evans) maintained to OEM standards."
              />
              <div className="text-xs font-mono text-[#6B6F73] bg-white border border-[#D9D9D9] px-3.5 py-2 rounded-xl shadow-xs shrink-0">
                Total Inventory: <strong className="text-[#242424]">{fleetList.length} Active Heavy Assets</strong>
              </div>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {fleetList.map((eq: any) => {
                const category = eq.category || "Heavy Machinery";
                const quantity = eq.units || eq.quantity || "1 Unit";
                const specs = eq.specs || eq.make || "";
                return (
                  <div
                    key={eq.name}
                    className="bg-white border border-[#D9D9D9] hover:border-[#C69C6D] rounded-xl p-6 flex flex-col justify-between transition group shadow-sm hover:shadow-md"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-[#9E7444] bg-[#C69C6D]/15 px-2.5 py-0.5 rounded border border-[#C69C6D]/30 uppercase font-bold">
                          {category}
                        </span>
                        <span className="text-xs font-mono font-bold text-[#242424] bg-[#F8F4EC] px-2 py-0.5 rounded border border-[#D9D9D9]">
                          {quantity}
                        </span>
                      </div>

                      <h3 className="font-heading font-bold text-base text-[#242424] mt-4 leading-snug group-hover:text-[#9E7444] transition-colors">
                        {eq.name}
                      </h3>

                      <p className="text-xs text-[#5A5E62] mt-2">
                        {eq.application}
                      </p>

                      {specs && (
                        <div className="mt-4 p-3 bg-[#F8F4EC] rounded-lg border border-[#D9D9D9] text-[11px] font-mono text-[#242424]">
                          {specs}
                        </div>
                      )}
                    </div>

                    <div className="mt-5 pt-3 border-t border-[#D9D9D9] flex items-center justify-between text-xs font-mono">
                      <span className="text-[#6B6F73]">CAPACITY:</span>
                      <span className="font-bold text-[#9E7444]">{eq.capacity}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-16 text-center pt-8 border-t border-[#D9D9D9]">
              <Link
                href="/contact#rfq"
                className="inline-flex items-center gap-2 bg-[#C69C6D] hover:bg-[#B08554] text-[#242424] font-bold px-8 py-3.5 rounded-xl text-sm transition shadow-sm shadow-[#C69C6D]/20 active:scale-95"
              >
                <span>Request Equipment Mobilization / Tender Bid</span>
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
