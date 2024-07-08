import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  optimizeDeps: {
    exclude: ["react/jsx-runtime", "react/jsx-dev-runtime"],
  },
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: "src/index.ts",
      name: "modernGantt",
      // the proper extensions will be added
      fileName: "modern-gantt",
    },

    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [
        "react",
        "react-dom",
        "date-fns",
        "zustand",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
      ],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          zustand: "zustand",
          "date-fns": "dateFns",
          "react/jsx-runtime": "jsxRuntime",
        },
      },
    },
  },
});
