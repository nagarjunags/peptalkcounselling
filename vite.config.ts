import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vite.dev/config/
// Dynamic base path configuration:
// - Local dev: "/" (localhost:5173)
// - GitHub Pages: "/peptalkcounselling/" 
// - Custom domain: "/" (when CNAME is active)
export default defineConfig(({ mode }) => {
  // Load environment variables properly using Vite's loadEnv
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    // Use environment variable to set base path for GitHub Pages deployment
    // In GitHub Actions, this will be set to "/peptalkcounselling/"
    // For local development and custom domain, it defaults to "/"
    base: env.VITE_BASE_PATH || "/",
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
  };
});
