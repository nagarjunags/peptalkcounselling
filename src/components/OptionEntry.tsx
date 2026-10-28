import { useExam } from "../context/ExamContext";
import OptionEntry3DVisualizer from "./3d/OptionEntry3DVisualizer";
import Tilt3DCard from "./3d/Tilt3DCard";
import { CyberBadge } from "./3d/CyberHUDDecor";

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
      className="py-20 md:py-28 bg-black text-[#f5f5f7] relative overflow-hidden border-t border-white/[0.08]"
      aria-label="Why option entry matters"
    >
      {/* Background Lighting */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading + Intro + 3D Visualizer (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="mb-4">
              <CyberBadge color="gold">{content.badge}</CyberBadge>
            </div>

            <h2 className="text-3xl md:text-5xl font-semibold text-[#f5f5f7] mb-5 tracking-tight">
              {content.heading}
            </h2>

            <p className="text-[#86868b] text-base md:text-lg leading-relaxed mb-4 font-normal">
              {content.intro}
            </p>

            <p className="text-[#a1a1a6] leading-relaxed mb-6 text-sm font-normal">
              {content.detail}
            </p>

            {/* Embedded Interactive 3D Simulator */}
            <div className="w-full mb-8">
              <OptionEntry3DVisualizer />
            </div>

            <a
              href="#contact"
              className="apple-btn-primary min-h-[50px] inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-base font-semibold cursor-pointer"
            >
              <span>{content.ctaLabel}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Right Column: Confusion points card in 3D (5 cols) */}
          <div className="lg:col-span-5">
            <Tilt3DCard maxTilt={6}>
              <div className="apple-card p-7 sm:p-8">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/[0.08]">
                  <div className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#e2b474] flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-[#f5f5f7] font-semibold text-base leading-snug tracking-tight">
                    {content.confusionHeading}
                  </h3>
                </div>

                <ul className="flex flex-col gap-3.5" role="list">
                  {content.confusionPoints.map((point) => (
                    <li key={point} className="flex items-start gap-3 group">
                      <span
                        className="mt-1 flex-shrink-0 w-4 h-4 rounded-full bg-white/[0.04] text-[#e2b474] border border-white/10 flex items-center justify-center"
                        aria-hidden="true"
                      >
                        <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-[#86868b] text-sm leading-relaxed group-hover:text-[#f5f5f7] transition-colors font-normal">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Disclaimer note */}
                <div className="mt-6 pt-5 border-t border-white/[0.08] p-3.5 rounded-xl bg-white/[0.02]">
                  <p className="text-xs text-[#86868b] leading-relaxed font-normal">
                    <strong className="text-[#f5f5f7] font-medium">Note:</strong>{" "}
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
