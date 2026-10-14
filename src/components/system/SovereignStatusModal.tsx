"use client";

import { useState, useEffect } from "react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import {
  ShieldCheck,
  Activity,
  Server,
  Lock,
  Cpu,
  RefreshCw,
  X,
  CheckCircle2,
  Terminal,
} from "lucide-react";

interface SovereignStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SovereignStatusModal({ isOpen, onClose }: SovereignStatusModalProps) {
  const [pulseTime, setPulseTime] = useState("");
  const [activeTab, setActiveTab] = useState<"telemetry" | "nodes" | "compliance">("telemetry");

  useEffect(() => {
    const updateTime = () => {
      setPulseTime(new Date().toUTCString());
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden
        bg-white border border-slate-200 text-slate-900
        dark:bg-[#080d16] dark:border-cyan-500/30 dark:text-neutral-100 z-10 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-white/[0.08] bg-slate-50/80 dark:bg-black/30">
          <div className="flex items-center gap-3">
            <BrandLogo size="sm" showText={false} clickable={false} />
            <div>
              <div className="text-sm font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                <span>NOXSOV Sovereign Telemetry & Architecture Status</span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  Live Verified
                </span>
              </div>
              <div className="text-[11px] font-mono text-slate-500 dark:text-neutral-400 mt-0.5">
                UTC Heartbeat: {pulseTime || "Syncing..."}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:text-neutral-400 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/[0.06] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-200 dark:border-white/[0.08] px-6 bg-slate-100/50 dark:bg-white/[0.02]">
          <button
            type="button"
            onClick={() => setActiveTab("telemetry")}
            className={`py-3 px-4 text-xs font-mono font-medium border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === "telemetry"
                ? "border-cyan-500 text-cyan-600 dark:text-cyan-400"
                : "border-transparent text-slate-500 dark:text-neutral-400 hover:text-slate-800 dark:hover:text-neutral-200"
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Telemetry & Egress</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("nodes")}
            className={`py-3 px-4 text-xs font-mono font-medium border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === "nodes"
                ? "border-cyan-500 text-cyan-600 dark:text-cyan-400"
                : "border-transparent text-slate-500 dark:text-neutral-400 hover:text-slate-800 dark:hover:text-neutral-200"
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            <span>Sovereign Nodes</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("compliance")}
            className={`py-3 px-4 text-xs font-mono font-medium border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === "compliance"
                ? "border-cyan-500 text-cyan-600 dark:text-cyan-400"
                : "border-transparent text-slate-500 dark:text-neutral-400 hover:text-slate-800 dark:hover:text-neutral-200"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Air-Gap & Compliance</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {activeTab === "telemetry" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 dark:bg-white/[0.03] dark:border-white/[0.08]">
                  <div className="text-xs font-mono text-slate-500 dark:text-neutral-400">Telemetry Egress</div>
                  <div className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">
                    0.00 B / sec
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-neutral-500 mt-0.5">
                    Strict Zero External Phone-Home
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 dark:bg-white/[0.03] dark:border-white/[0.08]">
                  <div className="text-xs font-mono text-slate-500 dark:text-neutral-400">Ring-0 Hook Latency</div>
                  <div className="text-xl font-bold font-mono text-cyan-600 dark:text-cyan-400 mt-1">
                    0.74 ms avg
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-neutral-500 mt-0.5">
                    eBPF Kernel Probing Active
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 dark:bg-white/[0.03] dark:border-white/[0.08]">
                  <div className="text-xs font-mono text-slate-500 dark:text-neutral-400">Cryptographic State</div>
                  <div className="text-xl font-bold font-mono text-indigo-600 dark:text-indigo-400 mt-1">
                    Ed25519 Verified
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-neutral-500 mt-0.5">
                    Signed Binary Signatures
                  </div>
                </div>
              </div>

              {/* Terminal simulated log */}
              <div className="rounded-xl overflow-hidden border border-slate-800 bg-[#070b12] text-neutral-300 font-mono text-xs">
                <div className="px-4 py-2 bg-[#04060a] border-b border-white/[0.06] flex items-center justify-between text-[11px] text-neutral-400">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                    <span>noxsov-core-daemon --status</span>
                  </div>
                  <span className="text-emerald-400">● DAEMON HEALTHY</span>
                </div>
                <div className="p-4 space-y-1.5 overflow-x-auto text-[11px] leading-relaxed">
                  <p className="text-neutral-400">[00:00:01] Initializing NOXSOV Sovereign Kernel Interface...</p>
                  <p className="text-neutral-400">[00:00:02] Loading Kryptik eBPF telemetry filters: <span className="text-emerald-400">12,480 rules loaded (0 conflicts)</span></p>
                  <p className="text-neutral-400">[00:00:03] Binding air-gapped transport socket: <span className="text-cyan-400">UNIX-DOMAIN /run/noxsov.sock</span></p>
                  <p className="text-neutral-400">[00:00:04] Verification key fingerprint: <span className="text-amber-400">SHA256:7f49c0...a18e sovereign root</span></p>
                  <p className="text-emerald-400">[00:00:05] All outbound telemetric sinks disabled. Sovereign boundary enforced.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "nodes" && (
            <div className="space-y-3">
              <div className="text-xs text-slate-600 dark:text-neutral-300">
                NOXSOV products run entirely inside the enterprise boundary—either self-hosted on bare metal, local Kubernetes clusters, or sovereign dedicated clouds.
              </div>

              <div className="space-y-2">
                {[
                  { name: "Kryptik EDR Agent", category: "Security", status: "Operational", footprint: "14.2 MB RAM", version: "v2.4.1" },
                  { name: "Tax Incubator Ledger Engine", category: "Finance", status: "Ready / In-Progress", footprint: "42.0 MB RAM", version: "v0.9.0" },
                  { name: "NOXSOV Events Concurrency Broker", category: "IT Solutions", status: "Operational", footprint: "28.5 MB RAM", version: "v3.1.2" },
                  { name: "Enterprise ERP Modular Core", category: "IT Solutions", status: "Architecture Defined", footprint: "Concept", version: "v0.1.0" },
                  { name: "K-12 & Campus Student SIS", category: "IT Solutions", status: "Architecture Defined", footprint: "Concept", version: "v0.1.0" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 dark:bg-white/[0.02] dark:border-white/[0.06] text-xs"
                  >
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                        <span>{item.name}</span>
                        <span className="text-[10px] font-mono text-slate-500 dark:text-neutral-400">({item.category})</span>
                      </div>
                      <div className="text-[11px] font-mono text-slate-500 dark:text-neutral-400 mt-0.5">
                        Allocated: {item.footprint} • Release: {item.version}
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "compliance" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 dark:bg-white/[0.03] dark:border-white/[0.08] space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>True Air-Gapped Mode</span>
                  </div>
                  <p className="text-slate-600 dark:text-neutral-400 text-[11px] leading-relaxed">
                    Operate in zero-connectivity high-security isolation zones. Licenses and updates can be applied via cryptographically signed tarball packages without internet egress.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 dark:bg-white/[0.03] dark:border-white/[0.08] space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                    <CheckCircle2 className="w-4 h-4 text-cyan-500" />
                    <span>Data Sovereign Custody</span>
                  </div>
                  <p className="text-slate-600 dark:text-neutral-400 text-[11px] leading-relaxed">
                    Zero customer telemetry, student records, audit logs, or financial statements leave the host infrastructure. You retain 100% intellectual custody.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 dark:bg-white/[0.03] dark:border-white/[0.08] space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                    <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                    <span>SOC 2 Type II Aligned</span>
                  </div>
                  <p className="text-slate-600 dark:text-neutral-400 text-[11px] leading-relaxed">
                    Immutable audit trails, role-based access control, Edwards-curve signed git-backed configuration revisions.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 dark:bg-white/[0.03] dark:border-white/[0.08] space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                    <CheckCircle2 className="w-4 h-4 text-amber-500" />
                    <span>Zero Per-Seat Tax</span>
                  </div>
                  <p className="text-slate-600 dark:text-neutral-400 text-[11px] leading-relaxed">
                    Predictable node-based and campus-wide licensing. Grow your team and endpoints without punitive vendor licensing jumps.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 dark:bg-black/40 border-t border-slate-200 dark:border-white/[0.06] flex items-center justify-between text-xs">
          <span className="text-slate-500 dark:text-neutral-400 font-mono text-[11px]">
            Engineered by NOXSOV Core Systems
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-slate-200 dark:bg-white/[0.1] text-slate-800 dark:text-white hover:bg-slate-300 dark:hover:bg-white/[0.15] transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
}
