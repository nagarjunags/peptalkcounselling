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
      "KCET 2027 Counselling",
      "KCET counselling 2027",
      "KCET 2027 counselling guidance",
      "KCET college counselling",
      "KCET option entry",
      "KCET option entry guidance",
      "KCET college selection",
      "KCET counselling help",
      "KCET engineering counselling",
      "KCET counselling Karnataka",
      "KCET engineering college selection",
      "KCET counselling service",
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
