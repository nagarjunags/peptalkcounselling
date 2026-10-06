const deliverables = [
  {
    title: "Rank Analysis",
    description:
      "A review of your KCET rank and category to understand realistic possibilities in the current year's counselling.",
  },
  {
    title: "College Shortlist",
    description:
      "A curated shortlist of colleges that are realistically within reach based on previous-year cutoff trends and your preferences.",
  },
  {
    title: "Branch Guidance",
    description:
      "Discussion of branch options available at shortlisted colleges, aligned with your career preferences and priorities.",
  },
  {
    title: "Previous-Year Trend Analysis",
    description:
      "Review of previous-year closing ranks to understand which colleges and branches are realistic for your rank and category.",
  },
  {
    title: "Option-Entry Strategy",
    description:
      "Help structuring your option-entry list to reflect your priorities, with guidance on balancing preferred choices and backup options.",
  },
  {
    title: "Option-List Review",
    description:
      "A review of your drafted option-entry list before you finalize and submit, to check for any gaps or ordering concerns.",
  },
  {
    title: "Counselling-Round Guidance",
    description:
      "Support during each applicable counselling round to help you understand allotments and evaluate your next steps.",
  },
  {
    title: "Allotment Decision Support",
    description:
      "Guidance on evaluating allotment results — whether to accept, upgrade in the next round, or consider other options.",
  },
];

export default function WhatYouGet() {
  return (
    <section
      id="what-you-get"
      className="py-20 md:py-28 bg-brand-950 dark:bg-gray-950 text-white"
      aria-label="What you get"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-14">
          <span className="inline-block text-accent-400 font-semibold text-sm uppercase tracking-widest mb-3">
            What You Get
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need to Navigate Counselling
          </h2>
          <p className="text-brand-300 text-lg max-w-2xl mx-auto">
            Structured support from initial rank analysis to final allotment
            decisions.
          </p>
        </div>

        {/* Deliverables grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {deliverables.map((item) => (
            <div
              key={item.title}
              className="bg-brand-800/50 border border-brand-700/60 rounded-2xl p-6 flex flex-col gap-3"
            >
              <div className="flex items-center gap-2">
                <span
                  className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-500 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <h3 className="text-white font-semibold text-sm">
                  {item.title}
                </h3>
              </div>
              <p className="text-brand-300 text-xs leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Pricing disclaimer */}
        <div className="text-center">
          <div className="inline-block bg-brand-800/60 border border-brand-600/40 rounded-2xl px-8 py-5">
            <p className="text-brand-200 text-sm mb-3">
              Package details and pricing are available on request.
              <br />
              Services included may vary by package.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400"
            >
              Contact us for package details and pricing
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
