import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import autoPreprocess from "svelte-preprocess";
// import { scss } from "svelte-preprocess";

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    esbuildOptions: {
      target: "es2020",
    },
  },

  build: {
    outDir: "dist",
    target: "es2020",
  },
  plugins: [
    svelte({
      preprocess: autoPreprocess(),
    }),
  ],
});
