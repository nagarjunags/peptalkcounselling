import { buildWhatsAppUrl, buildPhoneUrl } from "../config/siteConfig";
import { trackWhatsAppClick, trackCallClick, trackCTAClick } from "../utils/analytics";
import { useExam } from "../context/ExamContext";
import WormholeCTA3D from "./3d/WormholeCTA3D";

const examContent = {
  KCET: {
    eyebrow: "FINAL ENROLLMENT CALL • LIMITED BATCH",
    heading: (
      <>
        Don't Leave Your KCET Counselling
        <br className="hidden sm:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-blue-400 font-semibold">
          {" "}Decisions to Guesswork
        </span>
      </>
    ),
    subheading:
      "Get one-on-one personalised guidance for option entry, college & branch selection — backed by seat matrix data, with follow-up through every counselling round until your seat is secured. PCM teaching included at zero extra cost.",
    disclaimer:
      "Seat allotment is determined solely by KEA based on rank, category, seat availability, cutoffs and other factors outside our control. We guide you to the smartest choice — we do not guarantee any specific college or branch. Limited seats per batch.",
  },
  COMEDK: {
    eyebrow: "FINAL ENROLLMENT CALL • LIMITED BATCH",
    heading: (
      <>
        Don't Leave Your COMEDK Counselling
        <br className="hidden sm:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-blue-400 font-semibold">
          {" "}Decisions to Guesswork
        </span>
      </>
    ),
    subheading:
      "Get one-on-one personalised guidance for choice filling, college & branch selection — backed by previous-year seat data, with follow-up through every COMEDK round until your seat is secured. PCM teaching included at zero extra cost.",
    disclaimer:
      "Seat allotment is determined solely by COMEDK authority based on rank, seat availability, cutoffs and other factors outside our control. We guide you to the smartest choice — we do not guarantee any specific college or branch. Limited seats per batch.",
  },
} as const;

export default function FinalCTA() {
  const phoneUrl = buildPhoneUrl();
  const { exam } = useExam();
  const content = examContent[exam];

  const handleCtaClick = () => {
    trackCTAClick(`final_cta_get_guidance_${exam.toLowerCase()}`);
  };

  return (
    <section
      id="final-cta"
      className="py-24 md:py-32 bg-[#030712] text-slate-100 relative overflow-hidden border-t border-sky-500/15"
      aria-label="Final call to action"
    >
      {/* 3D Interstellar Warp Tunnel Canvas */}
      <WormholeCTA3D />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-sky-500/20 backdrop-blur-md mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
          <span className="text-[11px] font-mono tracking-wider text-sky-200/90 font-medium uppercase">
            {content.eyebrow}
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-5 tracking-tight text-white">
          {content.heading}
        </h2>

        {/* Subheading */}
        <p className="text-slate-300 text-base sm:text-lg md:text-xl leading-relaxed mb-8 max-w-2xl mx-auto font-normal">
          {content.subheading}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-10">
          <a
            href="#contact"
            onClick={handleCtaClick}
            className="apple-btn-primary min-h-[50px] inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl sm:rounded-full text-base font-semibold cursor-pointer w-full sm:w-auto justify-center"
          >
            <span>Get Counselling Guidance</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>

          <a
            href={buildWhatsAppUrl(undefined, exam)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick(`final_cta_${exam.toLowerCase()}`)}
            className="apple-btn-secondary min-h-[50px] inline-flex items-center gap-2 px-7 py-3.5 rounded-xl sm:rounded-full text-base font-medium cursor-pointer w-full sm:w-auto justify-center text-sky-100"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
            <span>WhatsApp Us</span>
          </a>

          {phoneUrl !== "#" && (
            <a
              href={phoneUrl}
              onClick={() => trackCallClick(`final_cta_${exam.toLowerCase()}`)}
              className="apple-btn-secondary min-h-[50px] inline-flex items-center gap-2 px-7 py-3.5 rounded-xl sm:rounded-full text-base font-medium cursor-pointer w-full sm:w-auto justify-center text-sky-100"
            >
              <svg className="w-4 h-4 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>Call Now</span>
            </a>
          )}
        </div>

        {/* Disclaimer */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-sky-500/15 max-w-2xl mx-auto flex items-start gap-2.5 text-left">
          <svg className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
          <p className="text-slate-400 text-xs leading-relaxed font-normal">
            {content.disclaimer}
          </p>
        </div>
      </div>
    </section>
  );
}
