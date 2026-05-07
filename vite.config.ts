import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

// Plugin Vite que baixa arquivos diretamente do GitHub usando Node.js
// (sem passar pelo parser de HTML) durante o build
const { githubSyncPlugin } = require("./plugins/github-sync.cjs");

// https://vite.dev/config/
export default defineConfig({
  plugins: [githubSyncPlugin(), react(), tailwindcss(), viteSingleFile()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
