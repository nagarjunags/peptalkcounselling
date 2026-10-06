import { siteConfig, buildWhatsAppUrl, buildPhoneUrl } from "../config/siteConfig";
import peptalkLogo from "../assets/peptalklogo.png";
import { useSheetConfig } from "../context/SheetConfigContext";

const currentYear = new Date().getFullYear();

export default function Footer() {
  const { year } = useSheetConfig();
  return (
    <footer
      className="bg-gray-950 text-gray-400"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand column */}
          <div>
            <a
              href="#home"
              className="inline-flex items-center gap-3 mb-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 rounded"
              aria-label={`${siteConfig.brandName} — Back to top`}
            >
              <img 
                src={peptalkLogo} 
                alt="Physics Pep Talk Logo"
                className="h-10 w-10"
              />
              <div className="flex flex-col">
                <span className="text-white font-bold text-lg leading-tight">
                  {siteConfig.brandName}
                </span>
                <span className="text-brand-400 text-xs font-medium tracking-wide mt-0.5">
                  {siteConfig.headerTagline}
                </span>
              </div>
            </a>
            <p className="text-sm leading-relaxed text-gray-500 mb-5">
              Personalized KCET {year} counselling guidance for college
              selection, branch selection and option entry.
            </p>
            <div className="flex gap-3">
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-green-700 flex items-center justify-center text-gray-400 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
                aria-label="WhatsApp"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              {buildPhoneUrl() !== "#" && (
                <a
                  href={buildPhoneUrl()}
                  className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-brand-700 flex items-center justify-center text-gray-400 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
                  aria-label="Phone"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Navigation column */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wide">
              Navigation
            </h3>
            <nav aria-label="Footer navigation">
              <ul className="flex flex-col gap-2.5" role="list">
                {siteConfig.navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 rounded"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Legal & links column */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wide">
              Legal & Links
            </h3>
            <ul className="flex flex-col gap-2.5" role="list">
              <li>
                <a
                  href="/privacy-policy"
                  className="text-sm text-gray-500 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 rounded"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="text-sm text-gray-500 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 rounded"
                >
                  Terms &amp; Disclaimer
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.parentWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 rounded inline-flex items-center gap-1"
                >
                  Physics Pep Talk (Main Site)
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
              {siteConfig.email && (
                <li>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-sm text-gray-500 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 rounded"
                  >
                    {siteConfig.email}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            © {currentYear} {siteConfig.brandName}. All rights reserved.
          </p>
          <p className="text-xs text-gray-700 text-center md:text-right leading-relaxed max-w-sm">
            This service provides counselling guidance only. Final allotments
            are determined by KEA. No specific college or branch is guaranteed.
          </p>
        </div>
      </div>
    </footer>
  );
}
