"use client";

import { useState } from "react";
import { CheckCircle, Zap, WifiOff, Wifi } from "lucide-react";

interface SimulatorProps {
  productId: string;
}

export function InteractiveTelemetrySimulator({ productId }: SimulatorProps) {
  // Kryptik Multi-Tenant Guard Management & OpenCV AI Simulator State
  const [activePortal, setActivePortal] = useState<"agency" | "guard" | "client" | "supervisor">("agency");
  const [guards, setGuards] = useState([
    {
      id: "GRD-409",
      name: "Ramesh Sharma",
      site: "DLF Cyber City - Gate 3",
      status: "AI Verified",
      confidence: "99.4%",
      uniform: "Compliant",
      geofence: "Within 3m GPS",
    },
    {
      id: "GRD-412",
      name: "Vikram Chauhan",
      site: "Tower B Logistics Dock",
      status: "Patrol Checkpoint Scanned",
      confidence: "98.8%",
      uniform: "Compliant",
      geofence: "Within 2m GPS",
    },
    {
      id: "GRD-418",
      name: "Amit Verma",
      site: "Main Reception Enclave",
      status: "Awaiting Check-in",
      confidence: "Pending Scan",
      uniform: "Pending",
      geofence: "Within 4m GPS",
    },
  ]);
  const [isVerifyingAI, setIsVerifyingAI] = useState(false);
  const [verifiedAll, setVerifiedAll] = useState(false);

  // NOXSOV Events Simulator State
  const [scanCount, setScanCount] = useState(9241);
  const [isOfflineMesh, setIsOfflineMesh] = useState(false);
  const [recentScan, setRecentScan] = useState<{ id: string; name: string; tier: string; time: string } | null>({
    id: "TKT-8921-VIP",
    name: "Dr. Alisha Khan",
    tier: "VIP Stage Access",
    time: "Just now",
  });

  const handleSimulateOpenCVCheck = () => {
    setIsVerifyingAI(true);
    setTimeout(() => {
      setIsVerifyingAI(false);
      setVerifiedAll(true);
      setGuards((prev) =>
        prev.map((g) =>
          g.id === "GRD-418"
            ? {
                ...g,
                status: "AI Verified (OpenCV)",
                confidence: "99.2%",
                uniform: "Compliant & Verified",
                geofence: "Verified Inside 4m",
              }
            : g
        )
      );
    }, 700);
  };

  const handleSimulateScan = () => {
    const names = ["Marcus Vance", "Elena Rostova", "Devin Chen", "Priya Nair", "Liam O'Connor"];
    const tiers = ["VIP Stage Front", "General Admission", "Backstage All-Access", "Early Bird Pass"];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomTier = tiers[Math.floor(Math.random() * tiers.length)];
    const id = `TKT-${Math.floor(1000 + Math.random() * 9000)}-${randomTier.substring(0, 3).toUpperCase()}`;

    setScanCount((prev) => prev + 1);
    setRecentScan({
      id,
      name: randomName,
      tier: randomTier,
      time: "Just now (<320ms)",
    });
  };

  if (productId === "kryptik") {
    return (
      <div className="glass-panel rounded-2xl border border-emerald-500/30 p-6 space-y-5 bg-white/95 dark:bg-[#080d14]/90 shadow-2xl">
        {/* Header & Portal Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-white/[0.08] pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Multi-Tenant Guard Ops & OpenCV AI Verification Engine
              </span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-neutral-400 font-mono">
              Workspace: <span className="text-cyan-600 dark:text-cyan-400 font-semibold">Apex Global Security (Agency ID: AGY-8841)</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSimulateOpenCVCheck}
            disabled={isVerifyingAI || verifiedAll}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-1.5 ${
              verifiedAll
                ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/40 cursor-default"
                : "bg-cyan-500 hover:bg-cyan-400 text-black shadow-md shadow-cyan-500/20 active:scale-95"
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            {isVerifyingAI
              ? "Running OpenCV Verification..."
              : verifiedAll
              ? "All Guards Verified by AI"
              : "Simulate Guard AI Check-in"}
          </button>
        </div>

        {/* 4 Portals Navigation Bar */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <span className="text-slate-400 text-[11px]">Portal View:</span>
          {(
            [
              { id: "agency", label: "Agency Admin" },
              { id: "guard", label: "Guard Mobile PWA" },
              { id: "client", label: "Client Facility" },
              { id: "supervisor", label: "Patrol Supervisor" },
            ] as const
          ).map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActivePortal(p.id)}
              className={`px-2.5 py-1 rounded-md text-[11px] transition-all ${
                activePortal === p.id
                  ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 font-bold"
                  : "bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Live Guard Roster Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {guards.map((g) => (
            <div
              key={g.id}
              className={`p-3.5 rounded-xl border text-xs space-y-2 transition-all ${
                g.status.includes("AI Verified")
                  ? "bg-emerald-500/[0.08] border-emerald-500/40"
                  : g.status.includes("Patrol")
                  ? "bg-cyan-500/[0.06] border-cyan-500/30"
                  : "bg-slate-50 dark:bg-white/[0.02] border-slate-200 dark:border-white/[0.06]"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">{g.name}</div>
                  <div className="font-mono text-[10px] text-cyan-600 dark:text-cyan-400">{g.id}</div>
                </div>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-semibold ${
                    g.status.includes("AI Verified")
                      ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30"
                      : "bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30"
                  }`}
                >
                  {g.status}
                </span>
              </div>

              <div className="text-slate-500 dark:text-neutral-400 text-[11px]">
                Facility: <span className="text-slate-800 dark:text-neutral-200 font-medium">{g.site}</span>
              </div>

              <div className="grid grid-cols-2 gap-1 text-[10px] font-mono pt-1 border-t border-slate-200 dark:border-white/[0.06]">
                <div>
                  <span className="text-slate-400">OpenCV Match:</span>{" "}
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">{g.confidence}</span>
                </div>
                <div>
                  <span className="text-slate-400">Uniform:</span>{" "}
                  <span className="text-slate-700 dark:text-neutral-300">{g.uniform}</span>
                </div>
              </div>

              <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                <span>{g.geofence}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Architecture Status Bottom Bar */}
        <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-black/50 border border-slate-200 dark:border-white/[0.06] text-[11px] font-mono text-slate-600 dark:text-neutral-400 flex flex-wrap items-center justify-between gap-2">
          <span>Backend: Supabase PostgreSQL (Multi-Tenant RLS Enabled • Dual Audit Hardened)</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
            Python/Flask AI Service: Online (&lt;720ms)
          </span>
        </div>
      </div>
    );
  }

  if (productId === "noxsov-events") {
    return (
      <div className="glass-panel rounded-2xl border border-blue-500/30 p-6 space-y-4 bg-white/95 dark:bg-[#080d18]/90 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-white/[0.08] pb-4">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-mono font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Gate Turnstile Edge Scanner Simulator
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsOfflineMesh(!isOfflineMesh)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 border transition-all ${
                isOfflineMesh
                  ? "bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/40"
                  : "bg-slate-100 dark:bg-white/[0.05] text-slate-700 dark:text-neutral-300 border-slate-200 dark:border-white/[0.1] hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {isOfflineMesh ? <WifiOff className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5" />}
              {isOfflineMesh ? "Offline Mesh Mode Active" : "Online Mode"}
            </button>

            <button
              type="button"
              onClick={handleSimulateScan}
              className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-cyan-400 hover:bg-cyan-300 text-black shadow-md shadow-cyan-500/20 active:scale-95 transition-all"
            >
              + Simulate QR Turnstile Scan
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06]">
            <div className="text-xs text-slate-500 dark:text-neutral-400">Total Checked-In Attendees</div>
            <div className="text-2xl font-bold font-mono text-cyan-600 dark:text-cyan-400 mt-1">
              {scanCount.toLocaleString()}
            </div>
            <div className="text-[10px] text-slate-400 dark:text-neutral-500 font-mono mt-0.5">Capacity: 14,582 (63.4%)</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06]">
            <div className="text-xs text-slate-500 dark:text-neutral-400">Turnstile Processing Latency</div>
            <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">
              284ms
            </div>
            <div className="text-[10px] text-slate-400 dark:text-neutral-500 font-mono mt-0.5">Cryptographic HMAC Verify</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06]">
            <div className="text-xs text-slate-500 dark:text-neutral-400">Gate Network State</div>
            <div className="text-sm font-bold font-mono text-slate-900 dark:text-white mt-1.5 flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isOfflineMesh ? "bg-amber-500" : "bg-emerald-500"}`} />
              {isOfflineMesh ? "P2P SQLite Mesh Sync" : "Distributed Central Queue"}
            </div>
            <div className="text-[10px] text-slate-500 dark:text-neutral-400 font-mono mt-0.5">Zero Ticket Collisions</div>
          </div>
        </div>

        {recentScan && (
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/[0.06] flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span className="text-slate-900 dark:text-white font-semibold">{recentScan.name}</span>
              <span className="text-slate-500 dark:text-neutral-400">({recentScan.id})</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-cyan-600 dark:text-cyan-400">{recentScan.tier}</span>
              <span className="text-slate-400 dark:text-neutral-500">{recentScan.time}</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Fallback / Tax Incubator preview
  return (
    <div className="glass-panel rounded-2xl border border-slate-200 dark:border-white/[0.1] p-6 space-y-4 bg-white/95 dark:bg-[#080d16]/90 shadow-2xl">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/[0.08] pb-3 text-xs font-mono">
        <span className="text-cyan-600 dark:text-cyan-400 font-bold uppercase tracking-wider">
          Ledger Ingestion & Automated Rule Sandbox
        </span>
        <span className="text-slate-500 dark:text-neutral-400">140+ Active Compliance Rules</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06]">
          <div className="text-slate-500 dark:text-neutral-400">GSTR-2B vs ERP Register Matching</div>
          <div className="text-emerald-600 dark:text-emerald-400 font-bold text-base mt-1">99.8% Automated Match</div>
          <div className="text-[10px] text-slate-400 dark:text-neutral-500 mt-0.5">Instant discrepancy highlighting</div>
        </div>
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06]">
          <div className="text-slate-500 dark:text-neutral-400">Input Tax Credit (ITC) Safeguard</div>
          <div className="text-cyan-600 dark:text-cyan-400 font-bold text-base mt-1">₹2.4 Cr Verified</div>
          <div className="text-[10px] text-slate-400 dark:text-neutral-500 mt-0.5">Zero ineligible claims exposed</div>
        </div>
      </div>
    </div>
  );
}
