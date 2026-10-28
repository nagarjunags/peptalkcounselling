import { buildWhatsAppUrl } from "../config/siteConfig";
import { trackWhatsAppClick, trackCTAClick } from "../utils/analytics";
import { useSheetConfig } from "../context/SheetConfigContext";
import { useExam } from "../context/ExamContext";
import Hero3DGateway from "./3d/Hero3DGateway";
import Tilt3DCard from "./3d/Tilt3DCard";
import { CyberBadge, CyberScanline } from "./3d/CyberHUDDecor";

const examContent = {
  KCET: {
    badge: (year: string) => `KCET ${year} Counselling Guidance`,
    heading: (year: string) => (
      <>
        KCET {year} Counselling Guidance —{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#f5f5f7] via-[#e2b474] to-[#f5c984]">
          Make the Most of Your Rank
        </span>
      </>
    ),
    subheading:
      "One-on-one personalised guidance for option entry, college & branch selection — built around your rank, category, and priorities. We follow up with you through every round until you get a good seat.",
    trustLine:
      "Option entry based on previous-year seat matrix data. PCM teaching for Boards & KCET included at zero extra cost. Limited seats only.",
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
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#f5f5f7] via-[#e2b474] to-[#f5c984]">
          Make the Most of Your Rank
        </span>
      </>
    ),
    subheading:
      "One-on-one personalised guidance for choice filling, college & branch selection — built around your COMEDK rank, category, and priorities. We support you through every round until you secure a good seat.",
    trustLine:
      "Choice filling based on previous-year seat data. PCM teaching for Boards & COMEDK included at zero extra cost. Limited seats only.",
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

  const handleCtaClick = () => {
    trackCTAClick(`hero_get_guidance_${exam.toLowerCase()}`);
  };

  return (
    <section
      id="home"
      className="relative bg-black text-[#f5f5f7] pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden"
      aria-label="Hero section"
    >
      <CyberScanline />

      {/* Apple-style subtle ambient depth glow */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#e2b474]/[0.03] rounded-full blur-[160px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline and Actions (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            {/* Pill Badge */}
            <div className="mb-6">
              <CyberBadge color="gold">{content.badge(year)}</CyberBadge>
            </div>

            {/* Main heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.12] mb-5 text-[#f5f5f7] break-words">
              {content.heading(year)}
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg md:text-xl text-[#86868b] leading-relaxed mb-4 max-w-2xl font-normal">
              {content.subheading}
            </p>

            {/* Trust line */}
            <p className="text-[#a1a1a6] text-xs sm:text-sm md:text-base mb-6 sm:mb-8 max-w-xl font-normal">
              {content.trustLine}
            </p>

            {/* Honest message card */}
            <div className="w-full max-w-xl apple-card p-4 sm:p-5 mb-8">
              <div className="flex items-start gap-3.5">
                <svg
                  className="w-5 h-5 text-[#e2b474] flex-shrink-0 mt-0.5"
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
                <p className="text-[#d1d5db] text-xs sm:text-sm md:text-base font-normal leading-relaxed">
                  {content.honestMessage}
                </p>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto">
              <a
                href={counsellingBatchUrl || "#contact"}
                {...(counsellingBatchUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                onClick={handleCtaClick}
                className="apple-btn-primary inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-medium rounded-full cursor-pointer min-h-[50px]"
              >
                <span>{content.ctaLabel}</span>
                <svg
                  className="w-4 h-4"
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
                className="apple-btn-secondary inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-base font-medium rounded-full cursor-pointer min-h-[50px] text-[#f5f5f7]"
              >
                <svg className="w-4 h-4 fill-emerald-400" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Us
              </a>
            </div>
          </div>

          {/* Right Column: Interactive 3D Hologram Centerpiece (5 cols) */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <Hero3DGateway exam={exam} />
          </div>
        </div>

        {/* 3D Interactive Stats Cards Strip */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl">
          {content.stats.map((stat, i) => (
            <Tilt3DCard key={stat.label} maxTilt={8}>
              <div className="apple-card p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center flex-shrink-0 text-[#e2b474]">
                  {i === 0 && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  )}
                  {i === 1 && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  )}
                  {i === 2 && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-semibold tracking-tight text-[#f5f5f7]">
                    {stat.value}
                  </span>
                  <span className="text-xs text-[#86868b] mt-0.5 font-normal">
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
