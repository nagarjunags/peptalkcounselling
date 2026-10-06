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

// ─── Default / fallback values ────────────────────────────────────────────────
// These are used while the sheet is loading OR if the fetch fails.
// Keep them in sync with siteConfig.ts.
const DEFAULTS: SheetConfig = {
  year: "2027",
};

// ─── Context shape ─────────────────────────────────────────────────────────────

interface SheetConfigState {
  /** All raw key→value pairs from the sheet (merged with defaults) */
  config: SheetConfig;
  /** Convenience shortcut: the KCET year string */
  year: string;
  /** True while the initial fetch is in-flight */
  loading: boolean;
  /** Non-null if the fetch failed (app still works via defaults) */
  error: Error | null;
}

const SheetConfigContext = createContext<SheetConfigState>({
  config: DEFAULTS,
  year: DEFAULTS.year,
  loading: false,
  error: null,
});

// ─── Provider ──────────────────────────────────────────────────────────────────

export function SheetConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<SheetConfig>(DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const remote = await fetchSheetConfig();
        if (!cancelled) {
          // Merge: remote values override defaults, but missing keys keep defaults
          setConfig({ ...DEFAULTS, ...remote });
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error(String(err)));
          // Keep defaults on error — already set in useState
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
