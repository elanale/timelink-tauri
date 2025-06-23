import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import AuthProvider from "@timelink/shared/context/AuthContext.tsx";
import { routeTree } from "./routeTree.gen.ts";

import "./index.css";

// Create the router
const router = createRouter({
  routeTree,
  context: {},
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
});

// Register the router type
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app (✅ ONLY ONCE)
const rootElement = document.getElementById("app");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </StrictMode>
  );
}
