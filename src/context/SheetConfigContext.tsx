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
  loading: boolean;
  error: Error | null;
}

const SheetConfigContext = createContext<SheetConfigState>({
  config: DEFAULTS,
  year: DEFAULTS.year,
  counsellingBatchUrl: "",
  counsellingBatchThumbnail: "",
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
    counsellingBatchUrl: config.counsellingbatchurl ?? "",
    counsellingBatchThumbnail: config.counsellingbatchthumbnail ?? "",
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
