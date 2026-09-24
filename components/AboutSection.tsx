"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "./Container";
import { SectionHeading } from "./SectionHeading";
import { ArrowRight, CheckCircle2, Shield, HardHat, Award } from "lucide-react";

export function AboutSection({ content }: { content?: any }) {
  const eyebrow = content?.eyebrow || "ABOUT COMPANY";
  const title = content?.title || "Engineering India's Energy Arteries With Uncompromising Precision";
  const desc = content?.desc || "Specialized pipeline construction, mechanized horizontal directional drilling (HDD), and high-integrity infrastructure execution.";
  const whoWeAreEyebrow = content?.whoWeAreEyebrow || "WHO WE ARE";
  const whoWeAreTitle = content?.whoWeAreTitle || "Specialized Pipeline EPC Contractor With Pan-India Engineering Capability";
  const storyP1 = content?.storyP1 || "CandelaConstruction Private Limited is an engineering, procurement, and construction (EPC) enterprise dedicated to building the critical transmission trunklines and urban gas distribution grids that fuel India's industrial growth under our founding commitment: \"Trust delivered.\"";
  const storyP2 = content?.storyP2 || "Operating company-owned heavy equipment spreads—including 350-ton Vermeer HDD rigs, Caterpillar sidebooms, and mechanized dual-torch automatic welding spreads—we execute high-consequence energy infrastructure projects across dense forests, rocky Deccan plateaus, tidal estuaries, and congested urban zones.";
  const pill1Val = content?.pill1Val || "3,850+";
  const pill1Label = content?.pill1Label || "Kilometers Laid";
  const pill2Val = content?.pill2Val || "180+";
  const pill2Label = content?.pill2Label || "HDD River Crossings";
  const pill3Val = content?.pill3Val || "28.4M";
  const pill3Label = content?.pill3Label || "LTI-Free Hours";
  const pill4Val = content?.pill4Val || "100%";
  const pill4Label = content?.pill4Label || "Hydrotest Record";

  return (
    <section id="about" className="py-20 lg:py-28 bg-[#F8F4EC] border-b border-[#D9D9D9]">
      <Container>
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={desc}
        />

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Visual Construction Graphic / Showcase */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-[#D9D9D9] bg-white shadow-xl p-6 sm:p-8">
              <div className="flex items-center justify-between pb-4 border-b border-[#D9D9D9]">
                <span className="font-mono text-xs font-bold text-[#9E7444] tracking-wider">
                  VPI / CORE CAPABILITIES PROFILE
                </span>
                <span className="font-mono text-[10px] text-[#242424] px-2 py-0.5 rounded bg-[#F8F4EC] border border-[#D9D9D9]">
                  EST. 1994
                </span>
              </div>

              {/* Visual Engineering Grid Preview */}
              <div className="my-6 aspect-[16/10] rounded-xl bg-[#F8F4EC] border border-[#D9D9D9] p-5 relative overflow-hidden flex flex-col justify-between">
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
                    <span className="text-xs font-mono font-bold text-[#242424]">42" HEAVY-WALL MAINLINE</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#9E7444] bg-[#C69C6D]/15 px-2 py-0.5 rounded border border-[#C69C6D]/30 font-semibold">
                    API 5L X70 PSL2
                  </span>
                </div>

                {/* Construction Schematic Graphic */}
                <div className="relative z-10 my-auto py-2">
                  <div className="flex items-center justify-between text-xs font-mono text-[#5A5E62] mb-1">
                    <span>SURFACE RO-W (30M)</span>
                    <span>1.5M COVER DEPTH</span>
                  </div>
                  <div className="h-3 w-full bg-[#E5E0D6] rounded-full overflow-hidden p-0.5 border border-[#D9D9D9]">
                    <div className="h-full bg-gradient-to-r from-[#C69C6D] via-[#B08554] to-[#8C6239] rounded-full w-full" />
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-mono text-[#787B7E] mt-1.5">
                    <span>100% PAUT INSPECTED</span>
                    <span>3LPE ANTI-CORROSION</span>
                  </div>
                </div>

                <div className="relative z-10 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#6B6F73]">OPERATIONAL STATUS</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    FULLY HYDROTESTED & CHARGED
                  </span>
                </div>
              </div>

              {/* 4 Mini Stat Blocks */}
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-[#F8F4EC] border border-[#D9D9D9] p-3 rounded-lg">
                  <Shield className="w-5 h-5 mx-auto text-[#9E7444] mb-1" />
                  <div className="text-xs font-bold text-[#242424]">{pill1Val}</div>
                  <div className="text-[10px] text-[#6B6F73]">{pill1Label}</div>
                </div>
                <div className="bg-[#F8F4EC] border border-[#D9D9D9] p-3 rounded-lg">
                  <HardHat className="w-5 h-5 mx-auto text-[#9E7444] mb-1" />
                  <div className="text-xs font-bold text-[#242424]">{pill2Val}</div>
                  <div className="text-[10px] text-[#6B6F73]">{pill2Label}</div>
                </div>
                <div className="bg-[#F8F4EC] border border-[#D9D9D9] p-3 rounded-lg">
                  <Shield className="w-5 h-5 mx-auto text-[#9E7444] mb-1" />
                  <div className="text-xs font-bold text-[#242424]">{pill3Val}</div>
                  <div className="text-[10px] text-[#6B6F73]">{pill3Label}</div>
                </div>
                <div className="bg-[#F8F4EC] border border-[#D9D9D9] p-3 rounded-lg">
                  <Award className="w-5 h-5 mx-auto text-[#9E7444] mb-1" />
                  <div className="text-xs font-bold text-[#242424]">{pill4Val}</div>
                  <div className="text-[10px] text-[#6B6F73]">{pill4Label}</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: "Who We Are" Story & Value Pillars */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-6 space-y-6"
          >
            <div>
              <span className="text-xs font-mono font-bold text-[#9E7444] uppercase tracking-widest">
                {whoWeAreEyebrow}
              </span>
              <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#242424] mt-1.5 leading-snug">
                {whoWeAreTitle}
              </h3>
            </div>

            <p className="text-[#4A4D50] text-sm sm:text-base leading-relaxed">
              {storyP1}
            </p>

            <p className="text-[#6B6F73] text-sm leading-relaxed">
              {storyP2}
            </p>

            {/* Checklist of Pillars */}
            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#9E7444] mt-0.5 flex-shrink-0" />
                <div className="text-xs text-[#4A4D50]">
                  <strong className="text-[#242424]">API 1104 / ASME B31.8</strong> qualified automatic & manual welding
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#9E7444] mt-0.5 flex-shrink-0" />
                <div className="text-xs text-[#4A4D50]">
                  <strong className="text-[#242424]">180+ Major River Crossings</strong> executed via advanced HDD
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#9E7444] mt-0.5 flex-shrink-0" />
                <div className="text-xs text-[#4A4D50]">
                  <strong className="text-[#242424]">Zero Harm Culture</strong> institutionalized via 14 Golden Rules
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#9E7444] mt-0.5 flex-shrink-0" />
                <div className="text-xs text-[#4A4D50]">
                  <strong className="text-[#242424]">ISO 9001 / 14001 / 45001</strong> integrated management systems
                </div>
              </div>
            </div>

            {/* Action Link to Full About Us Page */}
            <div className="pt-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#9E7444] hover:text-[#825B2E] transition group"
              >
                <span>Read Full Company Overview & Leadership</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
