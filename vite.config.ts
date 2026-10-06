import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vite.dev/config/
//
// base MUST match the GitHub Pages subdirectory path.
// The site is served from: https://nagarjunags.github.io/peptalkcounselling/
// so base = "/peptalkcounselling/"
//
// If a custom domain is added later (e.g. kcetcounselling.physicspeptalk.com),
// change base back to "/" because the custom domain serves from the root.
export default defineConfig({
  plugins: [react()],
  base: "/",//"/peptalkcounselling/",
  build: {
    outDir: "dist",
    sourcemap: false,
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, "index.html"),
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
