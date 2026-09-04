import path from "node:path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

const playgroundRoot = import.meta.dirname
const packageRoot = path.resolve(playgroundRoot, "../package")

export default defineConfig({
  root: playgroundRoot,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      {
        find: "@se-ui/index.css",
        replacement: path.join(packageRoot, "index.css"),
      },
      {
        find: "@se-ui/theme-provider",
        replacement: path.join(packageRoot, "components/theme-provider.tsx"),
      },
      {
        find: /^@se-ui\/(.+)$/,
        replacement: `${path.join(packageRoot, "components/ui")}/$1`,
      },
      { find: "@", replacement: packageRoot },
    ],
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
})
