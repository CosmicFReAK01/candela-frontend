/* ══════════════════════════════════════════════════════════════════
   CandelaConstruction Private Limited — Trust delivered.
   Enterprise Infrastructure Data Layer
   ══════════════════════════════════════════════════════════════════ */

export interface ServiceItem {
  id: string;
  n: string;
  icon: string;
  title: string;
  slug: string;
  text: string;
  bullets: string[];
  subcategories?: string[];
  standard: string;
  color: "amber" | "cyan" | "emerald" | "orange" | "red";
  specifications: { label: string; value: string }[];
}

export interface ProjectItem {
  id: string;
  slug: string;
  cat: "cross-country" | "hdd" | "cgd" | "plant-piping";
  tag: string;
  tagColor: "amber" | "cyan" | "emerald" | "orange" | "red";
  title: string;
  meta: string;
  diameter: string;
  length: string;
  wallThickness: string;
  pressure: string;
  duration: string;
  location: string;
  state: string;
  client: string;
  projectType: string;
  status: "Completed" | "Ongoing";
  shortDesc: string;
  description: string;
  scopeOfWork: string[];
  keyChallenges: string[];
  execution: string[];
  highlights: string[];
  galleryImages: { title: string; caption: string }[];
  specLabel: string;
  specValue: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  desc: string;
  details: string;
  deliverables: string[];
  standard: string;
}

export interface EquipmentItem {
  name: string;
  application: string;
  specs: string;
  capacity: string;
  quantity: string;
  category: "Pipelaying" | "Trenchless" | "Welding" | "Testing" | "Earthmoving";
}

/* ──────────────── Trust / Statistics ──────────────── */
export const stats: any[] = [];

/* ──────────────── Tier-1 Clients ──────────────── */
export const clients: any[] = [];

/* ──────────────── Complete 10 Core Services ──────────────── */
export const services: ServiceItem[] = [];

/* ──────────────── 12-Step Construction Process Lifecycle ──────────────── */
export const constructionProcess: ProcessStep[] = [];

/* ──────────────── Detailed Project Case Studies ──────────────── */
export const projects: ProjectItem[] = [];

/* ──────────────── Interactive Regional Project Hubs & Sub-Districts ──────────────── */
export const indiaProjectStates: any[] = [];

/* ──────────────── Equipment Fleet ──────────────── */
export const fleetEquipment: EquipmentItem[] = [];

/* ──────────────── HSE & Quality Management ──────────────── */
export const hseMetrics = {
  safeManHours: "28.4 Million",
  ltifr: "0.00",
  environmentalRestoration: "100%",
  zeroFailureHydrotests: "100%",
  goldenSafetyRules: 14,
  trainingsConducted: "45,000+ Hours",
};

export const certifications: any[] = [];

/* ──────────────── Leadership Team ──────────────── */
export const leadershipTeam: any[] = [];

/* ──────────────── Why Choose Us 6 Pillars ──────────────── */
export const whyChooseUsPillars: any[] = [];

/* ──────────────── Careers / Open Positions ──────────────── */
export const openPositions: any[] = [];

/* ──────────────── Corporate News & Milestones ──────────────── */
export const corporateNews: any[] = [];