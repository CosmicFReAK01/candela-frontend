"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { services as fallbackServices } from "@/data/site";
import { fetchServices } from "@/lib/api";
import { Container } from "./Container";
import { SectionHeading } from "./SectionHeading";
import { ArrowRight } from "lucide-react";

export function Services({ content }: { content?: any }) {
  const [serviceList, setServiceList] = useState(fallbackServices);
  const [activeTab, setActiveTab] = useState<string | null>(null);

  useEffect(() => {
    fetchServices().then((data) => {
      if (data && Array.isArray(data) && data.length > 0) {
        setServiceList(data);
      }
    });
  }, []);

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#F3EFE7] border-b border-[#D9D9D9]">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeading
            eyebrow={content?.eyebrow || "CORE CAPABILITIES & SERVICES"}
            title={content?.title || "Comprehensive Pipeline Construction & EPC Solutions"}
            description={content?.desc || "From Front-End Engineering Design to high-pressure trunkline commissioning, we execute the full spectrum of energy infrastructure."}
          />
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#9E7444] hover:text-[#825B2E] transition shrink-0 group pb-2"
          >
            <span>{content?.linkText || "View All 10 Specialized Services"}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* ── Interactive Service Cards Grid ── */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {serviceList.slice(0, 8).map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              onMouseEnter={() => setActiveTab(s.id)}
              onMouseLeave={() => setActiveTab(null)}
              className="relative bg-white rounded-xl border border-[#D9D9D9] hover:border-[#C69C6D] p-6 flex flex-col justify-between transition-all duration-300 group hover:shadow-lg shadow-sm"
            >
              <div>
                {/* Top Bar: Number & Code Badge */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xl font-black text-[#9E7444] tracking-tighter">
                    {s.n}
                  </span>
                  <span className="text-[10px] font-mono text-[#5A5E62] bg-[#F8F4EC] px-2 py-0.5 rounded border border-[#D9D9D9]">
                    {s.standard.split("/")[0]}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-heading font-bold text-lg text-[#242424] mt-4 leading-snug group-hover:text-[#9E7444] transition-colors">
                  {s.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-[#4A4D50] mt-2.5 leading-relaxed">
                  {s.text}
                </p>

                {/* Bullet points */}
                <ul className="mt-4 space-y-1.5 text-[11px] text-[#6B6F73]">
                  {s.bullets.slice(0, 3).map((b, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-[#C69C6D] text-xs font-bold leading-none">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Action Area */}
              <div className="mt-6 pt-4 border-t border-[#D9D9D9] flex items-center justify-between">
                <Link
                  href={`/services#${s.id}`}
                  className="text-xs font-bold text-[#242424] group-hover:text-[#9E7444] flex items-center gap-1.5 transition"
                >
                  <span>Explore Service</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <span className="text-[10px] font-mono text-[#787B7E]">
                  EPC QUALIFIED
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}