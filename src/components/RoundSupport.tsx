import Tilt3DCard from "./3d/Tilt3DCard";
import RoundSupport3DRadar from "./3d/RoundSupport3DRadar";
import { CyberBadge } from "./3d/CyberHUDDecor";

const phases = [
  {
    label: "Before Counselling",
    steps: [
      "Rank and category analysis",
      "College research and shortlisting",
      "Branch preference discussion",
      "Option-entry strategy planning",
    ],
  },
  {
    label: "Option Entry",
    steps: [
      "Prepare option list",
      "Review and refine choices",
      "Finalize before submission deadline",
    ],
  },
  {
    label: "Round 1",
    steps: [
      "Evaluate Round 1 allotment",
      "Understand accept/upgrade options",
      "Decide next step based on allotment",
    ],
  },
  {
    label: "Further Rounds",
    steps: [
      "Review available upgrade opportunities",
      "Adjust strategy if appropriate",
      "Continue counselling support",
    ],
  },
  {
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
      className="py-20 md:py-28 bg-[#030712] text-slate-100 relative overflow-hidden border-t border-sky-500/15"
      aria-label="Round-by-round counselling support"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-4">
            <CyberBadge color="cyan">Lifecycle Tracking</CyberBadge>
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold text-white mb-4 tracking-tight">
            Support Throughout the Counselling Process
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
            We provide structured support at each stage, from pre-counselling
            analysis to the final allotment decision. Support is subject to the
            counselling package purchased.
          </p>
        </div>

        {/* 3D Round Radar Widget */}
        <div className="mb-14 flex flex-col items-center">
          <div className="relative w-full max-w-lg flex flex-col items-center">
            <RoundSupport3DRadar />
            <div className="text-center whitespace-nowrap px-4 py-1.5 rounded-full bg-sky-950/40 border border-sky-500/20 text-xs font-medium text-sky-300 backdrop-blur-md mt-2">
              Multi-Round Telemetry Map
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Hairline Divider */}
          <div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-sky-500/15 -translate-x-1/2"
            aria-hidden="true"
          />

          <div className="flex flex-col gap-8">
            {phases.map((phase, index) => (
              <div
                key={phase.label}
                className={`relative flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-0 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content card in 3D */}
                <div
                  className={`w-full md:w-5/12 ${
                    index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                  }`}
                >
                  <Tilt3DCard maxTilt={5}>
                    <div className="apple-card p-6">
                      <div
                        className={`flex items-center gap-2.5 mb-3.5 ${
                          index % 2 === 0 ? "md:justify-end" : ""
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full bg-sky-400" aria-hidden="true" />
                        <h3 className="text-white font-semibold text-base tracking-tight">
                          {phase.label}
                        </h3>
                      </div>
                      <ul
                        className={`flex flex-col gap-2.5 ${
                          index % 2 === 0 ? "md:items-end" : ""
                        }`}
                        role="list"
                      >
                        {phase.steps.map((step) => (
                          <li
                            key={step}
                            className="text-slate-400 text-sm flex items-center gap-2 font-normal"
                          >
                            <svg
                              className={`w-3.5 h-3.5 flex-shrink-0 text-sky-400 ${
                                index % 2 === 0 ? "md:order-last" : ""
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Tilt3DCard>
                </div>

                {/* Center dot */}
                <div
                  className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-slate-900 border border-sky-500/30 items-center justify-center z-10 text-sky-300 font-mono text-xs font-medium"
                  aria-hidden="true"
                >
                  0{index + 1}
                </div>

                {/* Empty spacer for opposite side */}
                <div className="hidden md:block w-5/12" />
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-14 max-w-xl mx-auto flex items-start gap-2.5 bg-sky-950/20 border border-sky-500/15 p-4 rounded-2xl">
          <svg className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
          <p className="text-xs text-slate-400 leading-relaxed font-normal">
            Counselling support is provided according to the package purchased.
            This service does not control KEA or COMEDK processes, allotments or seat
            availability. The number of rounds varies by year.
          </p>
        </div>
      </div>
    </section>
  );
}
