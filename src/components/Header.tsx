import { useState, useEffect } from "react";
import { siteConfig, buildWhatsAppUrl } from "../config/siteConfig";
import peptalkLogo from "../assets/peptalklogo.png";
import { useSheetConfig } from "../context/SheetConfigContext";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { testimonials, loading } = useSheetConfig();

  // Hide the Testimonials nav link until we know there are videos
  const hasTestimonials = !loading && testimonials.length > 0;
  const navLinks = siteConfig.navLinks.filter(
    (link) => link.href !== "#testimonials" || hasTestimonials
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-sm"
      }`}
      role="banner"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Brand */}
          <a
            href="#home"
            className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded"
            aria-label={`${siteConfig.brandName} — Home`}
          >
            <img 
              src={peptalkLogo} 
              alt="Physics Pep Talk Logo"
              className="h-10 w-10 md:h-12 md:w-12"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-brand-800 font-bold text-lg leading-tight">
                {siteConfig.brandName}
              </span>
              <span className="text-brand-500 text-xs font-medium tracking-wide">
                {siteConfig.headerTagline}
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-6"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-brand-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-700 hover:bg-brand-800 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
            >
              Get Counselling
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-brand-700 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-white border-t border-gray-100 shadow-lg"
        >
          <nav
            className="flex flex-col px-4 py-3 gap-1"
            aria-label="Mobile navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                className="py-2.5 px-3 text-sm font-medium text-gray-700 hover:text-brand-700 hover:bg-brand-50 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 pb-1">
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleNavClick}
                className="flex items-center justify-center gap-2 bg-brand-700 hover:bg-brand-800 text-white text-sm font-semibold px-4 py-3 rounded-lg transition-colors w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
              >
                Get Counselling Guidance
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
