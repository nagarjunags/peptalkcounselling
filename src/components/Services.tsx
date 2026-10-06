const services = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Rank-Based College Guidance",
    description:
      "Analyze your rank, category, preferences and previous-year trends to identify realistic college and branch possibilities tailored to your specific situation.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    title: "College & Branch Selection",
    description:
      "Compare college and branch priorities based on your individual preferences, career goals, location and the realistic options available for your rank and category.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    title: "Option Entry Guidance",
    description:
      "Build, organize and review your KCET option-entry strategy. Understand how to prioritize your choices and what factors to consider when ordering your preferences.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Counselling-Round Support",
    description:
      "Receive guidance as the counselling process progresses through the applicable rounds included in your purchased service, helping you evaluate allotments and decide next steps.",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="py-20 md:py-28 bg-white"
      aria-label="Our services"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-14">
          <span className="inline-block text-brand-600 font-semibold text-sm uppercase tracking-widest mb-3">
            What We Offer
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Guidance Across Every Stage of KCET Counselling
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            From understanding your realistic options to navigating the final
            allotment, we provide structured, practical support.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <article
              key={service.title}
              className="group bg-white border border-gray-100 rounded-2xl p-7 shadow-card hover:shadow-md hover:border-brand-200 transition-all duration-300 flex flex-col gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center group-hover:bg-brand-100 transition-colors">
                {service.icon}
              </div>
              <h3 className="text-gray-900 font-semibold text-base leading-snug">
                {service.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {service.description}
              </p>
            </article>
          ))}
        </div>

        {/* CTA nudge */}
        <p className="text-center text-sm text-gray-400 mt-10">
          Contact us for current package details and pricing.{" "}
          <a href="#contact" className="text-brand-600 font-medium hover:underline">
            Get in touch →
          </a>
        </p>
      </div>
    </section>
  );
}
