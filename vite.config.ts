/// <reference types="node" />

import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  server: {
    port: 8888,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        inspect: resolve(__dirname, "inspect/index.html"),
      },
    },
  },
});
