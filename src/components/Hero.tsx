import { useSyncExternalStore } from "react";
import { buildWhatsAppUrl } from "../config/siteConfig";
import { trackWhatsAppClick, trackCTAClick } from "../utils/analytics";
import { useSheetConfig } from "../context/SheetConfigContext";
import { useExam } from "../context/ExamContext";
import Hero3DGateway from "./3d/Hero3DGateway";
import Tilt3DCard from "./3d/Tilt3DCard";
import { CyberBadge, CyberScanline } from "./3d/CyberHUDDecor";

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
    badge: (year: string) => `KCET ${year} Counselling Guidance`,
    heading: (year: string) => (
      <>
        KCET {year} Counselling Guidance —{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-sky-100 to-sky-400">
          Make the Most of Your Rank
        </span>
      </>
    ),
    subheading:
      "One-on-one personalised guidance for option entry, college & branch selection — built around your rank, category, and priorities. We follow up with you through every round until you get a good seat.",
    honestMessage:
      "Seat allotment is solely by KEA. We guide you to make the smartest possible choice — honestly, without false promises.",
    ctaLabel: "Get Counselling Guidance",
    stats: [
      { value: "1-on-1", label: "Personalised Guidance" },
      { value: "Limited", label: "Seats Available" },
      { value: "Zero Cost", label: "PCM Boards + KCET teaching" },
    ],
  },
  COMEDK: {
    badge: (year: string) => `COMEDK ${year} Counselling Guidance`,
    heading: (year: string) => (
      <>
        COMEDK {year} Counselling Guidance —{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-sky-100 to-sky-400">
          Make the Most of Your Rank
        </span>
      </>
    ),
    subheading:
      "One-on-one personalised guidance for choice filling, college & branch selection — built around your COMEDK rank, category, and priorities. We support you through every round until you secure a good seat.",
    honestMessage:
      "Seat allotment is solely by COMEDK authority. We guide you to make the smartest possible choice — honestly, without false promises.",
    ctaLabel: "Get Counselling Guidance",
    stats: [
      { value: "1-on-1", label: "Personalised Guidance" },
      { value: "Limited", label: "Seats Available" },
      { value: "Zero Cost", label: "PCM Boards + COMEDK teaching" },
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
      className="relative bg-[#030712] text-slate-100 pt-16 pb-3 sm:pt-18 sm:pb-4 lg:pt-20 lg:pb-6 min-h-[calc(100dvh-3.5rem)] lg:min-h-[calc(100dvh-4rem)] lg:max-h-[880px] flex flex-col justify-between overflow-hidden"
      aria-label="Hero section"
    >
      <CyberScanline />

      {/* Deep Space Celestial Nebula Ambience */}
      <div className="absolute top-1/4 left-1/4 w-[480px] h-[480px] bg-sky-500/[0.04] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[480px] h-[480px] bg-indigo-600/[0.04] rounded-full blur-[160px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 w-full flex-1 flex flex-col justify-between">
        {/* Main Grid: Desktop side-by-side, Mobile single flow */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center my-auto">
          {/* Left / Main Content Column */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            {/* Pill Badge */}
            <div className="mb-2 sm:mb-2.5">
              <CyberBadge color="cyan">{content.badge(year)}</CyberBadge>
            </div>

            {/* Main Heading */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.12] mb-2 sm:mb-2.5 text-white break-words">
              {content.heading(year)}
            </h1>

            {/* Mobile 3D Astrolabe centerpiece - positioned right below heading on mobile */}
            {!isDesktop && (
              <div className="w-full h-36 sm:h-44 my-1.5 flex items-center justify-center">
                <Hero3DGateway exam={exam} />
              </div>
            )}

            {/* Subheading */}
            <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed mb-2 sm:mb-2.5 max-w-2xl font-normal">
              {content.subheading}
            </p>

            {/* Honest Message Pill / Card */}
            <div className="w-full max-w-xl apple-card px-3 py-2 sm:px-4 sm:py-2.5 mb-2.5 sm:mb-3">
              <div className="flex items-center gap-2.5">
                <svg
                  className="w-4 h-4 text-sky-400 flex-shrink-0"
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
                <p className="text-slate-300 text-[11px] sm:text-xs md:text-sm font-normal leading-snug">
                  {content.honestMessage}
                </p>
              </div>
            </div>

            {/* CTA Buttons Row */}
            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-row sm:gap-3 w-full sm:w-auto">
              <a
                href={counsellingBatchUrl || "#contact"}
                {...(counsellingBatchUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                onClick={handleCtaClick}
                className="apple-btn-primary inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-7 py-2.5 sm:py-3 text-xs sm:text-sm md:text-base font-semibold rounded-full cursor-pointer min-h-[42px] sm:min-h-[46px] text-center"
              >
                <span className="truncate">{content.ctaLabel}</span>
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
                className="apple-btn-secondary inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm md:text-base font-medium rounded-full cursor-pointer min-h-[42px] sm:min-h-[46px] text-sky-100 text-center"
              >
                <svg className="w-3.5 h-3.5 fill-emerald-400 flex-shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span className="truncate">WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Desktop Right Column: Celestial Astrolabe 3D Centerpiece */}
          {isDesktop && (
            <div className="hidden lg:flex lg:col-span-5 justify-center items-center h-[280px] lg:h-[320px] xl:h-[360px]">
              <Hero3DGateway exam={exam} />
            </div>
          )}
        </div>

        {/* 3D Interactive Stats Cards Strip */}
        <div className="mt-2.5 lg:mt-3 grid grid-cols-3 gap-2 sm:gap-3 max-w-4xl w-full">
          {content.stats.map((stat, i) => (
            <Tilt3DCard key={stat.label} maxTilt={6}>
              <div className="apple-card p-2 sm:p-3 flex flex-col sm:flex-row items-center sm:items-center gap-1.5 sm:gap-3 text-center sm:text-left h-full">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-sky-500/10 border border-sky-500/20 flex items-center justify-center flex-shrink-0 text-sky-400">
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
                  <span className="text-xs sm:text-sm md:text-base font-semibold tracking-tight text-white leading-tight">
                    {stat.value}
                  </span>
                  <span className="text-[9px] sm:text-[10px] md:text-xs text-slate-400 font-normal leading-tight line-clamp-1">
                    {stat.label}
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
