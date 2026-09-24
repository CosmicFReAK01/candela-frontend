"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { stats as defaultStats } from "@/data/site";
import { fetchStats } from "@/lib/api";
import { Container } from "./Container";

export function Stats({ content }: { content?: any }) {
  const [statsData, setStatsData] = useState(defaultStats);

  useEffect(() => {
    if (content?.stat1Value) {
      setStatsData([
        {
          value: content.stat1Value,
          label: content.stat1Label || "Kilometers Pipeline Laid",
          sub: content.stat1Sub || "Trunklines & Spur lines (4\" to 48\")",
        },
        {
          value: content.stat2Value || "180+",
          label: content.stat2Label || "Major HDD River Crossings",
          sub: content.stat2Sub || "Narmada, Tapi, Mahi, Sabarmati",
        },
        {
          value: content.stat3Value || "28.4M",
          label: content.stat3Label || "Safe Man-Hours (LTI Free)",
          sub: content.stat3Sub || "0.00 Lost Time Injury Frequency",
        },
        {
          value: content.stat4Value || "100%",
          label: content.stat4Label || "Active Spreads & QA Integrity",
          sub: content.stat4Sub || "Zero Hydrotest Failure Record",
        },
      ]);
      return;
    }

    fetchStats().then((data) => {
      if (data) {
        setStatsData([
          {
            value: data.totalKmConstructed || "3,850+",
            label: "Kilometers Pipeline Laid",
            sub: "Trunklines & Spur lines (4\" to 48\")",
          },
          {
            value: data.hddCrossingsRecord ? `${data.hddCrossingsRecord}` : "180+",
            label: "Major HDD River Crossings",
            sub: "Narmada, Tapi, Mahi, Sabarmati",
          },
          {
            value: data.safeManHoursMillions || "28.4M",
            label: "Safe Man-Hours (LTI Free)",
            sub: "0.00 Lost Time Injury Frequency",
          },
          {
            value: data.activeSpreads || "100%",
            label: "Active Spreads & QA Integrity",
            sub: "Zero Hydrotest Failure Record",
          },
        ]);
      }
    });
  }, [content]);

  return (
    <section className="py-12 bg-[#F3EFE7] border-b border-[#D9D9D9]">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {statsData.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white border border-[#D9D9D9] hover:border-[#C69C6D] p-5 sm:p-6 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-[#9E7444] uppercase tracking-widest">
                  METRIC 0{i + 1}
                </span>
                <div className="w-2 h-2 rounded-full bg-[#C69C6D]/60 group-hover:scale-125 transition-transform" />
              </div>
              <div className="text-3xl sm:text-4xl font-heading font-extrabold font-mono text-[#242424] mt-2 tracking-tight group-hover:text-[#9E7444] transition-colors">
                {s.value}
              </div>
              <div className="text-xs uppercase tracking-wider text-[#242424] mt-2 font-semibold">
                {s.label}
              </div>
              <div className="text-[11px] text-[#6B6F73] mt-1 font-mono">{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}