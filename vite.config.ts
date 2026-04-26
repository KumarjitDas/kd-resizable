import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    react(),
    babel({
      presets: [reactCompilerPreset()],
    }),
  ],

  root: "demo",

  build: {
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "KdResizable",
      formats: ["es", "umd"],
      fileName: (format) => `kd-resizable-lib.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "jsxRuntime",
        },
      },
    },
    cssCodeSplit: false,
  },

  resolve: {
    alias: {
      "kd-resizable": resolve(__dirname, "src/index.ts"),
    },
  },

  server: {
    strictPort: true,
    port: 5173,
    fs: {
      allow: [".."],
    },
  },
});
