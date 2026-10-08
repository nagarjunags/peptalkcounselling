import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vite.dev/config/
//
// base MUST be "/" because the site uses a custom domain
// (counselling.physicspeptalk.com) served from the root.
//
// MPA entries:
//   /kcet/   → kcet/index.html
//   /comedk/ → comedk/index.html
//
// Privacy-policy and terms redirect to the parent site so their
// HTML files only need to bootstrap the React app; they don't need
// separate MPA entries unless you want unique URLs.
export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    outDir: "dist",
    sourcemap: false,
    rollupOptions: {
      input: {
        // KCET page — https://counselling.physicspeptalk.com/kcet/
        kcet: resolve(import.meta.dirname, "kcet/index.html"),
        // COMEDK page — https://counselling.physicspeptalk.com/comedk/
        comedk: resolve(import.meta.dirname, "comedk/index.html"),
        // KCET Rank & College Predictor — https://counselling.physicspeptalk.com/kcet-college-predictor/
        "kcet-college-predictor": resolve(import.meta.dirname, "kcet-college-predictor/index.html"),
        // Privacy policy & terms (redirects to parent site)
        "privacy-policy": resolve(import.meta.dirname, "privacy-policy.html"),
        terms: resolve(import.meta.dirname, "terms.html"),
      },
      output: {
        assetFileNames: "assets/[name]-[hash][extname]",
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
      },
    },
  },
});
