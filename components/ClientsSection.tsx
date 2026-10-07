"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Container } from "./Container";
import { SectionHeading } from "./SectionHeading";
import { clients as fallbackClients } from "@/data/site";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function ClientsSection({ content }: { content?: any }) {
  const [clientList, setClientList] = useState(fallbackClients);

  useEffect(() => {
    fetch("/api/clients", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && Array.isArray(data) ) {
          setClientList(data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="clients" className="py-20 lg:py-28 bg-[#F3EFE7] border-b border-[#D9D9D9]">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeading
            eyebrow={content?.eyebrow || "CLIENT ACCREDITATIONS & PARTNERS"}
            title={content?.title || "Trusted by India's Premier Energy & Infrastructure Enterprises"}
            description={content?.desc || "Our client roster includes national gas transmission authorities, public sector hydrocarbon majors, and leading private CGD concessionaires."}
          />
          <Link
            href="/clients"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#9E7444] hover:text-[#825B2E] transition shrink-0 group pb-2"
          >
            <span>{content?.linkText || "View All Client Prequalifications"}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* ── Client Logo & Sector Grid ── */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {clientList.map((c: any) => {
            const logoText = c.code || c.logoText || c.name.slice(0, 5).toUpperCase();
            return (
              <div
                key={c.id || c.name}
                className="bg-white border border-[#D9D9D9] hover:border-[#C69C6D] p-6 rounded-xl flex flex-col justify-between transition-all duration-200 group shadow-sm hover:shadow-md"
              >
                <div className="text-xl sm:text-2xl font-heading font-extrabold tracking-tight text-[#242424] group-hover:text-[#9E7444] transition-colors">
                  {logoText}
                </div>
                <div className="mt-4 pt-3 border-t border-[#D9D9D9]">
                  <div className="text-xs font-semibold text-[#242424] truncate">
                    {c.name}
                  </div>
                  <div className="text-[10px] text-[#6B6F73] mt-0.5 font-mono">
                    {c.sector}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Assurance Note */}
        <div className="mt-8 bg-white border border-[#D9D9D9] p-4 rounded-xl flex items-center justify-between flex-wrap gap-3 text-xs font-mono text-[#242424] shadow-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Pre-qualified & approved for EPC tenders with major public and private sector utilities.</span>
          </div>
          <span className="text-[#9E7444] font-bold">TENDER CODE: EPC-CLASS-A</span>
        </div>
      </Container>
    </section>
  );
}
