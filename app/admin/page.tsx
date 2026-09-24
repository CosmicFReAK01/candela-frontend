"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Lock,
  ShieldCheck,
  Building2,
  Briefcase,
  Layers,
  Wrench,
  Newspaper,
  Users,
  FileText,
  Sliders,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Search,
  PhoneCall,
  Save,
  ChevronRight,
  Eye,
  X,
  MapPin,
  Award,
  Globe,
  Compass,
  Sparkles,
  MessageSquare,
  KeyRound,
} from "lucide-react";

export default function AdminPortal() {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passkeyInput, setPasskeyInput] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("settings");

  // Global Settings state
  const [settings, setSettings] = useState<any>({
    company_name: "CandelaConstruction Private Limited",
    tagline: "Trust delivered.",
    control_room_hotline: "1800-180-9999",
    compliance_codes: "PNGRB / ASME B31.8 / API 1104",
    safe_hours: "28.4M LTI-Free Safe Hours",
    iso_badges: "ISO 9001:2015, ISO 14001, ISO 45001",
    contact_email: "tenders@candelaconstruction.com",
    emergency_phone: "+91 1800-180-9999",
    office_address: "Candela Tower, Corporate Corridor, SG Highway, Ahmedabad, Gujarat - 380054",
    hero_title: "Building the Infrastructure Behind India's Energy Future",
    hero_subtitle: "Specialized pipeline construction, engineering and infrastructure solutions for natural gas, hydrocarbons and industrial applications.",
    about_content: null,
    capabilities_content: null,
    home_content: null,
    regional_bases: [],
  });

  // Module data states
  const [projects, setProjects] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [fleet, setFleet] = useState<any[]>([]);
  const [careers, setCareers] = useState<any[]>([]);
  const [news, setNews] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [rfqs, setRfqs] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [hse, setHse] = useState<any>(null);

  // UI / Status states
  const [loading, setLoading] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Modal states
  const [modalType, setModalType] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ module: string; id: string; title: string } | null>(null);

  // Sub-modals for About Directors, Regional Bases, etc.
  const [directorModal, setDirectorModal] = useState<any | null>(null);
  const [govModal, setGovModal] = useState<any | null>(null);
  const [regionalBaseModal, setRegionalBaseModal] = useState<any | null>(null);
  const [pillarModal, setPillarModal] = useState<any | null>(null);
  const [viewNotesModal, setViewNotesModal] = useState<{ type: "rfq" | "application"; item: any } | null>(null);

  // Security / Password & Master Recovery Modals
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
  const [currentPasswordInput, setCurrentPasswordInput] = useState<string>("");
  const [newPasswordInput, setNewPasswordInput] = useState<string>("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState<string>("");
  const [passwordChangeError, setPasswordChangeError] = useState<string>("");

  const [showRecoveryModal, setShowRecoveryModal] = useState<boolean>(false);
  const [recoveryKeyInput, setRecoveryKeyInput] = useState<string>("");
  const [recoveryNewPasswordInput, setRecoveryNewPasswordInput] = useState<string>("");
  const [recoveryError, setRecoveryError] = useState<string>("");
  const [recoverySuccess, setRecoverySuccess] = useState<string>("");

  // Check saved session on mount via server verification
  useEffect(() => {
    checkServerSession();
  }, []);

  const checkServerSession = async () => {
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "verify" }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.authenticated) {
          setIsAuthenticated(true);
          loadAllData();
          return;
        }
      }
      setIsAuthenticated(false);
    } catch {
      setIsAuthenticated(false);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 4000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "login", password: passkeyInput }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Authentication failed.");
      }
      setIsAuthenticated(true);
      setPasskeyInput("");
      showToast("Access granted! Authenticated as Administrator.");
      loadAllData();
    } catch (err: any) {
      setAuthError(err.message || "Invalid admin password.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "logout" }),
      });
    } catch {}
    setIsAuthenticated(false);
    showToast("Logged out successfully.");
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordChangeError("");
    if (newPasswordInput !== confirmPasswordInput) {
      setPasswordChangeError("New passwords do not match.");
      return;
    }
    if (newPasswordInput.length < 8) {
      setPasswordChangeError("New password must be at least 8 characters long.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "change-password",
          currentPassword: currentPasswordInput,
          newPassword: newPasswordInput,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to change password.");
      }
      showToast("Password updated successfully! All other active sessions have been terminated.");
      setShowPasswordModal(false);
      setCurrentPasswordInput("");
      setNewPasswordInput("");
      setConfirmPasswordInput("");
    } catch (err: any) {
      setPasswordChangeError(err.message || "Error updating password.");
    } finally {
      setLoading(false);
    }
  };

  const handleMasterRecovery = async (e: React.FormEvent) => {
    e.preventDefault();
    setRecoveryError("");
    setRecoverySuccess("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "recover",
          recoveryKey: recoveryKeyInput,
          newPassword: recoveryNewPasswordInput,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Master recovery failed.");
      }
      setRecoverySuccess(
        "Master Recovery Key verified! All existing sessions have been terminated. Redirecting to admin console..."
      );
      setTimeout(() => {
        setShowRecoveryModal(false);
        setRecoveryKeyInput("");
        setRecoveryNewPasswordInput("");
        setIsAuthenticated(true);
        loadAllData();
      }, 1500);
    } catch (err: any) {
      setRecoveryError(err.message || "Invalid Master Recovery Key.");
    } finally {
      setLoading(false);
    }
  };

  const loadAllData = async () => {
    setLoading(true);
    try {
      // 1. Settings
      const sRes = await fetch("/api/settings", { cache: "no-store" });
      if (sRes.ok) setSettings(await sRes.json());

      // 2. Projects
      const pRes = await fetch("/api/admin/projects", { cache: "no-store" });
      if (pRes.ok) setProjects(await pRes.json());

      // 3. Services
      const svcRes = await fetch("/api/admin/services", { cache: "no-store" });
      if (svcRes.ok) setServices(await svcRes.json());

      // 4. Fleet
      const fRes = await fetch("/api/admin/fleet", { cache: "no-store" });
      if (fRes.ok) setFleet(await fRes.json());

      // 5. Careers
      const cRes = await fetch("/api/admin/careers", { cache: "no-store" });
      if (cRes.ok) setCareers(await cRes.json());

      // 6. News
      const nRes = await fetch("/api/admin/news", { cache: "no-store" });
      if (nRes.ok) setNews(await nRes.json());

      // 7. Clients
      const clRes = await fetch("/api/admin/clients", { cache: "no-store" });
      if (clRes.ok) setClients(await clRes.json());

      // 8. RFQ
      const rRes = await fetch("/api/admin/rfq", { cache: "no-store" });
      if (rRes.ok) setRfqs(await rRes.json());

      // 9. Applications
      const aRes = await fetch("/api/admin/applications", { cache: "no-store" });
      if (aRes.ok) setApplications(await aRes.json());

      // 10. HSE
      const hRes = await fetch("/api/admin/hse", { cache: "no-store" });
      if (hRes.ok) setHse(await hRes.json());
    } catch (err) {
      console.error("Failed to load admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  // ── Save Global Settings (Contact, About, Home Content, Capabilities) ──
  const handleSaveSettings = async (customSettings?: any) => {
    setLoading(true);
    const toSave = customSettings || settings;
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toSave),
      });
      if (!res.ok) throw new Error("Failed to save settings");
      const updated = await res.json();
      if (updated.data) setSettings(updated.data);
      showToast("Updated database record in PostgreSQL! Changes are live across the site.");
    } catch (err: any) {
      alert("Error saving settings: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // ── Generic Delete Item ──
  const executeDelete = async () => {
    if (!deleteConfirm) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/${deleteConfirm.module}?id=${encodeURIComponent(deleteConfirm.id)}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete record");
      showToast(`Deleted ${deleteConfirm.title} from database.`);
      setDeleteConfirm(null);
      loadAllData();
    } catch (err: any) {
      alert("Delete failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // ── Generic Save (Create / Update) ──
  const handleSaveItem = async (module: string, data: any, isEdit: boolean) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/${module}`, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to save record");
      showToast(`${module.slice(0, -1).toUpperCase()} successfully ${isEdit ? "updated" : "created"}!`);
      setModalType(null);
      setEditingItem(null);
      loadAllData();
    } catch (err: any) {
      alert("Save failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // ── Inline Status Updates ──
  const handleUpdateProjectStatus = async (projectId: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: projectId, status: newStatus }),
      });
      if (res.ok) {
        setProjects((prev) =>
          prev.map((p) => (p.id === projectId ? { ...p, status: newStatus } : p))
        );
        showToast(`Project status updated to ${newStatus}`);
      }
    } catch {
      alert("Failed to update status");
    }
  };

  const handleUpdateRfqStatus = async (rfqId: string, newStatus: string, adminNotes?: string) => {
    try {
      const res = await fetch("/api/admin/rfq", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: rfqId, status: newStatus, admin_notes: adminNotes }),
      });
      if (res.ok) {
        setRfqs((prev) =>
          prev.map((r) => (r.id === rfqId ? { ...r, status: newStatus, admin_notes: adminNotes !== undefined ? adminNotes : r.admin_notes } : r))
        );
        showToast(`RFQ status updated to ${newStatus}`);
      }
    } catch {
      alert("Failed to update RFQ");
    }
  };

  const handleUpdateAppStatus = async (appId: string, newStatus: string, adminNotes?: string) => {
    try {
      const res = await fetch("/api/admin/applications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: appId, status: newStatus, admin_notes: adminNotes }),
      });
      if (res.ok) {
        setApplications((prev) =>
          prev.map((a) => (a.id === appId ? { ...a, status: newStatus, admin_notes: adminNotes !== undefined ? adminNotes : a.admin_notes } : a))
        );
        showToast(`Application status updated to ${newStatus}`);
      }
    } catch {
      alert("Failed to update Application");
    }
  };

  // ── Filtered Helpers ──
  const filteredProjects = projects.filter(
    (p) =>
      p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.client?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredNews = news.filter(
    (n) =>
      n.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCareers = careers.filter(
    (c) =>
      c.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.department?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ══════════════════════════════════════════════════════════════════════
  // RENDER: LOGIN PASSKEY SCREEN
  // ══════════════════════════════════════════════════════════════════════
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F8F4EC] text-[#242424] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white border border-[#D9D9D9] rounded-2xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-[#242424] text-[#C69C6D] rounded-xl mx-auto flex items-center justify-center shadow-md">
              <Lock className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-mono text-[#9E7444] font-bold uppercase tracking-widest block">
              ENTERPRISE PRIVILEGE ACCESS
            </span>
            <h1 className="font-heading font-extrabold text-2xl text-[#242424]">
              CandelaConstruction Admin
            </h1>
            <p className="text-xs text-[#6B6F73]">
              Authenticate to manage live database records, header hotlines, projects, and tenders.
            </p>
          </div>

          {authError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-bold text-[#4A4D50] mb-1.5">
                ADMIN PRIVILEGE PASSKEY
              </label>
              <input
                type="password"
                required
                placeholder="Enter master passkey "
                value={passkeyInput}
                onChange={(e) => setPasskeyInput(e.target.value)}
                className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-xl px-4 py-3 text-sm text-[#242424] focus:outline-none focus:border-[#C69C6D] font-mono tracking-wider"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#C69C6D] hover:bg-[#B08554] text-[#242424] font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition shadow-sm active:scale-95 flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Unlock Admin Controls</span>
            </button>
          </form>

          <div className="pt-3 border-t border-[#D9D9D9] flex items-center justify-between text-xs font-mono">
            <button
              type="button"
              onClick={() => {
                setShowRecoveryModal(true);
                setRecoveryError("");
                setRecoverySuccess("");
              }}
              className="text-[#9E7444] hover:text-[#785322] hover:underline flex items-center gap-1 font-semibold"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Emergency Recovery</span>
            </button>
            <Link href="/" className="text-[#6B6F73] hover:text-[#242424] flex items-center gap-1">
              <span>Return to Site →</span>
            </Link>
          </div>
        </div>

        {/* ── Break-Glass Master Recovery Modal ── */}
        {showRecoveryModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-fade-in">
            <div className="bg-white border-2 border-red-500 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-red-600">
                  <KeyRound className="w-6 h-6" />
                  <h3 className="font-heading font-extrabold text-base text-[#242424]">
                    Break-Glass Master Recovery
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowRecoveryModal(false)}
                  className="p-1 text-[#6B6F73] hover:text-[#242424]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs font-mono text-red-800 space-y-1">
                <p className="font-bold">⚠️ EMERGENCY RECOVERY PROTOCOL</p>
                <p>
                  Entering the cryptographic Master Recovery Key will immediately{" "}
                  <strong>terminate all active admin sessions</strong> across all browsers/devices and reset the admin password.
                </p>
              </div>

              {recoveryError && (
                <div className="p-3 bg-red-100 border border-red-300 rounded-xl text-xs font-mono text-red-800 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{recoveryError}</span>
                </div>
              )}

              {recoverySuccess && (
                <div className="p-3 bg-emerald-100 border border-emerald-300 rounded-xl text-xs font-mono text-emerald-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{recoverySuccess}</span>
                </div>
              )}

              <form onSubmit={handleMasterRecovery} className="space-y-3 font-mono text-xs">
                <div>
                  <label className="block text-[#4A4D50] mb-1 font-bold">
                    MASTER RECOVERY KEY (CANDELA-REC-...)
                  </label>
                  <input
                    type="password"
                    required
                    value={recoveryKeyInput}
                    onChange={(e) => setRecoveryKeyInput(e.target.value)}
                    placeholder="CANDELA-REC-XXXX-XXXX-XXXX-XXXX"
                    className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg px-3 py-2 text-[#242424] focus:outline-none focus:border-red-500 font-mono tracking-wider text-sm"
                  />
                </div>

                <div>
                  <label className="block text-[#4A4D50] mb-1 font-bold">
                    NEW ADMIN PASSWORD
                  </label>
                  <input
                    type="password"
                    required
                    minLength={8}
                    value={recoveryNewPasswordInput}
                    onChange={(e) => setRecoveryNewPasswordInput(e.target.value)}
                    placeholder="Enter new strong password"
                    className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg px-3 py-2 text-[#242424] focus:outline-none focus:border-red-500 text-sm"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowRecoveryModal(false)}
                    className="px-4 py-2 text-[#6B6F73] hover:text-[#242424]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-xl transition flex items-center gap-2"
                  >
                    <KeyRound className="w-4 h-4" />
                    <span>Override & Recover Access</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════
  // RENDER: AUTHENTICATED ADMIN DASHBOARD
  // ══════════════════════════════════════════════════════════════════════
  return (
    <div className="min-h-screen bg-[#F8F4EC] text-[#242424] flex flex-col">
      {/* ── Top Bar ── */}
      <header className="bg-white border-b border-[#D9D9D9] sticky top-0 z-40 px-6 py-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-[#C69C6D] to-[#9E7444] rounded-lg flex items-center justify-center text-white font-black text-base shadow-sm">
            CC
          </div>
          <div>
            <div className="font-heading font-extrabold text-base tracking-tight text-[#242424]">
              CandelaConstruction <span className="text-[#C69C6D] text-xs font-mono font-bold uppercase ml-1 px-2 py-0.5 bg-[#F8F4EC] rounded border border-[#D9D9D9]">Admin Console</span>
            </div>
            <div className="text-[10px] font-mono text-[#6B6F73]">
              PostgreSQL <span className="text-emerald-700 font-bold">Port 5433 (GasPipeline)</span> · Live Microservices Sync
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={loadAllData}
            disabled={loading}
            title="Reload from PostgreSQL"
            className="p-2 bg-[#F8F4EC] hover:bg-[#EAE4D8] border border-[#D9D9D9] text-[#4A4D50] rounded-lg transition"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-[#9E7444]" : ""}`} />
          </button>

          <Link
            href="/"
            target="_blank"
            className="px-3 py-1.5 bg-[#F8F4EC] hover:bg-[#EAE4D8] border border-[#D9D9D9] text-[#242424] rounded-lg text-xs font-mono transition flex items-center gap-1.5 font-semibold"
          >
            <span>Public Site</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#9E7444]" />
          </Link>

          <button
            onClick={() => {
              setShowPasswordModal(true);
              setPasswordChangeError("");
              setCurrentPasswordInput("");
              setNewPasswordInput("");
              setConfirmPasswordInput("");
            }}
            className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-[#9E7444] rounded-lg text-xs font-mono transition flex items-center gap-1.5 font-semibold"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Change Password</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-3 py-1.5 bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 rounded-lg text-xs font-mono transition flex items-center gap-1.5 font-semibold"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Lock / Exit</span>
          </button>
        </div>
      </header>

      {/* ── Toast Alert ── */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#242424] text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-[#C69C6D] animate-slide-up">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-mono">{toastMessage}</span>
        </div>
      )}

      {/* ── Main Dashboard Body with Sidebar ── */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto p-4 sm:p-6 gap-6">
        {/* ── Left Sidebar Tabs ── */}
        <aside className="w-full md:w-64 shrink-0 space-y-4 bg-white border border-[#D9D9D9] rounded-2xl p-3 shadow-sm h-fit">
          <div>
            <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-[#9E7444] font-bold">
              PLATFORM & PROPAGATION
            </div>
            <div className="space-y-1 mt-1">
              {[
                { id: "settings", label: "Global & Header Bar", icon: Sliders, count: null },
                { id: "contact", label: "Contact & Regional Bases", icon: PhoneCall, count: settings.regional_bases?.length || 4 },
                { id: "about", label: "About Us & Governance", icon: Award, count: settings.about_content?.leadership?.length || 4 },
                { id: "home_sections", label: "Homepage Sections (All)", icon: Globe, count: 13 },
              ].map((item) => {
                const Icon = item.icon;
                const active = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setSearchQuery("");
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono transition text-left ${active
                        ? "bg-[#242424] text-white font-bold shadow-sm"
                        : "text-[#4A4D50] hover:bg-[#F8F4EC] hover:text-[#242424]"
                      }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon className={`w-4 h-4 shrink-0 ${active ? "text-[#C69C6D]" : "text-[#787B7E]"}`} />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.count !== null && (
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded shrink-0 ${active ? "bg-[#C69C6D] text-[#242424] font-bold" : "bg-[#F3EFE7] text-[#6B6F73]"
                          }`}
                      >
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-[#9E7444] font-bold">
              OPERATIONS & ASSETS
            </div>
            <div className="space-y-1 mt-1">
              {[
                { id: "projects", label: "Projects & Spreads", icon: Building2, count: projects.length },
                { id: "services", label: "EPC Services", icon: Layers, count: services.length },
                { id: "fleet", label: "Machinery Fleet", icon: Wrench, count: fleet.length },
                { id: "hse", label: "HSE & Quality Metrics", icon: ShieldCheck, count: null },
                { id: "clients", label: "Tier-1 Energy Clients", icon: Users, count: clients.length },
              ].map((item) => {
                const Icon = item.icon;
                const active = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setSearchQuery("");
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono transition text-left ${active
                        ? "bg-[#242424] text-white font-bold shadow-sm"
                        : "text-[#4A4D50] hover:bg-[#F8F4EC] hover:text-[#242424]"
                      }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon className={`w-4 h-4 shrink-0 ${active ? "text-[#C69C6D]" : "text-[#787B7E]"}`} />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.count !== null && (
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded shrink-0 ${active ? "bg-[#C69C6D] text-[#242424] font-bold" : "bg-[#F3EFE7] text-[#6B6F73]"
                          }`}
                      >
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-[#9E7444] font-bold">
              INBOUND & TALENT
            </div>
            <div className="space-y-1 mt-1">
              {[
                { id: "rfq", label: "RFQ & Tender Inbox", icon: FileText, count: rfqs.length },
                { id: "applications", label: "Job Applications", icon: Users, count: applications.length },
                { id: "careers", label: "Careers Portal", icon: Briefcase, count: careers.length },
                { id: "news", label: "News & Releases", icon: Newspaper, count: news.length },
              ].map((item) => {
                const Icon = item.icon;
                const active = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setSearchQuery("");
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono transition text-left ${active
                        ? "bg-[#242424] text-white font-bold shadow-sm"
                        : "text-[#4A4D50] hover:bg-[#F8F4EC] hover:text-[#242424]"
                      }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon className={`w-4 h-4 shrink-0 ${active ? "text-[#C69C6D]" : "text-[#787B7E]"}`} />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.count !== null && (
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded shrink-0 ${active ? "bg-[#C69C6D] text-[#242424] font-bold" : "bg-[#F3EFE7] text-[#6B6F73]"
                          }`}
                      >
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* ── Main Content Area ── */}
        <main className="flex-1 bg-white border border-[#D9D9D9] rounded-2xl p-6 sm:p-8 shadow-sm">
          {/* ════════════════════════════════════════════════════════════
              TAB 1: GLOBAL SETTINGS & HEADER HOTLINES
             ════════════════════════════════════════════════════════════ */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#D9D9D9] gap-2">
                <div>
                  <h2 className="font-heading font-extrabold text-2xl text-[#242424]">
                    Header Bar & Global Site Configuration
                  </h2>
                  <p className="text-xs text-[#6B6F73] mt-0.5 font-mono">
                    Control 24x7 emergency hotline, safety badges, compliance codes, and corporate branding.
                  </p>
                </div>
                <button
                  onClick={() => handleSaveSettings()}
                  disabled={loading}
                  className="bg-[#C69C6D] hover:bg-[#B08554] text-[#242424] font-bold px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider transition flex items-center gap-2 shadow-sm shrink-0"
                >
                  <Save className="w-4 h-4" />
                  <span>Save to Database</span>
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSaveSettings();
                }}
                className="space-y-5 text-xs font-mono"
              >
                {/* 24x7 Control Room & Badges */}
                <div className="p-4 bg-[#F8F4EC] border border-[#D9D9D9] rounded-xl space-y-4">
                  <span className="text-[11px] font-bold text-[#9E7444] uppercase tracking-wider block">
                    TOP OPERATIONS & COMPLIANCE BAR (INSTANT NAVBAR UPDATE)
                  </span>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#4A4D50] mb-1 font-bold">
                        24x7 CONTROL ROOM HOTLINE *
                      </label>
                      <input
                        type="text"
                        required
                        value={settings.control_room_hotline || ""}
                        onChange={(e) => setSettings({ ...settings, control_room_hotline: e.target.value })}
                        className="w-full bg-white border border-[#D9D9D9] rounded-lg px-3 py-2 text-[#242424] focus:outline-none focus:border-[#C69C6D] font-bold text-red-700"
                        placeholder="1800-180-9999"
                      />
                      <span className="text-[10px] text-[#787B7E] mt-1 block">
                        Displays with pulsating red alert beacon across all pages.
                      </span>
                    </div>

                    <div>
                      <label className="block text-[#4A4D50] mb-1 font-bold">
                        COMPLIANCE CODES / STANDARDS *
                      </label>
                      <input
                        type="text"
                        required
                        value={settings.compliance_codes || ""}
                        onChange={(e) => setSettings({ ...settings, compliance_codes: e.target.value })}
                        className="w-full bg-white border border-[#D9D9D9] rounded-lg px-3 py-2 text-[#242424] focus:outline-none focus:border-[#C69C6D]"
                        placeholder="PNGRB / ASME B31.8 / API 1104"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#4A4D50] mb-1 font-bold">
                        SAFE MAN-HOURS RECORD (LTI-FREE) *
                      </label>
                      <input
                        type="text"
                        required
                        value={settings.safe_hours || ""}
                        onChange={(e) => setSettings({ ...settings, safe_hours: e.target.value })}
                        className="w-full bg-white border border-[#D9D9D9] rounded-lg px-3 py-2 text-[#242424] focus:outline-none focus:border-[#C69C6D] font-bold text-emerald-800"
                        placeholder="28.4M LTI-Free Safe Hours"
                      />
                    </div>

                    <div>
                      <label className="block text-[#4A4D50] mb-1 font-bold">
                        ISO CERTIFICATIONS (COMMA-SEPARATED) *
                      </label>
                      <input
                        type="text"
                        required
                        value={settings.iso_badges || ""}
                        onChange={(e) => setSettings({ ...settings, iso_badges: e.target.value })}
                        className="w-full bg-white border border-[#D9D9D9] rounded-lg px-3 py-2 text-[#242424] focus:outline-none focus:border-[#C69C6D]"
                        placeholder="ISO 9001:2015, ISO 14001, ISO 45001"
                      />
                    </div>
                  </div>
                </div>

                {/* Company Name & Tagline */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#4A4D50] mb-1 font-bold">
                      COMPANY NAME
                    </label>
                    <input
                      type="text"
                      required
                      value={settings.company_name || ""}
                      onChange={(e) => setSettings({ ...settings, company_name: e.target.value })}
                      className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg px-3 py-2 text-[#242424] focus:outline-none focus:border-[#C69C6D]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#4A4D50] mb-1 font-bold">
                      PLEDGE TAGLINE
                    </label>
                    <input
                      type="text"
                      value={settings.tagline || ""}
                      onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                      className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg px-3 py-2 text-[#242424] focus:outline-none focus:border-[#C69C6D]"
                      placeholder="Trust delivered."
                    />
                  </div>
                </div>

                {/* Hero Headline & Subtitle */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-[#4A4D50] mb-1 font-bold">
                      HOMEPAGE HERO TITLE
                    </label>
                    <input
                      type="text"
                      value={settings.hero_title || ""}
                      onChange={(e) => setSettings({ ...settings, hero_title: e.target.value })}
                      className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg px-3 py-2 text-[#242424] focus:outline-none focus:border-[#C69C6D]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#4A4D50] mb-1 font-bold">
                      HOMEPAGE HERO SUBTITLE
                    </label>
                    <textarea
                      rows={2}
                      value={settings.hero_subtitle || ""}
                      onChange={(e) => setSettings({ ...settings, hero_subtitle: e.target.value })}
                      className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg px-3 py-2 text-[#242424] focus:outline-none focus:border-[#C69C6D]"
                    />
                  </div>
                </div>

                {/* Security & Access Control */}
                <div className="p-5 bg-white border border-[#D9D9D9] rounded-xl space-y-4 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-emerald-600" />
                        <span className="text-xs font-heading font-extrabold uppercase tracking-wider text-[#242424]">
                          Cryptographic Access Security
                        </span>
                      </div>
                      <p className="text-[11px] font-mono text-[#6B6F73] mt-0.5">
                        Admin credentials are authenticated via salted Scrypt key derivation in PostgreSQL table <code className="text-[#242424] font-bold">admin_auth</code>.
                      </p>
                    </div>

                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-[10px] font-mono font-bold uppercase">
                      Protected
                    </span>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3 pt-1">
                    <div className="p-3.5 bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#242424]">
                        <KeyRound className="w-4 h-4 text-[#C69C6D]" />
                        <span>Admin Password</span>
                      </div>
                      <p className="text-[11px] text-[#4A4D50]">
                        Only authenticated administrators can rotate the master password. Changing it invalidates all other active browser sessions.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setShowPasswordModal(true);
                          setPasswordChangeError("");
                          setCurrentPasswordInput("");
                          setNewPasswordInput("");
                          setConfirmPasswordInput("");
                        }}
                        className="mt-2 text-xs font-mono font-bold text-[#9E7444] hover:text-[#785322] hover:underline flex items-center gap-1"
                      >
                        Change Password Now →
                      </button>
                    </div>

                    <div className="p-3.5 bg-red-50/50 border border-red-100 rounded-lg space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-bold text-red-900">
                        <Lock className="w-4 h-4 text-red-600" />
                        <span>Master Recovery Key</span>
                      </div>
                      <p className="text-[11px] text-red-800">
                        A break-glass master recovery key is stored securely. In the event of a takeover, it overrides all credentials and kicks out any intruder.
                      </p>
                      <span className="text-[10px] font-mono text-red-700 block mt-1">
                        Accessible via emergency login screen.
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#C69C6D] hover:bg-[#B08554] text-[#242424] font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition flex items-center gap-2 shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>Update Global Settings in PostgreSQL</span>
                </button>
              </form>
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════
              TAB 2: CONTACT CHANNELS & REGIONAL SPREAD BASES
             ════════════════════════════════════════════════════════════ */}
          {activeTab === "contact" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#D9D9D9] gap-2">
                <div>
                  <h2 className="font-heading font-extrabold text-2xl text-[#242424]">
                    Contact Channels & Regional Bases
                  </h2>
                  <p className="text-xs text-[#6B6F73] mt-0.5 font-mono">
                    Changes here immediately update the Navbar, Footer, Contact Page, and Homepage Tenders box.
                  </p>
                </div>
                <button
                  onClick={() => handleSaveSettings()}
                  disabled={loading}
                  className="bg-[#C69C6D] hover:bg-[#B08554] text-[#242424] font-bold px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider transition flex items-center gap-2 shadow-sm shrink-0"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Contact Details</span>
                </button>
              </div>

              {/* Contact Information Form */}
              <div className="grid sm:grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <label className="block text-[#4A4D50] mb-1 font-bold">
                    24x7 CONTROL ROOM HOTLINE *
                  </label>
                  <input
                    type="text"
                    value={settings.control_room_hotline || ""}
                    onChange={(e) => setSettings({ ...settings, control_room_hotline: e.target.value })}
                    className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg px-3 py-2 text-[#242424] font-bold text-red-700"
                  />
                </div>

                <div>
                  <label className="block text-[#4A4D50] mb-1 font-bold">
                    EMERGENCY TELEPHONE (TOLL FREE) *
                  </label>
                  <input
                    type="text"
                    value={settings.emergency_phone || ""}
                    onChange={(e) => setSettings({ ...settings, emergency_phone: e.target.value })}
                    className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg px-3 py-2 text-[#242424]"
                  />
                </div>

                <div>
                  <label className="block text-[#4A4D50] mb-1 font-bold">
                    COMMERCIAL & TENDERS EMAIL *
                  </label>
                  <input
                    type="email"
                    value={settings.contact_email || ""}
                    onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                    className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg px-3 py-2 text-[#242424]"
                  />
                </div>

                <div>
                  <label className="block text-[#4A4D50] mb-1 font-bold">
                    REGISTERED HEAD OFFICE ADDRESS *
                  </label>
                  <textarea
                    rows={2}
                    value={settings.office_address || ""}
                    onChange={(e) => setSettings({ ...settings, office_address: e.target.value })}
                    className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg px-3 py-2 text-[#242424]"
                  />
                </div>
              </div>

              {/* Regional Spread Bases Section */}
              <div className="pt-6 border-t border-[#D9D9D9] space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-heading font-bold text-lg text-[#242424]">
                      Regional Spread Bases (North Bihar Pipeline Corridor)
                    </h3>
                    <p className="text-xs text-[#6B6F73] font-mono">
                      Field offices, fabrication camps, and pipe yards displayed on `/contact`.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setRegionalBaseModal({ name: "", address: "", type: "Spread Base" })}
                    className="bg-[#242424] text-[#C69C6D] hover:bg-[#383838] px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Regional Base</span>
                  </button>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {(settings.regional_bases || []).map((b: any, idx: number) => (
                    <div
                      key={idx}
                      className="bg-[#F8F4EC] border border-[#D9D9D9] rounded-xl p-4 flex items-start justify-between gap-3 text-xs font-mono shadow-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-[#9E7444] shrink-0" />
                          <span className="font-bold text-[#242424] text-sm">{b.baseName || b.name}</span>
                        </div>
                        <div className="text-[11px] text-[#6B6F73] pl-5">{b.address}</div>
                        {(b.status || b.type) && (
                          <div className="pl-5">
                            <span className="text-[10px] font-bold bg-white text-[#9E7444] px-2 py-0.5 rounded border border-[#D9D9D9]">
                              {b.status || b.type}
                            </span>
                          </div>
                        )}
                        {(b.coordinator || b.phone) && (
                          <div className="text-[10px] text-[#787B7E] pl-5">
                            {b.coordinator && <span>In-Charge: {b.coordinator} </span>}
                            {b.phone && <span>· {b.phone}</span>}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => setRegionalBaseModal({ ...b, index: idx })}
                          className="p-1.5 text-[#4A4D50] hover:text-[#242424] hover:bg-white rounded transition"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            const nextBases = settings.regional_bases.filter((_: any, i: number) => i !== idx);
                            const updated = { ...settings, regional_bases: nextBases };
                            setSettings(updated);
                            handleSaveSettings(updated);
                          }}
                          className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════
              TAB 3: ABOUT US & EXECUTIVE GOVERNANCE (MOST IMPORTANT)
             ════════════════════════════════════════════════════════════ */}
          {activeTab === "about" && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#D9D9D9] gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-heading font-extrabold text-2xl text-[#242424]">
                      About Us & Executive Governance Editor
                    </h2>
                    <span className="text-[10px] font-mono font-bold bg-[#C69C6D]/20 text-[#9E7444] px-2 py-0.5 rounded">
                      CORE PAGE
                    </span>
                  </div>
                  <p className="text-xs text-[#6B6F73] mt-0.5 font-mono">
                    Directly modify Corporate Heritage, Vision & Mission, Executive Leadership Team, and 6 Value Pillars.
                  </p>
                </div>
                <button
                  onClick={() => handleSaveSettings()}
                  disabled={loading}
                  className="bg-[#C69C6D] hover:bg-[#B08554] text-[#242424] font-bold px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider transition flex items-center gap-2 shadow-sm shrink-0"
                >
                  <Save className="w-4 h-4" />
                  <span>Save About Us to Database</span>
                </button>
              </div>

              {/* 1. EXECUTIVE GOVERNANCE & LEADERSHIP TEAM (PROMINENT TOP POSITION) */}
              <div className="p-6 bg-[#F8F4EC] border border-[#C69C6D]/40 rounded-2xl space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#D9D9D9]">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#9E7444] uppercase tracking-widest block">
                      EXECUTIVE GOVERNANCE SECTION
                    </span>
                    <h3 className="font-heading font-bold text-xl text-[#242424]">
                      Board of Directors & Executive Leadership Team
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setDirectorModal({ name: "", role: "", experience: "", background: "" })}
                    className="bg-[#242424] text-[#C69C6D] hover:bg-[#383838] px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition self-start"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Executive Director</span>
                  </button>
                </div>

                {/* Governance Section Headline/Desc */}
                <div className="grid sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div>
                    <label className="block text-[#4A4D50] mb-1 font-bold">SECTION EYEBROW</label>
                    <input
                      type="text"
                      value={settings.about_content?.governance?.eyebrow || "EXECUTIVE GOVERNANCE"}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          about_content: {
                            ...settings.about_content,
                            governance: {
                              ...settings.about_content?.governance,
                              eyebrow: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full bg-white border border-[#D9D9D9] rounded-lg px-3 py-2 text-[#242424]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#4A4D50] mb-1 font-bold">SECTION HEADLINE TITLE</label>
                    <input
                      type="text"
                      value={settings.about_content?.governance?.title || "Seasoned Leadership With Decades of EPC Experience"}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          about_content: {
                            ...settings.about_content,
                            governance: {
                              ...settings.about_content?.governance,
                              title: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full bg-white border border-[#D9D9D9] rounded-lg px-3 py-2 text-[#242424]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[#4A4D50] mb-1 font-bold">SECTION SUBTITLE / SUMMARY</label>
                    <textarea
                      rows={2}
                      value={settings.about_content?.governance?.desc || "Our board and technical directors combine veteran energy utility experience with specialized geotechnical and metallurgical expertise."}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          about_content: {
                            ...settings.about_content,
                            governance: {
                              ...settings.about_content?.governance,
                              desc: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full bg-white border border-[#D9D9D9] rounded-lg px-3 py-2 text-[#242424]"
                    />
                  </div>
                </div>

                {/* Statutory & Regulatory Governance Framework */}
                <div className="pt-4 border-t border-[#D9D9D9] space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#9E7444] uppercase tracking-wider block">
                        STATUTORY & TECHNICAL GOVERNANCE CHARTER
                      </span>
                      <h4 className="font-heading font-bold text-base text-[#242424]">
                        Corporate Governance Framework ({settings.about_content?.governance?.framework?.length || 4})
                      </h4>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setGovModal({
                          code: `GOV-0${(settings.about_content?.governance?.framework?.length || 0) + 1}`,
                          title: "",
                          desc: "",
                        })
                      }
                      className="bg-white border border-[#D9D9D9] hover:border-[#C69C6D] text-[#242424] px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1 transition"
                    >
                      <Plus className="w-3.5 h-3.5 text-[#9E7444]" />
                      <span>Add Governance Charter</span>
                    </button>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {(settings.about_content?.governance?.framework || []).map((gov: any, idx: number) => (
                      <div key={idx} className="bg-white border border-[#D9D9D9] rounded-xl p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold text-[#9E7444] bg-[#C69C6D]/15 px-2 py-0.5 rounded border border-[#C69C6D]/30">
                            {gov.code}
                          </span>
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => setGovModal({ ...gov, index: idx })}
                              className="p-1 text-[#4A4D50] hover:text-[#242424] rounded"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const nextFramework = settings.about_content.governance.framework.filter(
                                  (_: any, i: number) => i !== idx
                                );
                                const updated = {
                                  ...settings,
                                  about_content: {
                                    ...settings.about_content,
                                    governance: {
                                      ...settings.about_content.governance,
                                      framework: nextFramework,
                                    },
                                  },
                                };
                                setSettings(updated);
                                handleSaveSettings(updated);
                              }}
                              className="p-1 text-red-600 hover:text-red-800 rounded"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                        <h5 className="font-heading font-bold text-xs text-[#242424]">{gov.title}</h5>
                        <p className="text-[11px] text-[#4A4D50] leading-relaxed">{gov.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Directors Heading */}
                <div className="pt-4 border-t border-[#D9D9D9] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#9E7444] uppercase tracking-wider block">
                      GOVERNING COUNCIL MEMBERS
                    </span>
                    <h4 className="font-heading font-bold text-base text-[#242424]">
                      Board of Directors & Leadership Team ({(settings.about_content?.leadership || []).length})
                    </h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => setDirectorModal({ name: "", role: "", experience: "", background: "" })}
                    className="bg-[#242424] text-[#C69C6D] hover:bg-[#383838] px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Director</span>
                  </button>
                </div>

                {/* Directors Grid */}
                <div className="grid gap-4 sm:grid-cols-2">
                  {(settings.about_content?.leadership || []).map((leader: any, idx: number) => (
                    <div
                      key={idx}
                      className="bg-white border border-[#D9D9D9] hover:border-[#C69C6D] rounded-xl p-5 space-y-3 shadow-xs transition"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-heading font-bold text-base text-[#242424]">{leader.name}</h4>
                          <div className="text-xs font-mono text-[#9E7444] font-bold">{leader.role}</div>
                          <div className="text-[10px] font-mono text-[#6B6F73]">{leader.experience}</div>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setDirectorModal({ ...leader, index: idx })}
                            className="p-1.5 text-[#4A4D50] hover:text-[#242424] hover:bg-[#F8F4EC] rounded transition"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              const nextLeaders = settings.about_content.leadership.filter((_: any, i: number) => i !== idx);
                              const updated = {
                                ...settings,
                                about_content: { ...settings.about_content, leadership: nextLeaders },
                              };
                              setSettings(updated);
                              handleSaveSettings(updated);
                            }}
                            className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-[#4A4D50] leading-relaxed line-clamp-3 font-sans">
                        {leader.background}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. HERITAGE & THREE DECADES STORY */}
              <div className="p-6 bg-white border border-[#D9D9D9] rounded-2xl space-y-4 text-xs font-mono">
                <span className="text-[10px] font-bold text-[#9E7444] uppercase tracking-wider block">
                  HERITAGE & COMPANY STORY
                </span>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#4A4D50] mb-1 font-bold">HERITAGE EYEBROW</label>
                    <input
                      type="text"
                      value={settings.about_content?.heritage?.eyebrow || "OUR HERITAGE"}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          about_content: {
                            ...settings.about_content,
                            heritage: { ...settings.about_content?.heritage, eyebrow: e.target.value },
                          },
                        })
                      }
                      className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg px-3 py-2 text-[#242424]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#4A4D50] mb-1 font-bold">HERITAGE HEADLINE</label>
                    <input
                      type="text"
                      value={settings.about_content?.heritage?.title || "Three Decades of Engineering Excellence"}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          about_content: {
                            ...settings.about_content,
                            heritage: { ...settings.about_content?.heritage, title: e.target.value },
                          },
                        })
                      }
                      className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg px-3 py-2 text-[#242424]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[#4A4D50] mb-1 font-bold">STORY PARAGRAPH 1</label>
                    <textarea
                      rows={3}
                      value={settings.about_content?.heritage?.paragraphs?.[0] || ""}
                      onChange={(e) => {
                        const paras = [...(settings.about_content?.heritage?.paragraphs || [])];
                        paras[0] = e.target.value;
                        setSettings({
                          ...settings,
                          about_content: {
                            ...settings.about_content,
                            heritage: { ...settings.about_content?.heritage, paragraphs: paras },
                          },
                        });
                      }}
                      className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg px-3 py-2 text-[#242424]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[#4A4D50] mb-1 font-bold">STORY PARAGRAPH 2</label>
                    <textarea
                      rows={3}
                      value={settings.about_content?.heritage?.paragraphs?.[1] || ""}
                      onChange={(e) => {
                        const paras = [...(settings.about_content?.heritage?.paragraphs || [])];
                        paras[1] = e.target.value;
                        setSettings({
                          ...settings,
                          about_content: {
                            ...settings.about_content,
                            heritage: { ...settings.about_content?.heritage, paragraphs: paras },
                          },
                        });
                      }}
                      className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg px-3 py-2 text-[#242424]"
                    />
                  </div>
                </div>
              </div>

              {/* 3. VISION & MISSION */}
              <div className="grid sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-5 bg-white border border-[#D9D9D9] rounded-xl space-y-3">
                  <span className="text-[10px] font-bold text-[#9E7444] uppercase tracking-wider block">OUR VISION</span>
                  <div>
                    <label className="block text-[#4A4D50] mb-1 font-bold">TITLE</label>
                    <input
                      type="text"
                      value={settings.about_content?.vision?.title || ""}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          about_content: {
                            ...settings.about_content,
                            vision: { ...settings.about_content?.vision, title: e.target.value },
                          },
                        })
                      }
                      className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg px-3 py-2 text-[#242424]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#4A4D50] mb-1 font-bold">DESCRIPTION</label>
                    <textarea
                      rows={3}
                      value={settings.about_content?.vision?.desc || ""}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          about_content: {
                            ...settings.about_content,
                            vision: { ...settings.about_content?.vision, desc: e.target.value },
                          },
                        })
                      }
                      className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg px-3 py-2 text-[#242424]"
                    />
                  </div>
                </div>

                <div className="p-5 bg-white border border-[#D9D9D9] rounded-xl space-y-3">
                  <span className="text-[10px] font-bold text-cyan-800 uppercase tracking-wider block">OUR MISSION</span>
                  <div>
                    <label className="block text-[#4A4D50] mb-1 font-bold">TITLE</label>
                    <input
                      type="text"
                      value={settings.about_content?.mission?.title || ""}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          about_content: {
                            ...settings.about_content,
                            mission: { ...settings.about_content?.mission, title: e.target.value },
                          },
                        })
                      }
                      className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg px-3 py-2 text-[#242424]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#4A4D50] mb-1 font-bold">DESCRIPTION</label>
                    <textarea
                      rows={3}
                      value={settings.about_content?.mission?.desc || ""}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          about_content: {
                            ...settings.about_content,
                            mission: { ...settings.about_content?.mission, desc: e.target.value },
                          },
                        })
                      }
                      className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg px-3 py-2 text-[#242424]"
                    />
                  </div>
                </div>
              </div>

              {/* 4. MEASURABLE ADVANTAGES (6 VALUE PILLARS) */}
              <div className="p-6 bg-white border border-[#D9D9D9] rounded-2xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#D9D9D9]">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#9E7444] uppercase tracking-widest block">
                      MEASURABLE ADVANTAGES
                    </span>
                    <h3 className="font-heading font-bold text-lg text-[#242424]">
                      Why Clients Choose Us (6 Value Pillars)
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPillarModal({ title: "", metric: "", desc: "" })}
                    className="bg-[#242424] text-[#C69C6D] hover:bg-[#383838] px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Value Pillar</span>
                  </button>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {(settings.about_content?.whyChooseUs || []).map((pil: any, idx: number) => (
                    <div
                      key={idx}
                      className="bg-[#F8F4EC] border border-[#D9D9D9] rounded-xl p-4 space-y-2 text-xs font-mono shadow-xs relative"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-[#9E7444]">PILLAR 0{idx + 1}</span>
                        <span className="font-bold bg-white text-[#242424] px-2 py-0.5 rounded border border-[#D9D9D9]">
                          {pil.metric}
                        </span>
                      </div>
                      <h4 className="font-heading font-bold text-sm text-[#242424]">{pil.title}</h4>
                      <p className="text-[11px] text-[#4A4D50] leading-relaxed line-clamp-3">{pil.desc}</p>

                      <div className="flex justify-end gap-1 pt-2 border-t border-[#D9D9D9]">
                        <button
                          onClick={() => setPillarModal({ ...pil, index: idx })}
                          className="p-1 text-[#4A4D50] hover:text-[#242424] hover:bg-white rounded transition"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            const nextPillars = settings.about_content.whyChooseUs.filter((_: any, i: number) => i !== idx);
                            const updated = {
                              ...settings,
                              about_content: { ...settings.about_content, whyChooseUs: nextPillars },
                            };
                            setSettings(updated);
                            handleSaveSettings(updated);
                          }}
                          className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════
              TAB 4: HOMEPAGE FULL DYNAMIC TEXT EDITOR (ALL 13 SECTIONS)
             ════════════════════════════════════════════════════════════ */}
          {activeTab === "home_sections" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#D9D9D9] gap-2">
                <div>
                  <h2 className="font-heading font-extrabold text-2xl text-[#242424]">
                    Homepage Full Dynamic Text Editor
                  </h2>
                  <p className="text-xs text-[#6B6F73] mt-0.5 font-mono">
                    Edit every piece of text, headline, statistic, button label, and summary displayed across all 13 homepage sections.
                  </p>
                </div>
                <button
                  onClick={() => handleSaveSettings()}
                  disabled={loading}
                  className="bg-[#C69C6D] hover:bg-[#B08554] text-[#242424] font-bold px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider transition flex items-center gap-2 shadow-sm shrink-0"
                >
                  <Save className="w-4 h-4" />
                  <span>Save All Homepage Content</span>
                </button>
              </div>

              <div className="space-y-6 text-xs font-mono">
                {/* 01. HERO SECTION */}
                {(() => {
                  const hero = settings.home_content?.hero || {};
                  const updateHero = (field: string, val: string) => {
                    setSettings({
                      ...settings,
                      home_content: {
                        ...settings.home_content,
                        hero: { ...hero, [field]: val },
                      },
                    });
                  };
                  return (
                    <div className="p-5 bg-[#F8F4EC] border border-[#D9D9D9] rounded-xl space-y-4">
                      <div className="flex items-center justify-between border-b border-[#D9D9D9] pb-2">
                        <span className="text-[11px] font-bold text-[#9E7444] uppercase tracking-wider">
                          01. HERO BANNER, BADGES & ACTION BUTTONS
                        </span>
                        <span className="text-[10px] text-[#787B7E]">Top Screen</span>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[#4A4D50] mb-1 font-bold">OPERATIONAL PILL TEXT</label>
                          <input
                            type="text"
                            placeholder="Pan-India Pipeline EPC & Infrastructure Contractor"
                            value={hero.pillText || ""}
                            onChange={(e) => updateHero("pillText", e.target.value)}
                            className="w-full bg-white border border-[#D9D9D9] rounded-lg px-3 py-2 text-[#242424]"
                          />
                        </div>
                        <div>
                          <label className="block text-[#4A4D50] mb-1 font-bold">PILL COMPLIANCE BADGE</label>
                          <input
                            type="text"
                            placeholder="ASME B31.8 / API 1104"
                            value={hero.pillBadge || ""}
                            onChange={(e) => updateHero("pillBadge", e.target.value)}
                            className="w-full bg-white border border-[#D9D9D9] rounded-lg px-3 py-2 text-[#242424]"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-[#4A4D50] mb-1 font-bold">MAIN HERO HEADLINE</label>
                          <textarea
                            rows={2}
                            placeholder="Building the Infrastructure Behind India's Energy Future."
                            value={hero.title || ""}
                            onChange={(e) => updateHero("title", e.target.value)}
                            className="w-full bg-white border border-[#D9D9D9] rounded-lg px-3 py-2 text-[#242424]"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-[#4A4D50] mb-1 font-bold">HERO SUBTITLE / SUMMARY</label>
                          <textarea
                            rows={2}
                            placeholder="Specialized pipeline construction, engineering and infrastructure solutions for natural gas, hydrocarbons and industrial applications across challenging terrains."
                            value={hero.subtitle || ""}
                            onChange={(e) => updateHero("subtitle", e.target.value)}
                            className="w-full bg-white border border-[#D9D9D9] rounded-lg px-3 py-2 text-[#242424]"
                          />
                        </div>
                        <div>
                          <label className="block text-[#4A4D50] mb-1 font-bold">BUTTON 1 LABEL</label>
                          <input
                            type="text"
                            placeholder="Our Services"
                            value={hero.btnServices || ""}
                            onChange={(e) => updateHero("btnServices", e.target.value)}
                            className="w-full bg-white border border-[#D9D9D9] rounded-lg px-3 py-2 text-[#242424]"
                          />
                        </div>
                        <div>
                          <label className="block text-[#4A4D50] mb-1 font-bold">BUTTON 2 LABEL</label>
                          <input
                            type="text"
                            placeholder="View Projects"
                            value={hero.btnProjects || ""}
                            onChange={(e) => updateHero("btnProjects", e.target.value)}
                            className="w-full bg-white border border-[#D9D9D9] rounded-lg px-3 py-2 text-[#242424]"
                          />
                        </div>
                        <div>
                          <label className="block text-[#4A4D50] mb-1 font-bold">BUTTON 3 LABEL</label>
                          <input
                            type="text"
                            placeholder="Request a Quote"
                            value={hero.btnQuote || ""}
                            onChange={(e) => updateHero("btnQuote", e.target.value)}
                            className="w-full bg-white border border-[#D9D9D9] rounded-lg px-3 py-2 text-[#242424]"
                          />
                        </div>
                      </div>

                      {/* 3 Quick Badges */}
                      <div className="pt-2 border-t border-[#D9D9D9]">
                        <span className="block font-bold text-[#4A4D50] mb-2">QUICK STATS BADGES (HERO BOTTOM)</span>
                        <div className="grid sm:grid-cols-3 gap-3">
                          <div className="p-2.5 bg-white border border-[#D9D9D9] rounded-lg space-y-1">
                            <label className="text-[10px] text-[#787B7E] font-bold">BADGE 1 VALUE</label>
                            <input
                              type="text"
                              placeholder="3,850+ KM"
                              value={hero.badge1Value || ""}
                              onChange={(e) => updateHero("badge1Value", e.target.value)}
                              className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded p-1 text-xs"
                            />
                            <label className="text-[10px] text-[#787B7E] font-bold">BADGE 1 LABEL</label>
                            <input
                              type="text"
                              placeholder="Laid & Commissioned"
                              value={hero.badge1Label || ""}
                              onChange={(e) => updateHero("badge1Label", e.target.value)}
                              className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded p-1 text-xs"
                            />
                          </div>
                          <div className="p-2.5 bg-white border border-[#D9D9D9] rounded-lg space-y-1">
                            <label className="text-[10px] text-[#787B7E] font-bold">BADGE 2 VALUE</label>
                            <input
                              type="text"
                              placeholder="180+ HDD"
                              value={hero.badge2Value || ""}
                              onChange={(e) => updateHero("badge2Value", e.target.value)}
                              className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded p-1 text-xs"
                            />
                            <label className="text-[10px] text-[#787B7E] font-bold">BADGE 2 LABEL</label>
                            <input
                              type="text"
                              placeholder="Major River Crossings"
                              value={hero.badge2Label || ""}
                              onChange={(e) => updateHero("badge2Label", e.target.value)}
                              className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded p-1 text-xs"
                            />
                          </div>
                          <div className="p-2.5 bg-white border border-[#D9D9D9] rounded-lg space-y-1">
                            <label className="text-[10px] text-[#787B7E] font-bold">BADGE 3 VALUE</label>
                            <input
                              type="text"
                              placeholder="28.4M Hrs"
                              value={hero.badge3Value || ""}
                              onChange={(e) => updateHero("badge3Value", e.target.value)}
                              className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded p-1 text-xs"
                            />
                            <label className="text-[10px] text-[#787B7E] font-bold">BADGE 3 LABEL</label>
                            <input
                              type="text"
                              placeholder="LTI-Free Safe Hours"
                              value={hero.badge3Label || ""}
                              onChange={(e) => updateHero("badge3Label", e.target.value)}
                              className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded p-1 text-xs"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* 02. STATS SECTION */}
                {(() => {
                  const statsSec = settings.home_content?.statsSection || {};
                  const updateStat = (field: string, val: string) => {
                    setSettings({
                      ...settings,
                      home_content: {
                        ...settings.home_content,
                        statsSection: { ...statsSec, [field]: val },
                      },
                    });
                  };
                  return (
                    <div className="p-5 bg-[#F8F4EC] border border-[#D9D9D9] rounded-xl space-y-4">
                      <div className="flex items-center justify-between border-b border-[#D9D9D9] pb-2">
                        <span className="text-[11px] font-bold text-[#9E7444] uppercase tracking-wider">
                          02. KEY STATISTICS & METRICS (4 CARDS)
                        </span>
                        <span className="text-[10px] text-[#787B7E]">Below Hero</span>
                      </div>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {[1, 2, 3, 4].map((num) => (
                          <div key={num} className="p-3 bg-white border border-[#D9D9D9] rounded-lg space-y-2">
                            <span className="font-bold text-[#9E7444] block">METRIC 0{num}</span>
                            <div>
                              <label className="text-[10px] text-[#787B7E] block">VALUE</label>
                              <input
                                type="text"
                                placeholder={num === 1 ? "3,850+" : num === 2 ? "180+" : num === 3 ? "28.4M" : "100%"}
                                value={statsSec[`stat${num}Value`] || ""}
                                onChange={(e) => updateStat(`stat${num}Value`, e.target.value)}
                                className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded p-1.5 text-xs font-bold text-[#242424]"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] text-[#787B7E] block">LABEL</label>
                              <input
                                type="text"
                                placeholder={num === 1 ? "Kilometers Pipeline Laid" : num === 2 ? "Major HDD River Crossings" : num === 3 ? "Safe Man-Hours (LTI Free)" : "Active Spreads & QA Integrity"}
                                value={statsSec[`stat${num}Label`] || ""}
                                onChange={(e) => updateStat(`stat${num}Label`, e.target.value)}
                                className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded p-1.5 text-xs"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] text-[#787B7E] block">SUBTEXT</label>
                              <input
                                type="text"
                                placeholder={num === 1 ? "Trunklines & Spur lines (4\" to 48\")" : num === 2 ? "Narmada, Tapi, Mahi, Sabarmati" : num === 3 ? "0.00 Lost Time Injury Frequency" : "Zero Hydrotest Failure Record"}
                                value={statsSec[`stat${num}Sub`] || ""}
                                onChange={(e) => updateStat(`stat${num}Sub`, e.target.value)}
                                className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded p-1.5 text-[11px] text-[#6B6F73]"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}

                {/* 03. ABOUT COMPANY */}
                {(() => {
                  const about = settings.home_content?.aboutCompany || {};
                  const updateAbout = (field: string, val: string) => {
                    setSettings({
                      ...settings,
                      home_content: {
                        ...settings.home_content,
                        aboutCompany: { ...about, [field]: val },
                      },
                    });
                  };
                  return (
                    <div className="p-5 bg-[#F8F4EC] border border-[#D9D9D9] rounded-xl space-y-4">
                      <div className="flex items-center justify-between border-b border-[#D9D9D9] pb-2">
                        <span className="text-[11px] font-bold text-[#9E7444] uppercase tracking-wider">
                          03. ABOUT COMPANY (STORY & STAT PILLS)
                        </span>
                        <span className="text-[10px] text-[#787B7E]">Section 3</span>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[#4A4D50] mb-1 font-bold">EYEBROW</label>
                          <input
                            type="text"
                            placeholder="ABOUT CANDELACONSTRUCTION"
                            value={about.eyebrow || ""}
                            onChange={(e) => updateAbout("eyebrow", e.target.value)}
                            className="w-full bg-white border border-[#D9D9D9] rounded-lg px-3 py-2 text-[#242424]"
                          />
                        </div>
                        <div>
                          <label className="block text-[#4A4D50] mb-1 font-bold">TITLE</label>
                          <input
                            type="text"
                            placeholder="Engineering India's Energy Arteries With Uncompromising Rigor"
                            value={about.title || ""}
                            onChange={(e) => updateAbout("title", e.target.value)}
                            className="w-full bg-white border border-[#D9D9D9] rounded-lg px-3 py-2 text-[#242424]"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-[#4A4D50] mb-1 font-bold">DESCRIPTION / LEAD SUMMARY</label>
                          <textarea
                            rows={2}
                            placeholder="From concept to commissioning, CandelaConstruction Private Limited delivers turnkey pipeline infrastructure for national utilities, private operators, and city gas networks — Trust delivered."
                            value={about.desc || ""}
                            onChange={(e) => updateAbout("desc", e.target.value)}
                            className="w-full bg-white border border-[#D9D9D9] rounded-lg px-3 py-2 text-[#242424]"
                          />
                        </div>
                        <div>
                          <label className="block text-[#4A4D50] mb-1 font-bold">STORY PARAGRAPH 1</label>
                          <textarea
                            rows={3}
                            placeholder="Established in 1994, CandelaConstruction has grown from a specialized pipeline engineering team into one of India's most capable pipeline EPC contractors..."
                            value={about.storyP1 || ""}
                            onChange={(e) => updateAbout("storyP1", e.target.value)}
                            className="w-full bg-white border border-[#D9D9D9] rounded-lg px-3 py-2 text-[#242424]"
                          />
                        </div>
                        <div>
                          <label className="block text-[#4A4D50] mb-1 font-bold">STORY PARAGRAPH 2</label>
                          <textarea
                            rows={3}
                            placeholder="Our core execution model relies on company-owned heavy equipment, in-house technical engineering, and strict compliance with ASME B31.8, API 1104, and PNGRB standards..."
                            value={about.storyP2 || ""}
                            onChange={(e) => updateAbout("storyP2", e.target.value)}
                            className="w-full bg-white border border-[#D9D9D9] rounded-lg px-3 py-2 text-[#242424]"
                          />
                        </div>
                      </div>

                      {/* 4 Stat Pills */}
                      <div className="pt-2 border-t border-[#D9D9D9]">
                        <span className="block font-bold text-[#4A4D50] mb-2">4 HIGHLIGHT STAT PILLS (RIGHT COLUMN)</span>
                        <div className="grid sm:grid-cols-4 gap-3">
                          {[1, 2, 3, 4].map((p) => (
                            <div key={p} className="p-2.5 bg-white border border-[#D9D9D9] rounded-lg space-y-1">
                              <label className="text-[10px] text-[#787B7E] font-bold">PILL {p} VALUE</label>
                              <input
                                type="text"
                                placeholder={p === 1 ? "3,850+ KM" : p === 2 ? "180+" : p === 3 ? "28.4M" : "100%"}
                                value={about[`pill${p}Val`] || ""}
                                onChange={(e) => updateAbout(`pill${p}Val`, e.target.value)}
                                className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded p-1 text-xs font-bold"
                              />
                              <label className="text-[10px] text-[#787B7E] font-bold">PILL {p} LABEL</label>
                              <input
                                type="text"
                                placeholder={p === 1 ? "Pipeline Laid Across India" : p === 2 ? "Major HDD River Crossings" : p === 3 ? "Safe Man-Hours (LTI-Free)" : "Weld Inspection Integrity"}
                                value={about[`pill${p}Label`] || ""}
                                onChange={(e) => updateAbout(`pill${p}Label`, e.target.value)}
                                className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded p-1 text-xs"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* 04. SECTIONS 4 TO 12 LOOP (STANDARD SECTIONS) */}
                {[
                  { key: "servicesSection", label: "04. CORE CAPABILITIES & EPC SERVICES", defaultLink: "View All 10 Specialized Services" },
                  { key: "projectsSection", label: "05. FEATURED CASE STUDIES & PROJECTS", defaultLink: "Browse All Project Portfolios" },
                  { key: "corridorSection", label: "06. NORTH BIHAR PIPELINE EXECUTION CORRIDOR", defaultBadge: "4 ACTIVE DISTRICT CORRIDORS" },
                  { key: "processSection", label: "07. EXECUTION METHODOLOGY & LIFECYCLE (12-STEP)" },
                  { key: "hseSection", label: "08. HSE & QUALITY MANAGEMENT", defaultLink: "Explore Full HSE Charter & Policies" },
                  { key: "fleetSection", label: "09. HEAVY EQUIPMENT FLEET & MACHINERY", defaultLink: "View Full Machinery Inventory & Specs" },
                  { key: "clientsSection", label: "10. TIER-1 CLIENT ACCREDITATIONS & PARTNERS", defaultLink: "View All Client Prequalifications" },
                  { key: "whyUsSection", label: "11. MEASURABLE ADVANTAGES / WHY CHOOSE US" },
                  { key: "careersSection", label: "12. CAREERS & TALENT PORTAL", defaultLink: "View All Open Positions" },
                ].map((sec) => {
                  const secData = settings.home_content?.[sec.key] || {};
                  const updateField = (f: string, v: string) => {
                    setSettings({
                      ...settings,
                      home_content: {
                        ...settings.home_content,
                        [sec.key]: { ...secData, [f]: v },
                      },
                    });
                  };
                  return (
                    <div key={sec.key} className="p-5 bg-[#F8F4EC] border border-[#D9D9D9] rounded-xl space-y-3">
                      <span className="text-[11px] font-bold text-[#9E7444] uppercase tracking-wider block">
                        {sec.label}
                      </span>
                      <div className="grid sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[#4A4D50] mb-1 font-bold">EYEBROW</label>
                          <input
                            type="text"
                            value={secData.eyebrow || ""}
                            onChange={(e) => updateField("eyebrow", e.target.value)}
                            className="w-full bg-white border border-[#D9D9D9] rounded-lg px-3 py-2 text-[#242424]"
                          />
                        </div>
                        <div>
                          <label className="block text-[#4A4D50] mb-1 font-bold">TITLE</label>
                          <input
                            type="text"
                            value={secData.title || ""}
                            onChange={(e) => updateField("title", e.target.value)}
                            className="w-full bg-white border border-[#D9D9D9] rounded-lg px-3 py-2 text-[#242424]"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-[#4A4D50] mb-1 font-bold">DESCRIPTION / SUMMARY</label>
                          <textarea
                            rows={2}
                            value={secData.desc || ""}
                            onChange={(e) => updateField("desc", e.target.value)}
                            className="w-full bg-white border border-[#D9D9D9] rounded-lg px-3 py-2 text-[#242424]"
                          />
                        </div>
                        {sec.defaultLink && (
                          <div className="sm:col-span-2">
                            <label className="block text-[#4A4D50] mb-1 font-bold">CTA ACTION LINK TEXT</label>
                            <input
                              type="text"
                              placeholder={sec.defaultLink}
                              value={secData.linkText || ""}
                              onChange={(e) => updateField("linkText", e.target.value)}
                              className="w-full bg-white border border-[#D9D9D9] rounded-lg px-3 py-2 text-[#242424]"
                            />
                          </div>
                        )}
                        {sec.defaultBadge && (
                          <div className="sm:col-span-2">
                            <label className="block text-[#4A4D50] mb-1 font-bold">CORRIDOR BADGE TEXT</label>
                            <input
                              type="text"
                              placeholder={sec.defaultBadge}
                              value={secData.corridorBadge || ""}
                              onChange={(e) => updateField("corridorBadge", e.target.value)}
                              className="w-full bg-white border border-[#D9D9D9] rounded-lg px-3 py-2 text-[#242424]"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* 13. TENDERS, COMMERCIAL ENQUIRY & 24x7 EMERGENCY */}
                {(() => {
                  const tSec = settings.home_content?.tendersSection || {};
                  const updateTender = (f: string, v: string) => {
                    setSettings({
                      ...settings,
                      home_content: {
                        ...settings.home_content,
                        tendersSection: { ...tSec, [f]: v },
                      },
                    });
                  };
                  return (
                    <div className="p-5 bg-[#F8F4EC] border border-[#D9D9D9] rounded-xl space-y-4">
                      <div className="flex items-center justify-between border-b border-[#D9D9D9] pb-2">
                        <span className="text-[11px] font-bold text-[#9E7444] uppercase tracking-wider">
                          13. TENDERS, COMMERCIAL ENQUIRY & 24x7 EMERGENCY
                        </span>
                        <span className="text-[10px] text-[#787B7E]">Section 13 (Bottom RFQ)</span>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[#4A4D50] mb-1 font-bold">EYEBROW</label>
                          <input
                            type="text"
                            placeholder="TENDERS & COMMERCIAL ENQUIRY"
                            value={tSec.eyebrow || ""}
                            onChange={(e) => updateTender("eyebrow", e.target.value)}
                            className="w-full bg-white border border-[#D9D9D9] rounded-lg px-3 py-2 text-[#242424]"
                          />
                        </div>
                        <div>
                          <label className="block text-[#4A4D50] mb-1 font-bold">TITLE</label>
                          <input
                            type="text"
                            placeholder="Submit an EPC Tender, NIT, or Project Specification"
                            value={tSec.title || ""}
                            onChange={(e) => updateTender("title", e.target.value)}
                            className="w-full bg-white border border-[#D9D9D9] rounded-lg px-3 py-2 text-[#242424]"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-[#4A4D50] mb-1 font-bold">DESCRIPTION</label>
                          <textarea
                            rows={2}
                            placeholder="Our Contracts & Estimation Division reviews technical enquiries within 48 business hours. We provide formal technical-commercial bids for state and national pipelines."
                            value={tSec.desc || ""}
                            onChange={(e) => updateTender("desc", e.target.value)}
                            className="w-full bg-white border border-[#D9D9D9] rounded-lg px-3 py-2 text-[#242424]"
                          />
                        </div>
                        <div>
                          <label className="block text-[#4A4D50] mb-1 font-bold">24x7 EMERGENCY BADGE</label>
                          <input
                            type="text"
                            placeholder="24x7 PIPELINE OPERATIONS & EMERGENCY"
                            value={tSec.emergencyBadge || ""}
                            onChange={(e) => updateTender("emergencyBadge", e.target.value)}
                            className="w-full bg-white border border-[#D9D9D9] rounded-lg px-3 py-2 text-[#242424]"
                          />
                        </div>
                        <div>
                          <label className="block text-[#4A4D50] mb-1 font-bold">24x7 EMERGENCY PHONE</label>
                          <input
                            type="text"
                            placeholder="1800-180-9999"
                            value={tSec.emergencyPhone || ""}
                            onChange={(e) => updateTender("emergencyPhone", e.target.value)}
                            className="w-full bg-white border border-[#D9D9D9] rounded-lg px-3 py-2 text-[#242424]"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-[#4A4D50] mb-1 font-bold">EMERGENCY NOTICE TEXT</label>
                          <input
                            type="text"
                            placeholder="Rapid emergency response, leak reporting & right-of-way alert dispatch across all national operational sectors."
                            value={tSec.emergencyDesc || ""}
                            onChange={(e) => updateTender("emergencyDesc", e.target.value)}
                            className="w-full bg-white border border-[#D9D9D9] rounded-lg px-3 py-2 text-[#242424]"
                          />
                        </div>
                        <div>
                          <label className="block text-[#4A4D50] mb-1 font-bold">COMMERCIAL EMAIL</label>
                          <input
                            type="text"
                            placeholder="tenders@candelaconstruction.com"
                            value={tSec.commercialEmail || ""}
                            onChange={(e) => updateTender("commercialEmail", e.target.value)}
                            className="w-full bg-white border border-[#D9D9D9] rounded-lg px-3 py-2 text-[#242424]"
                          />
                        </div>
                        <div>
                          <label className="block text-[#4A4D50] mb-1 font-bold">CORPORATE HQ ADDRESS</label>
                          <input
                            type="text"
                            placeholder="Candela House, Energy Corridor Complex, North Bihar Regional Base, India"
                            value={tSec.hqAddress || ""}
                            onChange={(e) => updateTender("hqAddress", e.target.value)}
                            className="w-full bg-white border border-[#D9D9D9] rounded-lg px-3 py-2 text-[#242424]"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════
              TAB 6: PROJECTS & SPREADS (WITH INSTANT STATUS TOGGLE)
             ════════════════════════════════════════════════════════════ */}
          {activeTab === "projects" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#D9D9D9] gap-4">
                <div>
                  <h2 className="font-heading font-extrabold text-2xl text-[#242424]">
                    Projects & Mechanized Spreads
                  </h2>
                  <p className="text-xs text-[#6B6F73] mt-0.5 font-mono">
                    Instant status switching between Active Operations, Completed, and Under Commissioning.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#6B6F73]" />
                    <input
                      type="text"
                      placeholder="Search projects..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-[#F8F4EC] border border-[#D9D9D9] rounded-xl pl-8 pr-3 py-1.5 text-xs font-mono text-[#242424]"
                    />
                  </div>
                  <button
                    onClick={() => {
                      setEditingItem({
                        cat: "cross-country",
                        tag: "CROSS-COUNTRY TRUNKLINE",
                        status: "Active Operations",
                      });
                      setModalType("project");
                    }}
                    className="bg-[#242424] text-[#C69C6D] hover:bg-[#383838] px-3 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>New Project</span>
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto border border-[#D9D9D9] rounded-xl">
                <table className="w-full text-xs font-mono text-left">
                  <thead className="bg-[#F8F4EC] border-b border-[#D9D9D9] text-[#6B6F73] uppercase">
                    <tr>
                      <th className="p-3">Title & Client</th>
                      <th className="p-3">Location</th>
                      <th className="p-3">Diameter / Length</th>
                      <th className="p-3">Status (Live Toggle)</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#D9D9D9]">
                    {filteredProjects.map((p) => (
                      <tr key={p.id} className="hover:bg-[#F8F4EC]/50 transition">
                        <td className="p-3">
                          <div className="font-bold text-[#242424]">{p.title}</div>
                          <div className="text-[11px] text-[#9E7444] font-semibold">{p.client}</div>
                        </td>
                        <td className="p-3 text-[#4A4D50]">{p.location || "Pan-India"}</td>
                        <td className="p-3 text-[#6B6F73]">
                          {p.diameter} · {p.length}
                        </td>
                        <td className="p-3">
                          <select
                            value={p.status || "Completed"}
                            onChange={(e) => handleUpdateProjectStatus(p.id, e.target.value)}
                            className={`px-2 py-1 rounded text-[11px] font-bold border ${p.status === "Active Operations"
                                ? "bg-amber-50 text-amber-800 border-amber-300"
                                : p.status === "Under Commissioning"
                                  ? "bg-blue-50 text-blue-800 border-blue-300"
                                  : "bg-emerald-50 text-emerald-800 border-emerald-300"
                              }`}
                          >
                            <option value="Active Operations">Active Operations</option>
                            <option value="Completed">Completed</option>
                            <option value="Under Commissioning">Under Commissioning</option>
                            <option value="Tendering">Tendering</option>
                          </select>
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => {
                                setEditingItem(p);
                                setModalType("project");
                              }}
                              className="p-1.5 text-[#4A4D50] hover:text-[#242424] hover:bg-[#F8F4EC] rounded"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setDeleteConfirm({ module: "projects", id: p.id, title: p.title })}
                              className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════
              TAB 7: EPC SERVICES
             ════════════════════════════════════════════════════════════ */}
          {activeTab === "services" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#D9D9D9]">
                <div>
                  <h2 className="font-heading font-extrabold text-2xl text-[#242424]">EPC Services</h2>
                  <p className="text-xs text-[#6B6F73] mt-0.5 font-mono">
                    Specialized engineering services listed on `/services`.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingItem({ n: `0${services.length + 1}`, color: "amber" });
                    setModalType("service");
                  }}
                  className="bg-[#242424] text-[#C69C6D] hover:bg-[#383838] px-3 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Service</span>
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {services.map((s) => (
                  <div key={s.id} className="p-4 bg-[#F8F4EC] border border-[#D9D9D9] rounded-xl space-y-2 text-xs font-mono">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] text-[#9E7444] font-bold">SERVICE #{s.n}</span>
                        <h4 className="font-heading font-bold text-sm text-[#242424]">{s.title}</h4>
                        <span className="text-[10px] text-[#6B6F73]">{s.standard}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            setEditingItem(s);
                            setModalType("service");
                          }}
                          className="p-1.5 text-[#4A4D50] hover:text-[#242424] hover:bg-white rounded"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm({ module: "services", id: s.id, title: s.title })}
                          className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-[11px] text-[#4A4D50] leading-relaxed line-clamp-3">{s.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════
              TAB 8: MACHINERY FLEET
             ════════════════════════════════════════════════════════════ */}
          {activeTab === "fleet" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#D9D9D9]">
                <div>
                  <h2 className="font-heading font-extrabold text-2xl text-[#242424]">
                    Company-Owned Machinery Fleet
                  </h2>
                  <p className="text-xs text-[#6B6F73] mt-0.5 font-mono">
                    Heavy construction equipment listed on `/capabilities`.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingItem({ _isEdit: false, units: "1 Unit", quantity: "1 Unit", category: "Heavy Machinery" });
                    setModalType("fleet");
                  }}
                  className="bg-[#242424] text-[#C69C6D] hover:bg-[#383838] px-3 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Equipment</span>
                </button>
              </div>

              <div className="overflow-x-auto border border-[#D9D9D9] rounded-xl">
                <table className="w-full text-xs font-mono text-left">
                  <thead className="bg-[#F8F4EC] border-b border-[#D9D9D9] text-[#6B6F73] uppercase">
                    <tr>
                      <th className="p-3">Equipment / Machine</th>
                      <th className="p-3">Make / OEM</th>
                      <th className="p-3">Capacity</th>
                      <th className="p-3">Application Domain</th>
                      <th className="p-3">Count</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#D9D9D9]">
                    {fleet.map((eq) => (
                      <tr key={eq.id || eq.name} className="hover:bg-[#F8F4EC]/50 transition">
                        <td className="p-3 font-bold text-[#242424]">{eq.name}</td>
                        <td className="p-3 text-[#9E7444] font-semibold">{eq.make || eq.specs || "Caterpillar / Vermeer"}</td>
                        <td className="p-3 text-[#4A4D50]">{eq.capacity}</td>
                        <td className="p-3 text-[#6B6F73]">{eq.application}</td>
                        <td className="p-3 font-bold">{eq.units || eq.quantity || "1"}</td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => {
                                setEditingItem({ ...eq, _isEdit: true, _originalName: eq.name });
                                setModalType("fleet");
                              }}
                              className="p-1.5 text-[#4A4D50] hover:text-[#242424] hover:bg-[#F8F4EC] rounded"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setDeleteConfirm({ module: "fleet", id: eq.name, title: eq.name })}
                              className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════
              TAB 9: HSE & SAFETY METRICS
             ════════════════════════════════════════════════════════════ */}
          {activeTab === "hse" && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-[#D9D9D9]">
                <h2 className="font-heading font-extrabold text-2xl text-[#242424]">
                  Audited HSE & Safety Metrics
                </h2>
                <p className="text-xs text-[#6B6F73] mt-0.5 font-mono">
                  Update statutory safety benchmarks displayed on `/hse` and `/about`.
                </p>
              </div>

              <div className="p-6 bg-[#F8F4EC] border border-[#D9D9D9] rounded-xl space-y-4 max-w-xl font-mono text-xs">
                <div>
                  <label className="block text-[#4A4D50] mb-1 font-bold">SAFE MAN-HOURS (AUDITED)</label>
                  <input
                    type="number"
                    value={hse?.safe_man_hours || 28400000}
                    onChange={(e) => setHse({ ...hse, safe_man_hours: e.target.value })}
                    className="w-full bg-white border border-[#D9D9D9] rounded-lg px-3 py-2 text-[#242424] font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[#4A4D50] mb-1 font-bold">LOST TIME INJURY FREQUENCY RATE (LTIFR)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={hse?.ltifr ?? 0.00}
                    onChange={(e) => setHse({ ...hse, ltifr: e.target.value })}
                    className="w-full bg-white border border-[#D9D9D9] rounded-lg px-3 py-2 text-[#242424] font-bold text-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-[#4A4D50] mb-1 font-bold">ENVIRONMENTAL RESTORATION %</label>
                  <input
                    type="number"
                    value={hse?.environmental_restoration_pct || 100}
                    onChange={(e) => setHse({ ...hse, environmental_restoration_pct: e.target.value })}
                    className="w-full bg-white border border-[#D9D9D9] rounded-lg px-3 py-2 text-[#242424]"
                  />
                </div>

                <div>
                  <label className="block text-[#4A4D50] mb-1 font-bold">SAFETY TRAINING HOURS COMPLETED</label>
                  <input
                    type="number"
                    value={hse?.training_hours || 42000}
                    onChange={(e) => setHse({ ...hse, training_hours: e.target.value })}
                    className="w-full bg-white border border-[#D9D9D9] rounded-lg px-3 py-2 text-[#242424]"
                  />
                </div>

                <button
                  onClick={async () => {
                    setLoading(true);
                    try {
                      await fetch("/api/admin/hse", {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(hse),
                      });
                      showToast("HSE metrics successfully updated in database!");
                    } finally {
                      setLoading(false);
                    }
                  }}
                  className="w-full bg-[#C69C6D] hover:bg-[#B08554] text-[#242424] font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition"
                >
                  Save HSE Metrics
                </button>
              </div>
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════
              TAB 10: TIER-1 ENERGY CLIENTS (SECTORS SERVED)
             ════════════════════════════════════════════════════════════ */}
          {activeTab === "clients" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#D9D9D9]">
                <div>
                  <h2 className="font-heading font-extrabold text-2xl text-[#242424]">
                    Tier-1 Energy Clients & Sectors Served
                  </h2>
                  <p className="text-xs text-[#6B6F73] mt-0.5 font-mono">
                    Manage client credentials and industry domains (e.g. Natural Gas & Transmission, Refinery Hydrocarbons).
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingItem({ is_tier1: true, sector: "Natural Gas & Transmission" });
                    setModalType("client");
                  }}
                  className="bg-[#242424] text-[#C69C6D] hover:bg-[#383838] px-3 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Client</span>
                </button>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {clients.map((cl) => (
                  <div key={cl.id} className="p-4 bg-[#F8F4EC] border border-[#D9D9D9] rounded-xl space-y-2 text-xs font-mono">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-[10px] text-[#9E7444] font-bold">{cl.code}</div>
                        <h4 className="font-heading font-bold text-sm text-[#242424]">{cl.name}</h4>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            setEditingItem(cl);
                            setModalType("client");
                          }}
                          className="p-1 text-[#4A4D50] hover:text-[#242424] hover:bg-white rounded"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm({ module: "clients", id: cl.id, title: cl.name })}
                          className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <div className="pt-1">
                      <span className="text-[10px] font-bold bg-white text-[#4A4D50] px-2 py-0.5 rounded border border-[#D9D9D9]">
                        SECTOR: {cl.sector || "Natural Gas & Transmission"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════
              TAB 11: CAREERS & TALENT
             ════════════════════════════════════════════════════════════ */}
          {activeTab === "careers" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#D9D9D9]">
                <div>
                  <h2 className="font-heading font-extrabold text-2xl text-[#242424]">Careers & Open Positions</h2>
                  <p className="text-xs text-[#6B6F73] mt-0.5 font-mono">
                    Manage active job vacancies on `/careers`.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingItem({ type: "Full-Time" });
                    setModalType("career");
                  }}
                  className="bg-[#242424] text-[#C69C6D] hover:bg-[#383838] px-3 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Post Vacancy</span>
                </button>
              </div>

              <div className="space-y-3">
                {filteredCareers.map((c) => (
                  <div key={c.id} className="p-4 bg-[#F8F4EC] border border-[#D9D9D9] rounded-xl flex items-center justify-between gap-4 text-xs font-mono">
                    <div>
                      <h4 className="font-bold text-sm text-[#242424]">{c.title}</h4>
                      <div className="text-[#6B6F73] mt-0.5">
                        {c.department} · {c.location} · <span className="text-[#9E7444] font-bold">{c.experience}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          setEditingItem(c);
                          setModalType("career");
                        }}
                        className="p-1.5 text-[#4A4D50] hover:text-[#242424] hover:bg-white rounded"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm({ module: "careers", id: c.id, title: c.title })}
                        className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════
              TAB 12: NEWS & PRESS RELEASES
             ════════════════════════════════════════════════════════════ */}
          {activeTab === "news" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#D9D9D9]">
                <div>
                  <h2 className="font-heading font-extrabold text-2xl text-[#242424]">News & Press Statements</h2>
                  <p className="text-xs text-[#6B6F73] mt-0.5 font-mono">
                    Corporate press releases displayed on `/news`.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingItem({ category: "MILESTONE", date: "September 2026" });
                    setModalType("news");
                  }}
                  className="bg-[#242424] text-[#C69C6D] hover:bg-[#383838] px-3 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Publish News</span>
                </button>
              </div>

              <div className="space-y-3">
                {filteredNews.map((n) => (
                  <div key={n.id} className="p-4 bg-[#F8F4EC] border border-[#D9D9D9] rounded-xl flex items-start justify-between gap-4 text-xs font-mono">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-[#C69C6D]/20 text-[#9E7444] rounded text-[10px] font-bold">
                          {n.category}
                        </span>
                        <span className="text-[#6B6F73] text-[11px]">{n.date}</span>
                      </div>
                      <h4 className="font-bold text-sm text-[#242424]">{n.title}</h4>
                      <p className="text-[#4A4D50] line-clamp-2">{n.excerpt}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => {
                          setEditingItem(n);
                          setModalType("news");
                        }}
                        className="p-1.5 text-[#4A4D50] hover:text-[#242424] hover:bg-white rounded"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm({ module: "news", id: n.id, title: n.title })}
                        className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════
              TAB 13: RFQ & TENDER INBOX
             ════════════════════════════════════════════════════════════ */}
          {activeTab === "rfq" && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-[#D9D9D9]">
                <h2 className="font-heading font-extrabold text-2xl text-[#242424]">
                  RFQ & Tender Enquiries Inbox
                </h2>
                <p className="text-xs text-[#6B6F73] mt-0.5 font-mono">
                  Review and progress commercial enquiries submitted through the RFQ form.
                </p>
              </div>

              {rfqs.length === 0 ? (
                <div className="p-8 text-center text-xs font-mono text-[#6B6F73] bg-[#F8F4EC] rounded-xl">
                  No tender submissions logged yet.
                </div>
              ) : (
                <div className="overflow-x-auto border border-[#D9D9D9] rounded-xl">
                  <table className="w-full text-xs font-mono text-left">
                    <thead className="bg-[#F8F4EC] border-b border-[#D9D9D9] text-[#6B6F73] uppercase">
                      <tr>
                        <th className="p-3">Ref No</th>
                        <th className="p-3">Client / Organization</th>
                        <th className="p-3">Contact</th>
                        <th className="p-3">Scope / Specs</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Admin Notes</th>
                        <th className="p-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#D9D9D9]">
                      {rfqs.map((r) => (
                        <tr key={r.id} className="hover:bg-[#F8F4EC]/50 transition">
                          <td className="p-3 font-bold text-[#9E7444]">{r.reference_no}</td>
                          <td className="p-3">
                            <div className="font-bold text-[#242424]">{r.company_name}</div>
                            <div className="text-[10px] text-[#6B6F73]">{r.location}</div>
                          </td>
                          <td className="p-3 text-[#6B6F73]">
                            <div>{r.contact_person}</div>
                            <div className="text-[10px]">{r.email}</div>
                          </td>
                          <td className="p-3 text-[#4A4D50]">
                            {r.diameter} · {r.approx_length}
                          </td>
                          <td className="p-3">
                            <select
                              value={r.status || "NEW"}
                              onChange={(e) => handleUpdateRfqStatus(r.id, e.target.value)}
                              className="px-2 py-1 rounded text-[11px] font-bold border bg-white border-[#D9D9D9]"
                            >
                              <option value="PENDING_REVIEW">PENDING REVIEW</option>
                              <option value="NEW">NEW</option>
                              <option value="UNDER REVIEW">UNDER REVIEW</option>
                              <option value="QUOTED">QUOTED</option>
                              <option value="ARCHIVED">ARCHIVED</option>
                            </select>
                          </td>
                          <td className="p-3">
                            <button
                              onClick={() => setViewNotesModal({ type: "rfq", item: r })}
                              className="text-[11px] text-[#9E7444] hover:underline flex items-center gap-1 font-bold"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                              <span>{r.admin_notes ? "Edit Notes" : "+ Add Note"}</span>
                            </button>
                            {r.admin_notes && (
                              <div className="text-[10px] text-[#6B6F73] truncate max-w-[140px] mt-0.5">
                                {r.admin_notes}
                              </div>
                            )}
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => setDeleteConfirm({ module: "rfq", id: r.id, title: r.reference_no })}
                              className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════
              TAB 14: JOB APPLICATIONS
             ════════════════════════════════════════════════════════════ */}
          {activeTab === "applications" && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-[#D9D9D9]">
                <h2 className="font-heading font-extrabold text-2xl text-[#242424]">Job Applications Received</h2>
                <p className="text-xs text-[#6B6F73] mt-0.5 font-mono">
                  Candidate resumes and applications submitted through `/careers`.
                </p>
              </div>

              {applications.length === 0 ? (
                <div className="p-8 text-center text-xs font-mono text-[#6B6F73] bg-[#F8F4EC] rounded-xl">
                  No applications received yet.
                </div>
              ) : (
                <div className="overflow-x-auto border border-[#D9D9D9] rounded-xl">
                  <table className="w-full text-xs font-mono text-left">
                    <thead className="bg-[#F8F4EC] border-b border-[#D9D9D9] text-[#6B6F73] uppercase">
                      <tr>
                        <th className="p-3">Application Ref</th>
                        <th className="p-3">Applicant Name</th>
                        <th className="p-3">Position Applied</th>
                        <th className="p-3">Contact</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">HR Notes</th>
                        <th className="p-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#D9D9D9]">
                      {applications.map((app) => (
                        <tr key={app.id} className="hover:bg-[#F8F4EC]/50 transition">
                          <td className="p-3 font-bold text-[#9E7444]">{app.application_ref}</td>
                          <td className="p-3 font-bold text-[#242424]">{app.name}</td>
                          <td className="p-3 text-[#4A4D50]">{app.position_title}</td>
                          <td className="p-3 text-[#6B6F73]">{app.email} · {app.phone}</td>
                          <td className="p-3">
                            <select
                              value={app.status || "RECEIVED"}
                              onChange={(e) => handleUpdateAppStatus(app.id, e.target.value)}
                              className="px-2 py-1 rounded text-[11px] font-bold border bg-white border-[#D9D9D9]"
                            >
                              <option value="RECEIVED">RECEIVED</option>
                              <option value="UNDER_REVIEW">UNDER REVIEW</option>
                              <option value="SHORTLISTED">SHORTLISTED</option>
                              <option value="INTERVIEW_SCHEDULED">INTERVIEW_SCHEDULED</option>
                              <option value="HIRED">HIRED</option>
                              <option value="REJECTED">REJECTED</option>
                            </select>
                          </td>
                          <td className="p-3">
                            <button
                              onClick={() => setViewNotesModal({ type: "application", item: app })}
                              className="text-[11px] text-[#9E7444] hover:underline flex items-center gap-1 font-bold"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                              <span>{app.admin_notes ? "Edit Notes" : "+ Add Note"}</span>
                            </button>
                            {app.admin_notes && (
                              <div className="text-[10px] text-[#6B6F73] truncate max-w-[140px] mt-0.5">
                                {app.admin_notes}
                              </div>
                            )}
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => setDeleteConfirm({ module: "applications", id: app.id, title: app.name })}
                              className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          SUB-MODAL: EXECUTIVE DIRECTOR (ABOUT US)
         ══════════════════════════════════════════════════════════════════ */}
      {directorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white border border-[#D9D9D9] rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative space-y-4">
            <button onClick={() => setDirectorModal(null)} className="absolute top-4 right-4 p-2 text-[#6B6F73] hover:text-[#242424] rounded-lg bg-[#F8F4EC]">
              <X className="w-4 h-4" />
            </button>
            <h3 className="font-heading font-bold text-xl text-[#242424]">
              {directorModal.index !== undefined ? "Edit Director Profile" : "Add Executive Director"}
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const cur = [...(settings.about_content?.leadership || [])];
                if (directorModal.index !== undefined) {
                  cur[directorModal.index] = {
                    name: directorModal.name,
                    role: directorModal.role,
                    experience: directorModal.experience,
                    background: directorModal.background,
                  };
                } else {
                  cur.push({
                    name: directorModal.name,
                    role: directorModal.role,
                    experience: directorModal.experience,
                    background: directorModal.background,
                  });
                }
                const updated = {
                  ...settings,
                  about_content: { ...settings.about_content, leadership: cur },
                };
                setSettings(updated);
                handleSaveSettings(updated);
                setDirectorModal(null);
              }}
              className="space-y-3 text-xs font-mono"
            >
              <div>
                <label className="block text-[#4A4D50] mb-1 font-bold">FULL NAME *</label>
                <input
                  required
                  type="text"
                  value={directorModal.name || ""}
                  onChange={(e) => setDirectorModal({ ...directorModal, name: e.target.value })}
                  className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg p-2.5 text-[#242424]"
                  placeholder="e.g. Rajendra V. Mehta"
                />
              </div>
              <div>
                <label className="block text-[#4A4D50] mb-1 font-bold">ROLE / TITLE *</label>
                <input
                  required
                  type="text"
                  value={directorModal.role || ""}
                  onChange={(e) => setDirectorModal({ ...directorModal, role: e.target.value })}
                  className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg p-2.5 text-[#242424]"
                  placeholder="Managing Director & CEO"
                />
              </div>
              <div>
                <label className="block text-[#4A4D50] mb-1 font-bold">YEARS EXPERIENCE BADGE</label>
                <input
                  type="text"
                  value={directorModal.experience || ""}
                  onChange={(e) => setDirectorModal({ ...directorModal, experience: e.target.value })}
                  className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg p-2.5 text-[#242424]"
                  placeholder="32+ Years Experience"
                />
              </div>
              <div>
                <label className="block text-[#4A4D50] mb-1 font-bold">BACKGROUND / CREDENTIALS *</label>
                <textarea
                  required
                  rows={4}
                  value={directorModal.background || ""}
                  onChange={(e) => setDirectorModal({ ...directorModal, background: e.target.value })}
                  className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg p-2.5 text-[#242424]"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-[#D9D9D9]">
                <button type="button" onClick={() => setDirectorModal(null)} className="px-4 py-2 text-[#6B6F73]">
                  Cancel
                </button>
                <button type="submit" className="bg-[#C69C6D] hover:bg-[#B08554] text-[#242424] font-bold px-5 py-2 rounded-xl">
                  Save Director
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          SUB-MODAL: CORPORATE GOVERNANCE CHARTER
         ══════════════════════════════════════════════════════════════════ */}
      {govModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white border border-[#D9D9D9] rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative space-y-4">
            <button
              onClick={() => setGovModal(null)}
              className="absolute top-4 right-4 p-2 text-[#6B6F73] hover:text-[#242424] rounded-lg bg-[#F8F4EC]"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="font-heading font-bold text-xl text-[#242424]">
              {govModal.index !== undefined ? "Edit Governance Charter" : "Add Governance Charter"}
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const cur = [...(settings.about_content?.governance?.framework || [])];
                if (govModal.index !== undefined) {
                  cur[govModal.index] = {
                    code: govModal.code,
                    title: govModal.title,
                    desc: govModal.desc,
                  };
                } else {
                  cur.push({
                    code: govModal.code || `GOV-0${cur.length + 1}`,
                    title: govModal.title,
                    desc: govModal.desc,
                  });
                }
                const updated = {
                  ...settings,
                  about_content: {
                    ...settings.about_content,
                    governance: {
                      ...settings.about_content?.governance,
                      framework: cur,
                    },
                  },
                };
                setSettings(updated);
                handleSaveSettings(updated);
                setGovModal(null);
              }}
              className="space-y-3 text-xs font-mono"
            >
              <div>
                <label className="block text-[#4A4D50] mb-1 font-bold">CHARTER CODE *</label>
                <input
                  required
                  type="text"
                  value={govModal.code || ""}
                  onChange={(e) => setGovModal({ ...govModal, code: e.target.value })}
                  className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg p-2.5 text-[#242424]"
                  placeholder="e.g. GOV-01"
                />
              </div>
              <div>
                <label className="block text-[#4A4D50] mb-1 font-bold">CHARTER TITLE *</label>
                <input
                  required
                  type="text"
                  value={govModal.title || ""}
                  onChange={(e) => setGovModal({ ...govModal, title: e.target.value })}
                  className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg p-2.5 text-[#242424]"
                  placeholder="e.g. Statutory & Technical Compliance Charter"
                />
              </div>
              <div>
                <label className="block text-[#4A4D50] mb-1 font-bold">CHARTER POLICY & OVERSIGHT DETAILS *</label>
                <textarea
                  required
                  rows={4}
                  value={govModal.desc || ""}
                  onChange={(e) => setGovModal({ ...govModal, desc: e.target.value })}
                  className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg p-2.5 text-[#242424]"
                  placeholder="Policy description, governing standards, and board accountability..."
                />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-[#D9D9D9]">
                <button type="button" onClick={() => setGovModal(null)} className="px-4 py-2 text-[#6B6F73]">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#C69C6D] hover:bg-[#B08554] text-[#242424] font-bold px-5 py-2 rounded-xl"
                >
                  Save Charter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          SUB-MODAL: REGIONAL SPREAD BASE
         ══════════════════════════════════════════════════════════════════ */}
      {regionalBaseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white border border-[#D9D9D9] rounded-2xl max-w-md w-full p-6 shadow-2xl relative space-y-4">
            <button onClick={() => setRegionalBaseModal(null)} className="absolute top-4 right-4 p-2 text-[#6B6F73] hover:text-[#242424] rounded-lg bg-[#F8F4EC]">
              <X className="w-4 h-4" />
            </button>
            <h3 className="font-heading font-bold text-lg text-[#242424]">
              {regionalBaseModal.index !== undefined ? "Edit Regional Spread Base" : "Add Regional Base"}
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const cur = [...(settings.regional_bases || [])];
                const baseName = regionalBaseModal.baseName || regionalBaseModal.name || "";
                const status = regionalBaseModal.status || regionalBaseModal.type || "Spread Base";
                const baseItem = {
                  ...regionalBaseModal,
                  name: baseName,
                  baseName,
                  type: status,
                  status,
                  address: regionalBaseModal.address || "",
                };
                delete baseItem.index;

                if (regionalBaseModal.index !== undefined) {
                  cur[regionalBaseModal.index] = baseItem;
                } else {
                  cur.push(baseItem);
                }
                const updated = { ...settings, regional_bases: cur };
                setSettings(updated);
                handleSaveSettings(updated);
                setRegionalBaseModal(null);
              }}
              className="space-y-3 text-xs font-mono"
            >
              <div>
                <label className="block text-[#4A4D50] mb-1 font-bold">SPREAD BASE NAME *</label>
                <input
                  required
                  type="text"
                  value={regionalBaseModal.baseName || regionalBaseModal.name || ""}
                  onChange={(e) => setRegionalBaseModal({ ...regionalBaseModal, name: e.target.value, baseName: e.target.value })}
                  className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg p-2.5 text-[#242424]"
                />
              </div>
              <div>
                <label className="block text-[#4A4D50] mb-1 font-bold">ADDRESS / CORRIDOR LOCATION *</label>
                <input
                  required
                  type="text"
                  value={regionalBaseModal.address || ""}
                  onChange={(e) => setRegionalBaseModal({ ...regionalBaseModal, address: e.target.value })}
                  className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg p-2.5 text-[#242424]"
                />
              </div>
              <div>
                <label className="block text-[#4A4D50] mb-1 font-bold">BASE CATEGORY / STATUS TAG</label>
                <input
                  type="text"
                  value={regionalBaseModal.status || regionalBaseModal.type || ""}
                  onChange={(e) => setRegionalBaseModal({ ...regionalBaseModal, type: e.target.value, status: e.target.value })}
                  className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg p-2.5 text-[#242424]"
                  placeholder="Spread Base / Pipe Yard"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-[#D9D9D9]">
                <button type="button" onClick={() => setRegionalBaseModal(null)} className="px-4 py-2 text-[#6B6F73]">
                  Cancel
                </button>
                <button type="submit" className="bg-[#C69C6D] hover:bg-[#B08554] text-[#242424] font-bold px-5 py-2 rounded-xl">
                  Save Base
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          SUB-MODAL: VALUE PILLAR (ABOUT US)
         ══════════════════════════════════════════════════════════════════ */}
      {pillarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white border border-[#D9D9D9] rounded-2xl max-w-md w-full p-6 shadow-2xl relative space-y-4">
            <button onClick={() => setPillarModal(null)} className="absolute top-4 right-4 p-2 text-[#6B6F73] hover:text-[#242424] rounded-lg bg-[#F8F4EC]">
              <X className="w-4 h-4" />
            </button>
            <h3 className="font-heading font-bold text-lg text-[#242424]">
              {pillarModal.index !== undefined ? "Edit Value Pillar" : "Add Value Pillar"}
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const cur = [...(settings.about_content?.whyChooseUs || [])];
                if (pillarModal.index !== undefined) {
                  cur[pillarModal.index] = {
                    title: pillarModal.title,
                    metric: pillarModal.metric,
                    desc: pillarModal.desc,
                  };
                } else {
                  cur.push({
                    title: pillarModal.title,
                    metric: pillarModal.metric,
                    desc: pillarModal.desc,
                  });
                }
                const updated = {
                  ...settings,
                  about_content: { ...settings.about_content, whyChooseUs: cur },
                };
                setSettings(updated);
                handleSaveSettings(updated);
                setPillarModal(null);
              }}
              className="space-y-3 text-xs font-mono"
            >
              <div>
                <label className="block text-[#4A4D50] mb-1 font-bold">PILLAR TITLE *</label>
                <input
                  required
                  type="text"
                  value={pillarModal.title || ""}
                  onChange={(e) => setPillarModal({ ...pillarModal, title: e.target.value })}
                  className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg p-2.5 text-[#242424]"
                />
              </div>
              <div>
                <label className="block text-[#4A4D50] mb-1 font-bold">METRIC BADGE *</label>
                <input
                  required
                  type="text"
                  value={pillarModal.metric || ""}
                  onChange={(e) => setPillarModal({ ...pillarModal, metric: e.target.value })}
                  className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg p-2.5 text-[#242424]"
                  placeholder="e.g. 100% Pass Rate"
                />
              </div>
              <div>
                <label className="block text-[#4A4D50] mb-1 font-bold">DESCRIPTION *</label>
                <textarea
                  required
                  rows={3}
                  value={pillarModal.desc || ""}
                  onChange={(e) => setPillarModal({ ...pillarModal, desc: e.target.value })}
                  className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg p-2.5 text-[#242424]"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-[#D9D9D9]">
                <button type="button" onClick={() => setPillarModal(null)} className="px-4 py-2 text-[#6B6F73]">
                  Cancel
                </button>
                <button type="submit" className="bg-[#C69C6D] hover:bg-[#B08554] text-[#242424] font-bold px-5 py-2 rounded-xl">
                  Save Pillar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          SUB-MODAL: ADMIN / HR NOTES
         ══════════════════════════════════════════════════════════════════ */}
      {viewNotesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white border border-[#D9D9D9] rounded-2xl max-w-md w-full p-6 shadow-2xl relative space-y-4">
            <button onClick={() => setViewNotesModal(null)} className="absolute top-4 right-4 p-2 text-[#6B6F73] hover:text-[#242424] rounded-lg bg-[#F8F4EC]">
              <X className="w-4 h-4" />
            </button>
            <h3 className="font-heading font-bold text-lg text-[#242424]">
              {viewNotesModal.type === "rfq" ? "Tender Review Notes" : "HR Candidate Notes"}
            </h3>
            <div className="text-xs font-mono text-[#6B6F73]">
              {viewNotesModal.type === "rfq" ? `Ref: ${viewNotesModal.item.reference_no} · ${viewNotesModal.item.company_name}` : `Applicant: ${viewNotesModal.item.name}`}
            </div>
            <textarea
              rows={4}
              defaultValue={viewNotesModal.item.admin_notes || ""}
              id="adminNotesInput"
              className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg p-3 text-xs font-mono text-[#242424]"
              placeholder="Enter internal review notes, interview status, technical evaluation comments..."
            />
            <div className="flex justify-end gap-2 pt-2 border-t border-[#D9D9D9]">
              <button type="button" onClick={() => setViewNotesModal(null)} className="px-4 py-2 text-xs font-mono text-[#6B6F73]">
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  const inputEl = document.getElementById("adminNotesInput") as HTMLTextAreaElement;
                  const newNotes = inputEl?.value || "";
                  if (viewNotesModal.type === "rfq") {
                    handleUpdateRfqStatus(viewNotesModal.item.id, viewNotesModal.item.status, newNotes);
                  } else {
                    handleUpdateAppStatus(viewNotesModal.item.id, viewNotesModal.item.status, newNotes);
                  }
                  setViewNotesModal(null);
                }}
                className="bg-[#C69C6D] hover:bg-[#B08554] text-[#242424] font-bold px-5 py-2 rounded-xl text-xs font-mono"
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          INTERACTIVE MODAL: ADD / EDIT DIALOG FOR MODULES
         ══════════════════════════════════════════════════════════════════ */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white border border-[#D9D9D9] rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8">
            <button
              onClick={() => {
                setModalType(null);
                setEditingItem(null);
              }}
              className="absolute top-4 right-4 p-2 text-[#6B6F73] hover:text-[#242424] rounded-lg bg-[#F8F4EC]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-[10px] font-mono text-[#9E7444] font-bold uppercase tracking-widest">
                DATABASE RECORD EDITOR · {modalType.toUpperCase()}
              </span>
              <h3 className="font-heading font-bold text-xl text-[#242424] mt-1">
                {(editingItem?.id || editingItem?._isEdit) ? "Edit Record" : "Add New " + modalType.toUpperCase()}
              </h3>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const mod = modalType === "fleet" ? "fleet" : (modalType === "news" ? "news" : modalType + "s");
                const isEdit = Boolean(editingItem?.id || editingItem?._isEdit);
                handleSaveItem(mod, editingItem, isEdit);
              }}
              className="space-y-4 text-xs font-mono max-h-[70vh] overflow-y-auto pr-2"
            >
              {/* Project Form Fields */}
              {modalType === "project" && (
                <>
                  <div>
                    <label className="block text-[#4A4D50] mb-1 font-bold">PROJECT TITLE *</label>
                    <input
                      required
                      type="text"
                      value={editingItem?.title || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                      className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg p-2.5 text-[#242424]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#4A4D50] mb-1 font-bold">CLIENT NAME *</label>
                      <input
                        required
                        type="text"
                        value={editingItem?.client || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, client: e.target.value })}
                        className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg p-2.5 text-[#242424]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#4A4D50] mb-1 font-bold">CATEGORY</label>
                      <select
                        value={editingItem?.cat || "cross-country"}
                        onChange={(e) => setEditingItem({ ...editingItem, cat: e.target.value })}
                        className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg p-2.5 text-[#242424]"
                      >
                        <option value="cross-country">Cross-Country Trunkline</option>
                        <option value="cgd">City Gas Distribution (CGD)</option>
                        <option value="hdd">River HDD Crossing</option>
                        <option value="plant-piping">Refinery & Plant Piping</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#4A4D50] mb-1 font-bold">DIAMETER *</label>
                      <input
                        required
                        type="text"
                        value={editingItem?.diameter || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, diameter: e.target.value })}
                        className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg p-2.5 text-[#242424]"
                        placeholder='42" (1,067 mm) OD'
                      />
                    </div>
                    <div>
                      <label className="block text-[#4A4D50] mb-1 font-bold">LENGTH / SPAN *</label>
                      <input
                        required
                        type="text"
                        value={editingItem?.length || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, length: e.target.value })}
                        className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg p-2.5 text-[#242424]"
                        placeholder="480 Kilometers"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#4A4D50] mb-1 font-bold">LOCATION CORRIDOR</label>
                      <input
                        type="text"
                        value={editingItem?.location || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                        className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg p-2.5 text-[#242424]"
                        placeholder="Gujarat / Bihar Corridor"
                      />
                    </div>
                    <div>
                      <label className="block text-[#4A4D50] mb-1 font-bold">STATUS</label>
                      <select
                        value={editingItem?.status || "Active Operations"}
                        onChange={(e) => setEditingItem({ ...editingItem, status: e.target.value })}
                        className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg p-2.5 text-[#242424]"
                      >
                        <option value="Active Operations">Active Operations</option>
                        <option value="Completed">Completed</option>
                        <option value="Under Commissioning">Under Commissioning</option>
                        <option value="Tendering">Tendering</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#4A4D50] mb-1 font-bold">SHORT SUMMARY</label>
                    <textarea
                      rows={2}
                      value={editingItem?.shortDesc || editingItem?.short_desc || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, shortDesc: e.target.value })}
                      className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg p-2.5 text-[#242424]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#4A4D50] mb-1 font-bold">FULL TECHNICAL CASE STUDY</label>
                    <textarea
                      rows={4}
                      value={editingItem?.description || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                      className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg p-2.5 text-[#242424]"
                    />
                  </div>
                </>
              )}

              {/* Service Form Fields */}
              {modalType === "service" && (
                <>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[#4A4D50] mb-1 font-bold">SERVICE #</label>
                      <input
                        type="text"
                        value={editingItem?.n || "01"}
                        onChange={(e) => setEditingItem({ ...editingItem, n: e.target.value })}
                        className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg p-2.5 text-[#242424]"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[#4A4D50] mb-1 font-bold">DESIGN STANDARD *</label>
                      <input
                        type="text"
                        required
                        value={editingItem?.standard || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, standard: e.target.value })}
                        className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg p-2.5 text-[#242424]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#4A4D50] mb-1 font-bold">SERVICE TITLE *</label>
                    <input
                      required
                      type="text"
                      value={editingItem?.title || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                      className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg p-2.5 text-[#242424]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#4A4D50] mb-1 font-bold">DESCRIPTION *</label>
                    <textarea
                      rows={3}
                      required
                      value={editingItem?.text || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, text: e.target.value })}
                      className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg p-2.5 text-[#242424]"
                    />
                  </div>
                </>
              )}

              {/* Fleet Form Fields */}
              {modalType === "fleet" && (
                <>
                  <div>
                    <label className="block text-[#4A4D50] mb-1 font-bold">EQUIPMENT NAME / MODEL *</label>
                    <input
                      required
                      type="text"
                      value={editingItem?.name || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                      className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg p-2.5 text-[#242424]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#4A4D50] mb-1 font-bold">CAPACITY *</label>
                      <input
                        required
                        type="text"
                        value={editingItem?.capacity || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, capacity: e.target.value })}
                        className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg p-2.5 text-[#242424]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#4A4D50] mb-1 font-bold">MAKE / OEM</label>
                      <input
                        type="text"
                        value={editingItem?.make || editingItem?.specs || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, make: e.target.value, specs: e.target.value })}
                        className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg p-2.5 text-[#242424]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#4A4D50] mb-1 font-bold">APPLICATION DOMAIN</label>
                      <input
                        type="text"
                        value={editingItem?.application || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, application: e.target.value })}
                        className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg p-2.5 text-[#242424]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#4A4D50] mb-1 font-bold">EQUIPMENT CATEGORY</label>
                      <input
                        type="text"
                        placeholder="Heavy Machinery / Trenchless / Welding"
                        value={editingItem?.category || "Heavy Machinery"}
                        onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                        className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg p-2.5 text-[#242424]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#4A4D50] mb-1 font-bold">FLEET UNITS COUNT</label>
                    <input
                      type="text"
                      value={editingItem?.units || editingItem?.quantity || "1 Unit"}
                      onChange={(e) => setEditingItem({ ...editingItem, units: e.target.value, quantity: e.target.value })}
                      className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg p-2.5 text-[#242424]"
                    />
                  </div>
                </>
              )}

              {/* Career Form Fields */}
              {modalType === "career" && (
                <>
                  <div>
                    <label className="block text-[#4A4D50] mb-1 font-bold">POSITION TITLE *</label>
                    <input
                      required
                      type="text"
                      value={editingItem?.title || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                      className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg p-2.5 text-[#242424]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#4A4D50] mb-1 font-bold">DEPARTMENT *</label>
                      <input
                        required
                        type="text"
                        value={editingItem?.department || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, department: e.target.value })}
                        className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg p-2.5 text-[#242424]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#4A4D50] mb-1 font-bold">EXPERIENCE</label>
                      <input
                        type="text"
                        value={editingItem?.experience || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, experience: e.target.value })}
                        className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg p-2.5 text-[#242424]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#4A4D50] mb-1 font-bold">LOCATION</label>
                      <input
                        type="text"
                        value={editingItem?.location || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                        className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg p-2.5 text-[#242424]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#4A4D50] mb-1 font-bold">EMPLOYMENT TYPE</label>
                      <input
                        type="text"
                        value={editingItem?.type || "Full-Time"}
                        onChange={(e) => setEditingItem({ ...editingItem, type: e.target.value })}
                        className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg p-2.5 text-[#242424]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#4A4D50] mb-1 font-bold">JOB DESCRIPTION & REQUIREMENTS</label>
                    <textarea
                      rows={3}
                      value={editingItem?.job_desc || editingItem?.desc || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, job_desc: e.target.value })}
                      className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg p-2.5 text-[#242424]"
                    />
                  </div>
                </>
              )}

              {/* News Form Fields */}
              {modalType === "news" && (
                <>
                  <div>
                    <label className="block text-[#4A4D50] mb-1 font-bold">HEADLINE *</label>
                    <input
                      required
                      type="text"
                      value={editingItem?.title || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                      className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg p-2.5 text-[#242424]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#4A4D50] mb-1 font-bold">CATEGORY TAG</label>
                      <input
                        type="text"
                        value={editingItem?.category || editingItem?.tag || "MILESTONE"}
                        onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                        className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg p-2.5 text-[#242424]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#4A4D50] mb-1 font-bold">DATE OF RELEASE</label>
                      <input
                        type="text"
                        value={editingItem?.date || "September 2026"}
                        onChange={(e) => setEditingItem({ ...editingItem, date: e.target.value })}
                        className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg p-2.5 text-[#242424]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#4A4D50] mb-1 font-bold">PRESS STATEMENT / EXCERPT</label>
                    <textarea
                      rows={4}
                      value={editingItem?.excerpt || editingItem?.summary || editingItem?.content || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, excerpt: e.target.value, content: e.target.value })}
                      className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg p-2.5 text-[#242424]"
                    />
                  </div>
                </>
              )}

              {/* Client Form Fields */}
              {modalType === "client" && (
                <>
                  <div>
                    <label className="block text-[#4A4D50] mb-1 font-bold">CLIENT NAME *</label>
                    <input
                      required
                      type="text"
                      value={editingItem?.name || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                      className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg p-2.5 text-[#242424]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#4A4D50] mb-1 font-bold">CLIENT CODE / SHORTCODE</label>
                      <input
                        type="text"
                        value={editingItem?.code || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, code: e.target.value })}
                        className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg p-2.5 text-[#242424]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#4A4D50] mb-1 font-bold">SECTORS SERVED *</label>
                      <input
                        type="text"
                        required
                        value={editingItem?.sector || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, sector: e.target.value })}
                        className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg p-2.5 text-[#242424]"
                        placeholder="e.g. Natural Gas & Transmission"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="pt-4 border-t border-[#D9D9D9] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setModalType(null);
                    setEditingItem(null);
                  }}
                  className="px-4 py-2.5 text-xs text-[#6B6F73] hover:text-[#242424] font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#C69C6D] hover:bg-[#B08554] text-[#242424] font-bold px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider transition"
                >
                  Save Record to Database
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          CHANGE PASSWORD MODAL
         ══════════════════════════════════════════════════════════════════ */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-white border border-[#D9D9D9] rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#D9D9D9]">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-amber-50 border border-amber-200 rounded-lg text-[#9E7444]">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-base text-[#242424]">
                    Change Admin Password
                  </h3>
                  <p className="text-[10px] font-mono text-[#6B6F73]">
                    Salted Scrypt Hash with Database Session Invalidation
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowPasswordModal(false)}
                className="p-1 text-[#6B6F73] hover:text-[#242424]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {passwordChangeError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs font-mono text-red-700 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{passwordChangeError}</span>
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-3 font-mono text-xs">
              <div>
                <label className="block text-[#4A4D50] mb-1 font-bold">
                  CURRENT PASSWORD *
                </label>
                <input
                  type="password"
                  required
                  value={currentPasswordInput}
                  onChange={(e) => setCurrentPasswordInput(e.target.value)}
                  placeholder="Enter current password"
                  className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg px-3 py-2 text-[#242424] focus:outline-none focus:border-[#C69C6D]"
                />
              </div>

              <div>
                <label className="block text-[#4A4D50] mb-1 font-bold">
                  NEW PASSWORD * (MIN 8 CHARACTERS)
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={newPasswordInput}
                  onChange={(e) => setNewPasswordInput(e.target.value)}
                  placeholder="Enter strong new password"
                  className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg px-3 py-2 text-[#242424] focus:outline-none focus:border-[#C69C6D]"
                />
              </div>

              <div>
                <label className="block text-[#4A4D50] mb-1 font-bold">
                  CONFIRM NEW PASSWORD *
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={confirmPasswordInput}
                  onChange={(e) => setConfirmPasswordInput(e.target.value)}
                  placeholder="Re-enter new password"
                  className="w-full bg-[#F8F4EC] border border-[#D9D9D9] rounded-lg px-3 py-2 text-[#242424] focus:outline-none focus:border-[#C69C6D]"
                />
              </div>

              <div className="pt-2 text-[10px] text-[#6B6F73] bg-[#F8F4EC] p-3 rounded-lg border border-[#D9D9D9]">
                ℹ️ Changing your password will update the cryptographic hash in PostgreSQL and terminate all other active administrator sessions across all devices.
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-4 py-2 text-[#6B6F73] hover:text-[#242424]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#C69C6D] hover:bg-[#B08554] text-[#242424] font-bold px-4 py-2 rounded-xl transition flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Update Password</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          CONFIRM DELETE MODAL
         ══════════════════════════════════════════════════════════════════ */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white border border-red-200 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-600">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="font-heading font-bold text-lg text-[#242424]">Confirm Permanent Deletion</h3>
            </div>
            <p className="text-xs text-[#4A4D50] font-mono leading-relaxed">
              Are you sure you want to delete <span className="font-bold text-[#242424]">"{deleteConfirm.title}"</span>?
              This will permanently delete the record from PostgreSQL on port 5433.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 text-xs font-mono text-[#6B6F73] hover:text-[#242424]"
              >
                Cancel
              </button>
              <button
                onClick={executeDelete}
                disabled={loading}
                className="bg-red-600 hover:bg-red-700 text-white font-mono font-bold px-4 py-2 rounded-xl text-xs transition"
              >
                Yes, Delete Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
