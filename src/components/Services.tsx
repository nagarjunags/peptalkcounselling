import { useExam } from "../context/ExamContext";
import Service3DObject from "./3d/Service3DObject";
import Tilt3DCard from "./3d/Tilt3DCard";
import { CyberBadge } from "./3d/CyberHUDDecor";

const kcetServices = [
  {
    type: "rank" as const,
    title: "Rank-Based College Guidance",
    description:
      "We analyse your KCET rank, category, and preferences against previous-year seat matrix data to identify the best realistic colleges and branches for your specific situation — not generic advice.",
  },
  {
    type: "branch" as const,
    title: "College & Branch Selection",
    description:
      "One-on-one sessions to help you pick the right college and the right course. We weigh your interests, career goals, location, and rank together — because the right fit is different for every student.",
  },
  {
    type: "option" as const,
    title: "Option Entry Guidance",
    description:
      "Our option entry strategy is built on actual previous-year seat matrix data — giving you a much higher chance of securing a better college. We set your priorities, build the list, and submit it with you.",
  },
  {
    type: "rounds" as const,
    title: "Counselling-Round Support",
    description:
      "We don't disappear after option entry. We follow up and guide you through every counselling round until you get a good seat — helping you evaluate allotments and decide your next step each time.",
  },
];

const comdekServices = [
  {
    type: "rank" as const,
    title: "Rank-Based College Guidance",
    description:
      "We analyse your COMEDK rank, category, and preferences against previous-year seat data to identify the best realistic colleges and branches for your specific situation — not generic advice.",
  },
  {
    type: "branch" as const,
    title: "College & Branch Selection",
    description:
      "One-on-one sessions to help you pick the right college and the right engineering branch for your COMEDK rank. We weigh your interests, career goals, location, and score together.",
  },
  {
    type: "option" as const,
    title: "Choice Filling Guidance",
    description:
      "Our choice filling strategy is built on actual previous-year COMEDK seat data — giving you a higher chance of securing a better college. We build and review your choice list together.",
  },
  {
    type: "rounds" as const,
    title: "Counselling-Round Support",
    description:
      "We stay with you through every COMEDK counselling round — evaluating allotments, advising on upgrades, and guiding you until you confirm a seat you're satisfied with.",
  },
];

export default function Services() {
  const { exam } = useExam();
  const services = exam === "COMEDK" ? comdekServices : kcetServices;

  const sectionHeading =
    exam === "COMEDK"
      ? "Guidance Across Every Stage of COMEDK Counselling"
      : "Guidance Across Every Stage of KCET Counselling";

  return (
    <section
      id="services"
      className="py-20 md:py-28 bg-[#030712] text-slate-100 relative overflow-hidden border-t border-sky-500/15"
      aria-label="Our services"
    >
      {/* Background Cosmic Glow */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-sky-500/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="mb-4">
            <CyberBadge color="cyan">Capabilities</CyberBadge>
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold text-white mb-4 tracking-tight">
            {sectionHeading}
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
            One-on-one support across every stage — from understanding your
            realistic options to securing the right seat.
          </p>
        </div>

        {/* 3D Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <Tilt3DCard key={service.title} maxTilt={6}>
              <article className="apple-card p-6 h-full flex flex-col justify-between group">
                <div>
                  {/* Top: 3D Animated Scientific Instrument */}
                  <div className="flex items-center justify-between mb-4">
                    <Service3DObject type={service.type} />
                    <span className="text-xs font-mono font-medium text-sky-300/80 px-2.5 py-0.5 rounded-full bg-sky-950/40 border border-sky-500/20">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-white font-semibold text-lg leading-snug mb-3 group-hover:text-sky-300 transition-colors tracking-tight">
                    {service.title}
                  </h3>

                  <p className="text-slate-400 text-sm leading-relaxed font-normal">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-sky-500/10 flex items-center justify-between text-xs text-slate-400">
                  <span className="font-medium group-hover:text-sky-300 transition-colors">Personalised Session</span>
                  <svg className="w-3.5 h-3.5 text-sky-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </article>
            </Tilt3DCard>
          ))}
        </div>

        {/* CTA nudge */}
        <p className="text-center text-sm text-slate-400 mt-12 font-normal">
          Contact us for current package details and pricing.{" "}
          <a
            href="#contact"
            className="text-sky-400 font-medium hover:underline transition-colors"
          >
            Get in touch →
          </a>
        </p>
      </div>
    </section>
  );
}
