"use client";
import { useState, useRef } from "react";
import { CheckCircle2, Upload, Send, Loader2, FileText, X, Paperclip, AlertCircle } from "lucide-react";
import { submitRfq, RfqResponse } from "@/lib/api";

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export function RFQForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [rfqResult, setRfqResult] = useState<RfqResponse | null>(null);
  const [projectType, setProjectType] = useState("Cross Country Pipeline");
  const [customProjectType, setCustomProjectType] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    "Custom / Other",
  ];

  const handleFileSelect = (file: File | null) => {
    setFileError(null);
    if (!file) {
      setSelectedFile(null);
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setFileError(`File size (${formatBytes(file.size)}) exceeds the maximum 25MB limit.`);
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    setSelectedFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg(null);

    // Compute final project type: if custom/other selected, must have custom name
    const finalProjectType =
      projectType === "Custom / Other" || projectType === "Other"
        ? (customProjectType.trim() || "Custom Pipeline Project")
        : projectType;

    if ((projectType === "Custom / Other" || projectType === "Other") && !customProjectType.trim()) {
      setErrorMsg("Please enter your custom Project Type in the designated field.");
      setSubmitting(false);
      return;
    }

    try {
      const res = await submitRfq({
        ...formData,
        projectType: finalProjectType,
        documentFile: selectedFile,
      });
      setRfqResult(res);
      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to submit RFQ. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setErrorMsg(null);
    setFileError(null);
    setSelectedFile(null);
    setRfqResult(null);
    setCustomProjectType("");
    setProjectType("Cross Country Pipeline");
    if (fileInputRef.current) fileInputRef.current.value = "";
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
            <div className="flex justify-between border-b border-[#D9D9D9] pb-2">
              <span className="text-[#6B6F73]">Primary Contact:</span>
              <span className="text-[#242424]">{formData.email || "Registered Official Email"}</span>
            </div>
            {selectedFile && (
              <div className="flex justify-between pt-1 text-emerald-800">
                <span className="flex items-center gap-1 font-semibold">
                  <Paperclip className="w-3.5 h-3.5" /> Attached Document:
                </span>
                <span className="truncate max-w-[200px]" title={selectedFile.name}>
                  {selectedFile.name} ({formatBytes(selectedFile.size)})
                </span>
              </div>
            )}
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
          {errorMsg && (
            <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <div>
                <span className="font-bold">Error:</span> {errorMsg}
              </div>
            </div>
          )}

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
            <div className="flex items-center justify-between mb-2">
              <label className="block text-[#4A4D50] uppercase font-semibold">
                Project Type *
              </label>
              <span className="text-[10px] text-[#787B7E]">
                Select pre-configured type or define your own
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {projectTypes.map((type) => (
                <label
                  key={type}
                  onClick={() => setProjectType(type)}
                  className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer transition ${
                    projectType === type
                      ? "bg-[#C69C6D]/20 border-[#C69C6D] text-[#242424] font-bold shadow-sm"
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

            {/* CUSTOM PROJECT TYPE SECTION */}
            {(projectType === "Custom / Other" || projectType === "Other") && (
              <div className="mt-3.5 p-4 bg-gradient-to-r from-[#F8F4EC] to-amber-50/60 border-2 border-[#C69C6D] rounded-xl space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#9E7444] animate-pulse"></span>
                  <label className="text-[#242424] text-[11px] uppercase font-bold tracking-wider">
                    Specify Your Custom Project Type *
                  </label>
                </div>
                <input
                  type="text"
                  required
                  placeholder="e.g. Subsea Gas Pipeline, Cryogenic LNG Header, Slurry Transportation Line, Microtunneling Trenchless..."
                  value={customProjectType}
                  onChange={(e) => setCustomProjectType(e.target.value)}
                  className="w-full bg-white border border-[#C69C6D] rounded-lg px-3.5 py-2.5 text-[#242424] placeholder:text-[#999] focus:outline-none focus:ring-2 focus:ring-[#C69C6D]/40 text-xs font-semibold"
                />
                <p className="text-[10px] text-[#787B7E]">
                  Enter your bespoke EPC engineering scope or specialized pipeline classification.
                </p>
              </div>
            )}
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

          {/* Row 7: Actual Document Upload (PDF, ZIP, DOCX up to 25MB) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-[#4A4D50] uppercase font-semibold">
                Upload NIT / BOQ Documents (PDF, ZIP, DOCX up to 25MB)
              </label>
              <span className="text-[10px] text-emerald-700 font-bold">
                Direct Database Storage
              </span>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,.doc,.zip,.rar"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileSelect(e.target.files[0]);
                }
              }}
              className="hidden"
            />

            {selectedFile ? (
              <div className="p-4 bg-emerald-50/60 border border-emerald-300 rounded-xl flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0 text-emerald-700">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-xs font-bold text-[#242424] truncate" title={selectedFile.name}>
                      {selectedFile.name}
                    </div>
                    <div className="text-[10px] text-emerald-800 font-semibold flex items-center gap-2 mt-0.5">
                      <span>{formatBytes(selectedFile.size)}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1 text-emerald-700">
                        <CheckCircle2 className="w-3 h-3" /> Ready for upload & DB encryption
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-[11px] text-[#9E7444] hover:underline font-bold px-2 py-1"
                  >
                    Change
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFile(null);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg"
                    title="Remove file"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-5 text-center transition cursor-pointer ${
                  isDragging
                    ? "border-[#9E7444] bg-[#C69C6D]/15 scale-[1.01]"
                    : "border-[#C69C6D] bg-[#F8F4EC] hover:border-[#9E7444] hover:bg-[#F2ECE1]"
                }`}
              >
                <Upload className="w-6 h-6 mx-auto text-[#9E7444] mb-1.5" />
                <div className="text-xs text-[#242424] font-semibold">
                  Drag & drop tender specifications (NIT, BOQ, Scope) or <span className="text-[#9E7444] underline">browse</span>
                </div>
                <div className="text-[10px] text-[#787B7E] mt-1">
                  Supported formats: PDF, ZIP, DOCX, DOC (Up to 25MB) · Encrypted and stored securely in central database
                </div>
              </div>
            )}

            {fileError && (
              <div className="mt-2 text-xs text-red-600 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{fileError}</span>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#C69C6D] hover:bg-[#B08554] text-[#242424] font-bold py-3.5 px-6 rounded-xl text-xs sm:text-sm tracking-wider uppercase transition shadow-md shadow-[#C69C6D]/20 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Transmitting RFQ & Uploading Document to Database...</span>
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
