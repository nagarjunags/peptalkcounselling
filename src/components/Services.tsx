import { useExam } from "../context/ExamContext";
import Service3DObject from "./3d/Service3DObject";
import Tilt3DCard from "./3d/Tilt3DCard";

const kcetServices = [
  {
    type: "option" as const,
    index: "01",
    tag: "Core Strategic Pillar",
    title: "Option Entry Guidance & Architecture",
    description:
      "Option entry is the single most important action in KCET counselling. We build your entire option list together in a 1-on-1 session using verified previous-year seat matrix cutoff data — ordering every choice to maximize your admission probability and eliminate premature lock-in traps.",
    highlights: ["Seat matrix cutoff modeling", "Multi-round upgrade elasticity", "1-on-1 list review before submission"],
  },
  {
    type: "rank" as const,
    index: "02",
    tag: "Analysis",
    title: "Rank-Based College Feasibility",
    description:
      "We analyse your KCET rank, category, and reservation matrix against historical seat distributions to establish realistic dream, target, and safety benchmarks — grounded in data, not guesswork.",
    highlights: ["Category quota calculation", "Realistic cutoff bands"],
  },
  {
    type: "branch" as const,
    index: "03",
    tag: "Alignment",
    title: "College vs. Branch Decision Matrix",
    description:
      "Personalised sessions to evaluate trade-offs between top-tier institutions and preferred branches. We align your long-term career goals, campus placement track records, and rank.",
    highlights: ["Curriculum & placement review", "Brand vs. Branch trade-offs"],
  },
  {
    type: "rounds" as const,
    index: "04",
    tag: "Lifecycle",
    title: "Continuous Multi-Round Support",
    description:
      "We stay with you through Round 1, Round 2, and Extended rounds — evaluating every allotment, advising on upgrade choices, and guiding reporting until your final seat is confirmed.",
    highlights: ["Allotment outcome evaluation", "Upgrade vs. freeze decision"],
  },
];

const comdekServices = [
  {
    type: "option" as const,
    index: "01",
    tag: "Core Strategic Pillar",
    title: "Choice Filling Guidance & Architecture",
    description:
      "Choice filling determines your entire COMEDK allotment. We formulate your choice matrix together in a 1-on-1 session using previous-year COMEDK closing ranks — sequencing every college and engineering branch to protect your rank and secure the best institution possible.",
    highlights: ["Historical closing rank data", "Strategic preference laddering", "1-on-1 review before lock-in"],
  },
  {
    type: "rank" as const,
    index: "02",
    tag: "Analysis",
    title: "Rank-Based College Feasibility",
    description:
      "We evaluate your COMEDK rank against seat availability trends to pinpoint achievable colleges, ambitious reaches, and guaranteed backup institutions with high precision.",
    highlights: ["Historical rank distribution", "Realistic college shortlist"],
  },
  {
    type: "branch" as const,
    index: "03",
    tag: "Alignment",
    title: "College & Engineering Branch Selection",
    description:
      "One-on-one sessions to help you navigate between premier Bangalore colleges and emerging specialized branches, weighing academic curriculum, placement averages, and personal strengths.",
    highlights: ["Placement & industry relevance", "College tier vs. specialization"],
  },
  {
    type: "rounds" as const,
    index: "04",
    tag: "Lifecycle",
    title: "Round-by-Round Counselling Support",
    description:
      "Comprehensive guidance through every COMEDK round — advising on Accept & Freeze, Accept & Upgrade, or Reject & Upgrade strategies until your optimal seat is secured.",
    highlights: ["Round allotment assessment", "Upgrade strategy optimization"],
  },
];

export default function Services() {
  const { exam } = useExam();
  const services = exam === "COMEDK" ? comdekServices : kcetServices;
  const primaryService = services[0];
  const supportingServices = services.slice(1);

  const sectionHeading =
    exam === "COMEDK"
      ? "Comprehensive Support Across Every Stage of COMEDK"
      : "Comprehensive Support Across Every Stage of KCET";

  return (
    <section
      id="services"
      className="py-20 md:py-28 bg-[#030712] text-slate-100 relative overflow-hidden border-t border-sky-500/15"
      aria-label="Our services and capabilities"
    >
      {/* Background Subtle Radial Lighting */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-sky-500/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-sky-500/20 backdrop-blur-md mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            <span className="text-[11px] font-mono tracking-wider text-sky-200/90 font-medium uppercase">
              Capabilities &amp; Advisory Scope
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-[1.15] mb-4">
            {sectionHeading}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
            Personalised, data-driven counselling that replaces guesswork with verified seat matrix numbers — supporting you from initial rank analysis to final campus admission.
          </p>
        </div>

        {/* Asymmetrical Editorial Layout: 7-col Flagship Anchor + 5-col Supporting Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Featured Primary Service: 7 Columns */}
          <div className="lg:col-span-7 flex flex-col">
            <Tilt3DCard className="h-full" maxTilt={4}>
              <article className="apple-card p-6 sm:p-8 h-full flex flex-col justify-between border-sky-500/25 bg-[#060c1d]/80 relative overflow-hidden group">
                {/* Subtle top specular hairline */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-sky-400/30 to-transparent" />

                <div>
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-sky-500/15">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-bold text-slate-950 px-2.5 py-1 rounded bg-gradient-to-r from-sky-400 to-sky-300">
                        {primaryService.index}
                      </span>
                      <span className="text-xs font-mono uppercase tracking-wider text-sky-300/90">
                        {primaryService.tag}
                      </span>
                    </div>
                    <div className="w-12 h-12 flex items-center justify-center">
                      <Service3DObject type={primaryService.type} />
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 tracking-tight group-hover:text-sky-200 transition-colors">
                    {primaryService.title}
                  </h3>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                    {primaryService.description}
                  </p>

                  {/* Highlights Checklist */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4 border-t border-sky-500/10">
                    {primaryService.highlights.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                        <svg className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-sky-500/15 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">1-on-1 Screen Share &amp; Live Formulation</span>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-300 hover:text-white transition-colors group-hover:translate-x-0.5"
                  >
                    <span>Enrol in Guidance</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </article>
            </Tilt3DCard>
          </div>

          {/* Supporting Services Stack: 5 Columns */}
          <div className="lg:col-span-5 flex flex-col gap-4 justify-between">
            {supportingServices.map((service) => (
              <Tilt3DCard key={service.title} maxTilt={4}>
                <article className="apple-card p-5 sm:p-6 flex flex-col justify-between h-full border-sky-500/15 hover:border-sky-500/30 transition-all group">
                  <div>
                    <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-sky-500/10">
                      <div className="flex items-center gap-2.5">
                        <span className="text-[11px] font-mono text-sky-400 font-semibold px-2 py-0.5 rounded bg-sky-950/60 border border-sky-500/20">
                          {service.index}
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                          {service.tag}
                        </span>
                      </div>
                      <div className="w-9 h-9 flex items-center justify-center">
                        <Service3DObject type={service.type} />
                      </div>
                    </div>

                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2 tracking-tight group-hover:text-sky-300 transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-normal">
                      {service.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-sky-500/10 flex items-center justify-between text-xs text-slate-400">
                    <span className="text-[11px] font-mono text-sky-400/80">Direct Mentor Session</span>
                    <svg className="w-3.5 h-3.5 text-sky-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </article>
              </Tilt3DCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
