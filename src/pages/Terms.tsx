import { siteConfig } from "../config/siteConfig";

export default function Terms() {
  return (
    <div className="min-h-screen bg-white">
      {/* Simple header */}
      <header className="bg-white border-b border-gray-100 py-4 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <a
            href="/"
            className="flex flex-col leading-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded"
            aria-label={`${siteConfig.brandName} — Home`}
          >
            <span className="text-brand-800 font-bold text-base leading-tight">
              {siteConfig.brandName}
            </span>
            <span className="text-brand-500 text-xs font-medium">
              {siteConfig.headerTagline}
            </span>
          </a>
          <a
            href="/"
            className="text-sm text-brand-600 hover:text-brand-800 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded"
          >
            ← Back to Home
          </a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12" id="main-content">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Terms of Service &amp; Disclaimer
        </h1>
        <p className="text-sm text-gray-400 mb-8">
          Last updated: October 2026
        </p>

        <div className="space-y-8 text-gray-600 leading-relaxed">
          {/* Important disclaimer box */}
          <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl px-6 py-5">
            <h2 className="text-amber-800 font-bold text-base mb-2">
              Important Disclaimer — Please Read
            </h2>
            <p className="text-amber-800 text-sm leading-relaxed">
              This service provides counselling guidance only. We do not
              guarantee admission to any specific college or branch. Final
              allotments are determined exclusively by the Karnataka
              Examinations Authority (KEA) based on rank, category, seat
              availability, cutoffs and other factors outside our control.
            </p>
          </div>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              1. Nature of Service
            </h2>
            <p className="mb-3">
              Physics Pep Talk provides KCET counselling guidance as an
              educational advisory service. The service includes rank analysis,
              college shortlisting based on previous-year trends, branch guidance,
              option-entry strategy and counselling-round support.
            </p>
            <p>
              All guidance is based on available information, including
              previous-year KCET data, and is intended to help students make
              more informed decisions during the counselling process.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              2. No Guarantee of Admission
            </h2>
            <p className="mb-3">
              We explicitly do not guarantee admission to any specific college or
              branch. KCET cutoffs, seat availability and counselling outcomes
              vary from year to year and are determined by KEA.
            </p>
            <p>
              Guidance provided is not a prediction of what allotment you will
              receive. It is an analysis to help you understand your realistic
              options and make informed decisions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              3. Accuracy of Information
            </h2>
            <p className="mb-3">
              Guidance is based on previous-year KCET data and available
              information at the time of counselling. Previous-year closing ranks
              are for reference only and do not predict current-year cutoffs.
            </p>
            <p>
              Seat matrices, fee structures, reservation categories and college
              details are subject to change by KEA or the respective colleges.
              Always verify information from official KEA sources.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              4. Paid Service
            </h2>
            <p>
              This is a paid counselling guidance service. Package details,
              pricing and terms of payment are communicated at the time of
              enquiry. Contact us for current details before making any payment.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              5. Client Responsibilities
            </h2>
            <p className="mb-3">
              Students and parents are responsible for verifying all information
              from official KEA and college sources before making decisions.
              Final decisions regarding college selection, option entry and
              allotment acceptance are the responsibility of the student and
              their family.
            </p>
            <p>
              Accurate information about rank, category, preferences and
              requirements must be provided for guidance to be relevant to your
              specific situation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              6. Limitation of Liability
            </h2>
            <p>
              Physics Pep Talk is not liable for any outcomes related to KCET
              counselling allotments, college admissions, seat availability or
              any decisions made based on guidance provided. The service provides
              analysis and advisory support only.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              7. Intellectual Property
            </h2>
            <p>
              All content on this Website, including text, design and code, is
              the property of Physics Pep Talk and may not be reproduced without
              permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              8. Changes to These Terms
            </h2>
            <p>
              These terms may be updated from time to time. The updated date at
              the top of this page reflects the most recent revision.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              9. Contact
            </h2>
            <p>
              For questions about these terms, please contact us via the{" "}
              <a href="/#contact" className="text-brand-600 hover:underline">
                contact section
              </a>{" "}
              on the homepage.
              {siteConfig.email && (
                <>
                  {" "}or email{" "}
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-brand-600 hover:underline"
                  >
                    {siteConfig.email}
                  </a>
                </>
              )}
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
