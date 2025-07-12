import { Provider } from "@/components/ui/provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RootRouter } from "./routes/rootRouter.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import { GlobalLoginModalProvider } from "./components/LoginModal/LoginModalProvider.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <QueryClientProvider client={queryClient}>
        <GlobalLoginModalProvider>
          <RootRouter />
          <Toaster />
        </GlobalLoginModalProvider>
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
