import Tilt3DCard from "./3d/Tilt3DCard";
import RoundSupport3DRadar from "./3d/RoundSupport3DRadar";

const phases = [
  {
    phase: "01",
    label: "Pre-Counselling Feasibility",
    badge: "Foundation",
    steps: [
      "Deep rank & category matrix analysis",
      "Historical seat cutoff data modeling",
      "Personalized college & branch research",
      "Baseline option-entry strategy",
    ],
  },
  {
    phase: "02",
    label: "Option Entry / Choice Filling",
    badge: "Core Submission",
    steps: [
      "Collaborative 1-on-1 list preparation",
      "Sequence audit to prevent lock-in traps",
      "Cutoff margin verification",
      "Pre-deadline final submission lock",
    ],
  },
  {
    phase: "03",
    label: "Round 1 Allotment Strategy",
    badge: "First Decision",
    steps: [
      "Comprehensive allotment evaluation",
      "Accept vs. Upgrade decision modeling",
      "Challan & seat retention protocol",
      "Round 2 vacancy gap projection",
    ],
  },
  {
    phase: "04",
    label: "Subsequent Rounds & Upgrades",
    badge: "Mobility",
    steps: [
      "Review surrender & conversion seats",
      "Optimize higher-preference order",
      "Strategic guidance in Round 2 & Extended",
      "Preserve existing seat while upgrading",
    ],
  },
  {
    phase: "05",
    label: "Final Admission & Reporting",
    badge: "Confirmation",
    steps: [
      "Evaluate final round allotment",
      "Admission order & document protocol",
      "Campus verification guidelines",
      "Seat confirmation completion",
    ],
  },
];

export default function RoundSupport() {
  return (
    <section
      id="round-support"
      className="py-20 md:py-28 bg-[#030712] text-slate-100 relative overflow-hidden border-t border-sky-500/15"
      aria-label="Round-by-round counselling support"
    >
      {/* Background Subtle Nebula Lighting */}
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-sky-500/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-sky-500/20 backdrop-blur-md mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            <span className="text-[11px] font-mono tracking-wider text-sky-200/90 font-medium uppercase">
              Lifecycle Tracking &amp; Roadmap
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-[1.15] mb-4">
            End-to-End Multi-Round Flightpath
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
            We don't disappear after option entry. Our mentors stay actively paired with you from pre-counselling analysis through every allotment round until you physically report on campus.
          </p>
        </div>

        {/* 3D Round Radar Widget Section */}
        <div className="mb-14 p-6 sm:p-8 rounded-2xl bg-[#060c1c]/80 border border-sky-500/15 backdrop-blur-md flex flex-col items-center">
          <div className="relative w-full max-w-lg flex flex-col items-center">
            <RoundSupport3DRadar />
            <div className="text-center px-4 py-1.5 rounded-full bg-sky-950/60 border border-sky-500/20 text-xs font-mono text-sky-300 mt-2">
              REAL-TIME ORBITAL MULTI-ROUND TELEMETRY RADAR
            </div>
          </div>
        </div>

        {/* Structured 5-Phase Mission Protocol */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {phases.map((phase) => (
            <Tilt3DCard key={phase.phase} maxTilt={4}>
              <div className="apple-card p-6 h-full flex flex-col justify-between border-sky-500/15 bg-[#060c1d]/70 group">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-sky-500/10">
                    <span className="text-xs font-mono font-bold text-sky-300 px-2.5 py-1 rounded bg-sky-950/70 border border-sky-500/20">
                      PHASE {phase.phase}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                      {phase.badge}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-semibold text-white mb-4 tracking-tight group-hover:text-sky-300 transition-colors">
                    {phase.label}
                  </h3>

                  <ul className="flex flex-col gap-2.5" role="list">
                    {phase.steps.map((step) => (
                      <li key={step} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2.5">
                        <svg
                          className="w-3.5 h-3.5 text-sky-400 flex-shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Tilt3DCard>
          ))}
        </div>

        {/* Official Process Disclaimer */}
        <div className="max-w-2xl mx-auto flex items-start gap-3 p-4 rounded-xl bg-slate-900/60 border border-sky-500/15">
          <svg className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-xs text-slate-400 leading-relaxed font-normal">
            Counselling support is provided according to the package enrolled. This guidance service is an independent mentoring initiative and does not control KEA or COMEDK examination authority processes, official allotments, or seat capacity.
          </p>
        </div>
      </div>
    </section>
  );
}
