/**
 * SheetConfigContext.tsx
 *
 * Provides the remote Google Sheet config values to the entire component tree.
 *
 * Usage anywhere in the app:
 *   import { useSheetConfig } from "../context/SheetConfigContext";
 *   const { year, loading } = useSheetConfig();
 */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { fetchSheetConfig, type SheetConfig } from "../utils/sheetConfig";
import { fetchTestimonials, type Testimonial } from "../utils/testimonialsConfig";

// ─── Default / fallback values ────────────────────────────────────────────────
const DEFAULTS: SheetConfig = {
  year: "2027",
  counsellingbatchurl: "",
  counsellingbatchthumbnail: "",
};

// ─── Context shape ─────────────────────────────────────────────────────────────

interface SheetConfigState {
  config: SheetConfig;
  year: string;
  counsellingBatchUrl: string;
  counsellingBatchThumbnail: string;
  /** Testimonial videos from the testimonials sheet tab */
  testimonials: Testimonial[];
  loading: boolean;
  error: Error | null;
}

const SheetConfigContext = createContext<SheetConfigState>({
  config: DEFAULTS,
  year: DEFAULTS.year,
  counsellingBatchUrl: "",
  counsellingBatchThumbnail: "",
  testimonials: [],
  loading: false,
  error: null,
});

// ─── Provider ──────────────────────────────────────────────────────────────────

export function SheetConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<SheetConfig>(DEFAULTS);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        // Fetch config and testimonials in parallel
        const [remote, testimonialsData] = await Promise.all([
          fetchSheetConfig(),
          fetchTestimonials(),
        ]);
        if (!cancelled) {
          setConfig({ ...DEFAULTS, ...remote });
          setTestimonials(testimonialsData);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error(String(err)));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const value: SheetConfigState = {
    config,
    year: config.year ?? DEFAULTS.year,
    counsellingBatchUrl: config.counsellingbatchurl ?? "",
    counsellingBatchThumbnail: config.counsellingbatchthumbnail ?? "",
    testimonials,
    loading,
    error,
  };

  return (
    <SheetConfigContext.Provider value={value}>
      {children}
    </SheetConfigContext.Provider>
  );
}

// ─── Hook ──────────────────────────────────────────────────────────────────────

/**
 * Access sheet config values anywhere in the app.
 *
 * @example
 *   const { year, loading } = useSheetConfig();
 *   return <h1>KCET {year} Counselling</h1>;
 */
export function useSheetConfig(): SheetConfigState {
  return useContext(SheetConfigContext);
}
