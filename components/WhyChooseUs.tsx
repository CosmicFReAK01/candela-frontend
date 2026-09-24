"use client";
import { motion } from "framer-motion";
import { whyChooseUsPillars } from "@/data/site";
import { Container } from "./Container";
import { SectionHeading } from "./SectionHeading";
import { Award, Zap, Shield, Cpu, Compass, HardHat } from "lucide-react";

export function WhyChooseUs({ content }: { content?: any }) {
  const icons = [Compass, Shield, Award, HardHat, Cpu, Zap];

  return (
    <section className="py-20 lg:py-28 bg-[#F8F4EC] border-b border-[#D9D9D9]">
      <Container>
        <SectionHeading
          eyebrow={content?.eyebrow || "MEASURABLE ADVANTAGES"}
          title={content?.title || "Why Leading Energy Operators Choose CandelaConstruction"}
          description={content?.desc || "We replace generic contractor promises with audited metrics, company-owned heavy assets, and our hallmark pledge: Trust delivered."}
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {whyChooseUsPillars.map((p, i) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white border border-[#D9D9D9] hover:border-[#C69C6D] rounded-xl p-6 flex flex-col justify-between transition group shadow-sm hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-lg bg-[#F8F4EC] border border-[#D9D9D9] flex items-center justify-center text-[#9E7444] group-hover:bg-[#C69C6D] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-[#787B7E] bg-[#F8F4EC] px-2 py-0.5 rounded border border-[#D9D9D9]">
                      PILLAR 0{i + 1}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-lg text-[#242424] mt-4 leading-snug">
                    {p.title}
                  </h3>

                  <p className="text-xs text-[#4A4D50] mt-2 leading-relaxed">
                    {p.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#D9D9D9] flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#787B7E] uppercase font-semibold">
                    PROVEN METRIC:
                  </span>
                  <span className="font-mono text-xs font-bold text-[#9E7444]">
                    {p.metric}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
