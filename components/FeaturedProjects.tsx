"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { projects as fallbackProjects } from "@/data/site";
import { fetchProjects } from "@/lib/api";
import { Container } from "./Container";
import { SectionHeading } from "./SectionHeading";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";

export function FeaturedProjects({ content }: { content?: any }) {
  const [projectList, setProjectList] = useState(fallbackProjects);
  const [selectedIdx, setSelectedIdx] = useState(0);

  useEffect(() => {
    fetchProjects().then((data) => {
      if (data && Array.isArray(data) ) {
        setProjectList(data);
      }
    });
  }, []);

  const featuredList = projectList.slice(0, 3);
  const current = featuredList[selectedIdx] || featuredList[0];

  if (!current) return null;

  return (
    <section id="projects" className="py-20 lg:py-28 bg-[#F8F4EC] border-b border-[#D9D9D9]">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeading
            eyebrow={content?.eyebrow || "FEATURED CASE STUDIES"}
            title={content?.title || "Landmark Infrastructure Executed Across India"}
            description={content?.desc || "Detailed technical records of major trunklines, complex river trenchless crossings, and city gas networks."}
          />
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#9E7444] hover:text-[#825B2E] transition shrink-0 group pb-2"
          >
            <span>{content?.linkText || "Browse All Project Portfolios"}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* ── Case Study Selector Tabs ── */}
        <div className="mt-10 flex flex-wrap gap-2 border-b border-[#D9D9D9] pb-4">
          {featuredList.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setSelectedIdx(idx)}
              className={`px-4 py-2.5 rounded-lg text-xs font-mono font-bold transition flex items-center gap-2 ${
                selectedIdx === idx
                  ? "bg-[#C69C6D] text-[#242424] shadow-sm"
                  : "bg-white text-[#4A4D50] hover:bg-[#F3EFE7] border border-[#D9D9D9]"
              }`}
            >
              <span>CASE 0{idx + 1}:</span>
              <span>{p.title.split("(")[0]}</span>
            </button>
          ))}
        </div>

        {/* ── Large Case Study Card Display ── */}
        <div className="mt-8 bg-white border border-[#D9D9D9] rounded-2xl overflow-hidden shadow-xl">
          <div className="grid lg:grid-cols-12">
            
            {/* Left Image / Visual Blueprint Mockup */}
            <div className="lg:col-span-7 bg-[#F3EFE7] p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden border-b lg:border-b-0 lg:border-r border-[#D9D9D9]">
              {/* Badge Overlay */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#9E7444] bg-[#C69C6D]/20 border border-[#C69C6D]/40 px-3 py-1 rounded-full uppercase tracking-wider">
                  {current.tag}
                </span>
                <span className="text-xs font-mono text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 py-1 rounded flex items-center gap-1.5 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {current.status}
                </span>
              </div>

              {/* Center Graphic */}
              <div className="relative z-10 my-10 space-y-4">
                <div className="text-[11px] font-mono text-[#787B7E] uppercase tracking-widest font-semibold">
                  MAJOR ENGINEERING MILESTONE
                </div>
                <h3 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#242424] leading-tight">
                  {current.title}
                </h3>
                <p className="text-sm text-[#4A4D50] max-w-xl leading-relaxed">
                  {current.shortDesc}
                </p>
              </div>

              {/* Highlights Checklist */}
              <div className="relative z-10 pt-6 border-t border-[#D9D9D9] space-y-2">
                <div className="text-[11px] font-mono text-[#9E7444] font-bold uppercase tracking-wider">
                  KEY EXECUTION HIGHLIGHTS:
                </div>
                <div className="grid sm:grid-cols-2 gap-2 text-xs text-[#333333]">
                  {(current.highlights || []).slice(0, 4).map((h: string, i: number) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#9E7444] mt-0.5 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Specification Data Table */}
            <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between bg-white">
              <div>
                <h4 className="text-xs font-mono font-bold text-[#787B7E] uppercase tracking-widest pb-4 border-b border-[#D9D9D9]">
                  PROJECT SPECIFICATIONS & METADATA
                </h4>

                <dl className="mt-4 space-y-3.5 text-sm">
                  <div className="flex justify-between py-2 border-b border-[#F0EBE1]">
                    <dt className="text-[#6B6F73]">Client</dt>
                    <dd className="font-semibold text-[#242424] text-right">{current.client}</dd>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#F0EBE1]">
                    <dt className="text-[#6B6F73]">Location</dt>
                    <dd className="font-semibold text-[#242424] text-right">{current.location}</dd>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#F0EBE1]">
                    <dt className="text-[#6B6F73]">Pipeline Diameter</dt>
                    <dd className="font-mono font-bold text-[#9E7444] text-right">{current.diameter}</dd>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#F0EBE1]">
                    <dt className="text-[#6B6F73]">Total Length / Span</dt>
                    <dd className="font-mono font-bold text-[#242424] text-right">{current.length}</dd>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#F0EBE1]">
                    <dt className="text-[#6B6F73]">Project Type</dt>
                    <dd className="font-semibold text-[#242424] text-right">{current.projectType}</dd>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#F0EBE1]">
                    <dt className="text-[#6B6F73]">Operating Pressure</dt>
                    <dd className="font-mono text-cyan-800 font-semibold text-right">{current.pressure}</dd>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#F0EBE1]">
                    <dt className="text-[#6B6F73]">Status</dt>
                    <dd className="font-semibold text-emerald-700 text-right">{current.status}</dd>
                  </div>
                </dl>
              </div>

              {/* View Case Study Button */}
              <div className="pt-8">
                <Link
                  href={`/projects/${current.slug}`}
                  className="w-full bg-[#C69C6D] hover:bg-[#B08554] text-[#242424] font-bold py-3.5 px-6 rounded-xl text-sm transition flex items-center justify-center gap-2 shadow-sm shadow-[#C69C6D]/20 active:scale-95"
                >
                  <span>VIEW FULL CASE STUDY</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <p className="text-[11px] text-center text-[#787B7E] mt-2 font-mono">
                  Includes detailed scope of work, technical challenges & photo records
                </p>
              </div>
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
}
