import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tempest from "vite-plugin-tempest";
import react from "@vitejs/plugin-react";
// @ts-ignore
import path from "path";

export default defineConfig({
  plugins: [tailwindcss(), tempest(), react()],

  resolve: {
    alias: {
      // @ts-ignore
      "@": path.resolve(__dirname, "client"),
    },
  },
});
