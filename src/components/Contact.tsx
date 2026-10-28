import { buildWhatsAppUrl, buildPhoneUrl, siteConfig } from "../config/siteConfig";
import { trackWhatsAppClick, trackCallClick, trackCTAClick } from "../utils/analytics";
import { useSheetConfig } from "../context/SheetConfigContext";
import { useExam } from "../context/ExamContext";
import Tilt3DCard from "./3d/Tilt3DCard";

export default function Contact() {
  const { year, counsellingBatchUrl, counsellingBatchThumbnail, loading } =
    useSheetConfig();
  const { exam } = useExam();

  const batchHeading =
    exam === "COMEDK"
      ? `Join the COMEDK ${year} Counselling Batch`
      : `Join the KCET ${year} Counselling Batch`;

  const batchSubheading =
    exam === "COMEDK"
      ? "Get personalised guidance for college selection, branch selection, and choice filling — from enrolment to final allotment."
      : "Get personalized guidance for college selection, branch selection, and option entry — from enrolment to final allotment.";

  const thumbnailAlt =
    exam === "COMEDK"
      ? `COMEDK ${year} Counselling Batch — Physics Pep Talk`
      : `KCET ${year} Counselling Batch — Physics Pep Talk`;

  const thumbnailLabel =
    exam === "COMEDK"
      ? `COMEDK ${year} Counselling Batch`
      : `KCET ${year} Counselling Batch`;

  const handleEnrolClick = () => {
    trackCTAClick(`enrol_counselling_batch_${exam.toLowerCase()}`);
  };

  return (
    <section
      id="contact"
      className="py-20 md:py-28 bg-[#020617] text-slate-100 relative overflow-hidden border-t border-slate-800"
      aria-label="Enrol in counselling batch"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-amber-500/[0.02] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-sky-500/[0.02] rounded-full blur-[160px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="inline-block text-amber-300 font-semibold text-sm uppercase tracking-widest mb-3">
            Enrol Now
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {batchHeading}
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto">
            {batchSubheading}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: batch thumbnail + enrol CTA */}
          <div className="flex flex-col items-center lg:items-start gap-6">
            <Tilt3DCard className="w-full" maxTilt={3}>
              <div className="apple-card p-3 sm:p-4 border-slate-800 bg-[#050b18]/85 w-full">
                {/* Thumbnail */}
                <div className="w-full rounded-2xl overflow-hidden shadow-lg border border-slate-800 bg-[#020617] aspect-video flex items-center justify-center">
                  {loading ? (
                    <div className="w-full h-full animate-pulse bg-slate-800/50" />
                  ) : counsellingBatchThumbnail ? (
                    <>
                      <img
                        src={counsellingBatchThumbnail}
                        alt={thumbnailAlt}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        width="640"
                        height="360"
                        onError={(e) => {
                          const img = e.currentTarget as HTMLImageElement;
                          img.style.display = "none";
                          const fallback = img.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = "flex";
                        }}
                      />
                      <div className="hidden flex-col items-center gap-3 text-slate-400 p-8">
                        <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.069A1 1 0 0121 8.868V15.13a1 1 0 01-1.447.899L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                        </svg>
                        <span className="text-sm font-medium">{thumbnailLabel}</span>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-3 text-slate-400 p-8">
                      <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.069A1 1 0 0121 8.868V15.13a1 1 0 01-1.447.899L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                      </svg>
                      <span className="text-sm font-medium">{thumbnailLabel}</span>
                    </div>
                  )}
                </div>
              </div>
            </Tilt3DCard>

            {/* Enrol button */}
            {counsellingBatchUrl ? (
              <a
                href={counsellingBatchUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleEnrolClick}
                className="w-full apple-btn-primary min-h-[50px] inline-flex items-center justify-center gap-3 text-base font-bold shadow-lg"
              >
                <span>Enrol in the Counselling Batch</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            ) : (
              <div className="w-full flex items-center justify-center gap-2 bg-slate-900 border border-slate-800 text-slate-400 font-medium px-8 py-4 rounded-xl text-sm cursor-not-allowed select-none">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Enrolment Opening Soon</span>
              </div>
            )}

            <p className="text-xs text-slate-400 text-center lg:text-left leading-relaxed">
              This is a paid counselling guidance service. Enrolment link opens the official batch registration page. No specific college or branch is guaranteed.
            </p>
          </div>

          {/* Right: contact options */}
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="text-white font-bold text-xl mb-2">
                Have a question before enrolling?
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Reach out on WhatsApp or call us directly. We'll help you decide if this batch is the right fit for your rank and goals.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {/* WhatsApp */}
              <Tilt3DCard maxTilt={3}>
                <a
                  href={buildWhatsAppUrl(undefined, exam)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick(`contact_section_${exam.toLowerCase()}`)}
                  className="apple-card p-4 flex items-center gap-4 group cursor-pointer border-slate-800 hover:border-emerald-500/40 transition-colors"
                >
                  <span className="w-11 h-11 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 flex-shrink-0 group-hover:scale-105 transition-transform">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-white font-semibold text-sm">WhatsApp Us</p>
                    <p className="text-slate-400 text-xs">
                      {siteConfig.whatsappNumber ? `+${siteConfig.whatsappNumber}` : "Message us on WhatsApp"}
                    </p>
                  </div>
                  <svg className="w-4 h-4 text-slate-500 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </Tilt3DCard>

              {/* Call */}
              {siteConfig.phoneNumber && (
                <Tilt3DCard maxTilt={3}>
                  <a
                    href={buildPhoneUrl()}
                    onClick={() => trackCallClick(`contact_section_${exam.toLowerCase()}`)}
                    className="apple-card p-4 flex items-center gap-4 group cursor-pointer border-slate-800 hover:border-slate-600 transition-colors"
                  >
                    <span className="w-11 h-11 rounded-full bg-slate-800 flex items-center justify-center text-slate-200 flex-shrink-0 group-hover:scale-105 transition-transform">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-white font-semibold text-sm">Call Us</p>
                      <p className="text-slate-400 text-xs">{siteConfig.phoneNumber}</p>
                    </div>
                    <svg className="w-4 h-4 text-slate-500 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </Tilt3DCard>
              )}

              {/* Email */}
              {siteConfig.email && (
                <Tilt3DCard maxTilt={3}>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="apple-card p-4 flex items-center gap-4 group cursor-pointer border-slate-800 hover:border-slate-600 transition-colors"
                  >
                    <span className="w-11 h-11 rounded-full bg-slate-800 flex items-center justify-center text-slate-200 flex-shrink-0 group-hover:scale-105 transition-transform">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-white font-semibold text-sm">Email</p>
                      <p className="text-slate-400 text-xs">{siteConfig.email}</p>
                    </div>
                    <svg className="w-4 h-4 text-slate-500 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </Tilt3DCard>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
