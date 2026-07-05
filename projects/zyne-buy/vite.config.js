import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: resolve(import.meta.dirname, "homedetail/7101-wendemere-st-houston-tx-77088/buy/index.html")
    }
  }
});
