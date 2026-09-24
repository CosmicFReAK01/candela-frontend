"use client";
import { useState } from "react";
import { CheckCircle2, Upload, Send, Loader2, AlertCircle } from "lucide-react";
import { submitRfq, RfqResponse } from "@/lib/api";

export function RFQForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rfqResult, setRfqResult] = useState<RfqResponse | null>(null);
  const [projectType, setProjectType] = useState("Cross Country Pipeline");
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    location: "",
    approxLength: "",
    diameter: "",
    description: "",
  });

  const projectTypes = [
    "Cross Country Pipeline",
    "City Gas Distribution",
    "HDD",
    "Plant Piping",
    "Hydrotesting",
    "Other",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await submitRfq({
        ...formData,
        projectType,
      });
      setRfqResult(res);
      setSubmitted(true);
    } catch (err: any) {
      console.error("RFQ submission error:", err);
      setError(err.message || "Failed to submit RFQ. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setError(null);
    setRfqResult(null);
    setFormData({
      companyName: "",
      contactPerson: "",
      email: "",
      phone: "",
      location: "",
      approxLength: "",
      diameter: "",
      description: "",
    });
  };

  return (
    <div id="rfq" className="bg-white border border-[#D9D9D9] rounded-2xl p-6 sm:p-8 shadow-xl">
      <div className="flex items-center justify-between pb-4 border-b border-[#D9D9D9]">
        <div>
          <span className="text-[10px] font-mono text-[#9E7444] font-bold uppercase tracking-wider">
            TENDER & PROCUREMENT PORTAL · SPRING BOOT MICROSERVICES
          </span>
          <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-[#242424] mt-1">
            REQUEST FOR QUOTATION (RFQ)
          </h3>
        </div>
        <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded font-semibold">
          48-HR RESPONSE
        </span>
      </div>

      {submitted ? (
        <div className="py-10 text-center space-y-5">
          <div className="w-14 h-14 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center mx-auto text-emerald-600">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h4 className="font-heading font-bold text-2xl text-[#242424]">
              RFQ Successfully Submitted to Commercial Division
            </h4>
            <p className="text-xs text-[#6B6F73] max-w-md mx-auto">
              {rfqResult?.message || "Your project dossier has been registered in our central tendering system."}
            </p>
          </div>

          <div className="bg-[#F8F4EC] border border-[#D9D9D9] rounded-xl p-5 max-w-md mx-auto text-left space-y-2 text-xs font-mono">
            <div className="flex justify-between border-b border-[#D9D9D9] pb-2">
              <span className="text-[#6B6F73]">Tender Tracking Ref:</span>
              <span className="text-[#9E7444] font-bold">{rfqResult?.referenceNo || "RFQ-2026-CONFIRMED"}</span>
            </div>
            <div className="flex justify-between border-b border-[#D9D9D9] pb-2">
              <span className="text-[#6B6F73]">Status:</span>
              <span className="text-emerald-700 font-semibold">{rfqResult?.status || "PENDING_REVIEW"}</span>
            </div>
            <div className="flex justify-between border-b border-[#D9D9D9] pb-2">
              <span className="text-[#6B6F73]">Target Response Window:</span>
              <span className="text-[#242424] font-semibold">{rfqResult?.estimatedTurnaround || "48 Business Hours"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6B6F73]">Primary Contact:</span>
              <span className="text-[#242424]">{formData.email || "Registered Official Email"}</span>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="text-xs font-mono text-[#9E7444] hover:text-[#7A562E] underline underline-offset-4"
          >
            Submit Another RFQ Enquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 space-y-5 text-xs font-mono">
          {/* Row 1: Company & Contact Person */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#4A4D50] mb-1.5 uppercase font-semibold">
                Company Name *
              </label>
              <input
                required
                type="text"
                placeholder="e.g. Gujarat State Energy Board"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg px-3.5 py-2.5 text-[#242424] placeholder:text-[#999] focus:outline-none focus:border-[#C69C6D]"
              />
            </div>

            <div>
              <label className="block text-[#4A4D50] mb-1.5 uppercase font-semibold">
                Contact Person *
              </label>
              <input
                required
                type="text"
                placeholder="e.g. Vikramaditya Singh"
                value={formData.contactPerson}
                onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg px-3.5 py-2.5 text-[#242424] placeholder:text-[#999] focus:outline-none focus:border-[#C69C6D]"
              />
            </div>
          </div>

          {/* Row 2: Email & Phone */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#4A4D50] mb-1.5 uppercase font-semibold">
                Official Business Email *
              </label>
              <input
                required
                type="email"
                placeholder="procurement@energycorp.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg px-3.5 py-2.5 text-[#242424] placeholder:text-[#999] focus:outline-none focus:border-[#C69C6D]"
              />
            </div>

            <div>
              <label className="block text-[#4A4D50] mb-1.5 uppercase font-semibold">
                Direct Phone / Mobile *
              </label>
              <input
                required
                type="tel"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg px-3.5 py-2.5 text-[#242424] placeholder:text-[#999] focus:outline-none focus:border-[#C69C6D]"
              />
            </div>
          </div>

          {/* Row 3: Project Location */}
          <div>
            <label className="block text-[#4A4D50] mb-1.5 uppercase font-semibold">
              Project Location / Corridor *
            </label>
            <input
              required
              type="text"
              placeholder="e.g. Dahej to Ahmedabad / Interstate Corridor (Gujarat / Maharashtra)"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg px-3.5 py-2.5 text-[#242424] placeholder:text-[#999] focus:outline-none focus:border-[#C69C6D]"
            />
          </div>

          {/* Row 4: Project Type Radio Options */}
          <div>
            <label className="block text-[#4A4D50] mb-2 uppercase font-semibold">
              Project Type *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {projectTypes.map((type) => (
                <label
                  key={type}
                  onClick={() => setProjectType(type)}
                  className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer transition ${
                    projectType === type
                      ? "bg-[#C69C6D]/20 border-[#C69C6D] text-[#242424] font-bold"
                      : "bg-[#F8F4EC] border-[#D9D9D9] text-[#4A4D50] hover:bg-[#EAE4D8]"
                  }`}
                >
                  <input
                    type="radio"
                    name="projectType"
                    checked={projectType === type}
                    onChange={() => setProjectType(type)}
                    className="accent-[#C69C6D]"
                  />
                  <span className="text-xs">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Row 5: Approx Length & Pipeline Diameter */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#4A4D50] mb-1.5 uppercase font-semibold">
                Approx. Pipeline Length (KM / Meters)
              </label>
              <input
                type="text"
                placeholder="e.g. 120 KM or 1,800 M River Span"
                value={formData.approxLength}
                onChange={(e) => setFormData({ ...formData, approxLength: e.target.value })}
                className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg px-3.5 py-2.5 text-[#242424] placeholder:text-[#999] focus:outline-none focus:border-[#C69C6D]"
              />
            </div>

            <div>
              <label className="block text-[#4A4D50] mb-1.5 uppercase font-semibold">
                Pipeline Diameter (OD)
              </label>
              <input
                type="text"
                placeholder='e.g. 24" OD / 36" OD API 5L X70'
                value={formData.diameter}
                onChange={(e) => setFormData({ ...formData, diameter: e.target.value })}
                className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg px-3.5 py-2.5 text-[#242424] placeholder:text-[#999] focus:outline-none focus:border-[#C69C6D]"
              />
            </div>
          </div>

          {/* Row 6: Project Description */}
          <div>
            <label className="block text-[#4A4D50] mb-1.5 uppercase font-semibold">
              Project Description & Scope of Work *
            </label>
            <textarea
              required
              rows={4}
              placeholder="Outline project parameters, soil/terrain conditions, crossing requirements, estimated timeline, or statutory requirements..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg p-3 text-[#242424] placeholder:text-[#999] focus:outline-none focus:border-[#C69C6D] font-sans text-xs leading-relaxed"
            />
          </div>

          {/* Row 7: Document Upload */}
          <div>
            <label className="block text-[#4A4D50] mb-1.5 uppercase font-semibold">
              Upload NIT / BOQ Documents (PDF, ZIP, DOCX up to 25MB)
            </label>
            <div className="border border-dashed border-[#C69C6D] rounded-xl p-4 text-center bg-[#F8F4EC] hover:border-[#9E7444] transition cursor-pointer">
              <Upload className="w-5 h-5 mx-auto text-[#787B7E] mb-1" />
              <div className="text-xs text-[#242424] font-medium">Drag & drop tender specifications or click to browse</div>
              <div className="text-[10px] text-[#787B7E] mt-0.5">Encrypted & kept strictly confidential under EPC NDA</div>
            </div>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2.5 font-sans">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#C69C6D] hover:bg-[#B08554] text-[#242424] font-bold py-3.5 px-6 rounded-xl text-xs sm:text-sm tracking-wider uppercase transition shadow-md shadow-[#C69C6D]/20 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Transmitting to Tendering Service...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit RFQ & Scope Dossier</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
