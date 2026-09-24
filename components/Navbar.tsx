"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, PhoneCall, ShieldCheck, FileText, ArrowRight, Lock } from "lucide-react";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [projectsDropdown, setProjectsDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [settings, setSettings] = useState({
    control_room_hotline: "1800-180-9999",
    compliance_codes: "PNGRB / ASME B31.8 / API 1104",
    safe_hours: "28.4M LTI-Free Safe Hours",
    iso_badges: "ISO 9001:2015, ISO 14001, ISO 45001",
  });
  const pathname = usePathname();

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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setServicesDropdown(false);
    setProjectsDropdown(false);
  }, [pathname]);

  return (
    <>
      {/* ── Top Operations & Safety Bar ── */}
      <aside className="bg-[#F8F4EC] text-[#242424] border-b border-[#D9D9D9] text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* 24x7 Control Room Hotline */}
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 px-2.5 py-0.5 rounded text-red-700 font-medium shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
              </span>
              <span className="font-mono text-[11px] font-bold tracking-wide text-red-800">24x7 CONTROL ROOM:</span>
              <a
                href={`tel:${settings.control_room_hotline.replace(/[^0-9+]/g, "")}`}
                className="hover:underline text-red-950 font-mono font-bold tracking-wider"
              >
                {settings.control_room_hotline}
              </a>
            </div>

            {/* Compliance Badge */}
            <div className="flex items-center gap-2 text-[#4A4D50] text-[11px] font-mono">
              <span className="bg-white text-[#242424] px-2 py-0.5 rounded border border-[#D9D9D9] font-medium shadow-xs">
                {settings.compliance_codes}
              </span>
              <span className="text-[#9E7444] flex items-center gap-1 font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                {settings.safe_hours}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* ISO Certifications */}
            <div className="flex items-center gap-1.5 text-[#5A5E62] font-mono text-[11px]">
              {settings.iso_badges.split(",").map((badge, idx) => (
                <span key={idx} className="px-1.5 py-0.5 bg-white rounded border border-[#D9D9D9] shadow-xs">
                  {badge.trim()}
                </span>
              ))}
            </div>

            <Link
              href="/contact#rfq"
              className="bg-[#C69C6D] hover:bg-[#B08554] text-white font-bold px-3 py-1 rounded text-xs transition flex items-center gap-1.5 shadow-sm"
            >
              <FileText className="w-3.5 h-3.5" />
              Quick RFQ / Tender
            </Link>

            <Link
              href="/admin"
              className="bg-[#242424] hover:bg-black text-white font-bold px-2.5 py-1 rounded text-xs transition flex items-center gap-1 shadow-sm font-mono text-[11px]"
              title="Admin Privilege Portal"
            >
              <Lock className="w-3 h-3 text-[#C69C6D]" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* ── Main Sticky Navigation ── */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md py-3 shadow-md border-b border-[#D9D9D9]"
            : "bg-white py-4 border-b border-[#D9D9D9]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-11 h-11 bg-gradient-to-br from-[#C69C6D] via-[#B08554] to-[#8C6239] rounded-xl flex items-center justify-center p-2 shadow-md shadow-[#C69C6D]/20 group-hover:scale-105 transition-transform duration-300">
                <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 14h6v6H4z" /><path d="M14 4h6v6h-6z" />
                  <path d="M10 17h4a2 2 0 002-2v-4" /><circle cx="17" cy="17" r="3" />
                </svg>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" title="Grid Operational" />
              </div>
              <div>
                <div className="font-heading font-extrabold text-lg sm:text-xl text-[#242424] tracking-tight leading-none">
                  CANDELA <span className="text-[#C69C6D]">CONSTRUCTION</span>
                </div>
                <div className="text-[10px] sm:text-[11px] font-mono text-[#9E7444] font-semibold mt-0.5 tracking-wider">
                  Trust delivered.
                </div>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 font-medium text-sm text-[#4A4D50]">
              <Link
                href="/"
                className={`px-3 py-2 rounded-lg transition hover:text-[#242424] hover:bg-[#F8F4EC] ${
                  pathname === "/" ? "text-[#C69C6D] font-bold" : ""
                }`}
              >
                Home
              </Link>

              <Link
                href="/about"
                className={`px-3 py-2 rounded-lg transition hover:text-[#242424] hover:bg-[#F8F4EC] ${
                  pathname === "/about" ? "text-[#C69C6D] font-bold" : ""
                }`}
              >
                About Us
              </Link>

              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setServicesDropdown(true)}
                onMouseLeave={() => setServicesDropdown(false)}
              >
                <Link
                  href="/services"
                  className={`px-3 py-2 rounded-lg transition hover:text-[#242424] hover:bg-[#F8F4EC] flex items-center gap-1 ${
                    pathname.startsWith("/services") ? "text-[#C69C6D] font-bold" : ""
                  }`}
                >
                  Services
                  <ChevronDown className="w-3.5 h-3.5 text-[#787B7E]" />
                </Link>

                {servicesDropdown && (
                  <div className="absolute left-0 top-full pt-2 w-72 z-50">
                    <div className="bg-white border border-[#D9D9D9] rounded-xl shadow-xl p-2 space-y-1">
                      <Link href="/services#cross-country" className="block px-3 py-2 rounded-lg text-xs hover:bg-[#F8F4EC] hover:text-[#C69C6D] transition text-[#333333]">
                        <div className="font-semibold text-[#242424]">Cross-Country Pipelines</div>
                        <div className="text-[10px] text-[#787B7E]">High-pressure gas trunklines up to 48"</div>
                      </Link>
                      <Link href="/services#cgd" className="block px-3 py-2 rounded-lg text-xs hover:bg-[#F8F4EC] hover:text-[#C69C6D] transition text-[#333333]">
                        <div className="font-semibold text-[#242424]">City Gas Distribution</div>
                        <div className="text-[10px] text-[#787B7E]">Steel & MDPE electrofusion networks</div>
                      </Link>
                      <Link href="/services#hdd" className="block px-3 py-2 rounded-lg text-xs hover:bg-[#F8F4EC] hover:text-[#C69C6D] transition text-[#333333]">
                        <div className="font-semibold text-[#242424]">HDD / Trenchless Technology</div>
                        <div className="text-[10px] text-[#787B7E]">Major river & highway crossings (350T rigs)</div>
                      </Link>
                      <Link href="/services#welding" className="block px-3 py-2 rounded-lg text-xs hover:bg-[#F8F4EC] hover:text-[#C69C6D] transition text-[#333333]">
                        <div className="font-semibold text-[#242424]">Automatic Welding & NDT</div>
                        <div className="text-[10px] text-[#787B7E]">Dual-torch GMAW & 100% PAUT inspection</div>
                      </Link>
                      <div className="border-t border-[#D9D9D9] my-1" />
                      <Link href="/services" className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-[#9E7444] font-semibold hover:bg-[#F8F4EC] transition">
                        <span>View All 10 Services</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Projects Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setProjectsDropdown(true)}
                onMouseLeave={() => setProjectsDropdown(false)}
              >
                <Link
                  href="/projects"
                  className={`px-3 py-2 rounded-lg transition hover:text-[#242424] hover:bg-[#F8F4EC] flex items-center gap-1 ${
                    pathname.startsWith("/projects") ? "text-[#C69C6D] font-bold" : ""
                  }`}
                >
                  Projects
                  <ChevronDown className="w-3.5 h-3.5 text-[#787B7E]" />
                </Link>

                {projectsDropdown && (
                  <div className="absolute left-0 top-full pt-2 w-72 z-50">
                    <div className="bg-white border border-[#D9D9D9] rounded-xl shadow-xl p-2 space-y-1">
                      <Link href="/projects/western-gas-corridor" className="block px-3 py-2 rounded-lg text-xs hover:bg-[#F8F4EC] hover:text-[#C69C6D] transition text-[#333333]">
                        <div className="font-semibold text-[#242424]">Western Gas Corridor</div>
                        <div className="text-[10px] text-[#787B7E]">480 KM | 42" OD Trunkline Case Study</div>
                      </Link>
                      <Link href="/projects/narmada-river-crossing" className="block px-3 py-2 rounded-lg text-xs hover:bg-[#F8F4EC] hover:text-[#C69C6D] transition text-[#333333]">
                        <div className="font-semibold text-[#242424]">Narmada Riverbed Estuary</div>
                        <div className="text-[10px] text-[#787B7E]">2,180M Continuous HDD Crossing</div>
                      </Link>
                      <Link href="/projects/greater-cgd-network" className="block px-3 py-2 rounded-lg text-xs hover:bg-[#F8F4EC] hover:text-[#C69C6D] transition text-[#333333]">
                        <div className="font-semibold text-[#242424]">Greater CGD Deployment</div>
                        <div className="text-[10px] text-[#787B7E]">1,550 KM Steel & MDPE Grid</div>
                      </Link>
                      <div className="border-t border-[#D9D9D9] my-1" />
                      <Link href="/projects" className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-[#9E7444] font-semibold hover:bg-[#F8F4EC] transition">
                        <span>All Projects & Case Studies</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/capabilities"
                className={`px-3 py-2 rounded-lg transition hover:text-[#242424] hover:bg-[#F8F4EC] ${
                  pathname === "/capabilities" ? "text-[#C69C6D] font-bold" : ""
                }`}
              >
                Capabilities
              </Link>

              <Link
                href="/hse"
                className={`px-3 py-2 rounded-lg transition hover:text-[#242424] hover:bg-[#F8F4EC] ${
                  pathname === "/hse" ? "text-[#C69C6D] font-bold" : ""
                }`}
              >
                HSE
              </Link>

              <Link
                href="/clients"
                className={`px-3 py-2 rounded-lg transition hover:text-[#242424] hover:bg-[#F8F4EC] ${
                  pathname === "/clients" ? "text-[#C69C6D] font-bold" : ""
                }`}
              >
                Clients
              </Link>

              <Link
                href="/careers"
                className={`px-3 py-2 rounded-lg transition hover:text-[#242424] hover:bg-[#F8F4EC] ${
                  pathname === "/careers" ? "text-[#C69C6D] font-bold" : ""
                }`}
              >
                Careers
              </Link>

              <Link
                href="/news"
                className={`px-3 py-2 rounded-lg transition hover:text-[#242424] hover:bg-[#F8F4EC] ${
                  pathname === "/news" ? "text-[#C69C6D] font-bold" : ""
                }`}
              >
                News
              </Link>

              <Link
                href="/contact"
                className={`px-3 py-2 rounded-lg transition hover:text-[#242424] hover:bg-[#F8F4EC] ${
                  pathname === "/contact" ? "text-[#C69C6D] font-bold" : ""
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* Action CTA Button */}
            <div className="hidden sm:flex items-center gap-3">
              <Link
                href="/contact#rfq"
                className="bg-[#C69C6D] hover:bg-[#B08554] text-[#242424] font-bold px-4 py-2.5 rounded-lg text-sm transition flex items-center gap-2 shadow-sm shadow-[#C69C6D]/20 active:scale-95"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 rounded-lg text-[#242424] hover:bg-[#F8F4EC] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {open && (
          <div className="lg:hidden bg-white border-b border-[#D9D9D9] px-4 pt-3 pb-6 space-y-1.5 mt-3 shadow-xl">
            <Link href="/" className="block px-3 py-2 rounded-lg text-sm font-semibold text-[#242424] hover:bg-[#F8F4EC]">
              Home
            </Link>
            <Link href="/about" className="block px-3 py-2 rounded-lg text-sm font-semibold text-[#242424] hover:bg-[#F8F4EC]">
              About Us
            </Link>
            <Link href="/services" className="block px-3 py-2 rounded-lg text-sm font-semibold text-[#242424] hover:bg-[#F8F4EC]">
              Services (10 Core EPC Solutions)
            </Link>
            <Link href="/projects" className="block px-3 py-2 rounded-lg text-sm font-semibold text-[#242424] hover:bg-[#F8F4EC]">
              Projects & Case Studies
            </Link>
            <Link href="/capabilities" className="block px-3 py-2 rounded-lg text-sm font-semibold text-[#242424] hover:bg-[#F8F4EC]">
              Capabilities & Equipment Fleet
            </Link>
            <Link href="/hse" className="block px-3 py-2 rounded-lg text-sm font-semibold text-[#242424] hover:bg-[#F8F4EC]">
              HSE & Quality Management
            </Link>
            <Link href="/clients" className="block px-3 py-2 rounded-lg text-sm font-semibold text-[#242424] hover:bg-[#F8F4EC]">
              Clients & Approvals
            </Link>
            <Link href="/careers" className="block px-3 py-2 rounded-lg text-sm font-semibold text-[#242424] hover:bg-[#F8F4EC]">
              Careers (Open Positions)
            </Link>
            <Link href="/news" className="block px-3 py-2 rounded-lg text-sm font-semibold text-[#242424] hover:bg-[#F8F4EC]">
              News & Updates
            </Link>
            <Link href="/contact" className="block px-3 py-2 rounded-lg text-sm font-semibold text-[#242424] hover:bg-[#F8F4EC]">
              Contact & Offices
            </Link>

            <div className="pt-4 border-t border-[#D9D9D9] space-y-3">
              <div className="flex items-center gap-2 text-xs text-red-600 font-mono font-semibold">
                <PhoneCall className="w-4 h-4" />
                <span>24x7 Hotline: 1800-180-9999</span>
              </div>
              <Link
                href="/contact#rfq"
                className="w-full bg-[#C69C6D] hover:bg-[#B08554] text-[#242424] font-bold py-3 rounded-lg text-sm text-center block transition"
              >
                Request a Quote / Submit RFQ
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}