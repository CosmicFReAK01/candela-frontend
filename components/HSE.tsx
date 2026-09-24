"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Container } from "./Container";
import { SectionHeading } from "./SectionHeading";
import { certifications, hseMetrics } from "@/data/site";
import { ShieldCheck, HeartPulse, TreePine, Award, ArrowRight } from "lucide-react";

export function HSE({ content }: { content?: any }) {
  const [metrics, setMetrics] = useState<any>({
    safeManHours: hseMetrics.safeManHours,
    ltifr: hseMetrics.ltifr,
    environmentalRestoration: hseMetrics.environmentalRestoration,
    goldenSafetyRules: hseMetrics.goldenSafetyRules,
  });

  useEffect(() => {
    fetch("/api/hse", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          const safeHours = data.safe_man_hours
            ? (Number(data.safe_man_hours) >= 1000000
                ? `${(Number(data.safe_man_hours) / 1000000).toFixed(1)}M`
                : `${Number(data.safe_man_hours).toLocaleString()}`)
            : hseMetrics.safeManHours;
          const ltifr = data.ltifr !== undefined ? Number(data.ltifr).toFixed(2) : hseMetrics.ltifr;
          const envRest = data.environmental_restoration_pct !== undefined
            ? `${Math.round(Number(data.environmental_restoration_pct))}%`
            : hseMetrics.environmentalRestoration;
          const rules = data.golden_rules_count ? `${data.golden_rules_count} Rules` : hseMetrics.goldenSafetyRules;

          setMetrics({
            safeManHours: safeHours,
            ltifr,
            environmentalRestoration: envRest,
            goldenSafetyRules: rules,
          });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="hse" className="py-20 lg:py-28 bg-[#F3EFE7] border-b border-[#D9D9D9]">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeading
            eyebrow={content?.eyebrow || "HSE & QUALITY MANAGEMENT"}
            title={content?.title || "Institutionalized Safety Culture & Integrated Management Systems"}
            description={content?.desc || "High-pressure pipeline execution demands zero-tolerance safety regimes, total environmental stewardship, and strict QA/QC compliance."}
          />
          <Link
            href="/hse"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#9E7444] hover:text-[#825B2E] transition shrink-0 group pb-2"
          >
            <span>{content?.linkText || "Explore Full HSE Charter & Policies"}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* ── Key HSE Metric Cards ── */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-[#D9D9D9] p-5 rounded-xl text-center shadow-sm">
            <div className="text-3xl sm:text-4xl font-mono font-extrabold text-emerald-700">
              {metrics.safeManHours}
            </div>
            <div className="text-xs uppercase font-semibold text-[#242424] mt-1">
              Safe Man-Hours
            </div>
            <div className="text-[11px] text-[#6B6F73]">Zero Lost Time Injuries</div>
          </div>

          <div className="bg-white border border-[#D9D9D9] p-5 rounded-xl text-center shadow-sm">
            <div className="text-3xl sm:text-4xl font-mono font-extrabold text-[#9E7444]">
              {metrics.ltifr}
            </div>
            <div className="text-xs uppercase font-semibold text-[#242424] mt-1">
              LTIFR Record
            </div>
            <div className="text-[11px] text-[#6B6F73]">Industry Leading Metric</div>
          </div>

          <div className="bg-white border border-[#D9D9D9] p-5 rounded-xl text-center shadow-sm">
            <div className="text-3xl sm:text-4xl font-mono font-extrabold text-cyan-800">
              {metrics.environmentalRestoration}
            </div>
            <div className="text-xs uppercase font-semibold text-[#242424] mt-1">
              Land Reinstatement
            </div>
            <div className="text-[11px] text-[#6B6F73]">Topsoil Preserved & Returned</div>
          </div>

          <div className="bg-white border border-[#D9D9D9] p-5 rounded-xl text-center shadow-sm">
            <div className="text-3xl sm:text-4xl font-mono font-extrabold text-emerald-700">
              {metrics.goldenSafetyRules}
            </div>
            <div className="text-xs uppercase font-semibold text-[#242424] mt-1">
              Golden Safety Rules
            </div>
            <div className="text-[11px] text-[#6B6F73]">Mandatory Field Standards</div>
          </div>
        </div>

        {/* ── 4 Pillars: Health, Safety, Environment, Quality ── */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* 1. Health */}
          <div className="bg-white border border-[#D9D9D9] rounded-xl p-6 space-y-3 shadow-sm hover:shadow-md transition">
            <div className="w-10 h-10 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center text-red-700">
              <HeartPulse className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-lg text-[#242424]">
              Occupational Health
            </h3>
            <p className="text-xs text-[#4A4D50] leading-relaxed">
              Dedicated on-site first aid dispensaries, periodic medical surveillance, heat-stress hydration protocols, and worker camp sanitation standards.
            </p>
            <ul className="space-y-1.5 text-[11px] text-[#6B6F73] pt-2 border-t border-[#D9D9D9]">
              <li>• Pre-employment medical screening</li>
              <li>• Dedicated site ambulances & paramedics</li>
              <li>• Potable drinking water & dietary monitoring</li>
            </ul>
          </div>

          {/* 2. Safety */}
          <div className="bg-white border border-[#D9D9D9] rounded-xl p-6 space-y-3 shadow-sm hover:shadow-md transition">
            <div className="w-10 h-10 rounded-lg bg-[#F8F4EC] border border-[#C69C6D]/40 flex items-center justify-center text-[#9E7444]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-lg text-[#242424]">
              Site Safety Systems
            </h3>
            <p className="text-xs text-[#4A4D50] leading-relaxed">
              Mandatory Permit-to-Work (PTW) for hot work, trenching & lifting, daily pre-shift toolbox talks, dynamic Job Safety Analysis (JSA), and site barricading.
            </p>
            <ul className="space-y-1.5 text-[11px] text-[#6B6F73] pt-2 border-t border-[#D9D9D9]">
              <li>• Strict PPE compliance & inspection</li>
              <li>• Trench collapse shoring & rescue drills</li>
              <li>• Emergency response & evacuation plans</li>
            </ul>
          </div>

          {/* 3. Environment */}
          <div className="bg-white border border-[#D9D9D9] rounded-xl p-6 space-y-3 shadow-sm hover:shadow-md transition">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
              <TreePine className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-lg text-[#242424]">
              Environmental Care
            </h3>
            <p className="text-xs text-[#4A4D50] leading-relaxed">
              Rigorous topsoil segregation and windrowing, zero chemical discharge into water bodies, closed-loop hydrotest water recycling, and 100% RoW reinstatement.
            </p>
            <ul className="space-y-1.5 text-[11px] text-[#6B6F73] pt-2 border-t border-[#D9D9D9]">
              <li>• Agricultural horizon preservation</li>
              <li>• Dust suppression water tankers</li>
              <li>• Hazardous waste collection & recycling</li>
            </ul>
          </div>

          {/* 4. Quality Management */}
          <div className="bg-white border border-[#D9D9D9] rounded-xl p-6 space-y-3 shadow-sm hover:shadow-md transition">
            <div className="w-10 h-10 rounded-lg bg-[#F8F4EC] border border-[#D9D9D9] flex items-center justify-center text-[#9E7444]">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-lg text-[#242424]">
              QA/QC & NDT Control
            </h3>
            <p className="text-xs text-[#4A4D50] leading-relaxed">
              Independent metallurgical labs on site, 100% girth weld non-destructive testing (PAUT / AUT), complete pipe heat number traceability, and statutory documentation.
            </p>
            <ul className="space-y-1.5 text-[11px] text-[#6B6F73] pt-2 border-t border-[#D9D9D9]">
              <li>• ASNT Level-III quality oversight</li>
              <li>• 25 kV high-voltage holiday spark testing</li>
              <li>• Comprehensive as-built digital records</li>
            </ul>
          </div>
        </div>

        {/* ── Certifications Wall ── */}
        <div className="mt-12 bg-white border border-[#D9D9D9] rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-6">
            <span className="text-xs font-mono font-bold text-[#9E7444] uppercase tracking-widest">
              ACCREDITED ASSURANCE
            </span>
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#242424] mt-1">
              Integrated ISO Certification Wall
            </h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {certifications.map((c) => (
              <div
                key={c.code}
                className="bg-[#F8F4EC] border border-[#D9D9D9] p-5 rounded-xl hover:border-[#C69C6D] transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-sm text-[#9E7444]">
                    {c.code}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300 font-semibold">
                    {c.badge}
                  </span>
                </div>
                <div className="font-heading font-bold text-base text-[#242424] mt-2">
                  {c.title}
                </div>
                <p className="text-xs text-[#5A5E62] mt-1.5 leading-relaxed">
                  {c.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}