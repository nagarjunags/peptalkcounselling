import React from "react";

/**
 * Cosmic Observatory Decor & Humane Navigation Badges
 * Tasteful celestial styling with warm starlight touches, zero harsh AI neon.
 */

export function CyberBadge({
  children,
  color = "amber",
}: {
  children: React.ReactNode;
  color?: "cyan" | "gold" | "emerald" | "purple" | "amber";
}) {
  const dotColor = {
    cyan: "bg-sky-400",
    gold: "bg-amber-400",
    emerald: "bg-emerald-400",
    purple: "bg-indigo-400",
    amber: "bg-amber-400",
  };

  const badgeStyle = {
    cyan: "border-sky-500/25 bg-sky-950/40 text-sky-100",
    gold: "border-amber-500/30 bg-amber-950/30 text-amber-100",
    emerald: "border-emerald-500/25 bg-emerald-950/30 text-emerald-100",
    purple: "border-indigo-500/25 bg-indigo-950/40 text-indigo-100",
    amber: "border-amber-500/30 bg-amber-950/30 text-amber-100",
  };

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border backdrop-blur-xl text-xs font-medium tracking-tight transition-colors duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.4)] ${badgeStyle[color]}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor[color]} animate-pulse`} />
      <span>{children}</span>
    </div>
  );
}

export function SoundFrequencyVisualizer() {
  return (
    <div className="flex items-end gap-1 h-3.5 select-none opacity-80" aria-hidden="true">
      <span className="w-0.5 bg-amber-300 rounded-full animate-[pulse_1.2s_ease-in-out_infinite] h-2" />
      <span className="w-0.5 bg-slate-200 rounded-full animate-[pulse_1.6s_ease-in-out_infinite] h-3.5" />
      <span className="w-0.5 bg-sky-400 rounded-full animate-[pulse_0.9s_ease-in-out_infinite] h-1.5" />
      <span className="w-0.5 bg-amber-400 rounded-full animate-[pulse_1.4s_ease-in-out_infinite] h-3" />
    </div>
  );
}

export function CyberScanline() {
  // Deep Space Nebula Atmosphere Vignette — organic, calm, cosmic
  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_75%_50%_at_50%_0%,rgba(56,189,248,0.08),rgba(2,6,23,0))]"
      aria-hidden="true"
    />
  );
}
