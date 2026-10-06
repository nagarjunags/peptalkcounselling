const honestPoints = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    heading: "We don't promise a specific college.",
    body: "No counsellor can honestly guarantee admission to a particular college or branch before counselling is complete. Final allotments depend on rank, category, seat availability, cutoffs and KEA rules.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    heading: "We provide analysis, not predictions.",
    body: "KCET cutoffs, seat availability and counselling outcomes change every year. We help you understand trends and possibilities — not predict the future.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    heading: "Parents are welcome.",
    body: "We understand that KCET counselling is a family decision. Parents are welcome to participate in all counselling discussions.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    heading: "Transparent about limitations.",
    body: "We will always be clear about what our guidance can and cannot tell you, and what remains uncertain until counselling concludes.",
  },
];

export default function TrustSection() {
  return (
    <section
      id="our-approach"
      className="py-20 md:py-28 bg-white"
      aria-label="Our honest approach"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <span className="inline-block text-brand-600 font-semibold text-sm uppercase tracking-widest mb-3">
            Our Approach
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5">
            No False Promises. Only Practical Guidance.
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            KCET cutoffs, seat availability and counselling outcomes can change
            every year. No counsellor can honestly guarantee a particular
            college or branch before counselling is completed.
          </p>
        </div>

        {/* Main honest statement */}
        <div className="bg-brand-50 border-l-4 border-brand-600 rounded-r-2xl px-8 py-6 max-w-3xl mx-auto mb-14">
          <p className="text-brand-800 text-base md:text-lg leading-relaxed font-medium">
            Our role is to help you understand your realistic choices, build a
            sensible counselling strategy and make informed decisions based on
            the information available.
          </p>
          <p className="text-brand-600 text-sm mt-3">
            Our goal is to help you identify and pursue the best realistic option
            available for your rank, category, preferences and counselling
            conditions.
          </p>
        </div>

        {/* Points */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {honestPoints.map((point) => (
            <div
              key={point.heading}
              className="flex gap-4 bg-gray-50 rounded-2xl border border-gray-100 p-6"
            >
              <span className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center mt-0.5">
                {point.icon}
              </span>
              <div>
                <h3 className="text-gray-900 font-semibold text-sm mb-1.5">
                  {point.heading}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {point.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom KEA disclaimer */}
        <div className="mt-12 text-center">
          <p className="text-xs text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Final allotments are determined by the Karnataka Examinations
            Authority (KEA) based on rank, category, seat availability,
            cutoffs and other factors. This counselling service does not
            control or influence KEA allotments.
          </p>
        </div>
      </div>
    </section>
  );
}
