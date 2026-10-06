import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import HowItWorks from "./components/HowItWorks";
import OptionEntry from "./components/OptionEntry";
import WhatYouGet from "./components/WhatYouGet";
import TrustSection from "./components/TrustSection";
import RoundSupport from "./components/RoundSupport";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import MobileCTA from "./components/MobileCTA";
import Testimonials from "./components/Testimonials";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import { SheetConfigProvider } from "./context/SheetConfigContext";

/**
 * Simple path-based routing without react-router.
 * Works with GitHub Pages because we create separate HTML entry points
 * for /privacy-policy and /terms in the build (see vite.config.ts or
 * public copies). For the MVP, we do client-side path detection.
 *
 * Note: If you add more pages, consider adding react-router-dom.
 */
function usePage(): "home" | "privacy" | "terms" {
  const path = window.location.pathname.replace(/\/$/, "");
  if (path === "/privacy-policy") return "privacy";
  if (path === "/terms") return "terms";
  return "home";
}

export default function App() {
  const page = usePage();

  if (page === "privacy") return <PrivacyPolicy />;
  if (page === "terms") return <Terms />;

  /**
   * Main landing page — single page layout.
   * Wrapped in SheetConfigProvider so all children can read remote config
   * (e.g. the `year` variable from the Google Sheet).
   * Add bottom padding to prevent the fixed mobile CTA bar from overlapping content.
   */
  return (
    <SheetConfigProvider>
      <div className="min-h-screen bg-white pb-14 md:pb-0">
        {/* Fixed sticky header */}
        <Header />

        {/* Main content */}
        <main id="main-content">
          <Hero />
          <Services />
          <HowItWorks />
          <OptionEntry />
          <WhatYouGet />
          <TrustSection />
          <RoundSupport />
          <Testimonials />
          <FAQ />
          <Contact />
          <FinalCTA />
        </main>

        <Footer />

        {/* Fixed mobile bottom CTA bar (hidden on md+) */}
        <MobileCTA />
      </div>
    </SheetConfigProvider>
  );
}
