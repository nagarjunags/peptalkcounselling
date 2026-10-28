import { useState } from "react";
import { useExam } from "../context/ExamContext";

const kcetFaqs = [
  {
    question: "Is this service free?",
    answer:
      "No. This is a paid KCET counselling guidance service. Contact us for current package details and pricing.",
  },
  {
    question: "Do you guarantee a specific college or branch?",
    answer:
      "No. We do not guarantee admission to any specific college or branch. Final allotments are determined by the Karnataka Examinations Authority (KEA) based on rank, category, seat availability, cutoffs and other factors outside our control. No counselling service can honestly make this guarantee.",
  },
  {
    question: "Can you help with option entry?",
    answer:
      "Yes. We provide guidance for preparing, organizing and reviewing your KCET option-entry strategy. We help you understand how to prioritize your choices based on your rank, category and preferences.",
  },
  {
    question: "Do you support multiple counselling rounds?",
    answer:
      "Yes, according to the counselling package purchased. Support for each round is subject to the package you select. Contact us for details on what is included.",
  },
  {
    question: "Can you tell me exactly which college I will get?",
    answer:
      "No. We can analyze previous-year trends and your specific circumstances to help identify realistic possibilities, but future allotments depend on current-year cutoffs, seat availability and many other factors that cannot be predicted with certainty.",
  },
  {
    question: "Do you consider branch preferences?",
    answer:
      "Yes. Branch preferences are an important part of the counselling discussion. We help you weigh college vs branch priorities based on your individual situation and goals.",
  },
  {
    question: "Can parents participate in the counselling sessions?",
    answer:
      "Yes. Parents are welcome to participate in all counselling discussions. We encourage family involvement in major college and branch decisions.",
  },
  {
    question: "When should I reach out — before or after getting my rank?",
    answer:
      "You can reach out at any time. However, the most practical counselling can begin once your KCET rank is available, as the analysis is specific to your rank and category.",
  },
  {
    question: "Is this only for Karnataka students?",
    answer:
      "KCET counselling is specifically for students eligible for Karnataka Engineering entrance (KEA). If you are eligible for KCET counselling and need guidance, reach out to us.",
  },
];

const comdekFaqs = [
  {
    question: "Is this service free?",
    answer:
      "No. This is a paid COMEDK counselling guidance service. Contact us for current package details and pricing.",
  },
  {
    question: "Do you guarantee a specific college or branch?",
    answer:
      "No. We do not guarantee admission to any specific college or branch. Final allotments are determined by COMEDK authority based on rank, seat availability, cutoffs and other factors outside our control. No counselling service can honestly make this guarantee.",
  },
  {
    question: "Can you help with choice filling?",
    answer:
      "Yes. We provide guidance for preparing, reviewing, and optimising your COMEDK choice filling. We help you understand how to prioritise your choices based on your rank and preferences.",
  },
  {
    question: "Do you support multiple counselling rounds?",
    answer:
      "Yes, according to the counselling package purchased. Support for each round is subject to the package you select. Contact us for details on what is included.",
  },
  {
    question: "Can you tell me exactly which college I will get?",
    answer:
      "No. We can analyse previous-year COMEDK trends and your specific circumstances to help identify realistic possibilities, but future allotments depend on current-year cutoffs, seat availability and many other factors that cannot be predicted with certainty.",
  },
  {
    question: "Do you consider branch preferences?",
    answer:
      "Yes. Branch preferences are a central part of the COMEDK counselling discussion. We help you weigh college vs branch priorities based on your individual situation and goals.",
  },
  {
    question: "Can parents participate in the counselling sessions?",
    answer:
      "Yes. Parents are welcome to participate in all sessions. We encourage family involvement in major college and branch decisions.",
  },
  {
    question: "When should I reach out — before or after getting my COMEDK rank?",
    answer:
      "You can reach out at any time. However, the most practical counselling can begin once your COMEDK rank is available, as the analysis is specific to your rank.",
  },
  {
    question: "Is COMEDK only for Karnataka students?",
    answer:
      "COMEDK is open to students from across India for engineering admissions in Karnataka. If you are eligible for COMEDK counselling and need guidance, reach out to us.",
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="apple-card overflow-hidden transition-all duration-200 border-slate-800 bg-[#050b18]/85">
      <button
        type="button"
        onClick={onToggle}
        className="w-full text-left px-5 sm:px-6 py-4.5 sm:py-5 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-sm sm:text-base text-white leading-snug tracking-tight">
          {question}
        </span>
        <span
          className={`flex-shrink-0 w-6 h-6 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-amber-300" : ""
          }`}
          aria-hidden="true"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

      {isOpen && (
        <div className="px-5 sm:px-6 pb-5 pt-1 border-t border-slate-800 animate-in fade-in duration-150">
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { exam } = useExam();
  const faqs = exam === "COMEDK" ? comdekFaqs : kcetFaqs;

  const description =
    exam === "COMEDK"
      ? "Honest answers to common questions about our COMEDK counselling guidance service."
      : "Honest answers to common questions about our KCET counselling guidance service.";

  return (
    <section
      id="faq"
      className="py-20 md:py-28 bg-[#020617] text-slate-100 relative overflow-hidden border-t border-slate-800"
      aria-label="Frequently asked questions"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700/60 backdrop-blur-md mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span className="text-[11px] font-mono tracking-wider text-amber-200/90 font-medium uppercase">
              FAQs
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-[1.15] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
            {description}
          </p>
        </div>

        {/* Accordion List */}
        <div className="max-w-3xl mx-auto flex flex-col gap-3" role="list">
          {faqs.map((faq, i) => (
            <div key={faq.question} role="listitem">
              <FAQItem
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className="text-center mt-12">
          <p className="text-slate-400 text-xs sm:text-sm mb-4 font-normal">
            Have a question not answered above?
          </p>
          <a
            href="#contact"
            className="apple-btn-secondary min-h-[44px] inline-flex items-center gap-2 px-6 py-2.5 rounded-xl sm:rounded-full text-xs font-semibold cursor-pointer"
          >
            <span>Ask Us Directly</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
