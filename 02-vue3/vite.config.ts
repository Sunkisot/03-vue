import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import autoImport from "unplugin-auto-import/vite";
const { resolve } = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    autoImport({
      imports: ["vue", "vue-router"],
      eslintrc: {
        enabled: false,
        filepath: resolve(__dirname, ".eslintrc-auto-import.json"),
        globalsPropValue: true,
      },
      dts: "./auto-imports.d.ts",
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
