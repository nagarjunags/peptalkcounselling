import { useExam } from "../context/ExamContext";
import Tilt3DCard from "./3d/Tilt3DCard";

const commonHonestPoints = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    heading: "We don't promise a specific college.",
    kcetBody:
      "Seat allotment is solely done by KEA based on rank, category, seat availability, and cutoffs. No counsellor can honestly guarantee a particular college or branch — and we won't pretend otherwise.",
    comdekBody:
      "Seat allotment is determined by COMEDK authority based on rank, seat availability, and cutoffs. No counsellor can honestly guarantee a specific college or branch — and we won't pretend otherwise.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    heading: "We use data, not guesswork.",
    kcetBody:
      "Our option entry strategy is built on previous-year seat matrix data — so your list is optimised for the best realistic outcome for your rank, not based on generic advice.",
    comdekBody:
      "Our choice filling strategy is built on previous-year COMEDK seat data — so your list is optimised for the best realistic outcome for your rank, not based on generic advice.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    heading: "Parents are welcome.",
    kcetBody:
      "KCET counselling is a family decision. Parents are welcome — and encouraged — to participate in every session. The more involved, the better the outcome.",
    comdekBody:
      "COMEDK counselling is a family decision. Parents are welcome — and encouraged — to participate in every session. The more involved, the better the outcome.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    heading: "No refunds — so enrol only when you're ready.",
    kcetBody:
      "This is a limited-seat, high-effort, one-on-one service. Once enrolled, no refunds are provided. We want committed students who are serious about making the most of their KCET rank.",
    comdekBody:
      "This is a limited-seat, high-effort, one-on-one service. Once enrolled, no refunds are provided. We want committed students who are serious about making the most of their COMEDK rank.",
  },
];

const examMeta = {
  KCET: {
    introPara:
      "KCET cutoffs, seat availability and counselling outcomes can change every year. No counsellor can honestly guarantee a particular college or branch before counselling is completed.",
    mainStatement:
      "Our job is to help you identify the best realistic college and course for your rank — through one-on-one sessions, real seat matrix data, and follow-up through every round until you're seated.",
    mainNote:
      "We guide students to make the smartest possible choice within what KEA's process allows. No shortcuts, no false claims — just honest, data-backed support.",
    disclaimer:
      "Final allotments are determined by the Karnataka Examinations Authority (KEA) based on rank, category, seat availability, cutoffs and other factors. This counselling service does not control or influence KEA allotments.",
  },
  COMEDK: {
    introPara:
      "COMEDK cutoffs, seat availability and counselling outcomes can change every year. No counsellor can honestly guarantee a particular college or branch before counselling is completed.",
    mainStatement:
      "Our job is to help you identify the best realistic college and course for your COMEDK rank — through one-on-one sessions, real seat data, and follow-up through every counselling round until you're seated.",
    mainNote:
      "We guide students to make the smartest possible choice within what COMEDK's process allows. No shortcuts, no false claims — just honest, data-backed support.",
    disclaimer:
      "Final allotments are determined by COMEDK authority based on rank, seat availability, cutoffs and other factors. This counselling service does not control or influence COMEDK allotments.",
  },
} as const;

export default function TrustSection() {
  const { exam } = useExam();
  const meta = examMeta[exam];

  return (
    <section
      id="our-approach"
      className="py-20 md:py-28 bg-[#020617] text-slate-100 relative overflow-hidden border-t border-slate-800/80"
      aria-label="Our honest approach"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Approach Overview */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700/60 backdrop-blur-md mb-3 self-start">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span className="text-[11px] font-mono tracking-wider text-amber-200/90 font-medium uppercase">
                Our Approach
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight leading-[1.18] mb-5">
              No False Promises. Only Practical Guidance.
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
              {meta.introPara}
            </p>

            {/* Main honest statement card */}
            <div className="p-6 rounded-2xl bg-[#050b18]/90 border-l-4 border-amber-400 border-r border-t border-b border-slate-800 mb-6 shadow-lg shadow-black/40">
              <p className="text-amber-100 text-sm sm:text-base leading-relaxed font-medium mb-3">
                {meta.mainStatement}
              </p>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                {meta.mainNote}
              </p>
            </div>

            <div className="text-xs text-slate-500 font-normal leading-relaxed border-t border-slate-800/80 pt-4">
              {meta.disclaimer}
            </div>
          </div>

          {/* Right Column: 4 Points */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {commonHonestPoints.map((point) => (
              <Tilt3DCard key={point.heading} maxTilt={3}>
                <div className="apple-card p-5 sm:p-6 border-slate-800 bg-[#050b18]/85 flex items-start gap-4 group">
                  <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-slate-900 border border-slate-700/80 text-amber-300 flex items-center justify-center mt-0.5 group-hover:scale-105 group-hover:border-amber-400/50 transition-all">
                    {point.icon}
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2 tracking-tight group-hover:text-amber-200 transition-colors">
                      {point.heading}
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-normal">
                      {exam === "COMEDK" ? point.comdekBody : point.kcetBody}
                    </p>
                  </div>
                </div>
              </Tilt3DCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
