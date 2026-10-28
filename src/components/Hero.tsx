import { useSyncExternalStore } from "react";
import { buildWhatsAppUrl } from "../config/siteConfig";
import { trackWhatsAppClick, trackCTAClick } from "../utils/analytics";
import { useSheetConfig } from "../context/SheetConfigContext";
import { useExam } from "../context/ExamContext";
import Hero3DGateway from "./3d/Hero3DGateway";
import Tilt3DCard from "./3d/Tilt3DCard";
import { CyberScanline } from "./3d/CyberHUDDecor";

function subscribeMediaQuery(callback: () => void) {
  const mq = window.matchMedia("(min-width: 1024px)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getDesktopSnapshot() {
  return window.matchMedia("(min-width: 1024px)").matches;
}

function getServerSnapshot() {
  return false;
}

const examContent = {
  KCET: {
    eyebrow: (year: string) => `DHRONA ${year} • ONE-ON-ONE COUNSELLING`,
    heading: (year: string) => (
      <>
        KCET {year} Counselling Guidance —{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-blue-400 font-semibold">
          Make the Most of Your Rank
        </span>
      </>
    ),
    subheading:
      "One-on-one personalised guidance for option entry, college & branch selection — built around your rank, category, and priorities. We follow up with you through every counselling round until you get a good seat.",
    honestMessage:
      "Seat allotment is determined solely by KEA based on rank and availability. We guide you to make the smartest possible choice — honestly, without false promises.",
    ctaLabel: "Get Counselling Guidance",
    stats: [
      { value: "1-on-1", label: "Personalised Guidance", note: "Direct Mentor Access" },
      { value: "Limited", label: "Seats Available", note: "Quality-Controlled Batch" },
      { value: "Zero Cost", label: "PCM Boards + KCET", note: "Comprehensive Teaching" },
    ],
  },
  COMEDK: {
    eyebrow: (year: string) => `DHRONA ${year} • COMEDK CHOICE FILLING`,
    heading: (year: string) => (
      <>
        COMEDK {year} Counselling Guidance —{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-blue-400 font-semibold">
          Make the Most of Your Rank
        </span>
      </>
    ),
    subheading:
      "One-on-one personalised guidance for choice filling, college & branch selection — built around your COMEDK rank, category, and priorities. We support you through every round until you secure a good seat.",
    honestMessage:
      "Seat allotment is determined solely by COMEDK authority based on rank and availability. We guide you to make the smartest possible choice — honestly, without false promises.",
    ctaLabel: "Get Counselling Guidance",
    stats: [
      { value: "1-on-1", label: "Personalised Guidance", note: "Direct Mentor Access" },
      { value: "Limited", label: "Seats Available", note: "Quality-Controlled Batch" },
      { value: "Zero Cost", label: "PCM Boards + COMEDK", note: "Comprehensive Teaching" },
    ],
  },
} as const;

export default function Hero() {
  const { year, counsellingBatchUrl } = useSheetConfig();
  const { exam } = useExam();
  const content = examContent[exam];

  const isDesktop = useSyncExternalStore(subscribeMediaQuery, getDesktopSnapshot, getServerSnapshot);

  const handleCtaClick = () => {
    trackCTAClick(`hero_get_guidance_${exam.toLowerCase()}`);
  };

  return (
    <section
      id="home"
      className="relative bg-[#030712] text-slate-100 pt-16 pb-4 sm:pt-18 sm:pb-5 lg:pt-20 lg:pb-6 min-h-[calc(100dvh-3.5rem)] lg:min-h-[calc(100dvh-4rem)] lg:max-h-[880px] flex flex-col justify-between overflow-hidden"
      aria-label="Hero section"
    >
      <CyberScanline />

      {/* Atmospheric Starlight Ambient Lighting */}
      <div className="absolute top-1/4 left-1/4 w-[480px] h-[480px] bg-sky-500/[0.03] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[480px] h-[480px] bg-indigo-600/[0.03] rounded-full blur-[160px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 w-full flex-1 flex flex-col justify-between">
        {/* Main Grid: Desktop side-by-side, Mobile responsive flow */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center my-auto">
          {/* Left / Main Editorial Column */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            {/* Compact, understated scientific eyebrow */}
            <div className="mb-2 sm:mb-2.5 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-sky-500/20 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              <span className="text-[11px] font-mono tracking-wider text-sky-200/90 font-medium">
                {content.eyebrow(year)}
              </span>
            </div>

            {/* Editorial Main Headline */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-semibold tracking-tight leading-[1.14] mb-2 sm:mb-2.5 text-white break-words">
              {content.heading(year)}
            </h1>

            {/* Mobile 3D Centerpiece — visible between headline and copy on phone viewports */}
            {!isDesktop && (
              <div className="w-full h-36 sm:h-44 my-1.5 flex items-center justify-center">
                <Hero3DGateway exam={exam} />
              </div>
            )}

            {/* Constrained, readable supporting paragraph */}
            <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed mb-2.5 sm:mb-3 max-w-xl font-normal">
              {content.subheading}
            </p>

            {/* Refined Institutional Trust / Disclaimer Element */}
            <div className="w-full max-w-xl px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl bg-slate-900/60 border border-sky-500/15 backdrop-blur-sm mb-3">
              <div className="flex items-start gap-2.5">
                <svg
                  className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                  />
                </svg>
                <p className="text-slate-300 text-[11px] sm:text-xs leading-relaxed font-normal">
                  {content.honestMessage}
                </p>
              </div>
            </div>

            {/* Deliberate CTA Hierarchy: Dominant Primary + Quieter Secondary */}
            <div className="grid grid-cols-2 gap-2.5 sm:flex sm:flex-row sm:gap-3 w-full sm:w-auto">
              <a
                href={counsellingBatchUrl || "#contact"}
                {...(counsellingBatchUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                onClick={handleCtaClick}
                className="apple-btn-primary inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold rounded-xl sm:rounded-full cursor-pointer min-h-[44px] text-center"
              >
                <span>{content.ctaLabel}</span>
                <svg
                  className="w-3.5 h-3.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>

              <a
                href={buildWhatsAppUrl(undefined, exam)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick(`hero_${exam.toLowerCase()}`)}
                className="apple-btn-secondary inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium rounded-xl sm:rounded-full cursor-pointer min-h-[44px] text-sky-100 text-center"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>

          {/* Desktop Right Column: Celestial Astrolabe 3D Centerpiece */}
          {isDesktop && (
            <div className="hidden lg:flex lg:col-span-5 justify-center items-center h-[300px] lg:h-[340px] xl:h-[380px]">
              <Hero3DGateway exam={exam} />
            </div>
          )}
        </div>

        {/* Coherent Telemetry Metrics Strip */}
        <div className="mt-3 lg:mt-4 grid grid-cols-3 gap-2 sm:gap-3 max-w-4xl w-full">
          {content.stats.map((stat, i) => (
            <Tilt3DCard key={stat.label} maxTilt={5}>
              <div className="apple-card p-2.5 sm:p-3.5 flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-3 text-center sm:text-left h-full border-sky-500/15">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-sky-950/60 border border-sky-500/20 flex items-center justify-center flex-shrink-0 text-sky-400">
                  {i === 0 && (
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  )}
                  {i === 1 && (
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  )}
                  {i === 2 && (
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  )}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs sm:text-sm md:text-base font-semibold tracking-tight text-white leading-tight font-mono">
                    {stat.value}
                  </span>
                  <span className="text-[10px] sm:text-xs text-slate-300 font-medium leading-tight line-clamp-1">
                    {stat.label}
                  </span>
                  <span className="hidden sm:block text-[9px] text-slate-500 font-mono leading-tight">
                    {stat.note}
                  </span>
                </div>
              </div>
            </Tilt3DCard>
          ))}
        </div>
      </div>
    </section>
  );
}
