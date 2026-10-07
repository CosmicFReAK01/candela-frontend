/**
 * CandelaConstruction Microservices API Client Layer
 * Connects Next.js Frontend to Spring Boot Microservices through API Gateway (Port 8080)
 */

const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""; // Return empty for relative client-side paths
  if (process.env.NEXT_PUBLIC_API_URL) return process.env.NEXT_PUBLIC_API_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
};
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
}

// ── Tendering & Cost Estimator API ──
export async function submitRfq(data: RfqPayload): Promise<RfqResponse> {
  const url = typeof window !== "undefined" ? "/api/rfq" : `${typeof window !== "undefined" ? "" : API_BASE_URL}/api/rfq`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed to submit RFQ (HTTP ${res.status})`);
  }
  return await res.json();
}

export async function calculateEstimate(payload: CalculatorPayload): Promise<CalculatorResult> {
  try {
    const res = await fetch(`${typeof window !== "undefined" ? "" : API_BASE_URL}/api/calculator/estimate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    // Fallback formula if microservices are offline
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
}

// ── SCADA Telemetry & Operations API ──
export async function fetchScadaTelemetry(): Promise<TelemetryData | null> {
  try {
    const res = await fetch(`${typeof window !== "undefined" ? "" : API_BASE_URL}/api/scada/telemetry`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function tripScadaStation(stationId: string = "SV-04"): Promise<boolean> {
  try {
    const res = await fetch(`${typeof window !== "undefined" ? "" : API_BASE_URL}/api/scada/trip?stationId=${stationId}`, { method: "POST" });
    return res.ok;
  } catch {
    return false;
  }
}

export async function resetScadaStation(stationId: string = "SV-04"): Promise<boolean> {
  try {
    const res = await fetch(`${typeof window !== "undefined" ? "" : API_BASE_URL}/api/scada/reset?stationId=${stationId}`, { method: "POST" });
    return res.ok;
  } catch {
    return false;
  }
}

// ── HR Careers & Talent API ──
export async function submitJobApplication(payload: JobApplicationPayload): Promise<ApplicationResponse> {
  const url = typeof window !== "undefined" ? "/api/careers/apply" : `${typeof window !== "undefined" ? "" : API_BASE_URL}/api/careers/apply`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed to submit application (HTTP ${res.status})`);
  }
  return await res.json();
}

// ── Projects, Services & News API ──
export async function fetchProjects(category?: string) {
  try {
    const query = category && category !== "all" ? `?category=${category}` : "";
    const res = await fetch(`${typeof window !== "undefined" ? "" : API_BASE_URL}/api/projects${query}`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function fetchProjectBySlug(slug: string) {
  try {
    const res = await fetch(`${typeof window !== "undefined" ? "" : API_BASE_URL}/api/projects/${slug}`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function fetchServices() {
  try {
    const res = await fetch(`${typeof window !== "undefined" ? "" : API_BASE_URL}/api/services`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function fetchServiceBySlug(slug: string) {
  try {
    const res = await fetch(`${typeof window !== "undefined" ? "" : API_BASE_URL}/api/services/${slug}`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function fetchFleet() {
  try {
    const res = await fetch(`${typeof window !== "undefined" ? "" : API_BASE_URL}/api/fleet`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function fetchCareers() {
  try {
    const res = await fetch(`${typeof window !== "undefined" ? "" : API_BASE_URL}/api/careers`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function fetchNews() {
  try {
    const res = await fetch(`${typeof window !== "undefined" ? "" : API_BASE_URL}/api/news`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function fetchNewsById(id: string) {
  try {
    const res = await fetch(`${typeof window !== "undefined" ? "" : API_BASE_URL}/api/news/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function fetchStates() {
  try {
    const res = await fetch(`${typeof window !== "undefined" ? "" : API_BASE_URL}/api/states`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function fetchStats() {
  try {
    const res = await fetch(`${typeof window !== "undefined" ? "" : API_BASE_URL}/api/stats`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function fetchHse() {
  try {
    const res = await fetch(`${typeof window !== "undefined" ? "" : API_BASE_URL}/api/hse`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
