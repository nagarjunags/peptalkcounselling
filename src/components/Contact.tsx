import { buildWhatsAppUrl, buildPhoneUrl, siteConfig } from "../config/siteConfig";
import { trackWhatsAppClick, trackCallClick, trackCTAClick } from "../utils/analytics";
import { useSheetConfig } from "../context/SheetConfigContext";
import { useExam } from "../context/ExamContext";
import Tilt3DCard from "./3d/Tilt3DCard";
import { CyberBadge } from "./3d/CyberHUDDecor";

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
      className="py-20 md:py-28 bg-black text-[#f5f5f7] relative overflow-hidden border-t border-white/[0.08]"
      aria-label="Enrol in counselling batch"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#e2b474]/[0.02] rounded-full blur-[160px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-14">
          <div className="mb-4">
            <CyberBadge color="gold">Registration</CyberBadge>
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold text-[#f5f5f7] mb-4 tracking-tight">
            {batchHeading}
          </h2>
          <p className="text-[#86868b] text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
            {batchSubheading}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: batch thumbnail + enrol CTA (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start gap-6">
            <Tilt3DCard className="w-full" maxTilt={6}>
              <div className="apple-card p-3 sm:p-4 relative group">
                {/* Thumbnail */}
                <div className="w-full rounded-2xl overflow-hidden aspect-video bg-[#0c0c0e] flex items-center justify-center border border-white/[0.08] relative">
                  {loading ? (
                    <div className="w-full h-full animate-pulse bg-white/[0.03]" />
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
                      <div className="hidden flex-col items-center gap-3 text-[#86868b] p-8">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.069A1 1 0 0121 8.868V15.13a1 1 0 01-1.447.899L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                        </svg>
                        <span className="text-sm font-medium">{thumbnailLabel}</span>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-3 text-[#86868b] p-8">
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
                className="w-full apple-btn-primary min-h-[52px] rounded-full inline-flex items-center justify-center gap-3 text-base font-semibold cursor-pointer shadow-lg"
              >
                <span>Enrol in the Counselling Batch</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            ) : (
              <div className="w-full flex items-center justify-center gap-2 bg-white/[0.04] border border-white/[0.08] text-[#86868b] font-medium px-8 py-4 rounded-full text-base cursor-not-allowed select-none min-h-[52px]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Enrolment Opening Soon
              </div>
            )}

            <div className="flex items-start gap-2 text-xs text-[#86868b] leading-relaxed max-w-xl">
              <svg className="w-4 h-4 text-[#e2b474] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              <p>
                This is a paid counselling guidance service. Enrolment link opens the official batch registration page. No specific college or branch is guaranteed.
              </p>
            </div>
          </div>

          {/* Right: Contact Options in Apple Cards (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div>
              <h3 className="text-[#f5f5f7] font-semibold text-2xl mb-2 tracking-tight">
                Have a question before enrolling?
              </h3>
              <p className="text-[#86868b] text-sm leading-relaxed">
                Reach out on WhatsApp or call us directly. We'll help you decide if this batch is the right fit for your rank and goals.
              </p>
            </div>

            <div className="flex flex-col gap-3.5">
              {/* WhatsApp */}
              <Tilt3DCard maxTilt={5}>
                <a
                  href={buildWhatsAppUrl(undefined, exam)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick(`contact_section_${exam.toLowerCase()}`)}
                  className="apple-card p-4 flex items-center gap-4 group cursor-pointer"
                >
                  <span className="w-11 h-11 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-emerald-400 flex-shrink-0 group-hover:scale-105 transition-transform">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-[#f5f5f7] font-semibold text-sm">WhatsApp Us</p>
                    <p className="text-[#86868b] text-xs">
                      {siteConfig.whatsappNumber ? `+${siteConfig.whatsappNumber}` : "Message us on WhatsApp"}
                    </p>
                  </div>
                  <svg className="w-4 h-4 text-[#86868b] ml-auto transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </Tilt3DCard>

              {/* Call */}
              {siteConfig.phoneNumber && (
                <Tilt3DCard maxTilt={5}>
                  <a
                    href={buildPhoneUrl()}
                    onClick={() => trackCallClick(`contact_section_${exam.toLowerCase()}`)}
                    className="apple-card p-4 flex items-center gap-4 group cursor-pointer"
                  >
                    <span className="w-11 h-11 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#70a9ff] flex-shrink-0 group-hover:scale-105 transition-transform">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-[#f5f5f7] font-semibold text-sm">Call Us</p>
                      <p className="text-[#86868b] text-xs">{siteConfig.phoneNumber}</p>
                    </div>
                    <svg className="w-4 h-4 text-[#86868b] ml-auto transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </Tilt3DCard>
              )}

              {/* Email */}
              {siteConfig.email && (
                <Tilt3DCard maxTilt={5}>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="apple-card p-4 flex items-center gap-4 group cursor-pointer"
                  >
                    <span className="w-11 h-11 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#d1d5db] flex-shrink-0 group-hover:scale-105 transition-transform">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-[#f5f5f7] font-semibold text-sm">Email</p>
                      <p className="text-[#86868b] text-xs">{siteConfig.email}</p>
                    </div>
                    <svg className="w-4 h-4 text-[#86868b] ml-auto transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
