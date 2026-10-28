import { useExam } from "../context/ExamContext";
import Tilt3DCard from "./3d/Tilt3DCard";
import { CyberBadge } from "./3d/CyberHUDDecor";

const commonHonestPoints = [
  {
    icon: (
      <svg className="w-5 h-5 text-[#e2b474]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
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
      <svg className="w-5 h-5 text-[#70a9ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
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
      <svg className="w-5 h-5 text-[#34c759]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
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
      <svg className="w-5 h-5 text-[#d1d5db]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
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
      className="py-20 md:py-28 bg-black text-[#f5f5f7] relative overflow-hidden border-t border-white/[0.08]"
      aria-label="Our honest approach"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="mb-4">
            <CyberBadge color="gold">Principles</CyberBadge>
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold text-[#f5f5f7] mb-5 tracking-tight">
            No False Promises. Only Practical Guidance.
          </h2>
          <p className="text-[#86868b] text-base md:text-lg leading-relaxed font-normal">
            {meta.introPara}
          </p>
        </div>

        {/* Main honest statement in Apple Card */}
        <Tilt3DCard maxTilt={4} className="max-w-3xl mx-auto mb-14">
          <div className="apple-card p-7 sm:p-8">
            <p className="text-[#f5f5f7] text-base md:text-lg leading-relaxed font-medium">
              "{meta.mainStatement}"
            </p>
            <p className="text-[#86868b] text-sm mt-3 font-normal">
              {meta.mainNote}
            </p>
          </div>
        </Tilt3DCard>

        {/* 4 Points in Apple Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {commonHonestPoints.map((point) => (
            <Tilt3DCard key={point.heading} maxTilt={6}>
              <div className="apple-card p-6 h-full flex items-start gap-4 group">
                <span className="flex-shrink-0 w-11 h-11 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center mt-0.5 group-hover:scale-105 transition-transform">
                  {point.icon}
                </span>
                <div>
                  <h3 className="text-[#f5f5f7] font-semibold text-base mb-2 group-hover:text-white transition-colors tracking-tight">
                    {point.heading}
                  </h3>
                  <p className="text-[#86868b] text-sm leading-relaxed font-normal">
                    {exam === "COMEDK" ? point.comdekBody : point.kcetBody}
                  </p>
                </div>
              </div>
            </Tilt3DCard>
          ))}
        </div>

        {/* Bottom disclaimer */}
        <div className="mt-14 text-center">
          <div className="max-w-2xl mx-auto flex items-start gap-2.5 bg-white/[0.02] border border-white/[0.06] p-4 rounded-2xl text-left">
            <svg className="w-4 h-4 text-[#e2b474] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            <p className="text-xs text-[#86868b] leading-relaxed font-normal">
              {meta.disclaimer}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
