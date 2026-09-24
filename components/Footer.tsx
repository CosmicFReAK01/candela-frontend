"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Container } from "./Container";
import { PhoneCall, Mail, MapPin, ShieldCheck, ArrowUpRight } from "lucide-react";

export function Footer() {
  const [settings, setSettings] = useState({
    company_name: "CandelaConstruction Private Limited",
    tagline: "Trust delivered.",
    control_room_hotline: "1800-180-9999",
    compliance_codes: "PNGRB / ASME B31.8 / API 1104",
    safe_hours: "28.4 Million Safe Hours LTI-Free Record",
    iso_badges: "ISO 9001:2015, ISO 14001, ISO 45001",
    contact_email: "tenders@candelaconstruction.com",
    office_address: "Candela House, Energy Corridor Complex, North Bihar Regional Base, India",
    emergency_phone: "+91 1800-180-9999",
  });

  useEffect(() => {
    fetch("/api/settings", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && !data.error) {
          setSettings((prev) => ({
            ...prev,
            ...data,
          }));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <footer className="bg-white border-t border-[#D9D9D9] text-[#242424] pt-16 pb-12">
      <Container>
        {/* ── Top Row: Brand & Quick Emergency ── */}
        <div className="grid gap-8 lg:grid-cols-12 pb-12 border-b border-[#D9D9D9]">
          <div className="lg:col-span-5 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-[#C69C6D] via-[#B08554] to-[#8C6239] rounded-xl flex items-center justify-center p-2 shadow-sm group-hover:scale-105 transition-transform">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M4 14h6v6H4z" /><path d="M14 4h6v6h-6z" />
                  <path d="M10 17h4a2 2 0 002-2v-4" /><circle cx="17" cy="17" r="3" />
                </svg>
              </div>
              <div>
                <div className="font-heading font-black text-xl text-[#242424] tracking-tight">
                  CANDELA <span className="text-[#C69C6D]">CONSTRUCTION</span>
                </div>
                <div className="text-[10px] uppercase font-mono text-[#9E7444] font-bold tracking-widest mt-0.5">
                  {settings.tagline || "Trust delivered."}
                </div>
              </div>
            </Link>

            <p className="text-xs text-[#5A5E62] max-w-sm leading-relaxed">
              {settings.company_name} is a specialized pipeline construction and EPC contractor delivering high-pressure cross-country transmission trunklines, trenchless river HDD crossings, and city gas distribution grids.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-[#9E7444] font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{settings.safe_hours?.includes("Safe Hours") ? settings.safe_hours : `${settings.safe_hours} Safe Hours Record`}</span>
            </div>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            {/* Emergency Hotline Box */}
            <div className="bg-red-50/80 border border-red-200 p-4 rounded-xl space-y-2 shadow-xs">
              <div className="flex items-center gap-2 text-red-700 text-xs font-mono font-bold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
                </span>
                24x7 PIPELINE CONTROL ROOM
              </div>
              <a
                href={`tel:${settings.control_room_hotline?.replace(/[^0-9]/g, "") || "18001809999"}`}
                className="text-red-950 font-mono font-bold text-xl block hover:text-red-700 transition"
              >
                {settings.control_room_hotline || "1800-180-9999"}
              </a>
              <p className="text-[11px] text-[#5A5E62]">
                Rapid emergency response, leak reporting & right-of-way alert dispatch.
              </p>
            </div>

            {/* Corporate Head Office */}
            <div className="bg-[#F8F4EC] border border-[#D9D9D9] p-4 rounded-xl space-y-2 text-xs shadow-xs">
              <div className="font-mono text-[#9E7444] font-bold uppercase">
                REGISTERED CORPORATE OFFICE
              </div>
              <p className="text-[#242424] font-medium leading-relaxed">
                {settings.office_address || "Candela House, Energy Corridor Complex, North Bihar Regional Base, India"}
              </p>
              <div className="text-[#5A5E62] font-mono text-[11px] pt-1">
                {settings.contact_email || "tenders@candelaconstruction.com"}
              </div>
            </div>
          </div>
        </div>

        {/* ── Corporate Sitemap Hierarchy ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 py-12 border-b border-[#D9D9D9] text-xs">
          {/* About Us */}
          <div className="space-y-3">
            <h4 className="font-mono font-bold text-[#242424] uppercase tracking-wider text-[11px]">
              About Us
            </h4>
            <ul className="space-y-2 text-[#5A5E62]">
              <li><Link href="/about" className="hover:text-[#C69C6D] transition font-medium">Company Overview</Link></li>
              <li><Link href="/about#vision" className="hover:text-[#C69C6D] transition font-medium">Vision & Mission</Link></li>
              <li><Link href="/about#leadership" className="hover:text-[#C69C6D] transition font-medium">Leadership Team</Link></li>
              <li><Link href="/about#why-us" className="hover:text-[#C69C6D] transition font-medium">Why Choose Us</Link></li>
              <li><Link href="/about#quality" className="hover:text-[#C69C6D] transition font-medium">Quality Philosophy</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-3">
            <h4 className="font-mono font-bold text-[#242424] uppercase tracking-wider text-[11px]">
              EPC Services
            </h4>
            <ul className="space-y-2 text-[#5A5E62]">
              <li><Link href="/services#cross-country" className="hover:text-[#C69C6D] transition font-medium">Cross-Country Pipelines</Link></li>
              <li><Link href="/services#cgd" className="hover:text-[#C69C6D] transition font-medium">City Gas Distribution</Link></li>
              <li><Link href="/services#hdd" className="hover:text-[#C69C6D] transition font-medium">HDD Trenchless Crossings</Link></li>
              <li><Link href="/services#welding" className="hover:text-[#C69C6D] transition font-medium">Automatic Welding</Link></li>
              <li><Link href="/services#hydrotesting" className="hover:text-[#C69C6D] transition font-medium">Hydrotesting & Pigging</Link></li>
              <li><Link href="/services#engineering" className="hover:text-[#C69C6D] transition font-medium">Route Engineering</Link></li>
            </ul>
          </div>

          {/* Projects */}
          <div className="space-y-3">
            <h4 className="font-mono font-bold text-[#242424] uppercase tracking-wider text-[11px]">
              Projects
            </h4>
            <ul className="space-y-2 text-[#5A5E62]">
              <li><Link href="/projects" className="hover:text-[#C69C6D] transition font-medium">Completed Projects</Link></li>
              <li><Link href="/projects" className="hover:text-[#C69C6D] transition font-medium">Ongoing Spreads</Link></li>
              <li><Link href="/projects/western-gas-corridor" className="hover:text-[#C69C6D] transition font-medium">Western Trunkline</Link></li>
              <li><Link href="/projects/narmada-river-crossing" className="hover:text-[#C69C6D] transition font-medium">Narmada River HDD</Link></li>
              <li><Link href="/projects/greater-cgd-network" className="hover:text-[#C69C6D] transition font-medium">CGD Network Deploy</Link></li>
            </ul>
          </div>

          {/* Capabilities */}
          <div className="space-y-3">
            <h4 className="font-mono font-bold text-[#242424] uppercase tracking-wider text-[11px]">
              Capabilities
            </h4>
            <ul className="space-y-2 text-[#5A5E62]">
              <li><Link href="/capabilities#equipment" className="hover:text-[#C69C6D] transition font-medium">Heavy Equipment Fleet</Link></li>
              <li><Link href="/capabilities#technology" className="hover:text-[#C69C6D] transition font-medium">Trenchless Technology</Link></li>
              <li><Link href="/capabilities#workforce" className="hover:text-[#C69C6D] transition font-medium">Engineering Manpower</Link></li>
              <li><Link href="/capabilities#process" className="hover:text-[#C69C6D] transition font-medium">12-Step Lifecycle</Link></li>
            </ul>
          </div>

          {/* HSE & Governance */}
          <div className="space-y-3">
            <h4 className="font-mono font-bold text-[#242424] uppercase tracking-wider text-[11px]">
              HSE & Quality
            </h4>
            <ul className="space-y-2 text-[#5A5E62]">
              <li><Link href="/hse#health" className="hover:text-[#C69C6D] transition font-medium">Health & Safety</Link></li>
              <li><Link href="/hse#environment" className="hover:text-[#C69C6D] transition font-medium">Environment Stewardship</Link></li>
              <li><Link href="/hse#quality" className="hover:text-[#C69C6D] transition font-medium">Quality Management</Link></li>
              <li><Link href="/hse#certifications" className="hover:text-[#C69C6D] transition font-medium">ISO Certifications</Link></li>
            </ul>
          </div>

          {/* Corporate & Contact */}
          <div className="space-y-3">
            <h4 className="font-mono font-bold text-[#242424] uppercase tracking-wider text-[11px]">
              Connect
            </h4>
            <ul className="space-y-2 text-[#5A5E62]">
              <li><Link href="/clients" className="hover:text-[#C69C6D] transition font-medium">Our Clients</Link></li>
              <li><Link href="/careers" className="hover:text-[#C69C6D] transition font-medium">Careers Portal</Link></li>
              <li><Link href="/news" className="hover:text-[#C69C6D] transition font-medium">News & Updates</Link></li>
              <li><Link href="/contact" className="hover:text-[#C69C6D] transition font-medium">Office Locations</Link></li>
              <li><Link href="/contact#rfq" className="hover:text-[#C69C6D] font-bold transition">Request a Quote</Link></li>
              <li><Link href="/admin" className="text-[#9E7444] hover:text-[#825B2E] font-bold transition flex items-center gap-1 font-mono text-[10px]">🔒 Admin Privilege</Link></li>
            </ul>
          </div>
        </div>

        {/* ── Bottom Legal & Accreditations ── */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[11px] font-mono text-[#787B7E]">
          <div>
            © {new Date().getFullYear()} CandelaConstruction Private Limited. All Rights Reserved. · <Link href="/admin" className="hover:underline text-[#9E7444]">Admin Console</Link>
          </div>
          <div className="flex flex-wrap gap-4 font-medium">
            <span>ASME B31.8</span>
            <span>•</span>
            <span>API 1104</span>
            <span>•</span>
            <span>OISD-141</span>
            <span>•</span>
            <span>PNGRB T4S</span>
            <span>•</span>
            <span>ISO 9001 / 14001 / 45001</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}