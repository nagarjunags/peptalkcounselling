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
      ? "Personalised 1-on-1 guidance for college selection, branch prioritization, and choice filling — from enrolment to final allotment."
      : "Personalised 1-on-1 guidance for college selection, branch prioritization, and option entry — from enrolment to final allotment.";

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
      className="py-20 md:py-28 bg-[#030712] text-slate-100 relative overflow-hidden border-t border-sky-500/15"
      aria-label="Enrol in counselling batch"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-sky-500/[0.03] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-indigo-600/[0.03] rounded-full blur-[160px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-sky-500/20 backdrop-blur-md mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            <span className="text-[11px] font-mono tracking-wider text-sky-200/90 font-medium uppercase">
              Registration &amp; Enrollment
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-[1.15] mb-4">
            {batchHeading}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
            {batchSubheading}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: batch thumbnail + enrol CTA (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start gap-5">
            <Tilt3DCard className="w-full" maxTilt={4}>
              <div className="apple-card p-3 sm:p-4 relative group border-sky-500/20 bg-[#060c1d]/85">
                {/* Thumbnail */}
                <div className="w-full rounded-xl overflow-hidden aspect-video bg-[#070e20] flex items-center justify-center border border-sky-500/15 relative">
                  {loading ? (
                    <div className="w-full h-full animate-pulse bg-sky-950/30" />
                  ) : counsellingBatchThumbnail ? (
                    <>
                      <img
                        src={counsellingBatchThumbnail}
                        alt={thumbnailAlt}
                        className="w-full h-full object-cover transform group-hover:scale-102 transition-transform duration-700"
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
                      <div className="hidden flex-col items-center gap-3 text-sky-400/60 p-8">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.069A1 1 0 0121 8.868V15.13a1 1 0 01-1.447.899L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                        </svg>
                        <span className="text-sm font-medium">{thumbnailLabel}</span>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-3 text-sky-400/60 p-8">
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
                className="w-full apple-btn-primary min-h-[50px] rounded-xl sm:rounded-full inline-flex items-center justify-center gap-3 text-base font-semibold cursor-pointer shadow-lg"
              >
                <span>Enrol in the Counselling Batch</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            ) : (
              <div className="w-full flex items-center justify-center gap-2 bg-slate-900/60 border border-sky-500/20 text-slate-400 font-medium px-8 py-3.5 rounded-xl sm:rounded-full text-sm cursor-not-allowed select-none min-h-[50px]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Enrolment Opening Soon</span>
              </div>
            )}

            <div className="flex items-start gap-2.5 text-xs text-slate-400 leading-relaxed max-w-xl p-3 rounded-lg bg-slate-900/50 border border-sky-500/10">
              <svg className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              <p>
                Paid educational counselling service. Official batch registration opens directly. No specific college or branch allotment is guaranteed.
              </p>
            </div>
          </div>

          {/* Right: Direct Channels (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div>
              <h3 className="text-white font-semibold text-xl sm:text-2xl mb-2 tracking-tight">
                Have a question before enrolling?
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed font-normal">
                Speak directly with our mentors on WhatsApp or phone. We'll honestly assess your rank, expectations, and whether this batch is right for you.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {/* WhatsApp */}
              <Tilt3DCard maxTilt={4}>
                <a
                  href={buildWhatsAppUrl(undefined, exam)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick(`contact_section_${exam.toLowerCase()}`)}
                  className="apple-card p-4 flex items-center gap-4 group cursor-pointer border-sky-500/15 hover:border-emerald-500/30 transition-colors"
                >
                  <span className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 flex-shrink-0 group-hover:scale-105 transition-transform">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-white font-semibold text-sm">Direct WhatsApp Advisory</p>
                    <p className="text-slate-400 text-xs font-mono">
                      {siteConfig.whatsappNumber ? `+${siteConfig.whatsappNumber}` : "Message us directly"}
                    </p>
                  </div>
                  <svg className="w-4 h-4 text-slate-400 ml-auto transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </Tilt3DCard>

              {/* Call */}
              {siteConfig.phoneNumber && (
                <Tilt3DCard maxTilt={4}>
                  <a
                    href={buildPhoneUrl()}
                    onClick={() => trackCallClick(`contact_section_${exam.toLowerCase()}`)}
                    className="apple-card p-4 flex items-center gap-4 group cursor-pointer border-sky-500/15 hover:border-sky-400/30 transition-colors"
                  >
                    <span className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/25 flex items-center justify-center text-sky-400 flex-shrink-0 group-hover:scale-105 transition-transform">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-white font-semibold text-sm">Direct Phone Call</p>
                      <p className="text-slate-400 text-xs font-mono">{siteConfig.phoneNumber}</p>
                    </div>
                    <svg className="w-4 h-4 text-slate-400 ml-auto transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </Tilt3DCard>
              )}

              {/* Email */}
              {siteConfig.email && (
                <Tilt3DCard maxTilt={4}>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="apple-card p-4 flex items-center gap-4 group cursor-pointer border-sky-500/15 hover:border-indigo-400/30 transition-colors"
                  >
                    <span className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center text-indigo-400 flex-shrink-0 group-hover:scale-105 transition-transform">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-white font-semibold text-sm">Direct Email Dispatch</p>
                      <p className="text-slate-400 text-xs font-mono">{siteConfig.email}</p>
                    </div>
                    <svg className="w-4 h-4 text-slate-400 ml-auto transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
