import React from "react";

export function CyberBadge({
  children,
  color = "cyan",
}: {
  children: React.ReactNode;
  color?: "cyan" | "gold" | "emerald" | "purple";
}) {
  const dotColor = {
    cyan: "bg-[#70a9ff]",
    gold: "bg-[#e2b474]",
    emerald: "bg-[#34c759]",
    purple: "bg-[#bf5af2]",
  };

  return (
    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl text-xs font-medium tracking-wide text-[#d1d5db] hover:border-white/20 transition-colors duration-300">
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor[color]} opacity-90`} />
      <span>{children}</span>
    </div>
  );
}

export function SoundFrequencyVisualizer() {
  return (
    <div className="flex items-end gap-1 h-3.5 select-none opacity-60" aria-hidden="true">
      <span className="w-0.5 bg-white/70 rounded-full animate-[pulse_1.2s_ease-in-out_infinite] h-2" />
      <span className="w-0.5 bg-white/90 rounded-full animate-[pulse_1.6s_ease-in-out_infinite] h-3.5" />
      <span className="w-0.5 bg-white/60 rounded-full animate-[pulse_0.9s_ease-in-out_infinite] h-1.5" />
      <span className="w-0.5 bg-white/80 rounded-full animate-[pulse_1.4s_ease-in-out_infinite] h-3" />
    </div>
  );
}

export function CyberScanline() {
  // Apple aesthetic uses subtle optical vignettes instead of scanlines
  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.12),rgba(255,255,255,0))]"
      aria-hidden="true"
    />
  );
}
