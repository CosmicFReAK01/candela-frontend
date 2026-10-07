"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "./Container";
import { ArrowRight, Activity, ShieldCheck, MapPin, Gauge } from "lucide-react";
import { clients as fallbackClients } from "@/data/site";
import { fetchClients } from "@/lib/api";

export function Hero({ content }: { content?: any }) {
  const [pressure, setPressure] = useState(98.3);
  const [clientList, setClientList] = useState(fallbackClients);

  useEffect(() => {
    fetchClients().then(data => {
      if (data && Array.isArray(data) ) {
        setClientList(data);
      }
    });
  }, []);

  const pillText = content?.pillText || "Pan-India Pipeline EPC & Infrastructure Contractor";
  const pillBadge = content?.pillBadge || "ASME B31.8 / API 1104";
  const title = content?.title || "Building the Infrastructure Behind India's Energy Future.";
  const subtitle = content?.subtitle || "Specialized pipeline construction, engineering and infrastructure solutions for natural gas, hydrocarbons and industrial applications across challenging terrains.";
  const btnServices = content?.btnServices || "Our Services";
  const btnProjects = content?.btnProjects || "View Projects";
  const btnQuote = content?.btnQuote || "Request a Quote";
  const badge1Val = content?.badge1Value || "3,850+ KM";
  const badge1Lbl = content?.badge1Label || "Laid & Commissioned";
  const badge2Val = content?.badge2Value || "180+ HDD";
  const badge2Lbl = content?.badge2Label || "Major River Crossings";
  const badge3Val = content?.badge3Value || "28.4M Hrs";
  const badge3Lbl = content?.badge3Label || "LTI-Free Safe Hours";

  useEffect(() => {
    const timer = setInterval(() => {
      setPressure(Number((98.1 + Math.random() * 0.4).toFixed(1)));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-[90vh] flex flex-col justify-center bg-[#F8F4EC] overflow-hidden border-b border-[#D9D9D9]">
      {/* ── Architectural Pattern & Subtle Grid ── */}
      <div className="absolute inset-0 bg-[radial-gradient(#C69C6D_1px,transparent_1px)] [background-size:28px_28px] opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[#C69C6D]/10 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-20 py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* ── Left Content Column ── */}
          <div className="lg:col-span-7 space-y-8">
            {/* Top Operational Pill */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border border-[#D9D9D9] text-xs font-mono shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
              </span>
              <span className="text-[#242424] font-medium">{pillText}</span>
              <span className="text-[#D9D9D9]">|</span>
              <span className="text-[#9E7444] font-bold">{pillBadge}</span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#242424] tracking-tight leading-[1.08]">
                {title}
              </h1>
              <p className="text-[#4A4D50] text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-2xl">
                {subtitle}
              </p>
            </motion.div>

            {/* 3 Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Link
                href="/services"
                className="bg-[#C69C6D] hover:bg-[#B08554] text-[#242424] font-bold px-6 py-3.5 rounded-xl text-sm transition-all duration-200 flex items-center gap-2 shadow-md shadow-[#C69C6D]/20 active:scale-95"
              >
                <span>{btnServices}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/projects"
                className="bg-white hover:bg-[#F3EFE7] text-[#242424] font-semibold px-6 py-3.5 rounded-xl text-sm border border-[#D9D9D9] transition-all duration-200 flex items-center gap-2 shadow-sm"
              >
                <span>{btnProjects}</span>
              </Link>

              <Link
                href="/contact#rfq"
                className="bg-transparent hover:bg-white text-[#9E7444] font-bold px-5 py-3.5 rounded-xl text-sm border border-[#C69C6D]/60 transition flex items-center gap-2"
              >
                <span>{btnQuote}</span>
              </Link>
            </motion.div>

            {/* Key Quick Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-3 gap-4 pt-4 border-t border-[#D9D9D9] max-w-xl text-xs"
            >
              <div>
                <div className="font-mono text-[#242424] font-bold text-xl sm:text-2xl">{badge1Val}</div>
                <div className="text-[#6B6F73] mt-0.5 font-medium">{badge1Lbl}</div>
              </div>
              <div>
                <div className="font-mono text-[#9E7444] font-bold text-xl sm:text-2xl">{badge2Val}</div>
                <div className="text-[#6B6F73] mt-0.5 font-medium">{badge2Lbl}</div>
              </div>
              <div>
                <div className="font-mono text-emerald-600 font-bold text-xl sm:text-2xl">{badge3Val}</div>
                <div className="text-[#6B6F73] mt-0.5 font-medium">{badge3Lbl}</div>
              </div>
            </motion.div>
          </div>

          {/* ── Right Animated India Pipeline Schematic ── */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative bg-white border border-[#D9D9D9] rounded-2xl p-6 shadow-xl overflow-hidden"
            >
              {/* Header inside Telemetry Card */}
              <div className="flex items-center justify-between pb-4 border-b border-[#D9D9D9]">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-[#C69C6D] animate-pulse" />
                  <span className="font-mono text-xs font-bold text-[#242424] tracking-wider">
                    REGIONAL TRANSMISSION SCHEMATIC
                  </span>
                </div>
                <span className="font-mono text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  TRANSMITTING
                </span>
              </div>

              {/* Animated SVG Pipeline Network: Chapra (Saran) to Vaishali, Muzaffarpur & Samastipur */}
              <div className="relative my-4 aspect-[4/3] bg-[#F8F4EC] rounded-xl border border-[#D9D9D9] flex items-center justify-center p-2 overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 460 320" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Subtle Architectural Grid */}
                  <defs>
                    <pattern id="lightGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E5E0D6" strokeWidth="0.75" />
                    </pattern>
                    <linearGradient id="lightPipeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#C69C6D" />
                      <stop offset="50%" stopColor="#B08554" />
                      <stop offset="100%" stopColor="#8C6239" />
                    </linearGradient>
                  </defs>
                  <rect width="460" height="320" fill="url(#lightGrid)" />

                  {/* River Flow: Ganga & Gandak River Systems */}
                  <path
                    d="M 10 260 Q 120 235 220 250 T 350 275 T 450 285"
                    stroke="#BCD4E6"
                    strokeWidth="5.5"
                    fill="none"
                    strokeLinecap="round"
                    opacity="0.55"
                  />
                  <text x="45" y="278" fill="#7A9AA8" fontSize="8" fontFamily="monospace" fontWeight="bold">
                    GANGA RIVER
                  </text>

                  <path
                    d="M 130 20 Q 170 110 200 235"
                    stroke="#BCD4E6"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    opacity="0.45"
                  />
                  <text x="148" y="70" fill="#7A9AA8" fontSize="7.5" fontFamily="monospace">
                    GANDAK RIVER
                  </text>

                  {/* Mainline Trunk: Chapra -> Vaishali (Hajipur) -> Muzaffarpur -> Samastipur */}
                  {/* Segment 1: Chapra (Saran) to Vaishali (Hajipur) with Marhaura Spur */}
                  <path d="M 80 195 L 205 195" stroke="#D9D9D9" strokeWidth="6.5" strokeLinecap="round" />
                  <path
                    d="M 80 195 L 205 195"
                    stroke="url(#lightPipeGrad)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeDasharray="8 6"
                    className="animate-[flowDash_12s_linear_infinite]"
                  />

                  {/* Marhaura Sub-District Spur */}
                  <path d="M 80 195 L 115 110" stroke="#D9D9D9" strokeWidth="4" strokeLinecap="round" strokeDasharray="3 3" />
                  <path d="M 80 195 L 115 110" stroke="#C69C6D" strokeWidth="2" strokeLinecap="round" strokeDasharray="5 4" />

                  {/* Segment 2: Vaishali (Hajipur) to Muzaffarpur (Kanti/Motipur) */}
                  <path d="M 205 195 L 295 85" stroke="#D9D9D9" strokeWidth="6.5" strokeLinecap="round" />
                  <path
                    d="M 205 195 L 295 85"
                    stroke="url(#lightPipeGrad)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeDasharray="8 6"
                    className="animate-[flowDash_10s_linear_infinite]"
                  />

                  {/* Segment 3: Muzaffarpur to Samastipur (Dalsinghsarai) */}
                  <path d="M 295 85 L 385 175" stroke="#D9D9D9" strokeWidth="6.5" strokeLinecap="round" />
                  <path
                    d="M 295 85 L 385 175"
                    stroke="url(#lightPipeGrad)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeDasharray="8 6"
                    className="animate-[flowDash_14s_linear_infinite]"
                  />

                  {/* Vaishali to Samastipur direct link loop */}
                  <path d="M 205 195 L 385 175" stroke="#C69C6D" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.4" />

                  {/* Sub-District Hub Nodes */}
                  {/* 1. Chapra (Saran District Hub) */}
                  <g className="cursor-pointer">
                    <circle cx="80" cy="195" r="12" fill="#C69C6D" fillOpacity="0.25" className="animate-ping" />
                    <circle cx="80" cy="195" r="7" fill="#C69C6D" stroke="#FFFFFF" strokeWidth="2" />
                    <text x="80" y="176" fill="#242424" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">CHAPRA (SARAN)</text>
                    <text x="80" y="215" fill="#787B7E" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Revelganj • Sonpur</text>
                  </g>

                  {/* 2. Marhaura Sub-District Spur */}
                  <g>
                    <circle cx="115" cy="110" r="5" fill="#242424" stroke="#FFFFFF" strokeWidth="1.5" />
                    <text x="115" y="98" fill="#242424" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">MARHAURA</text>
                    <text x="115" y="125" fill="#787B7E" fontSize="7" fontFamily="monospace" textAnchor="middle">Garkha Spur</text>
                  </g>

                  {/* 3. Vaishali (Hajipur Gandak Crossing) */}
                  <g className="cursor-pointer">
                    <circle cx="205" cy="195" r="10" fill="#C69C6D" fillOpacity="0.3" className="animate-pulse" />
                    <circle cx="205" cy="195" r="6" fill="#C69C6D" stroke="#FFFFFF" strokeWidth="2" />
                    <text x="205" y="215" fill="#242424" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">VAISHALI</text>
                    <text x="205" y="227" fill="#787B7E" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Hajipur • Lalganj • Mahua</text>
                  </g>

                  {/* 4. Muzaffarpur (Kanti / Motipur / Sakra) */}
                  <g className="cursor-pointer">
                    <circle cx="295" cy="85" r="11" fill="#C69C6D" fillOpacity="0.3" className="animate-pulse" />
                    <circle cx="295" cy="85" r="6.5" fill="#242424" stroke="#FFFFFF" strokeWidth="2" />
                    <text x="295" y="68" fill="#242424" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">MUZAFFARPUR</text>
                    <text x="295" y="56" fill="#787B7E" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Kanti • Motipur • Sakra</text>
                  </g>

                  {/* 5. Samastipur (Dalsinghsarai / Rosera / Pusa) */}
                  <g className="cursor-pointer">
                    <circle cx="385" cy="175" r="10" fill="#C69C6D" fillOpacity="0.25" className="animate-pulse" />
                    <circle cx="385" cy="175" r="6" fill="#C69C6D" stroke="#FFFFFF" strokeWidth="2" />
                    <text x="385" y="196" fill="#242424" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">SAMASTIPUR</text>
                    <text x="385" y="208" fill="#787B7E" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Dalsinghsarai • Rosera • Pusa</text>
                  </g>
                </svg>

                {/* Floating Telemetry Stamp */}
                <div className="absolute bottom-3 left-3 bg-white/95 border border-[#D9D9D9] px-2.5 py-1 rounded text-[10px] font-mono text-[#242424] flex items-center gap-2 shadow-sm">
                  <Gauge className="w-3.5 h-3.5 text-[#9E7444]" />
                  <span className="font-semibold">LINE PRESSURE: {pressure} BAR</span>
                </div>

                <div className="absolute top-3 right-3 bg-white/90 border border-[#D9D9D9] px-2 py-0.5 rounded text-[9px] font-mono text-[#6B6F73] shadow-xs">
                  SARAN → VAISHALI → MUZAFFARPUR → SAMASTIPUR
                </div>
              </div>

              {/* Real-time Technical Specs Footer */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#D9D9D9] text-xs font-mono">
                <div className="bg-[#F8F4EC] p-2.5 rounded-lg border border-[#D9D9D9]">
                  <div className="text-[10px] text-[#787B7E]">MAINLINE DIAMETER</div>
                  <div className="text-[#242424] font-bold mt-0.5">42" OD API 5L X70</div>
                </div>
                <div className="bg-[#F8F4EC] p-2.5 rounded-lg border border-[#D9D9D9]">
                  <div className="text-[10px] text-[#787B7E]">WELD INTEGRITY</div>
                  <div className="text-emerald-700 font-bold mt-0.5">100% PAUT / AUT</div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </Container>

      {/* ── Client Endorsements Bar ── */}
      <div className="border-t border-[#D9D9D9] bg-[#F3EFE7] py-5">
        <Container>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="text-xs uppercase font-mono text-[#787B7E] tracking-widest font-semibold">
              TRUSTED BY NATIONAL OPERATORS:
            </div>
            <div className="flex flex-wrap items-center gap-6 sm:gap-10 text-xs sm:text-sm font-bold text-[#242424]">
              {clientList.map((c: any) => (
                <span key={c.id || c.name} className="hover:text-[#9E7444] transition-colors cursor-default">
                  {c.logoText || c.name.slice(0, 5).toUpperCase()}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}