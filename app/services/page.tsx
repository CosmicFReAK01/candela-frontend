import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/Container";
import { services } from "@/data/site";
import { fetchServices } from "@/lib/api";
import { ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Specialized Pipeline EPC Services | CandelaConstruction Private Limited",
  description: "End-to-end pipeline construction services: Cross-Country trunklines, City Gas Distribution (CGD), HDD river crossings, automatic welding, hydrotesting, and NDT inspection — Trust delivered.",
};

export default async function ServicesPage() {
  const servicesFromApi = await fetchServices();
  const serviceList = (servicesFromApi && Array.isArray(servicesFromApi) && servicesFromApi.length > 0
    ? servicesFromApi
    : services
  ).map((s: any) => {
    const staticMatch = services.find((item) => item.id === s.id || item.slug === s.slug);
    return {
      ...staticMatch,
      ...s,
      specifications: s.specifications || staticMatch?.specifications || [],
      bullets: s.bullets || staticMatch?.bullets || [],
    };
  });

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
              <span className="text-[#9E7444] font-semibold">SERVICES</span>
            </div>

            <div className="max-w-3xl space-y-4">
              <span className="text-xs font-mono text-[#9E7444] font-bold uppercase tracking-wider">
                COMPREHENSIVE EPC CAPABILITIES
              </span>
              <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-[#242424] tracking-tight">
                Specialized Pipeline Construction & Engineering Services
              </h1>
              <p className="text-base sm:text-lg text-[#4A4D50] leading-relaxed">
                Turnkey capabilities covering Front-End Engineering Design, Right-of-Way clearing, mechanized automatic welding, trenchless river crossings, hydrostatic testing, and safe pre-commissioning.
              </p>
            </div>

            {/* Quick Filter Jumps */}
            <div className="mt-8 flex flex-wrap gap-2 pt-6 border-t border-[#D9D9D9]">
              {serviceList.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="px-3 py-1.5 rounded-lg bg-white text-xs font-mono text-[#242424] border border-[#D9D9D9] hover:border-[#C69C6D] hover:text-[#9E7444] transition shadow-sm"
                >
                  {s.n} {s.title.split("(")[0]}
                </a>
              ))}
            </div>
          </Container>
        </section>

        {/* ── Detailed Services Catalog ── */}
        <section className="py-20">
          <Container>
            <div className="space-y-16">
              {serviceList.map((s) => (
                <div
                  key={s.id}
                  id={s.id}
                  className="bg-white border border-[#D9D9D9] rounded-2xl p-8 sm:p-12 shadow-xl scroll-mt-28"
                >
                  <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
                    
                    {/* Left Details */}
                    <div className="lg:col-span-7 space-y-6">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-3xl sm:text-4xl font-black text-[#9E7444]">
                          {s.n}
                        </span>
                        <div className="h-8 w-px bg-[#D9D9D9]" />
                        <div>
                          <span className="text-[10px] font-mono text-[#6B6F73] uppercase tracking-widest block font-semibold">
                            CORE EPC CAPABILITY
                          </span>
                          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#242424]">
                            {s.title}
                          </h2>
                        </div>
                      </div>

                      <p className="text-sm sm:text-base text-[#4A4D50] leading-relaxed">
                        {s.text}
                      </p>

                      {/* Key Scope Bullets */}
                      <div className="space-y-3">
                        <div className="text-xs font-mono text-[#9E7444] font-bold uppercase tracking-wider">
                          TECHNICAL SCOPE & EXECUTION METHODOLOGY:
                        </div>
                        <ul className="space-y-2 text-xs text-[#333333]">
                          {s.bullets.map((b: any, idx: number) => (
                            <li key={idx} className="flex items-start gap-2.5">
                              <CheckCircle2 className="w-4 h-4 text-[#9E7444] mt-0.5 shrink-0" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Subcategories */}
                      {s.subcategories && (
                        <div className="pt-2">
                          <div className="text-xs font-mono text-[#6B6F73] uppercase tracking-wider mb-2 font-semibold">
                            SPECIALIZED DOMAINS:
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {s.subcategories.map((sub: any) => (
                              <span
                                key={sub}
                                className="text-xs font-mono bg-[#F8F4EC] text-[#242424] px-3 py-1 rounded border border-[#D9D9D9]"
                              >
                                {sub}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right Specifications Table & CTA */}
                    <div className="lg:col-span-5 bg-[#F8F4EC] border border-[#D9D9D9] rounded-xl p-6 sm:p-8 space-y-6">
                      <div>
                        <span className="text-[10px] font-mono text-[#6B6F73] uppercase tracking-wider block font-semibold">
                          GOVERNING DESIGN STANDARDS
                        </span>
                        <div className="text-sm font-mono font-bold text-[#9E7444] mt-1">
                          {s.standard}
                        </div>
                      </div>

                      <div className="space-y-3 pt-3 border-t border-[#D9D9D9] text-xs">
                        <div className="text-[11px] font-mono text-[#6B6F73] uppercase tracking-wider font-semibold">
                          TECHNICAL PARAMETERS:
                        </div>
                        {s.specifications.map((spec: any) => (
                          <div key={spec.label} className="flex justify-between py-1.5 border-b border-[#EAE5DC]">
                            <span className="text-[#6B6F73]">{spec.label}</span>
                            <span className="font-mono font-semibold text-[#242424] text-right">{spec.value}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-4">
                        <Link
                          href={`/contact?service=${encodeURIComponent(s.title)}#rfq`}
                          className="w-full bg-[#C69C6D] hover:bg-[#B08554] text-[#242424] font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-sm active:scale-95"
                        >
                          <span>Request Quotation / RFQ</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>

                  </div>
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
