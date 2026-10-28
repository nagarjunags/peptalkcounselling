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
          ? "bg-[#020617]/85 backdrop-blur-2xl border-b border-slate-800 shadow-2xl"
          : "bg-[#020617]/50 backdrop-blur-xl border-b border-slate-800/60"
      }`}
      role="banner"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Brand */}
          <a
            href="#home"
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 rounded-full p-1 transition-transform"
            aria-label={`${siteConfig.brandName} — Home`}
          >
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-amber-500/15 blur-md group-hover:bg-amber-400/30 transition-all" />
              <img
                src={peptalkLogo}
                alt="Physics Pep Talk Logo"
                className="relative h-8 w-8 md:h-9 md:w-9 rounded-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-white font-semibold text-sm sm:text-base md:text-lg tracking-tight">
                {siteConfig.brandName}
              </span>
              <span className="text-slate-400 text-[10px] sm:text-[11px] font-normal tracking-tight">
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
                className="text-xs font-normal text-slate-300 hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-slate-400 rounded px-1.5 py-0.5 tracking-tight"
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
              className="apple-btn-primary text-xs font-semibold px-6 py-2.5 !rounded-lg cursor-pointer transition-all duration-200 tracking-wide whitespace-nowrap"
            >
              <span>Get Counselling</span>
            </a>
          </div>

          {/* Mobile: Hamburger menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-slate-300 hover:text-white bg-slate-900 border border-slate-700/60 active:scale-95 transition-transform cursor-pointer"
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
          className="md:hidden bg-[#030712]/95 backdrop-blur-2xl border-t border-sky-500/20 shadow-2xl animate-in fade-in duration-200"
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
                className="py-2.5 px-3 text-sm font-normal text-slate-300 hover:text-sky-300 hover:bg-sky-950/40 rounded-xl transition-colors"
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
