import { resolve } from "path";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { "@": resolve(__dirname, ".") } },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["vitest.setup.ts"],
    coverage: {
      provider: "istanbul",
      reporter: ["text", "html", "json", "json-summary"],
      include: [
        "actions/**/*",
        "app/**/*",
        "components/**/*",
        "hooks/**/*",
        "lib/**/*",
        "utils/**/*",
      ],
      exclude: ["node_modules/**/*", "tests/**/*"],
    },
  },
});
