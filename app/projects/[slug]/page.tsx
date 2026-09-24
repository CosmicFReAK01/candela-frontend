import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/Container";
import { projects } from "@/data/site";
import { fetchProjectBySlug } from "@/lib/api";
import { ArrowRight, CheckCircle2, ChevronRight, ShieldCheck, AlertCircle } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const dynamicProject = await fetchProjectBySlug(slug);
  const staticMatch = projects.find((p) => p.slug === slug);
  const project = dynamicProject ? { ...staticMatch, ...dynamicProject } : staticMatch;
  if (!project) return { title: "Project Case Study Not Found" };

  return {
    title: `${project.title} | CandelaConstruction Private Limited Case Study`,
    description: `Detailed case study for ${project.title}: ${project.diameter}, ${project.length} constructed for ${project.client} — Trust delivered.`,
  };
}

export default async function ProjectCaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const dynamicProject = await fetchProjectBySlug(slug);
  const staticMatch = projects.find((p) => p.slug === slug);
  const project = dynamicProject
    ? {
        ...staticMatch,
        ...dynamicProject,
        galleryImages: dynamicProject.galleryImages || staticMatch?.galleryImages || [],
        scopeOfWork: dynamicProject.scopeOfWork || staticMatch?.scopeOfWork || [],
        keyChallenges: dynamicProject.keyChallenges || staticMatch?.keyChallenges || [],
        execution: dynamicProject.execution || staticMatch?.execution || [],
        highlights: dynamicProject.highlights || staticMatch?.highlights || [],
      }
    : staticMatch;

  if (!project) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="bg-[#F8F4EC] text-[#242424]">
        {/* ── Case Study Header ── */}
        <section className="relative py-16 lg:py-24 bg-[#F3EFE7] border-b border-[#D9D9D9] overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#C69C6D_1px,transparent_1px)] [background-size:28px_28px] opacity-20 pointer-events-none" />
          <Container className="relative z-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-mono text-[#6B6F73] mb-4">
              <Link href="/" className="hover:text-[#242424] transition">HOME</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href="/projects" className="hover:text-[#242424] transition">PROJECTS</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-[#9E7444] font-semibold">{project.tag}</span>
            </div>

            <div className="max-w-4xl space-y-4">
              <span className="text-xs font-mono text-[#9E7444] font-bold uppercase tracking-wider bg-[#C69C6D]/15 border border-[#C69C6D]/30 px-3 py-1 rounded-full inline-block">
                {project.tag}
              </span>
              <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#242424] tracking-tight leading-tight">
                {project.title}
              </h1>
              <p className="text-base sm:text-lg text-[#4A4D50] leading-relaxed max-w-3xl">
                {project.shortDesc}
              </p>
            </div>

            {/* Quick Metadata Bar */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#D9D9D9] text-xs font-mono">
              <div>
                <span className="text-[#6B6F73] block">PIPELINE DIAMETER</span>
                <span className="text-[#9E7444] font-bold text-sm sm:text-base">{project.diameter}</span>
              </div>
              <div>
                <span className="text-[#6B6F73] block">TOTAL SPAN / LENGTH</span>
                <span className="text-[#242424] font-bold text-sm sm:text-base">{project.length}</span>
              </div>
              <div>
                <span className="text-[#6B6F73] block">OPERATING PRESSURE</span>
                <span className="text-cyan-800 font-bold text-sm sm:text-base">{project.pressure}</span>
              </div>
              <div>
                <span className="text-[#6B6F73] block">STATUS</span>
                <span className="text-emerald-700 font-bold text-sm sm:text-base flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" />
                  {project.status}
                </span>
              </div>
            </div>
          </Container>
        </section>

        {/* ── Case Study Body: Specs Table & Overview ── */}
        <section className="py-20 border-b border-[#D9D9D9]">
          <Container>
            <div className="grid gap-12 lg:grid-cols-12 items-start">
              
              {/* Left Column: Overview, Challenges, Execution */}
              <div className="lg:col-span-8 space-y-12">
                
                {/* Project Overview */}
                <div className="space-y-4">
                  <div className="text-xs font-mono text-[#9E7444] font-bold uppercase tracking-widest">
                    01 / PROJECT OVERVIEW
                  </div>
                  <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#242424]">
                    Engineering Objectives & Context
                  </h2>
                  <p className="text-sm sm:text-base text-[#4A4D50] leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Scope of Work Checklist */}
                <div className="space-y-4 bg-white border border-[#D9D9D9] p-6 sm:p-8 rounded-2xl shadow-sm">
                  <div className="text-xs font-mono text-[#9E7444] font-bold uppercase tracking-widest">
                    02 / SCOPE OF WORK
                  </div>
                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#242424]">
                    Detailed EPC Scope & Work Packages
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3 pt-2">
                    {project.scopeOfWork.map((scope: any, idx: number) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-[#333333]">
                        <CheckCircle2 className="w-4 h-4 text-[#9E7444] mt-0.5 shrink-0" />
                        <span>{scope}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Challenges */}
                <div className="space-y-4">
                  <div className="text-xs font-mono text-[#9E7444] font-bold uppercase tracking-widest">
                    03 / KEY CHALLENGES
                  </div>
                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#242424]">
                    Geotechnical, Environmental & Logistical Obstacles
                  </h3>
                  <div className="space-y-3">
                    {project.keyChallenges.map((challenge: any, idx: number) => (
                      <div
                        key={idx}
                        className="bg-white border border-amber-200 p-4 rounded-xl text-xs text-[#333333] flex items-start gap-3 shadow-sm"
                      >
                        <AlertCircle className="w-4 h-4 text-[#9E7444] mt-0.5 shrink-0" />
                        <span>{challenge}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Execution Methodology */}
                <div className="space-y-4">
                  <div className="text-xs font-mono text-[#9E7444] font-bold uppercase tracking-widest">
                    04 / EXECUTION METHODOLOGY
                  </div>
                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#242424]">
                    Specialized Machinery & Spreads Deployed
                  </h3>
                  <div className="space-y-3">
                    {project.execution.map((step: any, idx: number) => (
                      <div
                        key={idx}
                        className="bg-white border border-[#D9D9D9] p-4 rounded-xl text-xs text-[#333333] flex items-start gap-3 shadow-sm"
                      >
                        <div className="w-5 h-5 rounded bg-[#C69C6D]/20 text-[#9E7444] font-mono text-xs flex items-center justify-center shrink-0 font-bold">
                          {idx + 1}
                        </div>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Project Gallery */}
                <div className="space-y-4">
                  <div className="text-xs font-mono text-[#9E7444] font-bold uppercase tracking-widest">
                    05 / PROJECT GALLERY & PHOTOGRAPHIC RECORD
                  </div>
                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#242424]">
                    Site Construction Photo Records
                  </h3>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {project.galleryImages.map((img: any, idx: number) => (
                      <div
                        key={idx}
                        className="bg-white border border-[#D9D9D9] rounded-xl p-4 flex flex-col justify-between shadow-sm"
                      >
                        <div className="aspect-[4/3] bg-[#F8F4EC] rounded-lg border border-[#D9D9D9] flex items-center justify-center p-3 text-center">
                          <span className="font-mono text-xs text-[#6B6F73]">
                            [SITE PHOTO: {img.title}]
                          </span>
                        </div>
                        <div className="mt-3">
                          <div className="font-heading font-bold text-xs text-[#242424]">
                            {img.title}
                          </div>
                          <div className="text-[10px] text-[#6B6F73] mt-0.5">
                            {img.caption}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column: Key Details Sidebar & RFQ CTA */}
              <div className="lg:col-span-4 bg-white border border-[#D9D9D9] rounded-2xl p-6 sm:p-8 space-y-6 sticky top-28 shadow-xl">
                <div>
                  <span className="text-xs font-mono font-bold text-[#9E7444] uppercase tracking-widest">
                    PROJECT DOSSIER
                  </span>
                  <h4 className="font-heading font-bold text-xl text-[#242424] mt-1">
                    Technical Specifications
                  </h4>
                </div>

                <dl className="space-y-3 text-xs font-mono border-t border-[#D9D9D9] pt-4">
                  <div className="flex justify-between py-1.5 border-b border-[#F0EBE1]">
                    <dt className="text-[#6B6F73]">CLIENT</dt>
                    <dd className="font-semibold text-[#242424] text-right">{project.client}</dd>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#F0EBE1]">
                    <dt className="text-[#6B6F73]">LOCATION</dt>
                    <dd className="font-semibold text-[#242424] text-right">{project.location}</dd>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#F0EBE1]">
                    <dt className="text-[#6B6F73]">STATE</dt>
                    <dd className="font-semibold text-[#242424] text-right">{project.state}</dd>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#F0EBE1]">
                    <dt className="text-[#6B6F73]">DIAMETER</dt>
                    <dd className="font-bold text-[#9E7444] text-right">{project.diameter}</dd>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#F0EBE1]">
                    <dt className="text-[#6B6F73]">LENGTH / SPAN</dt>
                    <dd className="font-bold text-[#242424] text-right">{project.length}</dd>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#F0EBE1]">
                    <dt className="text-[#6B6F73]">WALL THICKNESS</dt>
                    <dd className="text-[#333333] text-right">{project.wallThickness}</dd>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#F0EBE1]">
                    <dt className="text-[#6B6F73]">PRESSURE RATING</dt>
                    <dd className="font-bold text-cyan-800 text-right">{project.pressure}</dd>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#F0EBE1]">
                    <dt className="text-[#6B6F73]">DURATION</dt>
                    <dd className="text-[#242424] text-right">{project.duration}</dd>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#F0EBE1]">
                    <dt className="text-[#6B6F73]">PROJECT TYPE</dt>
                    <dd className="text-[#333333] text-right">{project.projectType}</dd>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#F0EBE1]">
                    <dt className="text-[#6B6F73]">STATUS</dt>
                    <dd className="font-bold text-emerald-700 text-right">{project.status}</dd>
                  </div>
                </dl>

                {/* Call to action */}
                <div className="pt-4 border-t border-[#D9D9D9]">
                  <Link
                    href={`/contact?project=${encodeURIComponent(project.title)}#rfq`}
                    className="w-full bg-[#C69C6D] hover:bg-[#B08554] text-[#242424] font-bold py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-sm active:scale-95"
                  >
                    <span>Enquire About Similar Project</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/projects"
                    className="w-full text-center block text-xs text-[#6B6F73] hover:text-[#242424] mt-3 font-mono font-medium"
                  >
                    ← Back to All Case Studies
                  </Link>
                </div>
              </div>

            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
