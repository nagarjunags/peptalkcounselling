const confusionPoints = [
  "College vs branch — which should you prioritise?",
  "How do previous-year cutoffs inform realistic expectations?",
  "How should you balance preferred colleges and preferred branches?",
  "How many options should you include and in what order?",
  "What backup options make sense for your rank?",
  "How do different counselling rounds work?",
  "When should you consider upgrading after Round 1?",
];

export default function OptionEntry() {
  return (
    <section
      id="option-entry"
      className="py-20 md:py-28 bg-white"
      aria-label="Why option entry matters"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Left: text */}
          <div>
            <span className="inline-block text-brand-600 font-semibold text-sm uppercase tracking-widest mb-3">
              Option Entry Guidance
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5">
              Why Option Entry Matters
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-5">
              KCET counselling involves many decisions. Your rank is important,
              but knowing how to evaluate and prioritize your available options
              is equally important.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Students often find themselves confused about how to approach
              option entry — it involves weighing multiple factors
              simultaneously. Getting clarity on these decisions can help you
              approach the process with more confidence.
            </p>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-brand-700 hover:bg-brand-800 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
            >
              Get Option Entry Guidance
            </a>
          </div>

          {/* Right: confusion points */}
          <div className="bg-gray-50 rounded-2xl border border-gray-100 p-8">
            <h3 className="text-gray-800 font-semibold text-base mb-5">
              Common questions students face during option entry:
            </h3>
            <ul className="flex flex-col gap-3" role="list">
              {confusionPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4" />
                    </svg>
                  </span>
                  <span className="text-gray-600 text-sm leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>

            {/* Disclaimer note */}
            <div className="mt-6 pt-5 border-t border-gray-200">
              <p className="text-xs text-gray-400 leading-relaxed">
                <strong className="text-gray-500">Note:</strong> Option-entry
                order does not guarantee a better allotment. Final allotments
                are determined by KEA based on rank, category, seat
                availability and preferences submitted.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
