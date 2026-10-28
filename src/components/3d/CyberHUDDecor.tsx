import React from "react";

export function CyberBadge({
  children,
  color = "cyan",
}: {
  children: React.ReactNode;
  color?: "cyan" | "gold" | "emerald" | "purple";
}) {
  const dotColor = {
    cyan: "bg-[#38bdf8]",
    gold: "bg-[#60a5fa]", // converted gold to celestial starlight blue
    emerald: "bg-[#34d399]",
    purple: "bg-[#818cf8]",
  };

  return (
    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-500/20 bg-sky-950/40 backdrop-blur-xl text-xs font-medium tracking-tight text-sky-100 hover:border-sky-400/40 transition-colors duration-300 shadow-[0_0_15px_rgba(56,189,248,0.08)]">
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor[color]} animate-pulse`} />
      <span>{children}</span>
    </div>
  );
}

export function SoundFrequencyVisualizer() {
  return (
    <div className="flex items-end gap-1 h-3.5 select-none opacity-80" aria-hidden="true">
      <span className="w-0.5 bg-sky-400 rounded-full animate-[pulse_1.2s_ease-in-out_infinite] h-2" />
      <span className="w-0.5 bg-sky-200 rounded-full animate-[pulse_1.6s_ease-in-out_infinite] h-3.5" />
      <span className="w-0.5 bg-indigo-400 rounded-full animate-[pulse_0.9s_ease-in-out_infinite] h-1.5" />
      <span className="w-0.5 bg-sky-300 rounded-full animate-[pulse_1.4s_ease-in-out_infinite] h-3" />
    </div>
  );
}

export function CyberScanline() {
  // Cosmic Deep Space Nebula Vignette
  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-50 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(56,189,248,0.1),rgba(3,7,18,0))]"
      aria-hidden="true"
    />
  );
}
