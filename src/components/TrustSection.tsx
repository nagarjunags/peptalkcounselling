import { useExam } from "../context/ExamContext";
import Tilt3DCard from "./3d/Tilt3DCard";

const commonHonestPoints = [
  {
    index: "01",
    heading: "We do not promise or guarantee specific colleges.",
    kcetBody:
      "Official seat allotment is determined solely by KEA based on rank, category, seat availability, and cutoffs. No counsellor can legitimately guarantee a particular college or branch — and we refuse to make false claims.",
    comdekBody:
      "Official seat allotment is determined solely by COMEDK authority based on rank, seat matrix, and cutoffs. No counsellor can legitimately guarantee a particular college or branch — and we refuse to make false claims.",
  },
  {
    index: "02",
    heading: "Every recommendation is backed by real cutoff data.",
    kcetBody:
      "Our option entry strategy is built on verified previous-year seat matrix cutoffs — ordering your preferences for the best realistic outcome for your rank, rather than relying on internet rumors.",
    comdekBody:
      "Our choice filling strategy is built on verified previous-year COMEDK seat data — ordering your preferences for the best realistic outcome for your rank, rather than relying on internet rumors.",
  },
  {
    index: "03",
    heading: "Parents are actively encouraged to join all sessions.",
    kcetBody:
      "KCET counselling is a major family milestone with serious financial and academic consequences. Parents are encouraged to participate directly in every strategy call and review session.",
    comdekBody:
      "COMEDK counselling is a major family milestone with significant tuition and career implications. Parents are encouraged to participate directly in every strategy call and review session.",
  },
  {
    index: "04",
    heading: "No refunds once enrolled — committed students only.",
    kcetBody:
      "This is an intensive, limited-seat, 1-on-1 advisory service requiring significant mentor time and preparation. We take on only students and families who are serious about maximizing their rank.",
    comdekBody:
      "This is an intensive, limited-seat, 1-on-1 advisory service requiring significant mentor time and preparation. We take on only students and families who are serious about maximizing their rank.",
  },
];

const examMeta = {
  KCET: {
    introPara:
      "KCET cutoffs, category reservations, and seat vacancies fluctuate annually. No ethical counsellor can guarantee an outcome before the official rounds conclude.",
    mainStatement:
      "Our job is to help you secure the highest realistic institution for your exact rank — through direct 1-on-1 screen sharing, verified historical data, and relentless multi-round follow-up.",
    mainNote:
      "We guide students to make the smartest decisions possible within KEA's official rules. Zero shortcuts, zero false claims — just transparent, data-backed execution.",
    disclaimer:
      "Final seat allotments are determined solely by the Karnataka Examinations Authority (KEA). Physics Pep Talk is an independent educational mentorship platform and does not influence or control KEA allocations.",
  },
  COMEDK: {
    introPara:
      "COMEDK cutoffs, campus seats, and round dynamics vary each year. No ethical counsellor can guarantee an outcome before the official rounds conclude.",
    mainStatement:
      "Our job is to help you secure the highest realistic institution for your exact rank — through direct 1-on-1 screen sharing, verified historical data, and relentless multi-round follow-up.",
    mainNote:
      "We guide students to make the smartest decisions possible within COMEDK's official framework. Zero shortcuts, zero false claims — just transparent, data-backed execution.",
    disclaimer:
      "Final seat allotments are determined solely by the COMEDK authority. Physics Pep Talk is an independent educational mentorship platform and does not influence or control COMEDK allocations.",
  },
} as const;

export default function TrustSection() {
  const { exam } = useExam();
  const meta = examMeta[exam];

  return (
    <section
      id="our-approach"
      className="py-20 md:py-28 bg-[#030712] text-slate-100 relative overflow-hidden border-t border-sky-500/15"
      aria-label="Our honest and transparent approach"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Institutional Philosophy (5 cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-sky-500/20 backdrop-blur-md mb-3 self-start">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              <span className="text-[11px] font-mono tracking-wider text-sky-200/90 font-medium uppercase">
                Ethical Advisory Charter
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight leading-[1.15] mb-5">
              No False Promises. Just Data, Truth &amp; Follow-through.
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
              {meta.introPara}
            </p>

            {/* Pull Quote Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#060c1d]/90 border border-sky-500/20 mb-6">
              <p className="text-white text-sm sm:text-base leading-relaxed font-medium mb-3">
                "{meta.mainStatement}"
              </p>
              <p className="text-slate-400 text-xs leading-relaxed font-mono">
                {meta.mainNote}
              </p>
            </div>

            <div className="text-xs text-slate-500 font-mono leading-relaxed border-t border-sky-500/10 pt-4">
              {meta.disclaimer}
            </div>
          </div>

          {/* Right Column: 4 Foundation Pillars (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {commonHonestPoints.map((point) => (
              <Tilt3DCard key={point.heading} maxTilt={3}>
                <div className="apple-card p-5 sm:p-6 border-sky-500/15 bg-[#060c1c]/75 flex items-start gap-4 group">
                  <span className="text-xs font-mono font-bold text-sky-400 px-2.5 py-1 rounded bg-sky-950/60 border border-sky-500/20 flex-shrink-0 mt-0.5">
                    {point.index}
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2 tracking-tight group-hover:text-sky-300 transition-colors">
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
