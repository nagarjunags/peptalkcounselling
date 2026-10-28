import { siteConfig } from "../config/siteConfig";

/**
 * Custom 404 — Not Found page.
 *
 * GitHub Pages serves dist/404.html for any path it cannot resolve.
 * The 404.html entry boots this React component.
 *
 * The "Go to Home" button links to the main KCET counselling page.
 */
export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      {/* Background starlight aura */}
      <div className="absolute w-96 h-96 bg-amber-500/[0.03] rounded-full blur-[140px] pointer-events-none" />

      {/* Brand wordmark */}
      <a
        href={siteConfig.kcetUrl}
        className="mb-8 text-lg font-semibold text-white tracking-tight"
        aria-label="Go to Physics Pep Talk home"
      >
        {siteConfig.brandName}
      </a>

      {/* Error code */}
      <p className="text-8xl sm:text-9xl font-semibold text-amber-400/40 leading-none select-none tracking-tighter">
        404
      </p>

      {/* Heading */}
      <h1 className="mt-6 text-3xl font-semibold text-white tracking-tight">
        Page not found
      </h1>

      {/* Sub-text */}
      <p className="mt-3 max-w-sm text-slate-400 text-base font-normal">
        The page you're looking for doesn't exist or may have been moved.
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
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        <span>Go to Home</span>
      </a>
    </div>
  );
}
