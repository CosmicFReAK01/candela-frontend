import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { CareersSection } from "@/components/CareersSection";
import { ChevronRight, ShieldCheck, Award, Users, HeartHandshake } from "lucide-react";

export const metadata: Metadata = {
  title: "Careers & Talent Portal | CandelaConstruction Private Limited — Trust delivered.",
  description: "Join India's premier pipeline EPC contractor. Current job openings for Pipeline Engineers, Construction Managers, NDT Level-III Inspectors, and HDD Rig Pilots — Trust delivered.",
};

export default function CareersPage() {
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
              <span className="text-[#9E7444] font-semibold">CAREERS</span>
            </div>

            <div className="max-w-3xl space-y-4">
              <span className="text-xs font-mono text-[#9E7444] font-bold uppercase tracking-wider">
                TALENT & FIELD LEADERSHIP
              </span>
              <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-[#242424] tracking-tight">
                Build Your Engineering Career With Us
              </h1>
              <p className="text-base sm:text-lg text-[#4A4D50] leading-relaxed">
                Work on nation-building pipeline transmission projects across India. We offer technical mentorship, advanced safety training, and rapid field leadership opportunities.
              </p>
            </div>

            {/* Culture Pillars */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#D9D9D9] text-xs font-mono">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span className="text-[#242424] font-semibold">Zero Harm Work Culture</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#9E7444] shrink-0" />
                <span className="text-[#242424] font-semibold">ASME / API Training</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-cyan-800 shrink-0" />
                <span className="text-[#242424] font-semibold">Cross-Functional Teams</span>
              </div>
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-emerald-700 shrink-0" />
                <span className="text-[#242424] font-semibold">Comprehensive Health</span>
              </div>
            </div>
          </Container>
        </section>

        {/* ── Active Careers Component ── */}
        <CareersSection />

        {/* ── Why Work at CandelaConstruction ── */}
        <section className="py-20 bg-[#F8F4EC] border-b border-[#D9D9D9]">
          <Container>
            <SectionHeading
              eyebrow="LIFE AT CANDELACONSTRUCTION"
              title="A Culture Founded on Meritocracy, Technical Rigor & Safety"
              description="Our people are our greatest strength. We provide an environment where engineers tackle unprecedented geological and engineering challenges with world-class machinery."
            />

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <div className="bg-white border border-[#D9D9D9] p-6 rounded-xl space-y-3 shadow-sm hover:shadow-md transition">
                <div className="text-[#9E7444] font-mono font-bold text-xs uppercase">ADVANCEMENT</div>
                <h3 className="font-heading font-bold text-lg text-[#242424]">
                  Clear Technical Progression Paths
                </h3>
                <p className="text-xs text-[#4A4D50] leading-relaxed">
                  From graduate trainee engineer to spread manager and project director. We promote based on safety adherence, technical problem-solving, and schedule execution.
                </p>
              </div>

              <div className="bg-white border border-[#D9D9D9] p-6 rounded-xl space-y-3 shadow-sm hover:shadow-md transition">
                <div className="text-cyan-800 font-mono font-bold text-xs uppercase">TRAINING</div>
                <h3 className="font-heading font-bold text-lg text-[#242424]">
                  Continuous Professional Accreditation
                </h3>
                <p className="text-xs text-[#4A4D50] leading-relaxed">
                  Sponsorship for ASNT Level-II/III certifications, CSWIP / AWS welding inspection credentials, and NEBOSH international safety certifications.
                </p>
              </div>

              <div className="bg-white border border-[#D9D9D9] p-6 rounded-xl space-y-3 shadow-sm hover:shadow-md transition">
                <div className="text-emerald-700 font-mono font-bold text-xs uppercase">WELFARE</div>
                <h3 className="font-heading font-bold text-lg text-[#242424]">
                  First-Class Base Camp Living
                </h3>
                <p className="text-xs text-[#4A4D50] leading-relaxed">
                  Air-conditioned accommodations, on-site catering, recreational facilities, and comprehensive family health and life insurance for all site personnel.
                </p>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
