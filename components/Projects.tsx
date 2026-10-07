"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { projects as fallbackProjects } from "@/data/site";
import { fetchProjects } from "@/lib/api";
import { Container } from "./Container";
import { SectionHeading } from "./SectionHeading";

const categories = ["all", "cross-country", "hdd", "cgd"];
const catLabels: Record<string, string> = { all: "All Projects", "cross-country": "Cross-Country", hdd: "HDD / River", cgd: "CGD Networks" };
const tagColorMap: Record<string, string> = { amber: "bg-amber-500/20 text-amber-300 border-amber-500/30", cyan: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30", emerald: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" };

export function Projects() {
  const [cat, setCat] = useState("all");
  const [projectList, setProjectList] = useState(fallbackProjects);

  useEffect(() => {
    fetchProjects(cat).then((data) => {
      if (data && Array.isArray(data) && data.length > 0) {
        setProjectList(data);
      }
    });
  }, [cat]);

  const filtered = cat === "all" ? projectList : projectList.filter(p => p.cat === cat);

  return (
    <section id="projects" className="py-20 bg-[#1a1a1a] border-b border-[#3a3a3a]">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <SectionHeading
            eyebrow="PROJECT PORTFOLIO"
            title="Landmark EPC execution spanning pipelines, HDD, and urban CGD."
          />

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 shrink-0">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-3.5 py-1.5 text-xs font-mono font-semibold rounded-lg border transition ${
                  cat === c
                    ? "bg-amber-500/20 text-amber-400 border-amber-500/50"
                    : "bg-[#2e2e2e] text-[#9FA3A7] border-[#3a3a3a] hover:text-white"
                }`}
              >
                {catLabels[c]}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="group rounded-2xl border border-[#3a3a3a] bg-[#242424] hover:border-amber-500/40 hover:-translate-y-0.5 transition-all overflow-hidden"
            >
              {/* Header */}
              <div className="p-5 border-b border-[#3a3a3a]">
                <div className="flex items-start justify-between gap-2">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${tagColorMap[p.tagColor]}`}>
                    {p.tag}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {p.status}
                  </span>
                </div>
                <h3 className="mt-3 text-base font-heading font-bold text-white leading-snug">{p.title}</h3>
                <div className="mt-2 flex items-center gap-1.5 text-[11px] text-[#9FA3A7] font-mono">
                  <MapPin size={12} />
                  {p.location}
                </div>
              </div>

              {/* Specs Grid */}
              <div className="p-5 grid grid-cols-2 gap-3">
                <SpecItem label="Diameter" value={p.diameter} />
                <SpecItem label="Wall / Grade" value={p.wallThickness} />
                <SpecItem label="Pressure" value={p.pressure} />
                <SpecItem label="Duration" value={p.duration} />
              </div>

              {/* Highlight Spec */}
              <div className="mx-5 mb-5 flex justify-between items-center bg-[#1a1a1a] p-3 rounded-xl border border-[#3a3a3a]">
                <span className="text-[10px] font-mono text-[#9FA3A7] uppercase">{p.specLabel}:</span>
                <span className="text-xs font-bold text-amber-400">{p.specValue}</span>
              </div>

              {/* CTA */}
              <div className="px-5 pb-5">
                <button className="w-full py-2 text-xs font-semibold text-[#D9D9D9] hover:text-amber-400 flex items-center justify-center gap-1.5 rounded-lg bg-[#2e2e2e] border border-[#3a3a3a] hover:border-amber-500/50 transition">
                  Detailed Dossier <ArrowRight size={13} />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function SpecItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] font-mono text-[#474B4F] uppercase">{label}</div>
      <div className="text-[11px] font-mono text-[#D9D9D9] mt-0.5 leading-snug">{value}</div>
    </div>
  );
}