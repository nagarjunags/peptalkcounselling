import { useState } from "react";
import { useSheetConfig } from "../context/SheetConfigContext";
import type { Testimonial } from "../utils/testimonialsConfig";
import Tilt3DCard from "./3d/Tilt3DCard";
import { CyberBadge } from "./3d/CyberHUDDecor";

// ─── Individual video card with 3D Tilt ──────────────────────────────────────

function VideoCard({ testimonial }: { testimonial: Testimonial }) {
  const [playing, setPlaying] = useState(false);

  return (
    <Tilt3DCard maxTilt={6}>
      <div className="flex flex-col rounded-2xl overflow-hidden apple-card h-full">
        {/* Video area */}
        <div className="relative aspect-video bg-[#0a1020] overflow-hidden">
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
                className="w-full h-full object-cover transform group-hover:scale-103 transition-transform duration-700"
                loading="lazy"
              />
              {/* Subtle cosmic glass overlay */}
              <span className="absolute inset-0 bg-[#030712]/30 group-hover:bg-[#030712]/10 transition-colors" />

              {/* Minimalist Frosted Glass Play button */}
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="w-13 h-13 rounded-full bg-slate-900/60 backdrop-blur-md border border-sky-400/40 group-hover:border-sky-300 flex items-center justify-center shadow-[0_0_20px_rgba(56,189,248,0.3)] transition-transform group-hover:scale-110 duration-300">
                  <svg
                    className="w-5 h-5 text-sky-200 translate-x-0.5"
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

        {/* Title */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <p className="text-sm font-medium text-white line-clamp-2 leading-relaxed">
            {testimonial.title}
          </p>
          <span className="text-xs text-sky-400/80 font-normal mt-3 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            Verified Student Experience
          </span>
        </div>
      </div>
    </Tilt3DCard>
  );
}

// ─── Skeleton loader card ────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden apple-card animate-pulse">
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
        <div className="text-center mb-14">
          <div className="mb-4">
            <CyberBadge color="cyan">Testimonials</CyberBadge>
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold text-white mb-4 tracking-tight">
            Hear From Our Students
          </h2>
          <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
            Real students share their experience with our KCET &amp; COMEDK counselling
            guidance.
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
