import { useEffect } from "react";
import { siteConfig } from "../config/siteConfig";

/**
 * Redirects to the Privacy Policy on the parent site (physicspeptalk.com).
 * This site does not host its own privacy policy.
 */
export default function PrivacyPolicy() {
  useEffect(() => {
    window.location.replace(siteConfig.privacyPolicyUrl);
  }, []);

  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center">
      <p className="text-slate-400 text-sm">
        Redirecting to Privacy Policy…{" "}
        <a
          href={siteConfig.privacyPolicyUrl}
          className="text-sky-300 hover:underline"
        >
          Click here if you are not redirected.
        </a>
      </p>
    </div>
  );
}
