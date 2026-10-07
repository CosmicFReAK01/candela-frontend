"use client";
import { useState } from "react";
import Link from "next/link";
import { openPositions } from "@/data/site";
import { Container } from "./Container";
import { SectionHeading } from "./SectionHeading";
import { ArrowRight, MapPin, Briefcase, CheckCircle2, X, Upload, Loader2 } from "lucide-react";
import { submitJobApplication, fetchCareers, ApplicationResponse } from "@/lib/api";
import { useEffect } from "react";

export function CareersSection({ content }: { content?: any }) {
  const [positions, setPositions] = useState(openPositions);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [applicationResult, setApplicationResult] = useState<ApplicationResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    location: "",
  });

  useEffect(() => {
    fetchCareers().then((data) => {
      if (data && Array.isArray(data) ) {
        setPositions(data);
      }
    });
  }, []);

  const handleApplyClick = (title: string) => {
    setSelectedJob(title);
    setFormData((prev) => ({ ...prev, position: title }));
    setSubmitted(false);
    setErrorMsg(null);
    setApplicationResult(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg(null);
    try {
      const res = await submitJobApplication({
        positionTitle: selectedJob || "Engineering Candidate",
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        experience: formData.experience,
        location: formData.location,
      });
      setApplicationResult(res);
      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to submit application. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setSelectedJob(null);
    setSubmitted(false);
    setErrorMsg(null);
    setApplicationResult(null);
    setFormData({ name: "", email: "", phone: "", position: "", experience: "", location: "" });
  };

  return (
    <section id="careers" className="py-20 lg:py-28 bg-[#F3EFE7] border-b border-[#D9D9D9]">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeading
            eyebrow={content?.eyebrow || "CAREERS & TALENT PORTAL"}
            title={content?.title || "Build Your Career With India's Leading Pipeline EPC"}
            description={content?.desc || "Join our team of certified pipeline engineers, directional drillers, and quality specialists executing landmark infrastructure."}
          />
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#9E7444] hover:text-[#825B2E] transition shrink-0 group pb-2"
          >
            <span>{content?.linkText || "View All Open Positions"}</span>
            <ArrowRight className="w-4 h-4 transition group-hover:translate-x-1" />
          </Link>
        </div>

        {/* ── Open Positions Grid ── */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {positions.map((job) => (
            <div
              key={job.id}
              className="bg-white border border-[#D9D9D9] hover:border-[#C69C6D] rounded-xl p-6 flex flex-col justify-between transition shadow-sm hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-[#9E7444] bg-[#C69C6D]/15 border border-[#C69C6D]/30 px-2 py-0.5 rounded">
                    {job.department}
                  </span>
                  <span className="text-[11px] font-mono text-[#6B6F73] font-semibold">
                    {job.type}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-lg text-[#242424] mt-4 leading-snug">
                  {job.title}
                </h3>

                <div className="flex flex-wrap gap-3 mt-3 text-xs text-[#6B6F73] font-mono">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#9E7444]" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5 text-cyan-800" />
                    {job.experience}
                  </span>
                </div>

                <p className="text-xs text-[#4A4D50] mt-3 leading-relaxed">
                  {job.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#D9D9D9]">
                <button
                  onClick={() => handleApplyClick(job.title)}
                  className="w-full bg-[#C69C6D] hover:bg-[#B08554] text-[#242424] font-bold py-2.5 px-4 rounded-lg text-xs transition flex items-center justify-center gap-2 shadow-sm active:scale-95"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ── Interactive Application Modal ── */}
        {selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white border border-[#D9D9D9] rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 text-[#6B6F73] hover:text-[#242424] rounded-lg bg-[#F8F4EC]"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <span className="text-[10px] font-mono text-[#9E7444] font-bold uppercase tracking-wider">
                  CAREER APPLICATION · HR MICROSERVICE
                </span>
                <h3 className="font-heading font-bold text-xl text-[#242424] mt-1">
                  Apply for {selectedJob}
                </h3>
              </div>

              {submitted ? (
                <div className="bg-emerald-50 border border-emerald-300 p-6 rounded-xl text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <div className="font-heading font-bold text-lg text-[#242424]">
                    Application Submitted Successfully
                  </div>
                  <div className="bg-white border border-emerald-200 rounded-lg p-3 text-xs font-mono text-left max-w-xs mx-auto space-y-1">
                    <div className="flex justify-between">
                      <span className="text-[#6B6F73]">Tracking Ref:</span>
                      <span className="font-bold text-[#9E7444]">{applicationResult?.applicationRef || "APP-2026-CONFIRMED"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6B6F73]">Status:</span>
                      <span className="font-semibold text-emerald-700">RECEIVED</span>
                    </div>
                  </div>
                  <p className="text-xs text-[#4A4D50]">
                    {applicationResult?.message || "Our HR & Talent Division will review your credentials within 3 business days."}
                  </p>
                  <button
                    onClick={handleClose}
                    className="mt-2 text-xs font-mono text-[#9E7444] hover:underline"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
                  {errorMsg && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center gap-2">
                      <span className="font-bold">Error:</span> {errorMsg}
                    </div>
                  )}
                  <div>
                    <label className="block text-[#4A4D50] mb-1 font-semibold">FULL NAME *</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg px-3 py-2.5 text-[#242424] focus:outline-none focus:border-[#C69C6D]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#4A4D50] mb-1 font-semibold">EMAIL ADDRESS *</label>
                      <input
                        required
                        type="email"
                        placeholder="rahul@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg px-3 py-2.5 text-[#242424] focus:outline-none focus:border-[#C69C6D]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#4A4D50] mb-1 font-semibold">PHONE NUMBER *</label>
                      <input
                        required
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg px-3 py-2.5 text-[#242424] focus:outline-none focus:border-[#C69C6D]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#4A4D50] mb-1 font-semibold">EXPERIENCE (YEARS) *</label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. 5 Years"
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg px-3 py-2.5 text-[#242424] focus:outline-none focus:border-[#C69C6D]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#4A4D50] mb-1 font-semibold">PREFERRED LOCATION *</label>
                      <input
                        required
                        type="text"
                        placeholder="Gujarat / Pan-India"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg px-3 py-2.5 text-[#242424] focus:outline-none focus:border-[#C69C6D]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#4A4D50] mb-1 font-semibold">ATTACH RESUME (PDF / DOCX)</label>
                    <div className="border border-dashed border-[#C69C6D] rounded-lg p-3 text-center bg-[#F8F4EC] cursor-pointer hover:border-[#9E7444] transition">
                      <Upload className="w-4 h-4 mx-auto text-[#787B7E] mb-1" />
                      <span className="text-[11px] text-[#4A4D50]">Click to attach file or drag & drop</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#C69C6D] hover:bg-[#B08554] text-[#242424] font-bold py-3 rounded-lg text-xs tracking-wider uppercase transition shadow-sm flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Transmitting to HR Service...</span>
                      </>
                    ) : (
                      <span>Submit Application</span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
