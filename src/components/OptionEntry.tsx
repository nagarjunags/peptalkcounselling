import { useExam } from "../context/ExamContext";
import OptionEntry3DVisualizer from "./3d/OptionEntry3DVisualizer";
import Tilt3DCard from "./3d/Tilt3DCard";

const kcetConfusionPoints = [
  "Which college gives the highest ROI outcome for my exact rank and category?",
  "Should I prioritize a premier institution or a specialized engineering branch?",
  "How does previous-year seat matrix data establish what is realistic vs. a stretch?",
  "How many options should I fill — and in what exact strategic ladder?",
  "What backup options are genuine safety nets vs. what's just wasting an option slot?",
  "How do KEA counselling rounds work and when is upgrading mathematically safe?",
  "What is the step-by-step recourse if I receive an allotment I am not satisfied with?",
];

const comdekConfusionPoints = [
  "Which Bangalore institution yields the highest outcome for my COMEDK rank?",
  "Should I prioritize the college brand reputation or the computer science specialization?",
  "How does historical COMEDK seat closing data reveal realistic cutoffs?",
  "How many choices should I submit — and in what precise priority sequence?",
  "What backup choices are safe vs. what causes an accidental premature lock-in?",
  "How do COMEDK round upgrades work and what are the exact fee forfeiture rules?",
  "What should I do if I receive a lower allotment in Round 1?",
];

const examContent = {
  KCET: {
    eyebrow: "CRITICAL MILESTONE • OPTION ARCHITECTURE",
    heading: "Why Option Entry Determines Your College Destiny",
    intro:
      "Option entry is the single most decisive action you take during KCET counselling. The order you submit directly dictates which seat you get — and most candidates submit without understanding KEA's allocation algorithm.",
    detail:
      "We utilize actual previous-year seat matrix cutoff models to build your customized preference list — so every entry is backed by statistical probability, not guesswork. Formulated 1-on-1, customized to your priorities.",
    ctaLabel: "Get Option Entry Guidance",
    confusionHeading: "Strategic questions solved during your 1-on-1 session:",
    disclaimerText:
      "Option-entry order does not guarantee a better allotment. Final allotments are determined solely by KEA based on rank, category, seat availability and preferences submitted.",
    confusionPoints: kcetConfusionPoints,
  },
  COMEDK: {
    eyebrow: "CRITICAL MILESTONE • CHOICE ARCHITECTURE",
    heading: "Why Choice Filling Determines Your College Destiny",
    intro:
      "Choice filling is the single most decisive step in COMEDK counselling. The sequence you input directly determines your allotment — and thousands of candidates make fatal order mistakes every year.",
    detail:
      "We utilize actual previous-year COMEDK round closing data to build your customized choice list — so every entry is backed by statistical probability, not guesswork. Formulated 1-on-1, customized to your priorities.",
    ctaLabel: "Get Choice Filling Guidance",
    confusionHeading: "Strategic questions solved during your 1-on-1 session:",
    disclaimerText:
      "Choice filling order does not guarantee a better allotment. Final allotments are determined solely by COMEDK authority based on rank, seat availability and preferences submitted.",
    confusionPoints: comdekConfusionPoints,
  },
} as const;

export default function OptionEntry() {
  const { exam } = useExam();
  const content = examContent[exam];

  return (
    <section
      id="option-entry"
      className="py-20 md:py-28 bg-[#030712] text-slate-100 relative overflow-hidden border-t border-sky-500/15"
      aria-label="Why option entry matters"
    >
      {/* Background Subtle Radial Lighting */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Heading + Intro + 3D Visualizer (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-sky-500/20 backdrop-blur-md mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              <span className="text-[11px] font-mono tracking-wider text-sky-200/90 font-medium uppercase">
                {content.eyebrow}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-4 tracking-tight leading-[1.15]">
              {content.heading}
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-3 font-normal">
              {content.intro}
            </p>

            <p className="text-sky-300/80 leading-relaxed mb-6 text-sm font-normal">
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
            <Tilt3DCard maxTilt={4}>
              <div className="apple-card p-6 sm:p-7 border-sky-500/20 bg-[#060c1d]/85">
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-sky-500/15">
                  <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/25 flex items-center justify-center text-sky-400 flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-white font-semibold text-sm sm:text-base leading-snug tracking-tight">
                    {content.confusionHeading}
                  </h3>
                </div>

                <ul className="flex flex-col gap-3" role="list">
                  {content.confusionPoints.map((point, idx) => (
                    <li key={point} className="flex items-start gap-2.5 group">
                      <span className="text-[10px] font-mono text-sky-400 font-bold px-1.5 py-0.5 rounded bg-sky-950/70 border border-sky-500/20 flex-shrink-0 mt-0.5">
                        0{idx + 1}
                      </span>
                      <span className="text-slate-300 text-xs sm:text-sm leading-relaxed group-hover:text-white transition-colors font-normal">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Disclaimer note */}
                <div className="mt-6 pt-4 border-t border-sky-500/15 p-3 rounded-lg bg-slate-900/60 text-[11px] text-slate-400 leading-relaxed font-normal">
                  <strong className="text-sky-300 font-medium">Official Protocol:</strong>{" "}
                  {content.disclaimerText}
                </div>
              </div>
            </Tilt3DCard>
          </div>
        </div>
      </div>
    </section>
  );
}
