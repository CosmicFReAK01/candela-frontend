import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { AboutSection } from "@/components/AboutSection";
import { Services } from "@/components/Services";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { IndiaMap } from "@/components/IndiaMap";
import { Process } from "@/components/Process";
import { HSE } from "@/components/HSE";
import { Fleet } from "@/components/Fleet";
import { ClientsSection } from "@/components/ClientsSection";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { CareersSection } from "@/components/CareersSection";
import { RFQForm } from "@/components/RFQForm";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function Home() {
  let settings: any = {
    control_room_hotline: "1800-180-9999",
    contact_email: "tenders@candelaconstruction.com",
    office_address: "Candela House, Energy Corridor Complex, North Bihar Regional Base, India",
  };

  let homeContent: any = {};

  try {
    const rows = await query("SELECT * FROM site_settings WHERE id = 'default'");
    if (rows && rows.length > 0) {
      settings = { ...settings, ...rows[0] };
      homeContent = rows[0].home_content || {};
    }
  } catch (err) {
    console.error("Failed to load settings in Home:", err);
  }

  const tendersSec = homeContent.tendersSection || {};

  return (
    <>
      <Navbar />
      <main className="bg-[#F8F4EC] text-[#242424]">
        {/* 1. Hero Section */}
        <Hero content={homeContent.hero} />

        {/* 2. Trust / Statistics */}
        <Stats content={homeContent.statsSection} />

        {/* 3. About Company (Image + Story) */}
        <AboutSection content={homeContent.aboutCompany} />

        {/* 4. Our Services (Interactive Cards) */}
        <Services content={homeContent.servicesSection} />

        {/* 5. Featured Projects (Large Case Studies) */}
        <FeaturedProjects content={homeContent.projectsSection} />

        {/* 6. Interactive India Project Map */}
        <IndiaMap content={homeContent.corridorSection} />

        {/* 7. How We Execute (12-Step Lifecycle) */}
        <Process content={homeContent.processSection} />

        {/* 8. HSE & Quality Management */}
        <HSE content={homeContent.hseSection} />

        {/* 9. Equipment & Technology */}
        <Fleet content={homeContent.fleetSection} />

        {/* 10. Our Clients */}
        <ClientsSection content={homeContent.clientsSection} />

        {/* 11. Why Choose Us */}
        <WhyChooseUs content={homeContent.whyUsSection} />

        {/* 12. Careers / Join Us */}
        <CareersSection content={homeContent.careersSection} />

        {/* 13. Request a Quote (RFQ) & Tender Section */}
        <section id="contact" className="py-20 lg:py-28 bg-[#F8F4EC] border-b border-[#D9D9D9]">
          <Container>
            <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-5 space-y-6">
                <SectionHeading
                  eyebrow={tendersSec.eyebrow || "TENDERS & COMMERCIAL ENQUIRY"}
                  title={tendersSec.title || "Submit an EPC Tender, NIT, or Project Specification"}
                  description={tendersSec.desc || "Our Contracts & Estimation Division reviews technical enquiries within 48 business hours. We provide formal technical-commercial bids for state and national pipelines."}
                />

                {/* 24x7 Emergency Box */}
                <div className="bg-red-50 border border-red-200 rounded-xl p-5 space-y-2 shadow-sm">
                  <div className="flex items-center gap-2 text-red-700 text-xs font-mono font-bold">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
                    </span>
                    {tendersSec.emergencyBadge || "24x7 PIPELINE OPERATIONS & EMERGENCY"}
                  </div>
                  <a
                    href={`tel:${(tendersSec.emergencyPhone || settings.control_room_hotline || "18001809999").replace(/[^0-9]/g, "")}`}
                    className="block text-[#242424] font-mono font-bold text-2xl tracking-wider hover:text-red-700 transition"
                  >
                    {tendersSec.emergencyPhone || settings.control_room_hotline || "1800-180-9999"}
                  </a>
                  <p className="text-xs text-[#5A5E62] leading-relaxed">
                    {tendersSec.emergencyDesc || "Rapid emergency response, leak reporting & right-of-way alert dispatch across all national operational sectors."}
                  </p>
                </div>

                {/* Office Contact Info */}
                <div className="bg-white border border-[#D9D9D9] rounded-xl p-5 space-y-3 text-xs text-[#4A4D50] font-mono shadow-sm">
                  <div>
                    <div className="text-[#9E7444] font-bold uppercase">{tendersSec.commercialTitle || "Commercial & Tendering"}</div>
                    <div className="text-[#242424] text-sm mt-0.5 font-bold">
                      {tendersSec.commercialEmail || settings.contact_email || "tenders@candelaconstruction.com"}
                    </div>
                  </div>
                  <div className="pt-2 border-t border-[#D9D9D9]">
                    <div className="text-[#9E7444] font-bold uppercase">{tendersSec.hqTitle || "Corporate Headquarters"}</div>
                    <div className="text-[#242424] mt-0.5 leading-relaxed font-sans text-xs">
                      {tendersSec.hqAddress || settings.office_address || "Candela House, Energy Corridor Complex, North Bihar Regional Base, India"}
                    </div>
                  </div>
                </div>
              </div>

              {/* RFQ Form */}
              <div className="lg:col-span-7">
                <RFQForm />
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
