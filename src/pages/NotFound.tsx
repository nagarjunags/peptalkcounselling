import { siteConfig } from "../config/siteConfig";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute w-96 h-96 bg-sky-500/[0.04] rounded-full blur-[140px] pointer-events-none" />

      {/* Brand wordmark */}
      <a
        href={siteConfig.kcetUrl}
        className="mb-8 text-lg font-semibold text-white tracking-tight"
        aria-label="Go to Physics Pep Talk home"
      >
        {siteConfig.brandName}
      </a>

      {/* Error code */}
      <p className="text-8xl sm:text-9xl font-semibold text-sky-400/40 leading-none select-none tracking-tighter">
        404
      </p>

      {/* Heading */}
      <h1 className="mt-6 text-3xl font-semibold text-white tracking-tight">
        Coordinates Not Found
      </h1>

      {/* Sub-text */}
      <p className="mt-3 max-w-sm text-slate-400 text-base font-normal">
        The celestial coordinates you requested don't exist or have moved out of range.
      </p>

      {/* CTA */}
      <a
        href={siteConfig.kcetUrl}
        className="mt-8 apple-btn-primary min-h-[48px] inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z"
            clipRule="evenodd"
          />
        </svg>
        <span>Return to Orbit</span>
      </a>
    </div>
  );
}
