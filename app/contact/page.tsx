import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/Container";
import { RFQForm } from "@/components/RFQForm";
import { query } from "@/lib/db";
import { ChevronRight, PhoneCall, Mail, Building2, MapPin } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact & Tender Enquiry | CandelaConstruction Private Limited — Trust delivered.",
  description: "Contact our registered office and regional bases across Chapra (Saran), Muzaffarpur, Vaishali, and Samastipur, or submit an EPC tender enquiry/RFQ directly.",
};

const defaultRegionalBases = [
  { name: "Saran (Chapra) Spread Base & Pipe Yard", address: "Marhaura Industrial Corridor, Chapra 841301", type: "Spread Base" },
  { name: "Muzaffarpur Operations Center", address: "Bela Industrial Area, Phase-II, Muzaffarpur 842005", type: "Operations Center" },
  { name: "Vaishali (Hajipur) Terminal Division", address: "Hajipur Industrial Area, Hajipur 844102", type: "Terminal Division" },
  { name: "Samastipur Field Camp & CGS Hub", address: "Mohanpur Road Corridor, Samastipur 848101", type: "Field Camp & CGS" },
];

export default async function ContactPage() {
  let settings: any = {
    control_room_hotline: "1800-180-9999",
    contact_email: "tenders@candelaconstruction.com",
    emergency_phone: "+91 1800-180-9999",
    office_address: "Candela House, Energy Corridor Complex, North Bihar Regional Base, India",
    regional_bases: defaultRegionalBases,
  };

  try {
    const rows = await query("SELECT * FROM site_settings WHERE id = 'default'");
    if (rows && rows.length > 0) {
      settings = {
        ...settings,
        ...rows[0],
        regional_bases: rows[0].regional_bases || defaultRegionalBases,
      };
    }
  } catch (err) {
    console.error("Failed to load settings in ContactPage:", err);
  }

  const regionalBases = Array.isArray(settings.regional_bases) && settings.regional_bases.length > 0
    ? settings.regional_bases
    : defaultRegionalBases;

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
              <span className="text-[#9E7444] font-semibold">CONTACT & TENDERS</span>
            </div>

            <div className="max-w-3xl space-y-4">
              <span className="text-xs font-mono text-[#9E7444] font-bold uppercase tracking-wider">
                COMMERCIAL, REGIONAL & EMERGENCY CHANNELS
              </span>
              <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-[#242424] tracking-tight">
                Connect With Our Engineering & Tendering Divisions
              </h1>
              <p className="text-base sm:text-lg text-[#4A4D50] leading-relaxed">
                Direct contact points for EPC tender submissions, vendor prequalification, emergency pipeline control room dispatch, and regional office hubs.
              </p>
            </div>
          </Container>
        </section>

        {/* ── Contact Details & RFQ Form ── */}
        <section className="py-20 border-b border-[#D9D9D9]">
          <Container>
            <div className="grid gap-12 lg:grid-cols-12 items-start">
              
              {/* Left Column: Office Locations & Channels */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* 24x7 Emergency Box */}
                <div className="bg-red-50 border border-red-200 rounded-2xl p-6 space-y-3 shadow-sm">
                  <div className="flex items-center gap-2 text-red-700 text-xs font-mono font-bold">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600" />
                    </span>
                    24x7 PIPELINE CONTROL ROOM HOTLINE
                  </div>
                  <a
                    href={`tel:${settings.control_room_hotline?.replace(/[^0-9]/g, "") || "18001809999"}`}
                    className="block text-[#242424] font-mono font-bold text-3xl tracking-wider hover:text-red-700 transition"
                  >
                    {settings.control_room_hotline || "1800-180-9999"}
                  </a>
                  <p className="text-xs text-[#5A5E62] leading-relaxed">
                    Toll-free 24-hour hotline for emergency pipeline leak reporting, encroachment alerts, and immediate technical response dispatch.
                  </p>
                </div>

                {/* Corporate Head Office */}
                <div className="bg-white border border-[#D9D9D9] rounded-2xl p-6 space-y-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#F8F4EC] border border-[#D9D9D9] flex items-center justify-center text-[#9E7444]">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono font-bold text-[#9E7444] uppercase">
                        HEADQUARTERS
                      </div>
                      <h3 className="font-heading font-bold text-lg text-[#242424]">
                        {settings.company_name || "CandelaConstruction Registered Office"}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-[#4A4D50] leading-relaxed">
                    {settings.office_address || "Candela House, Energy Corridor Complex, North Bihar Regional Base, India"}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-[#D9D9D9] text-xs font-mono text-[#242424]">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-[#9E7444]" />
                      <span>{settings.contact_email || "tenders@candelaconstruction.com"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <PhoneCall className="w-3.5 h-3.5 text-cyan-800" />
                      <span>{settings.emergency_phone || "+91 1800-180-9999"} (Toll Free)</span>
                    </div>
                  </div>
                </div>

                {/* Regional Project Hubs */}
                <div className="bg-white border border-[#D9D9D9] rounded-2xl p-6 space-y-4 shadow-sm">
                  <div className="text-xs font-mono font-bold text-[#787B7E] uppercase tracking-wider flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#9E7444]" />
                    <span>REGIONAL SPREAD BASES (NORTH BIHAR CORRIDOR)</span>
                  </div>

                  <div className="space-y-3 text-xs">
                    {regionalBases.map((b: any, i: number) => {
                      const title = b.baseName || b.name || `Regional Base #${i + 1}`;
                      const badge = b.status || b.type;
                      return (
                        <div key={i} className="p-3 bg-[#F8F4EC] rounded-lg border border-[#D9D9D9] space-y-1">
                          <div className="flex items-center justify-between gap-2">
                            <div className="font-bold text-[#242424]">{title}</div>
                            {badge && (
                              <span className="text-[10px] font-mono font-bold text-[#9E7444] bg-white px-2 py-0.5 rounded border border-[#D9D9D9] shrink-0">
                                {badge}
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-[#6B6F73] font-mono">
                            {b.address}
                          </div>
                          {(b.coordinator || b.phone) && (
                            <div className="text-[10px] text-[#9E7444] font-mono flex items-center gap-2 pt-0.5">
                              {b.coordinator && <span>In-Charge: {b.coordinator}</span>}
                              {b.phone && <span>· {b.phone}</span>}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Careers Contact Card */}
                <div className="bg-white border border-[#D9D9D9] rounded-xl p-5 text-xs font-mono text-[#242424] flex items-center justify-between shadow-sm">
                  <div>
                    <div className="text-[#6B6F73]">CAREERS & RECRUITMENT</div>
                    <div className="text-[#242424] font-bold mt-0.5">careers@candelaconstruction.com</div>
                  </div>
                  <Link
                    href="/careers"
                    className="text-[#9E7444] hover:underline font-bold"
                  >
                    View Openings →
                  </Link>
                </div>

              </div>

              {/* Right Column: RFQ Form */}
              <div className="lg:col-span-7">
                <RFQForm />
              </div>

            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
