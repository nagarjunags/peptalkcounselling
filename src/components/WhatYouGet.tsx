import { useExam } from "../context/ExamContext";
import Tilt3DCard from "./3d/Tilt3DCard";

const kcetPillars = [
  {
    pillarNumber: "01",
    pillarName: "Data & Feasibility Analysis",
    description: "Deep mathematical modeling of your rank, category, and historical seat matrix cutoffs.",
    deliverables: [
      {
        title: "One-on-One Rank & Category Audit",
        detail: "Exhaustive evaluation of your exact KCET rank, reservation category, and historical closing trends.",
      },
      {
        title: "Personalised Realistic College Shortlist",
        detail: "Categorised into Ambitious (Reach), Realistic (Target), and Safe (Anchor) institutional tiers.",
      },
      {
        title: "Historical Seat Matrix Cutoff Mining",
        detail: "Real previous-year cutoff trends mapped against seat pool expansions and category quotas.",
      },
    ],
  },
  {
    pillarNumber: "02",
    pillarName: "Precision Choice Architecture",
    description: "Collaborative formulation of your preference matrix to eliminate lock-in hazards.",
    deliverables: [
      {
        title: "Strategic Option-Entry Formulation",
        detail: "Built together live in a 1-on-1 session — ordered to safeguard upward mobility across all rounds.",
      },
      {
        title: "Pre-Submission Error & Gap Audit",
        detail: "Comprehensive line-by-line verification before final lock-in to eliminate sequence flaws.",
      },
      {
        title: "Branch vs. Institution Trade-off Advisory",
        detail: "Strategic analysis of placement track records, autonomy, syllabus, and career horizons.",
      },
    ],
  },
  {
    pillarNumber: "03",
    pillarName: "Lifecycle Support & Academic Bonus",
    description: "Continuous guidance until seat admission plus board/exam preparation at zero extra cost.",
    deliverables: [
      {
        title: "Round-by-Round Allotment Guidance",
        detail: "Evaluation of Round 1, Round 2, and Extended rounds — advising on upgrade vs. freeze decisions.",
      },
      {
        title: "Document Verification & Reporting Advisory",
        detail: "Guidance on KEA document protocols, verification slips, and college reporting procedures.",
      },
      {
        title: "PCM Teaching for Boards & KCET (Zero Extra Cost)",
        detail: "Comprehensive Physics, Chemistry, and Maths conceptual teaching included free of charge.",
        highlight: true,
      },
    ],
  },
];

const comdekPillars = [
  {
    pillarNumber: "01",
    pillarName: "Data & Feasibility Analysis",
    description: "Deep statistical modeling of your COMEDK rank and historical institutional closing ranks.",
    deliverables: [
      {
        title: "One-on-One COMEDK Rank Audit",
        detail: "Exhaustive evaluation of your score, rank percentile, and previous-year Bangalore cutoff trends.",
      },
      {
        title: "Personalised Bangalore & Karnataka Shortlist",
        detail: "Segmented into premier Tier-1 reach colleges, high-probability matches, and safety anchors.",
      },
      {
        title: "Closing Rank Matrix Analytics",
        detail: "Evaluation of past round closing ranks to anticipate cutoff fluctuations and seat availability.",
      },
    ],
  },
  {
    pillarNumber: "02",
    pillarName: "Precision Choice Architecture",
    description: "Collaborative choice sequence design to optimize your allotment outcome.",
    deliverables: [
      {
        title: "Choice Filling Preference Ladder",
        detail: "Formulated live in a 1-on-1 session — sequenced to preserve upgrade eligibility across rounds.",
      },
      {
        title: "Pre-Lock Verification & Gap Audit",
        detail: "Final review of your entire choice sequence prior to deadline lock-in to prevent order errors.",
      },
      {
        title: "Engineering Branch Alignment",
        detail: "In-depth review of emerging tech specializations, core branches, and institutional placements.",
      },
    ],
  },
  {
    pillarNumber: "03",
    pillarName: "Lifecycle Support & Academic Bonus",
    description: "End-to-end guidance through all COMEDK rounds plus complete academic teaching support.",
    deliverables: [
      {
        title: "Round-by-Round Upgrade Strategy",
        detail: "Actionable advisory on Accept & Upgrade, Reject & Upgrade, and final admission decisions.",
      },
      {
        title: "Fee Payment & Reporting Protocol",
        detail: "Clear guidance on COMEDK fee deduction rules, refund safety, and campus document submission.",
      },
      {
        title: "PCM Teaching for Boards & COMEDK (Zero Extra Cost)",
        detail: "Full Physics, Chemistry, and Maths conceptual coaching included at zero additional cost.",
        highlight: true,
      },
    ],
  },
];

export default function WhatYouGet() {
  const { exam } = useExam();
  const pillars = exam === "COMEDK" ? comdekPillars : kcetPillars;

  const heading =
    exam === "COMEDK"
      ? "The Complete COMEDK Guidance Architecture"
      : "The Complete KCET Guidance Architecture";

  return (
    <section
      id="what-you-get"
      className="py-20 md:py-28 bg-[#030712] text-slate-100 relative overflow-hidden border-t border-sky-500/15"
      aria-label="What is included in the guidance package"
    >
      {/* Background Subtle Nebula Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-sky-500/[0.02] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-sky-500/20 backdrop-blur-md mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            <span className="text-[11px] font-mono tracking-wider text-sky-200/90 font-medium uppercase">
              Curriculum &amp; Deliverables
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-[1.15] mb-4">
            {heading}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
            Everything structured in a single comprehensive program — from predictive data analytics to final allotment confirmation, plus board exam coaching at zero extra cost.
          </p>
        </div>

        {/* 3-Pillar Architectural Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {pillars.map((pillar) => (
            <Tilt3DCard key={pillar.pillarNumber} maxTilt={4}>
              <div className="apple-card p-6 sm:p-7 h-full flex flex-col justify-between border-sky-500/15 bg-[#060c1c]/75 relative overflow-hidden group">
                <div>
                  {/* Pillar Number & Header */}
                  <div className="flex items-center justify-between pb-4 mb-5 border-b border-sky-500/15">
                    <span className="text-xs font-mono font-bold text-sky-300 px-2.5 py-1 rounded bg-sky-950/60 border border-sky-500/25">
                      PILLAR {pillar.pillarNumber}
                    </span>
                    <span className="text-[10px] font-mono tracking-wider uppercase text-slate-400">
                      Standard Module
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 tracking-tight group-hover:text-sky-300 transition-colors">
                    {pillar.pillarName}
                  </h3>

                  <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                    {pillar.description}
                  </p>

                  {/* Deliverables List */}
                  <div className="flex flex-col gap-4">
                    {pillar.deliverables.map((item) => (
                      <div
                        key={item.title}
                        className={`p-3 rounded-xl border transition-colors ${
                          item.highlight
                            ? "bg-sky-950/40 border-sky-400/30 text-sky-100"
                            : "bg-slate-900/50 border-sky-500/10 hover:border-sky-500/20"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <svg
                            className={`w-3.5 h-3.5 flex-shrink-0 ${
                              item.highlight ? "text-sky-300" : "text-sky-400"
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                          <span
                            className={`text-xs font-semibold tracking-tight ${
                              item.highlight ? "text-sky-200" : "text-white"
                            }`}
                          >
                            {item.title}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed pl-5">
                          {item.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Tilt3DCard>
          ))}
        </div>

        {/* Editorial Direct Mentor Assurance Strip */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900/90 via-sky-950/30 to-slate-900/90 border border-sky-500/20 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/25 flex items-center justify-center text-sky-400 flex-shrink-0 mt-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h4 className="text-white font-semibold text-base sm:text-lg tracking-tight mb-1">
                Zero Hidden Charges • Transparent 1-on-1 Guidance
              </h4>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl font-normal">
                Everything listed is included in your enrollment package. Sessions are conducted one-on-one with screen sharing, with previous-year seat matrix data reviewed in real time.
              </p>
            </div>
          </div>

          <a
            href="#contact"
            className="apple-btn-primary min-h-[44px] px-6 py-2.5 text-xs font-semibold rounded-xl sm:rounded-full whitespace-nowrap cursor-pointer flex-shrink-0"
          >
            <span>Reserve Your Seat</span>
          </a>
        </div>
      </div>
    </section>
  );
}
