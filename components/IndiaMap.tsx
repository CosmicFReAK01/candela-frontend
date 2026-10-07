"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "./Container";
import { SectionHeading } from "./SectionHeading";
import { indiaProjectStates } from "@/data/site";
import { fetchStates } from "@/lib/api";
import { MapPin, ArrowRight, Building2, Route, Users, Layers } from "lucide-react";

export function IndiaMap({ content }: { content?: any }) {
  const [states, setStates] = useState(indiaProjectStates);
  const [activeStateId, setActiveStateId] = useState<string>("saran-chapra");

  useEffect(() => {
    fetchStates().then((dbStates) => {
      if (dbStates && Array.isArray(dbStates) && dbStates.length > 0) {
        setStates((prev) =>
          prev.map((s) => {
            const found = dbStates.find(
              (d: any) => d.id === s.id || d.name?.toLowerCase().includes(s.id)
            );
            if (found) {
              return {
                ...s,
                projectsCount: Number(found.projects ?? s.projectsCount),
                pipelineKm: typeof found.km === "number" ? found.km : (parseInt(String(found.km), 10) || s.pipelineKm),
              };
            }
            return s;
          })
        );
      }
    });
  }, []);

  const activeState = (states.find((s) => s.id === activeStateId) || states[0]) as typeof states[0] & { subDistricts?: string[]; activeSites: string[] };

  if (!activeState) return null;

  return (
    <section id="map" className="py-20 lg:py-28 bg-[#F3EFE7] border-b border-[#D9D9D9]">
      <Container>
        <SectionHeading
          eyebrow={content?.eyebrow || "NORTH BIHAR PIPELINE EXECUTION CORRIDOR"}
          title={content?.title || "Regional Operations: Chapra (Saran) to Muzaffarpur, Samastipur & Vaishali"}
          description={content?.desc || "Explore our high-pressure gas transmission spreads, river HDD crossings, and city gas networks deployed across strategic sub-districts from Saran to Muzaffarpur, Samastipur, and Vaishali."}
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-center">
          
          {/* ── Left Interactive Map Viewport ── */}
          <div className="lg:col-span-7 bg-white border border-[#D9D9D9] rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-[#D9D9D9]">
              <span className="font-mono text-xs font-bold text-[#9E7444] uppercase tracking-wider">
                SELECT A DISTRICT / SUB-DISTRICT TO INSPECT SPREADS
              </span>
              <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 font-semibold">
                4 ACTIVE DISTRICT CORRIDORS
              </span>
            </div>

            {/* Schematic SVG Map with Interlinked Pipeline Route */}
            <div className="relative my-4 aspect-[4/3] bg-[#F8F4EC] rounded-xl border border-[#D9D9D9] flex items-center justify-center p-4">
              <svg className="w-full h-full" viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Background Grid */}
                <defs>
                  <pattern id="lightMapGrid" width="25" height="25" patternUnits="userSpaceOnUse">
                    <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#E5E0D6" strokeWidth="0.75" />
                  </pattern>
                </defs>
                <rect width="500" height="400" fill="url(#lightMapGrid)" />

                {/* Regional Geographic River & Boundary Indicators */}
                {/* River Ganga & Gandak Schematics */}
                <path
                  d="M 20 320 Q 120 290 220 310 T 360 340 T 490 350"
                  stroke="#BCD4E6"
                  strokeWidth="6"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.6"
                />
                <text x="70" y="325" fill="#7A9AA8" fontSize="9" fontFamily="monospace" fontWeight="bold">
                  GANGA RIVER CORRIDOR
                </text>

                <path
                  d="M 120 40 Q 170 140 210 280"
                  stroke="#BCD4E6"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.5"
                />
                <text x="140" y="100" fill="#7A9AA8" fontSize="8" fontFamily="monospace">
                  GANDAK RIVER
                </text>

                {/* Pipeline Interconnect Trunkline Network */}
                <path
                  d="M 90 230 L 210 240 L 310 130 L 410 200"
                  stroke="#C69C6D"
                  strokeWidth="4"
                  strokeDasharray="6 4"
                  fill="none"
                />
                <path
                  d="M 210 240 L 410 200"
                  stroke="#C69C6D"
                  strokeWidth="2.5"
                  strokeDasharray="4 3"
                  fill="none"
                  opacity="0.6"
                />

                {/* District Nodes & Pins */}
                {/* 1. Saran (Chapra) */}
                <g onClick={() => setActiveStateId("saran-chapra")} className="cursor-pointer group">
                  <circle cx="90" cy="230" r={activeStateId === "saran-chapra" ? "16" : "10"} fill="#C69C6D" fillOpacity={activeStateId === "saran-chapra" ? "0.35" : "0.15"} className="animate-pulse" />
                  <circle cx="90" cy="230" r="8" fill={activeStateId === "saran-chapra" ? "#C69C6D" : "#787B7E"} stroke="#FFFFFF" strokeWidth="2" />
                  <text x="90" y="260" fill={activeStateId === "saran-chapra" ? "#9E7444" : "#4A4D50"} fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                    SARAN (CHAPRA)
                  </text>
                  <text x="90" y="274" fill="#787B7E" fontSize="9" fontFamily="monospace" textAnchor="middle">
                    7 Sub-Districts
                  </text>
                </g>

                {/* 2. Vaishali (Hajipur) */}
                <g onClick={() => setActiveStateId("vaishali")} className="cursor-pointer group">
                  <circle cx="210" cy="240" r={activeStateId === "vaishali" ? "16" : "10"} fill="#C69C6D" fillOpacity={activeStateId === "vaishali" ? "0.35" : "0.15"} className="animate-pulse" />
                  <circle cx="210" cy="240" r="8" fill={activeStateId === "vaishali" ? "#C69C6D" : "#787B7E"} stroke="#FFFFFF" strokeWidth="2" />
                  <text x="210" y="218" fill={activeStateId === "vaishali" ? "#9E7444" : "#4A4D50"} fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                    VAISHALI (HAJIPUR)
                  </text>
                  <text x="210" y="204" fill="#787B7E" fontSize="9" fontFamily="monospace" textAnchor="middle">
                    7 Sub-Districts
                  </text>
                </g>

                {/* 3. Muzaffarpur */}
                <g onClick={() => setActiveStateId("muzaffarpur")} className="cursor-pointer group">
                  <circle cx="310" cy="130" r={activeStateId === "muzaffarpur" ? "16" : "10"} fill="#C69C6D" fillOpacity={activeStateId === "muzaffarpur" ? "0.35" : "0.15"} className="animate-pulse" />
                  <circle cx="310" cy="130" r="8" fill={activeStateId === "muzaffarpur" ? "#C69C6D" : "#787B7E"} stroke="#FFFFFF" strokeWidth="2" />
                  <text x="310" y="110" fill={activeStateId === "muzaffarpur" ? "#9E7444" : "#4A4D50"} fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                    MUZAFFARPUR
                  </text>
                  <text x="310" y="96" fill="#787B7E" fontSize="9" fontFamily="monospace" textAnchor="middle">
                    7 Sub-Districts
                  </text>
                </g>

                {/* 4. Samastipur */}
                <g onClick={() => setActiveStateId("samastipur")} className="cursor-pointer group">
                  <circle cx="410" cy="200" r={activeStateId === "samastipur" ? "16" : "10"} fill="#C69C6D" fillOpacity={activeStateId === "samastipur" ? "0.35" : "0.15"} className="animate-pulse" />
                  <circle cx="410" cy="200" r="8" fill={activeStateId === "samastipur" ? "#C69C6D" : "#787B7E"} stroke="#FFFFFF" strokeWidth="2" />
                  <text x="410" y="228" fill={activeStateId === "samastipur" ? "#9E7444" : "#4A4D50"} fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                    SAMASTIPUR
                  </text>
                  <text x="410" y="242" fill="#787B7E" fontSize="9" fontFamily="monospace" textAnchor="middle">
                    7 Sub-Districts
                  </text>
                </g>
              </svg>

              <div className="absolute bottom-3 right-3 text-[10px] font-mono text-[#6B6F73] bg-white px-2.5 py-1 rounded border border-[#D9D9D9] shadow-sm">
                CLICK REGION PIN TO INSPECT SUB-DISTRICTS
              </div>
            </div>

            {/* Quick State Pills */}
            <div className="flex flex-wrap gap-2 pt-2">
              {states.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveStateId(s.id)}
                  className={`px-3 py-1.5 rounded text-xs font-mono transition ${
                    activeStateId === s.id
                      ? "bg-[#C69C6D] text-[#242424] font-bold shadow-sm"
                      : "bg-[#F8F4EC] text-[#4A4D50] hover:bg-[#EAE4D8] border border-[#D9D9D9]"
                  }`}
                >
                  {s.name} ({s.projectsCount})
                </button>
              ))}
            </div>
          </div>

          {/* ── Right Detailed State Card ── */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeState.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-[#D9D9D9] rounded-2xl p-7 sm:p-8 shadow-xl space-y-5"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#9E7444] uppercase tracking-widest">
                      DISTRICT CORRIDOR PROFILE
                    </span>
                    <span className="text-xs font-mono text-[#6B6F73] bg-[#F8F4EC] px-2.5 py-1 rounded border border-[#D9D9D9]">
                      NORTH BIHAR GAS GRID
                    </span>
                  </div>
                  <h3 className="font-heading font-extrabold text-3xl text-[#242424] mt-2">
                    {activeState.name}
                  </h3>
                  <p className="text-xs text-[#5A5E62] mt-1.5 leading-relaxed">
                    {activeState.highlights}
                  </p>
                </div>

                {/* 3 Large State Metric Cards */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-[#F8F4EC] border border-[#D9D9D9] p-3 rounded-xl text-center">
                    <Building2 className="w-4 h-4 mx-auto text-[#9E7444] mb-1" />
                    <div className="font-mono font-extrabold text-xl text-[#242424]">
                      {activeState.projectsCount}
                    </div>
                    <div className="text-[10px] text-[#6B6F73] uppercase tracking-wider mt-0.5 font-semibold">
                      Spreads
                    </div>
                  </div>

                  <div className="bg-[#F8F4EC] border border-[#D9D9D9] p-3 rounded-xl text-center">
                    <Route className="w-4 h-4 mx-auto text-[#9E7444] mb-1" />
                    <div className="font-mono font-extrabold text-xl text-[#242424]">
                      {activeState.pipelineKm}
                    </div>
                    <div className="text-[10px] text-[#6B6F73] uppercase tracking-wider mt-0.5 font-semibold">
                      KM Laid
                    </div>
                  </div>

                  <div className="bg-[#F8F4EC] border border-[#D9D9D9] p-3 rounded-xl text-center">
                    <Users className="w-4 h-4 mx-auto text-[#9E7444] mb-1" />
                    <div className="font-mono font-extrabold text-xl text-[#242424]">
                      {activeState.clientsCount}
                    </div>
                    <div className="text-[10px] text-[#6B6F73] uppercase tracking-wider mt-0.5 font-semibold">
                      Clients
                    </div>
                  </div>
                </div>

                {/* Sub-Districts Covered */}
                {activeState.subDistricts && (
                  <div>
                    <div className="text-xs font-mono text-[#6B6F73] uppercase tracking-wider mb-2 font-semibold flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#9E7444]" />
                      SUB-DISTRICTS (TEHSILS / BLOCKS):
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {activeState.subDistricts.map((sub: string) => (
                        <span
                          key={sub}
                          className="bg-[#F3EFE7] text-[#242424] text-[11px] px-2.5 py-0.5 rounded font-mono border border-[#D9D9D9]"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Active Construction Sites */}
                <div>
                  <div className="text-xs font-mono text-[#6B6F73] uppercase tracking-wider mb-2 font-semibold">
                    ACTIVE SPREAD LOCATIONS & CAMPS:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(activeState.activeSites || []).map((site: string) => (
                      <span
                        key={site}
                        className="bg-[#F8F4EC] text-[#242424] text-xs px-2.5 py-1 rounded border border-[#D9D9D9] font-mono flex items-center gap-1.5"
                      >
                        <MapPin className="w-3 h-3 text-[#9E7444]" />
                        {site}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Link to Filtered Projects */}
                <div className="pt-2 border-t border-[#D9D9D9]">
                  <Link
                    href={`/projects?district=${encodeURIComponent(activeState.name)}`}
                    className="w-full bg-[#C69C6D] hover:bg-[#B08554] text-[#242424] font-bold py-3 px-4 rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-sm shadow-[#C69C6D]/20 active:scale-95"
                  >
                    <span>VIEW {(activeState.name || "").toUpperCase()} PROJECTS & SPREADS</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </Container>
    </section>
  );
}