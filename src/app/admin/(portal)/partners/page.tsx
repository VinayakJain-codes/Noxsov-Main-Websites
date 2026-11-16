"use client";

import { loadPortalJson } from "@/lib/referral/client";
import { useState, useEffect } from "react";
import { AdminHeader } from "@/components/referral/AdminHeader";
import { PartnerUser, PartnerProfile, PartnerSummary } from "@/types/referral";
import {
  UserPlus,
  Building,
  Phone,
  Mail,
  CreditCard,
  X,
} from "lucide-react";

interface EnrichedPartner {
  partner: PartnerUser;
  profile: PartnerProfile | null;
  summary: PartnerSummary;
}

export default function AdminPartnersPage() {
  const [partners, setPartners] = useState<EnrichedPartner[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  // Invite Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newCompany, setNewCompany] = useState("");
  const [inviting, setInviting] = useState(false);

  async function loadPartners() {
    try {
      const data = await loadPortalJson("/api/referral/partners");
      setPartners(data.partners);
      setLoadError("");
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : "Failed to load partners.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let active = true;
    queueMicrotask(() => {
      if (active) void loadPartners();
    });
    return () => { active = false; };
  }, []);

  const handleToggleStatus = async (userId: string, currentStatus: string) => {
    const nextStatus = currentStatus === "active" ? "suspended" : "active";
    try {
      const res = await fetch("/api/referral/partners", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, status: nextStatus }),
      });
      const data = await res.json();
      if (data.success) {
        loadPartners();
      } else {
        alert(data.error || "Failed to update partner status.");
      }
    } catch {
      alert("Failed to update partner status");
    }
  };

  const handleCreatePartner = async (e: React.FormEvent) => {
    e.preventDefault();
    setInviting(true);
    try {
      const res = await fetch("/api/referral/partners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newName,
          email: newEmail,
          password: newPassword,
          phone: newPhone,
          companyName: newCompany,
        }),
      });
      const data = await res.json();
      if (data.success) {
        alert(data.message || "Partner registered.");
        setModalOpen(false);
        setNewName("");
        setNewEmail("");
        setNewPassword("");
        setNewPhone("");
        setNewCompany("");
        loadPartners();
      } else {
        alert(data.error || "Failed to invite partner");
      }
    } catch {
      alert("Error inviting partner");
    } finally {
      setInviting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#04060a] text-slate-800 dark:text-neutral-200">
      <AdminHeader />
      {loadError && <p role="alert" className="mx-auto max-w-7xl px-4 py-4 text-sm text-rose-600">{loadError}</p>}

      <main hidden={Boolean(loadError)} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Partner Organizations Directory
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-neutral-400 mt-1">
              Authorized referral partners, registered accreditation codes, pipeline volume, and settlement accounts.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-black bg-cyan-400 hover:bg-cyan-300 shadow-sm"
          >
            <UserPlus className="w-4 h-4" />
            <span>Register New Partner</span>
          </button>
        </div>

        {/* Partners Grid */}
        {loading ? (
          <div className="p-16 text-center text-sm text-slate-500">Loading partners directory...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {partners.map(({ partner, profile, summary }) => (
              <div
                key={partner.id}
                className="rounded-xl surface-panel border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] p-6 space-y-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-200 dark:border-white/[0.06]">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base font-bold text-slate-900 dark:text-white">
                        {partner.name}
                      </h2>
                      <span className="tabular-nums text-xs px-2 py-0.5 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 font-semibold">
                        {profile?.partnerCode ?? "Unavailable"}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 dark:text-neutral-400 flex items-center gap-1.5 mt-1">
                      <Building className="w-3.5 h-3.5 text-slate-400" />
                      <span>{profile?.companyName || "Company unavailable"}</span>
                    </div>
                  </div>

                  <span
                    className={`text-xs uppercase tabular-nums px-2.5 py-1 rounded-full font-bold ${
                      partner.status === "active"
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                        : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"
                    }`}
                  >
                    {partner.status}
                  </span>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-600 dark:text-neutral-400">
                    <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{partner.email}</span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-600 dark:text-neutral-400">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="tabular-nums">{profile?.phone || "N/A"}</span>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/[0.04] text-center">
                  <div>
                    <div className="text-xs tabular-nums text-slate-400">REFERRALS</div>
                    <div className="text-base font-bold tabular-nums text-slate-900 dark:text-white mt-0.5">
                      {summary?.totalReferrals || 0}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs tabular-nums text-slate-400">EARNED</div>
                    <div className="text-base font-bold tabular-nums text-emerald-600 dark:text-emerald-400 mt-0.5">
                      ₹{(summary?.commissionEarned || 0).toLocaleString("en-IN")}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs tabular-nums text-slate-400">AVAILABLE</div>
                    <div className="text-base font-bold tabular-nums text-cyan-600 dark:text-cyan-400 mt-0.5">
                      ₹{(summary?.commissionAvailable || 0).toLocaleString("en-IN")}
                    </div>
                  </div>
                </div>

                {/* Payout Details Snippet */}
                <div className="text-xs text-slate-500 dark:text-neutral-400 flex items-center justify-between pt-1">
                  <span className="flex items-center gap-1.5 tabular-nums">
                    <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                    <span className="capitalize">
                      {profile?.payoutDetails?.method === "upi"
                        ? `UPI: ${profile.payoutDetails.upiId || "Configured"}`
                        : profile?.payoutDetails?.bankName ? `Bank: ${profile.payoutDetails.bankName}` : "Payout details unavailable"}
                    </span>
                  </span>

                  <button
                    type="button"
                    onClick={() => handleToggleStatus(partner.id, partner.status)}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white underline"
                  >
                    {partner.status === "active" ? "Suspend Account" : "Reactivate"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal: Register New Partner */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-xl surface-panel border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-[#090d16] p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/[0.06]">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <UserPlus className="w-4 h-4 text-cyan-500" />
                  <span>Register Referral Partner</span>
                </h3>
                <button
                  type="button"
                  onClick={() => { setModalOpen(false); setNewPassword(""); }}
                  className="p-1 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreatePartner} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold mb-1">Partner Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Siddharth Menon"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full p-2.5 text-sm rounded-xl border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.04]"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="siddharth@menontech.in"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full p-2.5 text-sm rounded-xl border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.04]"
                  />
                </div>

                <div>
                  <label htmlFor="partner-password" className="block font-semibold mb-1">Login password *</label>
                  <input id="partner-password" type="password" required minLength={10} maxLength={128} autoComplete="new-password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full p-2.5 text-sm rounded-xl border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.04]" />
                  <p className="mt-2 text-xs text-slate-500">Their email address is their login ID. Share these credentials securely; passwords cannot be viewed after creation.</p>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Contact Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98450 11223"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full p-2.5 text-sm rounded-xl border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.04]"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Company / Advisory Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Menon Enterprise Advisory LLP"
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    className="w-full p-2.5 text-sm rounded-xl border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.04]"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-white/[0.06]">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-3 py-1.5 text-slate-500 hover:text-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={inviting}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-black bg-cyan-400 hover:bg-cyan-300"
                  >
                    {inviting ? "Registering..." : "Register Partner"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
