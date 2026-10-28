import { buildWhatsAppUrl, buildPhoneUrl } from "../config/siteConfig";
import { trackWhatsAppClick, trackCallClick, trackCTAClick } from "../utils/analytics";
import { useExam } from "../context/ExamContext";
import WormholeCTA3D from "./3d/WormholeCTA3D";

const examContent = {
  KCET: {
    heading: (
      <>
        Don't Leave Your KCET Counselling
        <br className="hidden sm:block" />
        <span className="text-amber-300"> Decisions to Guesswork</span>
      </>
    ),
    subheading:
      "Get one-on-one personalised guidance for option entry, college & branch selection — backed by seat matrix data, with follow-up through every round until you confirm a seat. PCM teaching included at zero extra cost. Limited seats only.",
    disclaimer:
      "Seat allotment is solely determined by KEA based on rank, category, seat availability, cutoffs and other factors outside our control. We guide you to the best possible choice — we do not guarantee any specific college or branch. No refunds once enrolled. Limited seats.",
  },
  COMEDK: {
    heading: (
      <>
        Don't Leave Your COMEDK Counselling
        <br className="hidden sm:block" />
        <span className="text-amber-300"> Decisions to Guesswork</span>
      </>
    ),
    subheading:
      "Get one-on-one personalised guidance for choice filling, college & branch selection — backed by previous-year seat data, with follow-up through every COMEDK round until you confirm a seat. PCM teaching included at zero extra cost. Limited seats only.",
    disclaimer:
      "Seat allotment is determined by COMEDK authority based on rank, seat availability, cutoffs and other factors outside our control. We guide you to the best possible choice — we do not guarantee any specific college or branch. No refunds once enrolled. Limited seats.",
  },
} as const;

export default function FinalCTA() {
  const phoneUrl = buildPhoneUrl();
  const { exam } = useExam();
  const content = examContent[exam];

  return (
    <section
      id="final-cta"
      className="py-24 md:py-32 bg-[#020617] text-slate-100 relative overflow-hidden border-t border-slate-800"
      aria-label="Final call to action"
    >
      {/* 3D Interstellar Warp Tunnel Canvas */}
      <WormholeCTA3D />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        {/* Heading */}
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-5 tracking-tight text-white">
          {content.heading}
        </h2>

        {/* Subheading */}
        <p className="text-slate-300 text-base sm:text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto font-normal">
          {content.subheading}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <a
            href="#contact"
            onClick={() => trackCTAClick(`final_cta_get_guidance_${exam.toLowerCase()}`)}
            className="apple-btn-primary min-h-[50px] inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl sm:rounded-full text-base font-semibold cursor-pointer w-full sm:w-auto justify-center"
          >
            <span>Get Counselling Guidance</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>

          <a
            href={buildWhatsAppUrl(undefined, exam)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick(`final_cta_${exam.toLowerCase()}`)}
            className="apple-btn-secondary min-h-[50px] inline-flex items-center gap-2 px-7 py-3.5 rounded-xl sm:rounded-full text-base font-medium cursor-pointer w-full sm:w-auto justify-center text-slate-100"
          >
            <svg className="w-5 h-5 fill-current text-emerald-400" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp Us
          </a>

          {phoneUrl !== "#" && (
            <a
              href={phoneUrl}
              onClick={() => trackCallClick(`final_cta_${exam.toLowerCase()}`)}
              className="apple-btn-secondary min-h-[50px] inline-flex items-center gap-2 px-7 py-3.5 rounded-xl sm:rounded-full text-base font-medium cursor-pointer w-full sm:w-auto justify-center text-slate-100"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Now
            </a>
          )}
        </div>

        {/* Disclaimer */}
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 max-w-2xl mx-auto flex items-start gap-2.5 text-left">
          <svg className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
