import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { QueryClientWrapper } from "./components/providers/query-client-provider.tsx";
import { TooltipProvider } from "./components/ui/tooltip.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <QueryClientWrapper>
    <TooltipProvider
      delayDuration={0}
      skipDelayDuration={0}
      disableHoverableContent
    >
      <App />
    </TooltipProvider>
  </QueryClientWrapper>,
);
