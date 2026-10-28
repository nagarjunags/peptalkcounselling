import { useExam } from "../context/ExamContext";
import Tilt3DCard from "./3d/Tilt3DCard";
import { CyberBadge } from "./3d/CyberHUDDecor";

const kcetDeliverables = [
  { title: "Rank Analysis", description: "A deep one-on-one review of your KCET rank and category to identify exactly what's within reach — and what to target — in this year's counselling." },
  { title: "College Shortlist", description: "A personalised shortlist of colleges realistically within reach, built from previous-year seat matrix data — not generic lists." },
  { title: "Branch Guidance", description: "A focused discussion on which branches suit your interests and career goals at each shortlisted college, so you're choosing a future, not just a seat." },
  { title: "Seat Matrix Analysis", description: "We use actual previous-year seat matrix data to show you closing ranks by college, branch, and category — so your option entry is grounded in real numbers." },
  { title: "Option-Entry Strategy", description: "Your priorities, our data. We build your option list together — ordered to maximise your chances of getting the best possible college for your rank." },
  { title: "Option-List Review", description: "Before you hit submit, we review your entire option list one more time to catch any gaps, ordering mistakes, or missed opportunities." },
  { title: "Round-by-Round Follow-up", description: "We stay with you through every counselling round — evaluating each allotment, advising on upgrades, and guiding you until you've confirmed a seat you're happy with." },
  { title: "PCM Teaching — Zero Extra Cost", description: "Struggling with Physics, Chemistry, or Maths for Boards or KCET? We cover PCM teaching as part of the package — at absolutely zero extra cost." },
];

const comdekDeliverables = [
  { title: "Rank Analysis", description: "A deep one-on-one review of your COMEDK rank to identify exactly what's within reach — and what to target — in this year's counselling." },
  { title: "College Shortlist", description: "A personalised shortlist of COMEDK colleges realistically within your reach, built from previous-year seat data — not generic lists." },
  { title: "Branch Guidance", description: "A focused discussion on which engineering branches suit your interests and career goals at each shortlisted college, so you're choosing a future, not just a seat." },
  { title: "Seat Data Analysis", description: "We use actual previous-year COMEDK seat data to show you closing ranks by college and branch — so your choice filling is grounded in real numbers." },
  { title: "Choice Filling Strategy", description: "Your priorities, our data. We build your COMEDK choice list together — ordered to maximise your chances of getting the best possible college for your rank." },
  { title: "Choice List Review", description: "Before you submit, we review your entire choice list one final time to catch any gaps, ordering issues, or missed opportunities." },
  { title: "Round-by-Round Follow-up", description: "We stay with you through every COMEDK counselling round — evaluating each allotment, advising on upgrades, and guiding you until you've confirmed a seat you're happy with." },
  { title: "PCM Teaching — Zero Extra Cost", description: "Struggling with Physics, Chemistry, or Maths for Boards or COMEDK? We cover PCM teaching as part of the package — at absolutely zero extra cost." },
];

export default function WhatYouGet() {
  const { exam } = useExam();
  const deliverables = exam === "COMEDK" ? comdekDeliverables : kcetDeliverables;

  const heading =
    exam === "COMEDK"
      ? "Everything You Need to Navigate COMEDK Counselling"
      : "Everything You Need to Navigate Counselling";

  const subheading =
    exam === "COMEDK"
      ? "Everything included in one package — from rank analysis to final seat confirmation, plus PCM teaching at zero extra cost."
      : "Everything included in one package — from rank analysis to final seat confirmation, plus PCM teaching at zero extra cost.";

  return (
    <section
      id="what-you-get"
      className="py-20 md:py-28 bg-black text-[#f5f5f7] relative overflow-hidden border-t border-white/[0.08]"
      aria-label="What you get"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-white/[0.02] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="mb-4">
            <CyberBadge color="gold">Inclusions</CyberBadge>
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold text-[#f5f5f7] mb-4 tracking-tight">
            {heading}
          </h2>
          <p className="text-[#86868b] text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
            {subheading}
          </p>
        </div>

        {/* Deliverables 3D Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {deliverables.map((item) => (
            <Tilt3DCard key={item.title} maxTilt={6}>
              <div className="apple-card p-6 h-full flex flex-col justify-between group">
                <div>
                  <div className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#e2b474] mb-4">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-[#f5f5f7] font-semibold text-base leading-snug mb-2 group-hover:text-white transition-colors tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-[#86868b] text-xs leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            </Tilt3DCard>
          ))}
        </div>

        {/* Pricing disclaimer with Apple Card */}
        <div className="text-center max-w-2xl mx-auto">
          <Tilt3DCard maxTilt={5}>
            <div className="apple-card p-8">
              <p className="text-[#86868b] text-sm mb-5 leading-relaxed font-normal">
                Limited seats available. Contact us for current pricing.
                <br />
                <span className="text-[#f5f5f7] font-medium">Note:</span> No refunds once enrolled.
              </p>
              <a
                href="#contact"
                className="apple-btn-primary min-h-[50px] inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-base font-semibold cursor-pointer"
              >
                <span>Contact us for package details and pricing</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </Tilt3DCard>
        </div>
      </div>
    </section>
  );
}
