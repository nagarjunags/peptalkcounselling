import { useExam } from "../context/ExamContext";
import Tilt3DCard from "./3d/Tilt3DCard";

const kcetSteps = [
  {
    step: "01",
    phase: "Intake",
    title: "Rank & Priority Telemetry",
    description:
      "Share your KCET rank, reservation category, preferred engineering streams, campus locations, and family priorities through our secure onboarding form.",
    deliverable: "Custom Candidate Profile",
  },
  {
    step: "02",
    phase: "Modeling",
    title: "Cutoff Matrix Analytics",
    description:
      "We compare your exact rank and category against multi-year KEA seat matrix cutoffs to identify mathematically realistic targets, ambitious reaches, and guaranteed safety nets.",
    deliverable: "Institutional Feasibility Map",
  },
  {
    step: "03",
    phase: "Formulation",
    title: "Live 1-on-1 Option Strategy",
    description:
      "In a dedicated 1-on-1 screen-share session, we construct your option-entry sequence line by line, ensuring proper priority laddering before you submit on the KEA portal.",
    deliverable: "Optimised Option Entry List",
  },
  {
    step: "04",
    phase: "Execution",
    title: "Round-by-Round Navigation",
    description:
      "We evaluate your Round 1, Round 2, and Extended round allotments, advising on whether to freeze or upgrade so you retain your best seat while moving upward.",
    deliverable: "Final Seat Confirmation",
  },
];

const comdekSteps = [
  {
    step: "01",
    phase: "Intake",
    title: "Rank & Preference Intake",
    description:
      "Submit your COMEDK rank, branch interests, target Bangalore institutions, and budget preferences to establish your personalized counselling blueprint.",
    deliverable: "Candidate Objective Brief",
  },
  {
    step: "02",
    phase: "Modeling",
    title: "Historical Closing Data Review",
    description:
      "We review previous-year COMEDK round-wise closing ranks to map out achievable colleges, reach institutions, and safe backups with statistical rigor.",
    deliverable: "College Cutoff Matrix",
  },
  {
    step: "03",
    phase: "Formulation",
    title: "Live 1-on-1 Choice Filling",
    description:
      "Together in a 1-on-1 session, we assemble your COMEDK choice-filling matrix, eliminating sequence risks and locking it before the submission deadline.",
    deliverable: "Calibrated Choice List",
  },
  {
    step: "04",
    phase: "Execution",
    title: "Multi-Round Upgrade Guidance",
    description:
      "We analyze every COMEDK allotment round with you — guiding Accept & Upgrade vs. Freeze choices to ensure maximum seat optimization.",
    deliverable: "Final Admission Secured",
  },
];

export default function HowItWorks() {
  const { exam } = useExam();
  const steps = exam === "COMEDK" ? comdekSteps : kcetSteps;

  return (
    <section
      id="how-it-works"
      className="py-20 md:py-28 bg-[#030712] text-slate-100 relative overflow-hidden border-t border-sky-500/15"
      aria-label="How the counselling process works"
    >
      {/* Background Subtle Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-sky-500/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-sky-500/20 backdrop-blur-md mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            <span className="text-[11px] font-mono tracking-wider text-sky-200/90 font-medium uppercase">
              Operational Protocol
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-[1.15] mb-4">
            A Clear, Four-Stage Advisory Protocol
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
            No chaotic group chats or generic PDFs. Every student works directly with an experienced mentor through four disciplined milestones.
          </p>
        </div>

        {/* 4-Stage Connected Workflow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step) => (
            <Tilt3DCard key={step.step} maxTilt={4}>
              <div className="apple-card p-6 h-full flex flex-col justify-between border-sky-500/15 bg-[#060c1d]/75 group">
                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-sky-500/10">
                    <span className="text-xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-200">
                      {step.step}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 px-2 py-0.5 rounded bg-slate-900 border border-sky-500/15">
                      {step.phase}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-semibold text-white mb-2.5 tracking-tight group-hover:text-sky-300 transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                    {step.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-sky-500/10">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">Deliverable</span>
                  <span className="text-xs font-mono text-sky-300 font-medium">{step.deliverable}</span>
                </div>
              </div>
            </Tilt3DCard>
          ))}
        </div>
      </div>
    </section>
  );
}
