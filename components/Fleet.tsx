"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { fleetEquipment as fallbackFleet } from "@/data/site";
import { fetchFleet } from "@/lib/api";
import { Container } from "./Container";
import { SectionHeading } from "./SectionHeading";
import { ArrowRight } from "lucide-react";

export function Fleet({ content }: { content?: any }) {
  const [equipmentList, setEquipmentList] = useState(fallbackFleet);

  useEffect(() => {
    fetch("/api/fleet", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && Array.isArray(data) && data.length > 0) {
          setEquipmentList(data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="equipment" className="py-20 lg:py-28 bg-[#F8F4EC] border-b border-[#D9D9D9]">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeading
            eyebrow={content?.eyebrow || "EQUIPMENT FLEET & MACHINERY"}
            title={content?.title || "Heavy Mechanized Pipeline Construction Fleet"}
            description={content?.desc || "Company-owned fleet of heavy crawler sidebooms, 350-ton HDD rigs, automatic dual-torch welding units, and high-pressure testing spreads."}
          />
          <Link
            href="/capabilities"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#9E7444] hover:text-[#825B2E] transition shrink-0 group pb-2"
          >
            <span>{content?.linkText || "View Full Machinery Inventory & Specs"}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* ── Equipment Grid ── */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {equipmentList.slice(0, 6).map((eq: any, i: number) => {
            const category = eq.category || "Heavy Machinery";
            const quantity = eq.quantity || eq.units || "1 Unit";
            const specs = eq.specs || eq.make || "";
            return (
              <motion.div
                key={eq.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white border border-[#D9D9D9] hover:border-[#C69C6D] rounded-xl p-6 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-lg group"
              >
                <div>
                  {/* Category & Quantity Badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-[#9E7444] bg-[#C69C6D]/15 border border-[#C69C6D]/30 px-2.5 py-0.5 rounded uppercase tracking-wider">
                      {category}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#242424] bg-[#F8F4EC] px-2 py-0.5 rounded border border-[#D9D9D9]">
                      {quantity}
                    </span>
                  </div>

                  {/* Name */}
                  <h3 className="font-heading font-bold text-lg text-[#242424] mt-4 leading-snug group-hover:text-[#9E7444] transition-colors">
                    {eq.name}
                  </h3>

                {/* Application */}
                <p className="text-xs text-[#4A4D50] mt-2 leading-relaxed">
                  <strong className="text-[#6B6F73]">Application: </strong>
                  {eq.application}
                </p>

                {/* Technical Specs */}
                <div className="mt-4 p-3 bg-[#F8F4EC] rounded-lg border border-[#D9D9D9] text-xs font-mono">
                  <div className="text-[10px] text-[#787B7E] uppercase tracking-wider font-semibold">
                    SPECIFICATIONS:
                  </div>
                  <div className="text-[#242424] mt-1 leading-relaxed">
                    {eq.specs}
                  </div>
                </div>
              </div>

              {/* Bottom Capacity Metric */}
              <div className="mt-5 pt-3 border-t border-[#D9D9D9] flex items-center justify-between text-xs font-mono">
                <span className="text-[#6B6F73]">WORKING CAPACITY:</span>
                <span className="font-bold text-[#9E7444]">{eq.capacity}</span>
              </div>
            </motion.div>
          );
        })}
        </div>
      </Container>
    </section>
  );
}
