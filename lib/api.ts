/**
 * CandelaConstruction Unified API Client Layer
 * Connects Next.js Frontend to PostgreSQL / Supabase Database and Microservices
 */

export function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_API_URL) return process.env.NEXT_PUBLIC_API_URL;
  if (typeof window !== "undefined") return ""; // Browser uses relative same-origin URLs
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export const API_BASE_URL = getBaseUrl();

export interface RfqPayload {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  location: string;
  approxLength: string;
  diameter: string;
  projectType: string;
  description: string;
}

export interface RfqResponse {
  success: boolean;
  referenceNo: string;
  message: string;
  status: string;
  estimatedTurnaround: string;
  timestamp?: string;
  data?: any;
}

export interface CalculatorPayload {
  diameterInches: number;
  wallThicknessMm: number;
  lengthKm: number;
  terrainIndex: number;
  pressureIndex: number;
}

export interface CalculatorResult {
  steelTonnage: string;
  waterKL: string;
  joints: string;
  costCr: string;
  grade: string;
  method: string;
  standard: string;
  lengthKm: number;
  diameterInches: number;
}

export interface ScadaStation {
  id: string;
  name: string;
  kp: string;
  basePressure: number;
  pressure: number;
  status: string;
}

export interface TelemetryData {
  stations: ScadaStation[];
  flowRate: number;
  esdActive: boolean;
  activeAlarmCount: number;
  gridStatus: string;
}

export interface JobApplicationPayload {
  positionTitle: string;
  name: string;
  email: string;
  phone: string;
  experience: string;
  location: string;
}

export interface ApplicationResponse {
  success: boolean;
  applicationRef: string;
  message: string;
  positionTitle: string;
  timestamp?: string;
  data?: any;
}

// ── Tendering & Cost Estimator API ──
export async function submitRfq(data: RfqPayload): Promise<RfqResponse> {
  const base = getBaseUrl();
  const res = await fetch(`${base}/api/rfq`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || `HTTP error ${res.status}`);
  }

  return await res.json();
}

export async function calculateEstimate(payload: CalculatorPayload): Promise<CalculatorResult> {
  const base = getBaseUrl();
  try {
    const res = await fetch(`${base}/api/calculator/estimate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) return await res.json();
  } catch {
    // Fall back to embedded physics formula
  }

  // Fallback formula
  const od_mm = payload.diameterInches * 25.4;
  const id_mm = od_mm - 2 * payload.wallThicknessMm;
  const steelKgPerM = (Math.PI * (od_mm - payload.wallThicknessMm) * payload.wallThicknessMm * 7850) / 1e6;
  const totalSteel = (steelKgPerM * payload.lengthKm * 1000) / 1000;
  const joints = Math.round((payload.lengthKm * 1000) / 12.1);
  const waterVolume = Math.PI * Math.pow(id_mm / 2000, 2) * payload.lengthKm * 1000 * 1.15;
  const baseCostPerKM = payload.diameterInches < 20 ? 3.2 : payload.diameterInches < 36 ? 5.8 : 9.5;
  const terrainMult = [1.0, 1.55, 2.3, 1.4, 1.7][payload.terrainIndex] || 1.0;
  const pressFact = [1.0, 1.12, 1.3, 1.55][payload.pressureIndex] || 1.3;
  const totalCostCr = baseCostPerKM * payload.lengthKm * terrainMult * pressFact;

  return {
    steelTonnage: Math.round(totalSteel).toLocaleString(),
    waterKL: Math.round(waterVolume).toLocaleString(),
    joints: joints.toLocaleString(),
    costCr: totalCostCr.toFixed(1),
    grade: payload.diameterInches >= 36 ? "API 5L X70 / X80 PSL2" : "API 5L X60 / X70 PSL2",
    method: "Standard open-cut trenching in soft soil",
    standard: "API 1104 / ASME B31.8 / OISD 226",
    lengthKm: payload.lengthKm,
    diameterInches: payload.diameterInches,
  };
}

// ── SCADA Telemetry & Operations API ──
export async function fetchScadaTelemetry(): Promise<TelemetryData | null> {
  const base = getBaseUrl();
  try {
    const res = await fetch(`${base}/api/scada/telemetry`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function tripScadaStation(stationId: string = "SV-04"): Promise<boolean> {
  const base = getBaseUrl();
  try {
    const res = await fetch(`${base}/api/scada/trip?stationId=${stationId}`, { method: "POST" });
    return res.ok;
  } catch {
    return false;
  }
}

export async function resetScadaStation(stationId: string = "SV-04"): Promise<boolean> {
  const base = getBaseUrl();
  try {
    const res = await fetch(`${base}/api/scada/reset?stationId=${stationId}`, { method: "POST" });
    return res.ok;
  } catch {
    return false;
  }
}

// ── HR Careers & Talent API ──
export async function submitJobApplication(payload: JobApplicationPayload): Promise<ApplicationResponse> {
  const base = getBaseUrl();
  const res = await fetch(`${base}/api/careers/apply`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || `HTTP error ${res.status}`);
  }

  return await res.json();
}

// ── Projects, Services & News API ──
export async function fetchProjects(category?: string) {
  const base = getBaseUrl();
  try {
    const query = category && category !== "all" ? `?category=${category}` : "";
    const res = await fetch(`${base}/api/projects${query}`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function fetchProjectBySlug(slug: string) {
  const base = getBaseUrl();
  try {
    const res = await fetch(`${base}/api/projects/${slug}`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function fetchServices() {
  const base = getBaseUrl();
  try {
    const res = await fetch(`${base}/api/services`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function fetchServiceBySlug(slug: string) {
  const base = getBaseUrl();
  try {
    const res = await fetch(`${base}/api/services/${slug}`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function fetchFleet() {
  const base = getBaseUrl();
  try {
    const res = await fetch(`${base}/api/fleet`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function fetchCareers() {
  const base = getBaseUrl();
  try {
    const res = await fetch(`${base}/api/careers`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function fetchNews() {
  const base = getBaseUrl();
  try {
    const res = await fetch(`${base}/api/news`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function fetchNewsById(id: string) {
  const base = getBaseUrl();
  try {
    const res = await fetch(`${base}/api/news/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function fetchStates() {
  const base = getBaseUrl();
  try {
    const res = await fetch(`${base}/api/states`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function fetchStats() {
  const base = getBaseUrl();
  try {
    const res = await fetch(`${base}/api/stats`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function fetchHse() {
  const base = getBaseUrl();
  try {
    const res = await fetch(`${base}/api/hse`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
