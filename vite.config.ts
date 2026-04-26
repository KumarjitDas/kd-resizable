import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import dts from "vite-plugin-dts";
import { resolve } from "path";

export default defineConfig({
  // Use root: "demo" only for the dev server
  // We handle the build specifically to point back to src
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    dts({
      insertTypesEntry: true,
      tsconfigPath: resolve(__dirname, "tsconfig.lib.json"),
      outDir: "dist",
    }),
  ],

  build: {
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
    lib: {
      // Entry is relative to the config file, not the root: "demo"
      entry: resolve(__dirname, "src/index.ts"),
      name: "KdResizable",
      fileName: (format) => `kd-resizable-lib.${format}.js`,
      formats: ["es", "umd"],
    },
    rollupOptions: {
      // CRITICAL: Prevent React from being bundled and using 'require'
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "ReactJSXRuntime",
        },
      },
    },
    // This ensures CSS is emitted to dist/style.css
    cssCodeSplit: false,
  },

  root: "demo",
  resolve: {
    alias: {
      // Direct alias for the dev server to consume the source
      "@kumarjitdas/kd-resizable": resolve(__dirname, "src/index.ts"),
      "kd-resizable": resolve(__dirname, "src/index.ts"),
    },
  },

  server: {
    strictPort: true,
    port: 5173,
    fs: {
      // Allow Vite to reach outside 'demo' into 'src' and 'node_modules'
      allow: [".."],
    },
  },
});
