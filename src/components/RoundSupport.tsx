import Tilt3DCard from "./3d/Tilt3DCard";
import RoundSupport3DRadar from "./3d/RoundSupport3DRadar";

const phases = [
  {
    phase: "01",
    label: "Before Counselling",
    steps: [
      "Rank and category analysis",
      "College research and shortlisting",
      "Branch preference discussion",
      "Option-entry strategy planning",
    ],
  },
  {
    phase: "02",
    label: "Option Entry",
    steps: [
      "Prepare option list",
      "Review and refine choices",
      "Finalize before submission deadline",
    ],
  },
  {
    phase: "03",
    label: "Round 1",
    steps: [
      "Evaluate Round 1 allotment",
      "Understand accept/upgrade options",
      "Decide next step based on allotment",
    ],
  },
  {
    phase: "04",
    label: "Further Rounds",
    steps: [
      "Review available upgrade opportunities",
      "Adjust strategy if appropriate",
      "Continue counselling support",
    ],
  },
  {
    phase: "05",
    label: "Final Decision",
    steps: [
      "Evaluate final allotment",
      "Understand reporting and admission process",
      "Make an informed final decision",
    ],
  },
];

export default function RoundSupport() {
  return (
    <section
      id="round-support"
      className="py-20 md:py-28 bg-[#020617] text-slate-100 relative overflow-hidden border-t border-slate-800"
      aria-label="Round-by-round counselling support"
    >
      {/* Background Subtle Starlight Aura */}
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-amber-500/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700/60 backdrop-blur-md mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span className="text-[11px] font-mono tracking-wider text-amber-200/90 font-medium uppercase">
              Round-by-Round Support
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-[1.15] mb-4">
            Support Throughout the Counselling Process
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
            We provide structured support at each stage, from pre-counselling
            analysis to the final allotment decision. Support is subject to the
            counselling package purchased.
          </p>
        </div>

        {/* 3D Round Radar Widget Section */}
        <div className="mb-14 p-6 sm:p-8 rounded-2xl bg-[#050b18]/80 border border-slate-800 backdrop-blur-md flex flex-col items-center">
          <div className="relative w-full max-w-lg flex flex-col items-center">
            <RoundSupport3DRadar />
          </div>
        </div>

        {/* Structured 5-Phase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {phases.map((phase) => (
            <Tilt3DCard key={phase.phase} maxTilt={3}>
              <div className="apple-card p-6 h-full flex flex-col justify-between border-slate-800 bg-[#050b18]/85 group">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
                    <span className="text-xs font-mono font-bold text-amber-300 px-2.5 py-1 rounded bg-slate-900 border border-slate-700">
                      Phase {phase.phase}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-semibold text-white mb-4 tracking-tight group-hover:text-amber-200 transition-colors">
                    {phase.label}
                  </h3>

                  <ul className="flex flex-col gap-2.5" role="list">
                    {phase.steps.map((step) => (
                      <li key={step} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2.5">
                        <svg
                          className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5"
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
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs text-slate-400 leading-relaxed font-normal">
            Counselling support is provided according to the package purchased.
            This service does not control KEA processes, allotments or seat
            availability. The number of rounds varies by year.
          </p>
        </div>
      </div>
    </section>
  );
}
