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
import NotFound from "./pages/NotFound";
import { SheetConfigProvider } from "./context/SheetConfigContext";
import { ExamProvider } from "./context/ExamContext";
import type { ExamType } from "./config/siteConfig";
import GlobalThreeCanvas from "./components/3d/GlobalThreeCanvas";

/**
 * Detect the current page from the URL path.
 *
 * /kcet/    → exam page (KCET)
 * /comedk/  → exam page (COMEDK)
 * /privacy-policy → privacy page
 * /terms          → terms page
 */
function detectPage():
  | { type: "exam"; exam: ExamType }
  | { type: "privacy" | "terms" | "notfound" } {
  const path = window.location.pathname;

  // Normalise: strip trailing slash for comparison
  const normalised = path.replace(/\/$/, "");

  if (normalised === "/privacy-policy") return { type: "privacy" };
  if (normalised === "/terms") return { type: "terms" };
  if (normalised.startsWith("/comedk")) return { type: "exam", exam: "COMEDK" };
  if (normalised.startsWith("/kcet") || normalised === "") return { type: "exam", exam: "KCET" };

  return { type: "notfound" };
}

/**
 * Main landing page layout — shared by both KCET and COMEDK.
 * Packed with interactive 3D WebGL animations and futuristic cyber styling.
 */
function CounsellingPage({ exam }: { exam: ExamType }) {
  return (
    <ExamProvider exam={exam}>
      <SheetConfigProvider>
        <div className="min-h-screen bg-[#020617] text-slate-100 pb-28 md:pb-0 relative selection:bg-amber-300 selection:text-slate-950 antialiased font-sans">
          {/* Ambient 3D Three.js WebGL Particle & Geometry Canvas */}
          <GlobalThreeCanvas />

          {/* Fixed sticky frosted glass header */}
          <Header />

          {/* Main content */}
          <main id="main-content" className="relative z-10">
            <Hero />
            <Contact />
            <Testimonials />
            <Services />
            <HowItWorks />
            <OptionEntry />
            <WhatYouGet />
            <TrustSection />
            <RoundSupport />
            <FAQ />
            <FinalCTA />
          </main>

          <Footer />

          {/* Fixed mobile bottom CTA bar (hidden on md+) */}
          <MobileCTA />
        </div>
      </SheetConfigProvider>
    </ExamProvider>
  );
}

export default function App() {
  const page = detectPage();

  if (page.type === "privacy") return <PrivacyPolicy />;
  if (page.type === "terms") return <Terms />;
  if (page.type === "notfound") return <NotFound />;

  const exam = page.type === "exam" ? page.exam : "KCET";
  return <CounsellingPage exam={exam} />;
}
