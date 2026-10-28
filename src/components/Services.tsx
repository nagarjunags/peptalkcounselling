import { useExam } from "../context/ExamContext";
import Service3DObject from "./3d/Service3DObject";
import Tilt3DCard from "./3d/Tilt3DCard";

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
      className="py-20 md:py-28 bg-[#020617] text-slate-100 relative overflow-hidden border-t border-slate-800"
      aria-label="Our services"
    >
      {/* Background Subtle Radial Lighting */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-amber-500/[0.015] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-14">
          <span className="inline-block text-amber-300 font-semibold text-sm uppercase tracking-widest mb-3">
            What We Offer
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {sectionHeading}
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            One-on-one support across every stage — from understanding your
            realistic options to securing the right seat.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Tilt3DCard key={service.title} maxTilt={3}>
              <article className="apple-card p-7 border-slate-800 bg-[#050b18]/85 h-full flex flex-col justify-between group">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700/60 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                    <Service3DObject type={service.type} />
                  </div>
                  <h3 className="text-white font-semibold text-base leading-snug mb-3 group-hover:text-amber-200 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </article>
            </Tilt3DCard>
          ))}
        </div>

        {/* CTA nudge */}
        <p className="text-center text-sm text-slate-400 mt-10">
          Contact us for current package details and pricing.{" "}
          <a href="#contact" className="text-amber-300 font-medium hover:underline">
            Get in touch &rarr;
          </a>
        </p>
      </div>
    </section>
  );
}
