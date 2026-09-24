"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { Container } from "./Container";
import { SectionHeading } from "./SectionHeading";
import { fetchScadaTelemetry, tripScadaStation, resetScadaStation, ScadaStation } from "@/lib/api";

interface LogEntry { time: string; text: string; type: "info" | "warn" | "error" | "success" }

const initialStations: ScadaStation[] = [
  { id: "SV-01", name: "Origin Compressor Station", kp: "KP 0.0", basePressure: 98.2, pressure: 98.2, status: "ONLINE" },
  { id: "SV-02", name: "Intermediate Block Valve #1", kp: "KP 142.5", basePressure: 94.6, pressure: 94.6, status: "ONLINE" },
  { id: "SV-03", name: "River Crossing SV Station", kp: "KP 286.0", basePressure: 91.3, pressure: 91.3, status: "ONLINE" },
  { id: "SV-04", name: "Terminus Delivery Station", kp: "KP 422.8", basePressure: 87.8, pressure: 87.8, status: "ONLINE" },
];

export function ScadaSimulator() {
  const [stations, setStations] = useState<ScadaStation[]>(initialStations);
  const [flow, setFlow] = useState(82.5);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [tripped, setTripped] = useState(false);
  const [isBackendConnected, setIsBackendConnected] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const addLog = useCallback((text: string, type: LogEntry["type"] = "info") => {
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;
    setLogs(prev => [...prev.slice(-30), { time, text, type }]);
  }, []);

  // Live telemetry polling from Spring Boot Operations microservice
  useEffect(() => {
    const syncTelemetry = async () => {
      const data = await fetchScadaTelemetry();
      if (data && data.stations && data.stations.length > 0) {
        setIsBackendConnected(true);
        setStations(data.stations);
        setFlow(data.flowRate);
        setTripped(data.esdActive);
      } else {
        // Local simulation fallback
        setStations(prev => prev.map(s => {
          if (s.status === "TRIPPED") return s;
          const delta = (Math.random() - 0.5) * 0.8;
          return { ...s, pressure: Math.round((s.basePressure + delta) * 10) / 10 };
        }));
        setFlow(prev => Math.round((prev + (Math.random() - 0.5) * 1.2) * 10) / 10);
      }
    };

    syncTelemetry();
    timerRef.current = setInterval(syncTelemetry, 2500);

    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  // Auto-scroll logs
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [logs]);

  // Initial log
  useEffect(() => {
    addLog("SCADA Industrial Automation Service Initialized", "success");
    addLog("Sectionalizing Valve Stations SV-01 through SV-04 reporting ONLINE", "info");
  }, [addLog]);

  const handleTrip = async () => {
    if (tripped) return;
    setTripped(true);
    addLog("⚡ ESD ACTIVATED: SV-04 Terminus Delivery Station valve TRIP issued", "error");
    addLog("SV-04 pneumatic actuator driving to FAIL-SAFE CLOSED position...", "warn");

    // Call Spring Boot backend
    await tripScadaStation("SV-04");

    setStations(prev => prev.map(s =>
      s.id === "SV-04" ? { ...s, status: "TRIPPED", pressure: 0 } : s
    ));

    // Auto-recover after 6 seconds
    setTimeout(async () => {
      await resetScadaStation("SV-04");
      setStations(prev => prev.map(s =>
        s.id === "SV-04" ? { ...s, status: "ONLINE", pressure: s.basePressure } : s
      ));
      setTripped(false);
      addLog("Auto-repressurization sequence completed — Linepack nominal", "success");
    }, 6000);
  };

  const statusColor = (st: string) => {
    if (st === "ONLINE") return "text-emerald-400";
    if (st === "TRIPPED") return "text-red-400 animate-pulse";
    return "text-amber-400";
  };

  const logColor = (tp: LogEntry["type"]) => {
    if (tp === "error") return "text-red-400";
    if (tp === "warn") return "text-amber-400";
    if (tp === "success") return "text-emerald-400";
    return "text-[#9FA3A7]";
  };

  return (
    <section id="scada" className="py-20 bg-[#141414] border-b border-[#3a3a3a]">
      <Container>
        <div className="flex items-center justify-between flex-wrap gap-4 mb-3">
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {isBackendConnected ? "SPRING BOOT SCADA TELEMETRY (PORT 8083)" : "SIMULATED TELEMETRY FEED"}
          </span>
          <span className="text-[10px] font-mono text-[#888]">
            API 1130 / OISD 226 PIPELINE INTEGRITY
          </span>
        </div>

        <SectionHeading
          eyebrow="SCADA TELEMETRY & LINEPACK SIMULATOR"
          title="Real-time pipeline monitoring and automated sectionalizing valve automation."
          description="Interactive simulation of our central control room SCADA dashboard. Live telemetry from sectionalizing valves, linepack pressure profiling, and ESD fail-safe demonstration."
        />

        <div className="mt-10 bg-[#1a1a1a] border border-[#4a4a4a] rounded-2xl shadow-2xl overflow-hidden scada-screen">
          {/* SCADA Header */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-[#3a3a3a] bg-[#1a1a1a]">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-emerald-400 font-bold">SYSTEM LIVE</span>
              <span className="text-[#474B4F]">|</span>
              <span className="text-[#9FA3A7]">42&quot; Western Gas Corridor Trunkline — 422.8 KM</span>
            </div>
            <div className="hidden sm:flex items-center gap-3 text-[10px] font-mono text-[#9FA3A7]">
              <span>Gas Gravity: <span className="text-white font-bold">0.605</span></span>
              <span>THT Odorization: <span className="text-emerald-400 font-bold">18 mg/m³</span></span>
            </div>
          </div>

          <div className="p-5 space-y-5">
            {/* Pipeline Flow Schematic */}
            <div className="bg-[#242424] border border-[#3a3a3a] rounded-xl p-4 overflow-hidden">
              <div className="text-[10px] font-mono text-[#474B4F] mb-3">PIPELINE FLOW SCHEMATIC — SECTION VIEW</div>
              <svg viewBox="0 0 800 100" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
                {/* Main Pipeline */}
                <line x1="30" y1="50" x2="770" y2="50" stroke="#474B4F" strokeWidth="8" strokeLinecap="round" />
                <line x1="30" y1="50" x2="770" y2="50" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" strokeDasharray="10,8" className="animate-flow" />

                {/* Station Nodes */}
                {stations.map((s, i) => {
                  const x = 80 + i * 220;
                  const isTripped = s.status === "TRIPPED";
                  return (
                    <g key={s.id}>
                      <circle cx={x} cy={50} r={16} fill={isTripped ? "#450a0a" : "#1a1a1a"} stroke={isTripped ? "#dc2626" : "#f59e0b"} strokeWidth={isTripped ? 3 : 2} />
                      <text x={x} y={54} textAnchor="middle" fill={isTripped ? "#f87171" : "#ffffff"} fontSize="9" fontFamily="monospace" fontWeight="bold">
                        {s.id}
                      </text>
                      <text x={x} y={82} textAnchor="middle" fill="#9FA3A7" fontSize="7" fontFamily="monospace">
                        {s.kp}
                      </text>
                      <text x={x} y={30} textAnchor="middle" fill={isTripped ? "#f87171" : "#10b981"} fontSize="8" fontFamily="monospace" fontWeight="bold">
                        {s.pressure > 0 ? `${s.pressure} bar` : "ISOLATED"}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="grid lg:grid-cols-12 gap-4">
              {/* Station Pressures */}
              <div className="lg:col-span-7 grid sm:grid-cols-2 gap-3">
                {stations.map(s => (
                  <div key={s.id} className={`bg-[#242424] border rounded-xl p-4 ${
                    s.status === "TRIPPED" ? "border-red-500/50" : "border-[#3a3a3a]"
                  }`}>
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="text-[#9FA3A7]">{s.id} — {s.kp}</span>
                      <span className={`font-bold ${statusColor(s.status)}`}>● {s.status}</span>
                    </div>
                    <div className="text-xs font-semibold text-[#D9D9D9] mt-1">{s.name}</div>
                    <div className="mt-2">
                      <div className={`text-2xl font-mono font-extrabold ${
                        s.status === "TRIPPED" ? "text-red-400" : "text-cyan-400"
                      }`}>
                        {s.pressure > 0 ? `${s.pressure}` : "0.0"}
                        <span className="text-sm text-[#9FA3A7] ml-1">bar</span>
                      </div>
                      {/* Pressure Bar */}
                      <div className="mt-1.5 w-full h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ${
                            s.status === "TRIPPED" ? "bg-red-500" : "bg-gradient-to-r from-cyan-500 to-emerald-500"
                          }`}
                          style={{ width: `${(s.pressure / 100) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Panel */}
              <div className="lg:col-span-5 space-y-3">
                {/* Flow Rate & Gas Spec */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#242424] border border-[#3a3a3a] rounded-xl p-3 text-center">
                    <div className="text-[10px] font-mono text-[#474B4F] uppercase">Flow Rate</div>
                    <div className="text-xl font-mono font-extrabold text-amber-400 mt-1">{flow}<span className="text-[10px] text-[#9FA3A7] ml-0.5">MMSCMD</span></div>
                  </div>
                  <div className="bg-[#242424] border border-[#3a3a3a] rounded-xl p-3 text-center">
                    <div className="text-[10px] font-mono text-[#474B4F] uppercase">Leak Detection</div>
                    <div className="text-xl font-mono font-extrabold text-emerald-400 mt-1">CLEAR</div>
                    <div className="text-[9px] text-[#9FA3A7]">Fiber Optic DAS</div>
                  </div>
                </div>

                {/* ESD Trip Button */}
                <button
                  onClick={handleTrip}
                  disabled={tripped}
                  className={`w-full py-3 rounded-xl font-mono font-bold text-xs uppercase tracking-wider transition border flex items-center justify-center gap-2 ${
                    tripped
                      ? "bg-red-950/50 border-red-800/40 text-red-400 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-500 border-red-500 text-white shadow-lg shadow-red-600/30 active:scale-95"
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  {tripped ? "ESD ACTIVE — Auto-Recovery in Progress..." : "Simulate Emergency Valve Trip (SV-04)"}
                </button>

                {/* Event Logger */}
                <div className="bg-[#242424] border border-[#3a3a3a] rounded-xl overflow-hidden">
                  <div className="px-3 py-2 bg-[#1a1a1a] border-b border-[#3a3a3a] text-[10px] font-mono font-bold text-[#9FA3A7] uppercase tracking-wider">
                    Event Logger Console
                  </div>
                  <div ref={logRef} className="h-36 overflow-y-auto p-3 space-y-1">
                    {logs.map((l, i) => (
                      <div key={i} className={`text-[11px] font-mono ${logColor(l.type)}`}>
                        <span className="text-[#474B4F]">[{l.time}]</span> {l.text}
                      </div>
                    ))}
                    {logs.length === 0 && (
                      <div className="text-[11px] font-mono text-[#474B4F]">Awaiting events...</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
