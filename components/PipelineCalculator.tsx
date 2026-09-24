"use client";
import { useState, useEffect } from "react";
import { Container } from "./Container";
import { SectionHeading } from "./SectionHeading";
import { calculateEstimate, CalculatorResult } from "@/lib/api";

const diameters = [
  { label: '8" (203mm)', od: 8, wt: 8.2 },
  { label: '12" (305mm)', od: 12, wt: 10.3 },
  { label: '16" (406mm)', od: 16, wt: 12.7 },
  { label: '20" (508mm)', od: 20, wt: 14.3 },
  { label: '24" (610mm)', od: 24, wt: 15.9 },
  { label: '30" (762mm)', od: 30, wt: 17.5 },
  { label: '36" (914mm)', od: 36, wt: 19.1 },
  { label: '42" (1067mm)', od: 42, wt: 22.2 },
  { label: '48" (1219mm)', od: 48, wt: 25.4 },
];

const terrains = [
  { label: "Alluvial Plain", multiplier: 1.0, note: "Standard open-cut trenching in soft soil" },
  { label: "Rocky / Hard Terrain", multiplier: 1.55, note: "Controlled blasting or mechanical rock cutting" },
  { label: "Water Crossing (HDD)", multiplier: 2.3, note: "Trenchless HDD / microtunnel installation" },
  { label: "Marshy / Wetland", multiplier: 1.4, note: "De-watering, temporary causeways, sheet piling" },
  { label: "Urban / Congested", multiplier: 1.7, note: "Traffic management, night pours, micro-tunnelling" },
];

const pressures = [
  { label: "ANSI Class 150 (20 bar)", factor: 1.0 },
  { label: "ANSI Class 300 (50 bar)", factor: 1.12 },
  { label: "ANSI Class 600 (100 bar)", factor: 1.3 },
  { label: "ANSI Class 900 (150 bar)", factor: 1.55 },
];

export function PipelineCalculator() {
  const [diamIdx, setDiamIdx] = useState(4);
  const [length, setLength] = useState(100);
  const [terrIdx, setTerrIdx] = useState(0);
  const [pressIdx, setPressIdx] = useState(2);
  const [results, setResults] = useState<CalculatorResult>({
    steelTonnage: "23,280",
    waterKL: "30,154",
    joints: "8,264",
    costCr: "754.0",
    grade: "API 5L X60 / X70 PSL2",
    method: "Standard open-cut trenching in soft soil",
    standard: "API 1104 / ASME B31.8 / OISD 226",
    lengthKm: 100,
    diameterInches: 24,
  });

  const d = diameters[diamIdx];
  const terrain = terrains[terrIdx];

  useEffect(() => {
    let isCurrent = true;
    calculateEstimate({
      diameterInches: d.od,
      wallThicknessMm: d.wt,
      lengthKm: length,
      terrainIndex: terrIdx,
      pressureIndex: pressIdx,
    }).then((res) => {
      if (isCurrent && res) {
        setResults(res);
      }
    });

    return () => {
      isCurrent = false;
    };
  }, [d.od, d.wt, length, terrIdx, pressIdx]);

  return (
    <section id="calculator" className="py-20 bg-[#1a1a1a] border-b border-[#3a3a3a]">
      <Container>
        <div className="flex items-center justify-between flex-wrap gap-4 mb-3">
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded">
            LIVE SPRING BOOT ESTIMATOR API
          </span>
          <span className="text-[10px] font-mono text-[#888]">
            ASME B31.8 / API 5L PARAMETRIC ENGINE
          </span>
        </div>

        <SectionHeading
          eyebrow="PIPELINE ENGINEERING ESTIMATOR"
          title="Parametric cost, tonnage and weld-count estimation for gas trunklines."
          description="Adjust specifications below. Calculated live via our Tendering & Engineering microservice based on API 5L steel weight formulae and terrain multipliers."
        />

        <div className="mt-10 grid lg:grid-cols-12 gap-6">
          {/* Controls */}
          <div className="lg:col-span-5 bg-[#2e2e2e] border border-[#4a4a4a] rounded-2xl p-6 space-y-5 shadow-2xl">
            {/* Diameter */}
            <div>
              <label className="text-[11px] font-mono font-bold text-[#9FA3A7] uppercase tracking-wider block mb-2">
                Pipe Nominal Diameter
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {diameters.map((dm, i) => (
                  <button
                    key={dm.label}
                    onClick={() => setDiamIdx(i)}
                    className={`px-2 py-1.5 text-[11px] font-mono rounded-lg border transition ${
                      i === diamIdx
                        ? "bg-amber-500/20 text-amber-400 border-amber-500/50 font-bold"
                        : "bg-[#1a1a1a] text-[#9FA3A7] border-[#3a3a3a] hover:text-white"
                    }`}
                  >
                    {dm.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Route Length */}
            <div>
              <label className="text-[11px] font-mono font-bold text-[#9FA3A7] uppercase tracking-wider flex justify-between">
                <span>Route Length</span>
                <span className="text-amber-400">{length} KM</span>
              </label>
              <input
                type="range"
                min={5} max={600} step={5}
                value={length}
                onChange={e => setLength(Number(e.target.value))}
                className="mt-2 w-full h-2 rounded-lg appearance-none bg-[#1a1a1a] accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#474B4F] mt-1">
                <span>5 KM</span><span>600 KM</span>
              </div>
            </div>

            {/* Terrain */}
            <div>
              <label className="text-[11px] font-mono font-bold text-[#9FA3A7] uppercase tracking-wider block mb-2">
                Predominant Terrain
              </label>
              <div className="space-y-1.5">
                {terrains.map((t, i) => (
                  <button
                    key={t.label}
                    onClick={() => setTerrIdx(i)}
                    className={`w-full text-left px-3 py-2 text-xs rounded-lg border transition flex justify-between items-center ${
                      i === terrIdx
                        ? "bg-cyan-500/15 text-cyan-300 border-cyan-500/40 font-semibold"
                        : "bg-[#1a1a1a] text-[#9FA3A7] border-[#3a3a3a] hover:text-white"
                    }`}
                  >
                    <span>{t.label}</span>
                    <span className={`text-[10px] font-mono ${i === terrIdx ? "text-cyan-400" : "text-[#474B4F]"}`}>
                      ×{t.multiplier.toFixed(2)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Pressure */}
            <div>
              <label className="text-[11px] font-mono font-bold text-[#9FA3A7] uppercase tracking-wider block mb-2">
                Design Pressure Rating
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {pressures.map((p, i) => (
                  <button
                    key={p.label}
                    onClick={() => setPressIdx(i)}
                    className={`px-2 py-1.5 text-[11px] font-mono rounded-lg border transition text-center ${
                      i === pressIdx
                        ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/40 font-bold"
                        : "bg-[#1a1a1a] text-[#9FA3A7] border-[#3a3a3a] hover:text-white"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <ResultCard label="Steel Tonnage" value={`${results.steelTonnage} MT`} sub={`Specification: ${results.grade}`} color="amber" />
              <ResultCard label="Hydrotest Water Volume" value={`${results.waterKL} KL`} sub="At 1.4× design pressure (24-hr hold)" color="cyan" />
              <ResultCard label="Girth Weld Joint Count" value={results.joints} sub="Average pipe joint length: 12.1 meters" color="white" />
              <ResultCard label="Ballpark EPC Cost" value={`₹ ${results.costCr} Cr`} sub="Empirical infrastructure cost index" color="emerald" />
            </div>

            {/* Methodology Output */}
            <div className="bg-[#2e2e2e] border border-[#4a4a4a] rounded-xl p-5 shadow-xl">
              <div className="text-[10px] font-mono text-[#474B4F] uppercase tracking-wider">Recommended Construction Methodology</div>
              <p className="mt-2 text-sm font-semibold text-[#D9D9D9]">{results.method}</p>
              <div className="mt-4 grid grid-cols-3 gap-3 text-[11px] font-mono">
                <div className="bg-[#1a1a1a] rounded-lg p-2.5 border border-[#3a3a3a]">
                  <div className="text-[#474B4F] uppercase">Diameter</div>
                  <div className="text-white font-bold mt-0.5">{d.label}</div>
                </div>
                <div className="bg-[#1a1a1a] rounded-lg p-2.5 border border-[#3a3a3a]">
                  <div className="text-[#474B4F] uppercase">Wall Spec</div>
                  <div className="text-white font-bold mt-0.5">{d.wt} mm</div>
                </div>
                <div className="bg-[#1a1a1a] rounded-lg p-2.5 border border-[#3a3a3a]">
                  <div className="text-[#474B4F] uppercase">Terrain</div>
                  <div className="text-white font-bold mt-0.5">{terrain.label}</div>
                </div>
              </div>
            </div>

            {/* Convert CTA */}
            <a href="#rfq" className="block w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-center text-white py-3 rounded-xl font-heading font-bold shadow-lg shadow-orange-600/25 transition text-sm uppercase tracking-wider">
              Convert to Official RFQ →
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

function ResultCard({ label, value, sub, color }: { label: string; value: string; sub: string; color: string }) {
  const colorMap: Record<string, string> = {
    amber: "text-amber-400", cyan: "text-cyan-400", emerald: "text-emerald-400", white: "text-white",
  };
  return (
    <div className="bg-[#2e2e2e] border border-[#4a4a4a] rounded-xl p-5 shadow-xl">
      <div className="text-[10px] font-mono text-[#474B4F] uppercase tracking-wider">{label}</div>
      <div className={`text-2xl sm:text-3xl font-mono font-extrabold mt-1 ${colorMap[color]}`}>{value}</div>
      <div className="text-[11px] text-[#9FA3A7] mt-1">{sub}</div>
    </div>
  );
}
