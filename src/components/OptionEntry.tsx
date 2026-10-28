import { useExam } from "../context/ExamContext";
import OptionEntry3DVisualizer from "./3d/OptionEntry3DVisualizer";
import Tilt3DCard from "./3d/Tilt3DCard";

const kcetConfusionPoints = [
  "Which college gives the best outcome for my exact rank and category?",
  "Should I prioritise the college or the branch?",
  "How does previous-year seat matrix data tell me what's realistic?",
  "How many options should I fill — and in what order?",
  "What backup options are safe vs what's just wasting a slot?",
  "How do different counselling rounds work and when should I upgrade?",
  "What happens if I get an allotment I'm not happy with?",
];

const comdekConfusionPoints = [
  "Which college gives the best outcome for my COMEDK rank?",
  "Should I prioritise the college or the engineering branch?",
  "How does previous-year COMEDK seat data tell me what's realistic?",
  "How many choices should I fill — and in what order?",
  "What backup choices are safe vs what's just using up a slot?",
  "How do COMEDK counselling rounds work and when should I consider an upgrade?",
  "What should I do if I receive an allotment I'm not satisfied with?",
];

const examContent = {
  KCET: {
    badge: "Option Entry Guidance",
    heading: "Why Option Entry Matters",
    intro:
      "Option entry is the single most important action you take during KCET counselling. The order you fill your choices directly determines which seat you get — and most students do it without proper data.",
    detail:
      "We use actual previous-year seat matrix data to build your list — so every choice is backed by numbers, not guesswork. One-on-one, so it's built around your priorities, not a template.",
    ctaLabel: "Get Option Entry Guidance",
    confusionHeading: "Common questions students face during option entry:",
    disclaimerText:
      "Option-entry order does not guarantee a better allotment. Final allotments are determined by KEA based on rank, category, seat availability and preferences submitted.",
    confusionPoints: kcetConfusionPoints,
  },
  COMEDK: {
    badge: "Choice Filling Guidance",
    heading: "Why Choice Filling Matters",
    intro:
      "Choice filling is the single most important step in COMEDK counselling. The order you fill your college and branch choices directly determines your allotment — and most students approach it without proper data.",
    detail:
      "We use actual previous-year COMEDK seat data to help build your choice list — so every entry is backed by numbers, not guesswork. One-on-one, built around your priorities, not a generic template.",
    ctaLabel: "Get Choice Filling Guidance",
    confusionHeading: "Common questions students face during choice filling:",
    disclaimerText:
      "Choice filling order does not guarantee a better allotment. Final allotments are determined by COMEDK authority based on rank, seat availability and preferences submitted.",
    confusionPoints: comdekConfusionPoints,
  },
} as const;

export default function OptionEntry() {
  const { exam } = useExam();
  const content = examContent[exam];

  return (
    <section
      id="option-entry"
      className="py-20 md:py-28 bg-[#020617] text-slate-100 relative overflow-hidden border-t border-slate-800"
      aria-label="Why option entry matters"
    >
      {/* Background Subtle Radial Lighting */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/[0.015] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Heading + Intro + 3D Visualizer (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <span className="inline-block text-amber-300 font-semibold text-sm uppercase tracking-widest mb-3">
              {content.badge}
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-4 tracking-tight leading-[1.15]">
              {content.heading}
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-3 font-normal">
              {content.intro}
            </p>

            <p className="text-slate-400 leading-relaxed mb-6 text-sm font-normal">
              {content.detail}
            </p>

            {/* Embedded Interactive 3D Simulator */}
            <div className="w-full mb-8">
              <OptionEntry3DVisualizer />
            </div>

            <a
              href="#contact"
              className="apple-btn-primary min-h-[48px] inline-flex items-center gap-2 px-7 py-3 rounded-xl sm:rounded-full text-sm font-semibold cursor-pointer"
            >
              <span>{content.ctaLabel}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Right Column: Strategic Dilemmas & Confusion Points (5 cols) */}
          <div className="lg:col-span-5">
            <Tilt3DCard maxTilt={3}>
              <div className="apple-card p-6 sm:p-7 border-slate-800 bg-[#050b18]/85">
                <h3 className="text-white font-semibold text-base mb-5">
                  {content.confusionHeading}
                </h3>

                <ul className="flex flex-col gap-3" role="list">
                  {content.confusionPoints.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <span
                        className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-slate-800 text-amber-300 flex items-center justify-center border border-slate-700"
                        aria-hidden="true"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4" />
                        </svg>
                      </span>
                      <span className="text-slate-300 text-sm leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Disclaimer note */}
                <div className="mt-6 pt-5 border-t border-slate-800">
                  <p className="text-xs text-slate-400 leading-relaxed">
                    <strong className="text-slate-300">Note:</strong>{" "}
                    {content.disclaimerText}
                  </p>
                </div>
              </div>
            </Tilt3DCard>
          </div>
        </div>
      </div>
    </section>
  );
}
