/**
 * Testimonials.tsx
 *
 * Fetches testimonial videos from the Google Sheet and renders them as
 * YouTube embed cards. Videos are lazy-loaded — the iframe is only inserted
 * after the user clicks the thumbnail, keeping page load fast.
 */

import { useState } from "react";
import { useSheetConfig } from "../context/SheetConfigContext";
import { useExam } from "../context/ExamContext";
import type { Testimonial } from "../utils/testimonialsConfig";
import Tilt3DCard from "./3d/Tilt3DCard";

// ─── Individual video card with 3D Tilt ──────────────────────────────────────

function VideoCard({ testimonial }: { testimonial: Testimonial }) {
  const [playing, setPlaying] = useState(false);

  return (
    <Tilt3DCard maxTilt={3}>
      <div className="flex flex-col rounded-2xl overflow-hidden apple-card h-full border-slate-800 bg-[#050b18]/85 group">
        {/* Video area */}
        <div className="relative aspect-video bg-[#020617] overflow-hidden border-b border-slate-800">
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
              className="absolute inset-0 w-full h-full group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-inset cursor-pointer"
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
              <span className="absolute inset-0 bg-[#020617]/35 group-hover:bg-[#020617]/15 transition-colors" />

              {/* Minimalist Frosted Starlight Play Button */}
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="w-12 h-12 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-600 group-hover:border-amber-300 flex items-center justify-center shadow-[0_2px_16px_rgba(0,0,0,0.6)] transition-transform group-hover:scale-108 duration-300">
                  <svg
                    className="w-4 h-4 text-amber-200 translate-x-0.5"
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
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
          <p className="text-sm font-semibold text-white line-clamp-2 leading-snug tracking-tight">
            {testimonial.title}
          </p>
        </div>
      </div>
    </Tilt3DCard>
  );
}

// ─── Skeleton loader card ────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden apple-card animate-pulse border-slate-800">
      <div className="aspect-video bg-slate-900/40" />
      <div className="p-4 sm:p-5">
        <div className="h-4 bg-slate-800 rounded w-3/4" />
      </div>
    </div>
  );
}

// ─── Main section ────────────────────────────────────────────────────────────

export default function Testimonials() {
  const { testimonials, loading } = useSheetConfig();
  const { exam } = useExam();

  if (!loading && testimonials.length === 0) return null;

  return (
    <section
      id="testimonials"
      className="py-20 md:py-28 bg-[#020617] text-slate-100 relative overflow-hidden border-t border-slate-800"
      aria-label="Student testimonials"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700/60 backdrop-blur-md mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span className="text-[11px] font-mono tracking-wider text-amber-200/90 font-medium uppercase">
              Testimonials
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-[1.15] mb-4">
            Hear From Our Students
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
            Real students share their experience with our {exam === "COMEDK" ? "COMEDK" : "KCET"} counselling guidance.
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
