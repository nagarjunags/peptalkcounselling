import { useExam } from "../context/ExamContext";
import Tilt3DCard from "./3d/Tilt3DCard";
import { CyberBadge } from "./3d/CyberHUDDecor";

const kcetSteps = [
  {
    number: "01",
    title: "Share Your Details",
    description:
      "Tell us your KCET rank, category, branch interests, college preferences, and location priorities. The more we know about you, the more personalised your option entry strategy will be.",
  },
  {
    number: "02",
    title: "Analyse Your Options",
    description:
      "We dig into previous-year seat matrix data alongside your rank and category to show you exactly what's realistic, what's a stretch, and what's a safe backup — no guesswork, just data.",
  },
  {
    number: "03",
    title: "Build Your Option Strategy",
    description:
      "We build your option-entry list together in a one-on-one session — priorities set by you, order optimised by us using seat matrix data. Reviewed, refined, and submitted before the deadline.",
  },
  {
    number: "04",
    title: "Continue Through Counselling",
    description:
      "We follow up and stay with you through every round of counselling — evaluating allotments, guiding upgrade decisions, until you've confirmed a seat you're happy with.",
  },
];

const comdekSteps = [
  {
    number: "01",
    title: "Share Your Details",
    description:
      "Tell us your COMEDK rank, branch interests, college preferences, and location priorities. The more context you share, the more tailored your choice filling strategy will be.",
  },
  {
    number: "02",
    title: "Analyse Your Options",
    description:
      "We review previous-year COMEDK seat data alongside your rank to show you exactly what's achievable, what's a stretch, and what makes a reliable backup — backed by numbers, not assumptions.",
  },
  {
    number: "03",
    title: "Build Your Choice Filling Strategy",
    description:
      "We build your COMEDK choice list together in a one-on-one session — your priorities, our data. Reviewed, refined, and locked in before the submission deadline.",
  },
  {
    number: "04",
    title: "Continue Through Counselling",
    description:
      "We follow up and stay with you through every COMEDK round — evaluating allotments, guiding upgrade decisions, until you've confirmed a seat you're satisfied with.",
  },
];

export default function HowItWorks() {
  const { exam } = useExam();
  const steps = exam === "COMEDK" ? comdekSteps : kcetSteps;

  return (
    <section
      id="how-it-works"
      className="py-20 md:py-28 bg-black text-[#f5f5f7] relative overflow-hidden border-t border-white/[0.08]"
      aria-label="How the counselling process works"
    >
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="mb-4">
            <CyberBadge color="emerald">Roadmap</CyberBadge>
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold text-[#f5f5f7] mb-4 tracking-tight">
            A Clear, Step-by-Step Process
          </h2>
          <p className="text-[#86868b] text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
            Every student gets one-on-one attention at each stage — from your
            first call to confirming your final seat.
          </p>
        </div>

        {/* Steps Grid with 3D Tilt Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, index) => (
            <Tilt3DCard key={step.number} maxTilt={6}>
              <div className="apple-card p-6 h-full flex flex-col justify-between group">
                <div>
                  {/* Step header */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#e2b474]">
                      {index === 0 && (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      )}
                      {index === 1 && (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      )}
                      {index === 2 && (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                      )}
                      {index === 3 && (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm font-mono font-medium text-[#86868b] select-none">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-[#f5f5f7] font-semibold text-lg mb-2.5 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-[#86868b] text-sm leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-white/[0.06] flex items-center justify-between text-xs text-[#86868b]">
                  <span>Step {index + 1} of 4</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                </div>
              </div>
            </Tilt3DCard>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-14">
          <a
            href="#contact"
            className="apple-btn-primary min-h-[50px] inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-base font-semibold cursor-pointer"
          >
            <span>Start Your Counselling Journey</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
