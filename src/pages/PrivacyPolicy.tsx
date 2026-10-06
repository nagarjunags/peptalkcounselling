import { siteConfig } from "../config/siteConfig";

export default function PrivacyPolicy() {
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-400 mb-8">
          Last updated: October 2026
        </p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Introduction</h2>
            <p>
              Physics Pep Talk ("{siteConfig.brandName}") operates the KCET 2027
              Counselling Guidance website at{" "}
              <a href={siteConfig.websiteUrl} className="text-brand-600 hover:underline">
                {siteConfig.websiteUrl}
              </a>{" "}
              (the "Website"). This Privacy Policy explains how we handle
              information when you use this Website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Information We Collect</h2>
            <p className="mb-3">
              This Website is a static website hosted on GitHub Pages. We do not
              operate any server-side data storage or backend databases.
            </p>
            <p className="mb-3">
              When you use the enquiry form on this Website, the form data (such
              as name, phone number, KCET rank, category, preferences and any
              message) is passed directly to WhatsApp via the WhatsApp click-to-chat
              service. We do not store form data on our servers.
            </p>
            <p>
              If you contact us via WhatsApp, phone or email, we may retain that
              communication for the purpose of responding to your enquiry and
              providing the requested counselling guidance service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Analytics</h2>
            <p>
              This Website may use Google Analytics 4 to understand how visitors
              use the Website. Google Analytics collects anonymized usage data
              such as pages visited and approximate geographic location. Google's
              privacy policy applies to data collected by Google Analytics. You
              can opt out using the{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-600 hover:underline"
              >
                Google Analytics opt-out browser add-on
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Third-Party Services</h2>
            <p>
              This Website uses Google Fonts (served from Google's servers),
              WhatsApp for the contact/enquiry flow, and GitHub Pages for
              hosting. Each of these services has its own privacy policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Cookies</h2>
            <p>
              This Website does not use first-party cookies for tracking or
              advertising. Google Analytics may set cookies to distinguish users
              and sessions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Children's Privacy</h2>
            <p>
              This service is intended for KCET students (typically aged 17 and
              above) and their parents. We do not knowingly collect personal
              information from children under 13.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. The updated
              date at the top of this page will reflect any changes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Contact</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact
              us via the contact section on the{" "}
              <a href="/#contact" className="text-brand-600 hover:underline">
                homepage
              </a>
              {siteConfig.email && (
                <>
                  {" "}or email us at{" "}
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-brand-600 hover:underline"
                  >
                    {siteConfig.email}
                  </a>
                </>
              )}
              .
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
