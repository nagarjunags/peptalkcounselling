import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vite.dev/config/
// Base is "/" because the site is served from a custom domain
// (kcetcouncelling.physicspeptalks.in), not a subpath.
export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    outDir: "dist",
    sourcemap: false,
    rollupOptions: {
      input: {
        // Main landing page
        main: resolve(import.meta.dirname, "index.html"),
        // Static sub-pages
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
