import { useState } from "react";
import { useSheetConfig } from "../context/SheetConfigContext";
import type { Testimonial } from "../utils/testimonialsConfig";
import Tilt3DCard from "./3d/Tilt3DCard";

// ─── Individual video card with 3D Tilt ──────────────────────────────────────

function VideoCard({ testimonial }: { testimonial: Testimonial }) {
  const [playing, setPlaying] = useState(false);

  return (
    <Tilt3DCard maxTilt={4}>
      <div className="flex flex-col rounded-2xl overflow-hidden apple-card h-full border-sky-500/15 bg-[#060c1d]/80 group">
        {/* Video area */}
        <div className="relative aspect-video bg-[#070e20] overflow-hidden border-b border-sky-500/10">
          {playing ? (
            <iframe
              src={`${testimonial.embedUrl}?autoplay=1&rel=0`}
              title={testimonial.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          ) : (
            <button
              onClick={() => setPlaying(true)}
              className="absolute inset-0 w-full h-full group focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-inset cursor-pointer"
              aria-label={`Play video: ${testimonial.title}`}
            >
              {/* Thumbnail */}
              <img
                src={testimonial.thumbnailUrl}
                alt={testimonial.title}
                className="w-full h-full object-cover transform group-hover:scale-102 transition-transform duration-700"
                loading="lazy"
              />
              {/* Subtle cosmic vignette overlay */}
              <span className="absolute inset-0 bg-[#030712]/35 group-hover:bg-[#030712]/15 transition-colors" />

              {/* Minimalist Frosted Starlight Play Button */}
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="w-12 h-12 rounded-full bg-slate-900/70 backdrop-blur-md border border-sky-400/40 group-hover:border-sky-300 flex items-center justify-center shadow-[0_0_16px_rgba(56,189,248,0.25)] transition-transform group-hover:scale-108 duration-300">
                  <svg
                    className="w-4 h-4 text-sky-200 translate-x-0.5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </span>
            </button>
          )}
        </div>

        {/* Title & Metadata */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <p className="text-sm font-semibold text-white line-clamp-2 leading-snug tracking-tight">
            {testimonial.title}
          </p>
          <span className="text-[11px] font-mono text-sky-400/90 mt-3 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            Verified Candidate Allotment
          </span>
        </div>
      </div>
    </Tilt3DCard>
  );
}

// ─── Skeleton loader card ────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden apple-card animate-pulse border-sky-500/15">
      <div className="aspect-video bg-sky-950/20" />
      <div className="p-5">
        <div className="h-4 bg-sky-900/30 rounded w-3/4 mb-2" />
        <div className="h-3 bg-sky-900/20 rounded w-1/2" />
      </div>
    </div>
  );
}

// ─── Main section ────────────────────────────────────────────────────────────

export default function Testimonials() {
  const { testimonials, loading } = useSheetConfig();

  if (!loading && testimonials.length === 0) return null;

  return (
    <section
      id="testimonials"
      className="py-20 md:py-28 bg-[#030712] text-slate-100 relative overflow-hidden border-t border-sky-500/15"
      aria-label="Student testimonials"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-sky-500/20 backdrop-blur-md mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            <span className="text-[11px] font-mono tracking-wider text-sky-200/90 font-medium uppercase">
              Proven Outcomes &amp; Feedback
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-[1.15] mb-4">
            Hear From Real Students &amp; Families
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
            Direct experiences from candidates who navigated KCET &amp; COMEDK counselling with Physics Pep Talk.
          </p>
        </div>

        {/* Video grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))
            : testimonials.map((t) => (
                <VideoCard key={t.youtubeUrl} testimonial={t} />
              ))}
        </div>
      </div>
    </section>
  );
}
