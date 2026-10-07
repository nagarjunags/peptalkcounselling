const confusionPoints = [
  "Which college gives the best outcome for my exact rank and category?",
  "Should I prioritise the college or the branch?",
  "How does previous-year seat matrix data tell me what's realistic?",
  "How many options should I fill — and in what order?",
  "What backup options are safe vs what's just wasting a slot?",
  "How do different counselling rounds work and when should I upgrade?",
  "What happens if I get an allotment I'm not happy with?",
];

export default function OptionEntry() {
  return (
    <section
      id="option-entry"
      className="py-20 md:py-28 bg-white dark:bg-gray-900"
      aria-label="Why option entry matters"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Left: text */}
          <div>
            <span className="inline-block text-brand-600 dark:text-brand-400 font-semibold text-sm uppercase tracking-widest mb-3">
              Option Entry Guidance
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-5">
              Why Option Entry Matters
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-5">
              Option entry is the single most important action you take during
              KCET counselling. The order you fill your choices directly
              determines which seat you get — and most students do it without
              proper data.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
              We use actual previous-year seat matrix data to build your list —
              so every choice is backed by numbers, not guesswork. One-on-one,
              so it's built around your priorities, not a template.
            </p>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-brand-700 hover:bg-brand-800 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
            >
              Get Option Entry Guidance
            </a>
          </div>

          {/* Right: confusion points */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-8">
            <h3 className="text-gray-800 dark:text-gray-100 font-semibold text-base mb-5">
              Common questions students face during option entry:
            </h3>
            <ul className="flex flex-col gap-3" role="list">
              {confusionPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-brand-100 dark:bg-brand-900/50 text-brand-700 dark:text-brand-400 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4" />
                    </svg>
                  </span>
                  <span className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>

            {/* Disclaimer note */}
            <div className="mt-6 pt-5 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
                <strong className="text-gray-500 dark:text-gray-400">Note:</strong> Option-entry
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
