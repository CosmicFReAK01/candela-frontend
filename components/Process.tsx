"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { constructionProcess } from "@/data/site";
import { Container } from "./Container";
import { SectionHeading } from "./SectionHeading";
import { CheckCircle2, ChevronRight } from "lucide-react";

export function Process({ content }: { content?: any }) {
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const current = constructionProcess[activeStepIdx];

  return (
    <section id="process" className="py-20 lg:py-28 bg-[#F8F4EC] border-b border-[#D9D9D9]">
      <Container>
        <SectionHeading
          eyebrow={content?.eyebrow || "EXECUTION METHODOLOGY & LIFECYCLE"}
          title={content?.title || "12-Step Pipeline Construction Lifecycle"}
          description={content?.desc || "From initial cadastral satellite survey to final dry air purging and hydrocarbon introduction—engineered under ASME B31.8 and API 1104 standards."}
        />

        {/* ── 12-Step Horizontal Scrollable Timeline Bar ── */}
        <div className="mt-12 overflow-x-auto pb-4 pt-2 no-scrollbar">
          <div className="flex items-center min-w-[900px] gap-2 border-b border-[#D9D9D9] pb-4">
            {constructionProcess.map((step, idx) => {
              const isActive = activeStepIdx === idx;
              const isPast = idx < activeStepIdx;

              return (
                <button
                  key={step.step}
                  onClick={() => setActiveStepIdx(idx)}
                  className={`flex-1 py-2 px-2.5 rounded-lg text-left transition-all duration-200 border ${
                    isActive
                      ? "bg-[#C69C6D] text-[#242424] border-[#C69C6D] font-bold shadow-sm scale-105"
                      : isPast
                      ? "bg-white text-[#242424] border-[#D9D9D9] hover:border-[#C69C6D]"
                      : "bg-[#F3EFE7] text-[#6B6F73] border-[#D9D9D9] hover:border-[#C69C6D]"
                  }`}
                >
                  <div className="text-[10px] font-mono tracking-wider">
                    STEP {step.step}
                  </div>
                  <div className="text-[11px] font-heading font-extrabold truncate mt-0.5">
                    {step.title}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Active Step Deep-Dive Card ── */}
        <div className="mt-8 bg-white border border-[#D9D9D9] rounded-2xl p-7 sm:p-10 shadow-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid gap-8 lg:grid-cols-12 lg:items-center"
            >
              {/* Left Details */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-3xl sm:text-4xl font-black text-[#9E7444]">
                    {current.step}
                  </span>
                  <div className="h-8 w-px bg-[#D9D9D9]" />
                  <div>
                    <span className="text-[10px] font-mono text-[#6B6F73] uppercase tracking-widest block font-semibold">
                      CONSTRUCTION PHASE {current.step} OF 12
                    </span>
                    <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#242424]">
                      {current.title}
                    </h3>
                  </div>
                </div>

                <p className="text-base text-[#4A4D50] leading-relaxed">
                  {current.desc}
                </p>

                <p className="text-sm text-[#5A5E62] leading-relaxed bg-[#F8F4EC] p-4 rounded-xl border border-[#D9D9D9]">
                  {current.details}
                </p>

                {/* Deliverables Checklist */}
                <div>
                  <div className="text-xs font-mono text-[#9E7444] font-bold uppercase tracking-wider mb-2">
                    PHASE DELIVERABLES & VERIFICATIONS:
                  </div>
                  <div className="grid sm:grid-cols-3 gap-2">
                    {current.deliverables.map((d, i) => (
                      <div
                        key={i}
                        className="bg-[#F8F4EC] border border-[#D9D9D9] px-3 py-2 rounded-lg text-xs text-[#242424] flex items-center gap-2"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#9E7444] shrink-0" />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Technical Specification & Standard Box */}
              <div className="lg:col-span-5 bg-[#F8F4EC] border border-[#D9D9D9] rounded-xl p-6 sm:p-7 space-y-6">
                <div>
                  <span className="text-[10px] font-mono text-[#6B6F73] uppercase tracking-wider block font-semibold">
                    GOVERNING ENGINEERING CODE
                  </span>
                  <div className="text-lg font-mono font-bold text-[#9E7444] mt-1">
                    {current.standard}
                  </div>
                </div>

                <div className="space-y-3 pt-3 border-t border-[#D9D9D9] text-xs">
                  <div className="flex justify-between py-1 border-b border-[#EAE5DC]">
                    <span className="text-[#6B6F73]">QA/QC Inspection</span>
                    <span className="font-semibold text-emerald-700">100% Mandatory Hold Point</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#EAE5DC]">
                    <span className="text-[#6B6F73]">Safety Risk Level</span>
                    <span className="font-semibold text-[#242424]">Controlled / PTW Required</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#EAE5DC]">
                    <span className="text-[#6B6F73]">Field Log Sign-Off</span>
                    <span className="font-semibold text-[#242424]">Client Rep + Third Party (TPIA)</span>
                  </div>
                </div>

                {/* Navigation Buttons to Next / Prev Step */}
                <div className="pt-2 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setActiveStepIdx((prev) => Math.max(0, prev - 1))}
                    disabled={activeStepIdx === 0}
                    className="px-4 py-2 rounded-lg text-xs font-mono font-semibold bg-white text-[#242424] border border-[#D9D9D9] disabled:opacity-30 hover:bg-[#F3EFE7] transition"
                  >
                    ← Previous Step
                  </button>

                  <button
                    onClick={() => setActiveStepIdx((prev) => Math.min(constructionProcess.length - 1, prev + 1))}
                    disabled={activeStepIdx === constructionProcess.length - 1}
                    className="px-4 py-2 rounded-lg text-xs font-mono font-semibold bg-[#C69C6D] text-[#242424] font-bold disabled:opacity-30 hover:bg-[#B08554] transition flex items-center gap-1 shadow-sm"
                  >
                    <span>Next Step</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}