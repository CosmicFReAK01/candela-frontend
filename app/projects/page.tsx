import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/Container";
import { projects as fallbackProjects } from "@/data/site";
import { fetchProjects } from "@/lib/api";
import { ArrowRight, ShieldCheck, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Pipeline Projects & Case Studies | CandelaConstruction Private Limited",
  description: "Explore completed and ongoing pipeline construction projects across India: 42-inch gas transmission trunklines, river HDD crossings, and CGD networks — Trust delivered.",
};

export default async function ProjectsPage() {
  const dynamicProjects = await fetchProjects();
  const projectList = dynamicProjects && dynamicProjects.length > 0 ? dynamicProjects : fallbackProjects;
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
              <span className="text-[#9E7444] font-semibold">PROJECTS</span>
            </div>

            <div className="max-w-3xl space-y-4">
              <span className="text-xs font-mono text-[#9E7444] font-bold uppercase tracking-wider">
                PROVEN EPC PERFORMANCE
              </span>
              <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-[#242424] tracking-tight">
                Major Pipeline Infrastructure Case Studies
              </h1>
              <p className="text-base sm:text-lg text-[#4A4D50] leading-relaxed">
                A track record of executing critical hydrocarbon transmission corridors under challenging environmental, geological, and regulatory constraints across India.
              </p>
            </div>
          </Container>
        </section>

        {/* ── Project Grid ── */}
        <section className="py-20">
          <Container>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {projectList.map((p: any) => (
                <div
                  key={p.id}
                  className="bg-white border border-[#D9D9D9] hover:border-[#C69C6D] rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-xl group"
                >
                  <div>
                    {/* Top Tag & Status */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-[#9E7444] bg-[#C69C6D]/15 border border-[#C69C6D]/30 px-2.5 py-0.5 rounded uppercase tracking-wider">
                        {p.tag}
                      </span>
                      <span className="text-[11px] font-mono text-emerald-700 flex items-center gap-1 font-semibold">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        {p.status}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-heading font-bold text-xl text-[#242424] mt-4 leading-snug group-hover:text-[#9E7444] transition-colors">
                      {p.title}
                    </h3>

                    {/* Specs Pills */}
                    <div className="flex flex-wrap gap-2 mt-3 text-xs font-mono">
                      <span className="bg-[#F8F4EC] text-[#242424] px-2.5 py-1 rounded border border-[#D9D9D9]">
                        {p.diameter}
                      </span>
                      <span className="bg-[#F8F4EC] text-[#9E7444] font-bold px-2.5 py-1 rounded border border-[#D9D9D9]">
                        {p.length}
                      </span>
                    </div>

                    <p className="text-xs text-[#5A5E62] mt-3 leading-relaxed">
                      {p.shortDesc}
                    </p>

                    {/* Highlights Preview */}
                    <div className="mt-4 pt-3 border-t border-[#D9D9D9] space-y-1.5 text-xs text-[#242424]">
                      <div className="text-[10px] font-mono text-[#9E7444] font-bold uppercase tracking-wider">
                        CLIENT: {p.client}
                      </div>
                      <div className="text-[10px] font-mono text-[#6B6F73]">
                        LOCATION: {p.location}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Area */}
                  <div className="mt-6 pt-4 border-t border-[#D9D9D9]">
                    <Link
                      href={`/projects/${p.slug}`}
                      className="w-full bg-[#F8F4EC] hover:bg-[#C69C6D] hover:text-[#242424] text-[#242424] font-bold py-2.5 px-4 rounded-xl text-xs font-mono transition flex items-center justify-center gap-2 border border-[#D9D9D9] group-hover:border-[#C69C6D]"
                    >
                      <span>VIEW FULL CASE STUDY</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
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
