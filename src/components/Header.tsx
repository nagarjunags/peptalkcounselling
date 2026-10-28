import { useState, useEffect } from "react";
import { siteConfig, buildWhatsAppUrl } from "../config/siteConfig";
import peptalkLogo from "../assets/peptalklogo.png";
import { useSheetConfig } from "../context/SheetConfigContext";
import { useExam } from "../context/ExamContext";

const nextYear = new Date().getFullYear() + 1;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { testimonials, loading, counsellingBatchUrl, headerTagline, comdekTagline } = useSheetConfig();
  const { exam } = useExam();

  const displayTagline =
    exam === "COMEDK"
      ? comdekTagline || `COMEDK ${nextYear} Counselling`
      : headerTagline || siteConfig.headerTagline;

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-2xl border-b border-white/[0.08] shadow-2xl"
          : "bg-black/50 backdrop-blur-xl border-b border-white/[0.04]"
      }`}
      role="banner"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Brand */}
          <a
            href="#home"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-full p-1 transition-transform"
            aria-label={`${siteConfig.brandName} — Home`}
          >
            <img
              src={peptalkLogo}
              alt="Physics Pep Talk Logo"
              className="h-9 w-9 md:h-10 md:w-10 rounded-full object-cover transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-[#f5f5f7] font-semibold text-base md:text-lg tracking-tight">
                {siteConfig.brandName}
              </span>
              <span className="text-[#86868b] text-[11px] font-normal tracking-tight">
                {displayTagline}
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-7"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-normal text-[#86868b] hover:text-[#f5f5f7] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-white/30 rounded px-1.5 py-0.5 tracking-tight"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={counsellingBatchUrl || "#contact"}
              {...(counsellingBatchUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="apple-btn-primary text-xs font-medium px-4 py-2 rounded-full cursor-pointer transition-all duration-200"
            >
              <span>Get Counselling</span>
            </a>
          </div>

          {/* Mobile: Hamburger menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-[#86868b] hover:text-white bg-white/[0.04] border border-white/10 active:scale-95 transition-transform cursor-pointer"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-black/95 backdrop-blur-2xl border-t border-white/[0.08] shadow-2xl animate-in fade-in duration-200"
        >
          <nav
            className="flex flex-col px-5 py-4 gap-2"
            aria-label="Mobile navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                className="py-2.5 px-3 text-sm font-normal text-[#86868b] hover:text-white hover:bg-white/[0.04] rounded-xl transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 pb-1">
              <a
                href={buildWhatsAppUrl(undefined, exam)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleNavClick}
                className="apple-btn-primary flex items-center justify-center gap-2 font-semibold text-sm px-4 py-3 rounded-full transition-all w-full min-h-[48px] cursor-pointer"
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
