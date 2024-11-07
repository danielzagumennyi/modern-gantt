import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import dts from "vite-plugin-dts";
import { resolve } from "path";

import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts(),
    cssInjectedByJsPlugin(),
    visualizer({
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  build: {
    sourcemap: true,
    copyPublicDir: false,

    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es"],
    },

    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "date-fns",
        "zustand",
        "react/jsx-runtime",
        "@mantine/core",
        "@mantine/hooks",
        "i18next",
        "draggable-ui",
        "react-i18next",
        "lodash-es",
        "@tabler/icons-react",
      ],

      output: {
        assetFileNames: "assets/[name][extname]",
        entryFileNames: "[name].js",
        globals: {
          react: "React",
          "react/jsx-runtime": "jsxRuntime",
          "@mantine/core": "core",
          "react-dom": "ReactDOM",
          "@mantine/hooks": "hooks",
          "@tabler/icons-react": "iconsReact",
          i18next: "i18next",
          "lodash-es": "lodashEs",
          "react-i18next": "reactI18next",
          "draggable-ui": "draggableUi",
        },
      },
    },
  },
});
