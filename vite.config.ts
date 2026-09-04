import { readdirSync } from "node:fs"
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import dts from "vite-plugin-dts"

const sourceRoot = path.resolve(import.meta.dirname, "package")
const componentDirectory = path.join(sourceRoot, "components/ui")
const componentEntries = Object.fromEntries(
  readdirSync(componentDirectory)
    .filter((file) => file.endsWith(".tsx"))
    .map((file) => [path.basename(file, ".tsx"), path.join(componentDirectory, file)])
)

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({ entryRoot: "package", tsconfigPath: "./tsconfig.app.json" }),
  ],
  publicDir: false,
  resolve: {
    alias: {
      "@": sourceRoot,
    },
  },
  build: {
    lib: {
      entry: {
        index: path.join(sourceRoot, "index.ts"),
        ...componentEntries,
      },
      formats: ["es", "cjs"],
      fileName: (format, entryName) =>
        `entries/${entryName}.${format === "es" ? "js" : "cjs"}`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "react-dom/client", "react/jsx-runtime"],
      output: {
        assetFileNames: (asset) =>
          asset.name?.endsWith(".css")
            ? "style.css"
            : "assets/[name]-[hash][extname]",
      },
    },
  },
})
