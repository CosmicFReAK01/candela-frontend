import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/Container";
import { corporateNews } from "@/data/site";
import { query } from "@/lib/db";
import { ChevronRight, Calendar, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Corporate News & Milestones | CandelaConstruction Private Limited — Trust delivered.",
  description: "Latest news, pipeline commissioning achievements, safety records, and EPC contract awards from CandelaConstruction Private Limited — Trust delivered.",
};

export default async function NewsPage() {
  let newsList: any[] = [];
  try {
    const rows = await query("SELECT * FROM corporate_news ORDER BY id DESC;");
    if (rows ) {
      newsList = rows;
    }
  } catch (err) {
    console.error("Failed to query news:", err);
  }

  if (newsList.length === 0) {
    newsList = corporateNews;
  }
  return (
    <>
      <Navbar />
      <main className="bg-[#F8F4EC] text-[#242424]">
        {/* ── Sub-Page Hero Header ── */}
        <section className="relative py-16 lg:py-24 bg-[#F3EFE7] border-b border-[#D9D9D9] overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#C69C6D_1px,transparent_1px)] [background-size:28px_28px] opacity-20 pointer-events-none" />
          <Container className="relative z-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-mono text-[#6B6F73] mb-4">
              <Link href="/" className="hover:text-[#242424] transition">HOME</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-[#9E7444] font-semibold">NEWS & UPDATES</span>
            </div>

            <div className="max-w-3xl space-y-4">
              <span className="text-xs font-mono text-[#9E7444] font-bold uppercase tracking-wider">
                MEDIA & OPERATIONAL ANNOUNCEMENTS
              </span>
              <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-[#242424] tracking-tight">
                Corporate Milestones & Industry Updates
              </h1>
              <p className="text-base sm:text-lg text-[#4A4D50] leading-relaxed">
                Stay updated with our latest pipeline charging milestones, record trenchless river crossings, safety benchmarks, and strategic project additions.
              </p>
            </div>
          </Container>
        </section>

        {/* ── News Articles Grid ── */}
        <section className="py-20 border-b border-[#D9D9D9]">
          <Container>
            <div className="grid gap-8 md:grid-cols-2">
              {newsList.map((news: any) => (
                <div
                  key={news.id}
                  className="bg-white border border-[#D9D9D9] hover:border-[#C69C6D] rounded-2xl p-7 flex flex-col justify-between transition group shadow-sm hover:shadow-lg"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[#9E7444] font-bold bg-[#C69C6D]/15 border border-[#C69C6D]/30 px-2.5 py-0.5 rounded">
                        {news.tag || news.category || "PRESS RELEASE"}
                      </span>
                      <span className="text-[#6B6F73] flex items-center gap-1.5 font-medium">
                        <Calendar className="w-3.5 h-3.5" />
                        {news.date}
                      </span>
                    </div>

                    <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#242424] leading-snug group-hover:text-[#9E7444] transition-colors">
                      {news.title}
                    </h2>

                    <p className="text-sm text-[#4A4D50] leading-relaxed">
                      {news.summary || news.excerpt || news.content}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#D9D9D9]">
                    <span className="text-xs font-mono text-[#787B7E] group-hover:text-[#242424] flex items-center gap-1.5 transition font-semibold">
                      <span>READ OFFICIAL PRESS RELEASE</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
