/**
 * Central configuration for the KCET 2027 Counselling website.
 * All configurable values live here — do NOT duplicate them across components.
 */

export const siteConfig = {
  /** Brand name shown in header and footer */
  brandName: "Physics Pep Talk",

  /** Service name */
  serviceName: "KCET 2027 Counselling Guidance",

  /** Short tagline shown in header subtitle */
  headerTagline: "KCET 2027 Counselling",

  /** Production URL (used for canonical, OG, sitemap) */
  websiteUrl: "https://kcetcounselling.physicspeptalk.com",

  /** Parent brand website */
  parentWebsite: "https://physicspeptalk.com",

  /** Privacy Policy URL (hosted on parent site) */
  privacyPolicyUrl: "https://physicspeptalk.com/privacy-policy",

  /** Terms & Disclaimer URL (hosted on parent site) */
  termsUrl: "https://physicspeptalk.com/terms",

  /**
   * WhatsApp number in international format WITHOUT + or spaces.
   * Example: "919876543210" for +91 98765 43210
   * Leave empty string until number is confirmed.
   */
  whatsappNumber: "9986555819",

  /** Phone number for tel: links */
  phoneNumber: "9986555819",

  /** Contact email */
  email: "Physicspeptalk@gmail.com",

  /** Google Analytics 4 Measurement ID — leave empty until configured */
  ga4MeasurementId: "G-LSBBH9XZ5X",

  /** Default WhatsApp message pre-filled when user clicks WhatsApp buttons */
  whatsappDefaultMessage:
    "Hi, I am interested in KCET 2027 counselling guidance. I would like to know about the counselling package and pricing.",

  /** SEO */
  seo: {
    title: "KCET 2027 Counselling Guidance | College Selection & Option Entry",
    description:
      "Get personalized KCET 2027 counselling guidance for college selection, branch selection and option entry. Get support throughout the counselling process.",
    ogImage: "https://kcetcounselling.physicspeptalk.com/images/og-image.png",
    keywords: [
      // Core service terms
      "KCET 2027 counselling",
      "KCET counselling 2027",
      "KCET 2027 counselling guidance",
      "KCET counselling guidance",
      "KCET counselling help",
      "KCET counselling service",
      "KCET counselling Karnataka",
      "KCET engineering counselling",

      // Option entry
      "KCET option entry",
      "KCET option entry 2027",
      "KCET option entry guidance",
      "KCET option entry help",
      "KCET option entry strategy",
      "KCET choice filling",
      "KCET choice filling 2027",
      "KCET choice filling guidance",
      "KEA option entry",
      "KEA choice filling",

      // College and branch selection
      "KCET college selection",
      "KCET college selection 2027",
      "KCET branch selection",
      "KCET branch selection guidance",
      "KCET engineering college selection",
      "KCET college counselling",
      "best college for KCET rank",
      "KCET college list 2027",

      // Seat allotment
      "KCET seat allotment",
      "KCET seat allotment 2027",
      "KCET seat allotment guidance",
      "KEA seat allotment 2027",
      "KCET allotment rounds",
      "KCET round 1 allotment",
      "KCET round 2 allotment",
      "KCET extended round",
      "KCET allotment result",

      // Document verification
      "KCET document verification",
      "KCET document verification 2027",
      "KEA document verification",
      "KCET documents required",
      "KCET eligibility verification",

      // Rank and cutoff
      "KCET rank analysis",
      "KCET cutoff 2027",
      "KCET previous year cutoff",
      "KCET closing rank",
      "KCET rank wise college",
      "KCET rank predictor",
      "KCET college predictor",

      // KEA / Karnataka
      "KEA counselling 2027",
      "KEA Karnataka engineering admission",
      "Karnataka engineering admission 2027",
      "Karnataka engineering counselling",
      "Karnataka CET counselling",

      // Brand
      "Physics Pep Talk KCET",
      "Physics Pep Talk counselling",
    ],
  },

  /** Nav links */
  navLinks: [
    { label: "Home", href: "#home" },
    { label: "Contact", href: "#contact" },
    { label: "Services", href: "#services" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "FAQs", href: "#faq" },
  ],
};

/**
 * Build a WhatsApp click-to-chat URL.
 * Falls back to wa.me without a number if whatsappNumber is empty (opens WhatsApp).
 */
export function buildWhatsAppUrl(message?: string): string {
  const num = siteConfig.whatsappNumber;
  const text = encodeURIComponent(message ?? siteConfig.whatsappDefaultMessage);
  if (!num) return `https://wa.me/?text=${text}`;
  return `https://wa.me/${num}?text=${text}`;
}

/**
 * Build a tel: URL. Returns "#" if phoneNumber is empty.
 */
export function buildPhoneUrl(): string {
  if (!siteConfig.phoneNumber) return "#";
  return `tel:${siteConfig.phoneNumber}`;
}
