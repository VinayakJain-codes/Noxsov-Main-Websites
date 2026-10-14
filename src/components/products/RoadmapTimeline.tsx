import { RoadmapMilestone } from "@/data/products";
import { Clock } from "lucide-react";

interface RoadmapTimelineProps {
  milestones: RoadmapMilestone[];
  productName: string;
}

export function RoadmapTimeline({ milestones, productName }: RoadmapTimelineProps) {
  return (
    <section id="roadmap" className="py-20 border-t border-slate-200 dark:border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
            <Clock className="w-3.5 h-3.5" />
            <span>Engineering Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Development Roadmap for {productName}
          </h2>
          <p className="text-sm text-slate-600 dark:text-neutral-300 leading-relaxed">
            We operate with complete engineering transparency. Track our progress as we move from architectural RFCs through internal stress-testing to general availability.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative border-l border-slate-300 dark:border-white/[0.1] ml-4 sm:ml-32 space-y-12">
            {milestones.map((m, idx) => {
              const isCompleted = m.status === "Completed";
              const isInProgress = m.status === "In Progress";

              return (
                <div key={idx} className="relative pl-8 sm:pl-10 group">
                  {/* Left quarter tag for desktop */}
                  <div className="hidden sm:block absolute -left-32 top-1 text-right w-24">
                    <span className="text-xs font-mono font-bold text-slate-500 dark:text-neutral-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                      {m.quarter}
                    </span>
                  </div>

                  {/* Bullet indicator */}
                  <div
                    className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 transition-all ${
                      isCompleted
                        ? "bg-emerald-500 border-slate-50 dark:border-[#06090e] shadow-[0_0_10px_rgba(16,185,129,0.7)]"
                        : isInProgress
                        ? "bg-amber-500 border-slate-50 dark:border-[#06090e] shadow-[0_0_10px_rgba(245,158,11,0.7)] animate-pulse"
                        : "bg-slate-300 dark:bg-neutral-700 border-slate-50 dark:border-[#06090e]"
                    }`}
                  />

                  {/* Card Content */}
                  <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-white/[0.08] group-hover:border-slate-300 dark:group-hover:border-white/[0.15] transition-all">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="sm:hidden text-xs font-mono text-cyan-600 dark:text-cyan-400 font-bold">
                        {m.quarter}
                      </div>

                      <span
                        className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full font-medium ${
                          isCompleted
                            ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20"
                            : isInProgress
                            ? "bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20"
                            : "bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-neutral-400 border border-slate-200 dark:border-neutral-700"
                        }`}
                      >
                        {m.status}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                      {m.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-300 leading-relaxed mt-2">
                      {m.details}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
