import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "@se-ui/index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@se-ui/theme-provider"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
)
