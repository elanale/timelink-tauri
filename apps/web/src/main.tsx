import { RouterProvider, createRouter } from "@tanstack/solid-router";
import AuthProvider from "@timelink/ui/context/AuthContext.tsx";
import "@timelink/ui/styles.css";
/* @refresh reload */
import { render } from "solid-js/web";
import { routeTree } from "./routeTree.gen.ts";

const router = createRouter({
	routeTree,
	defaultPreload: "intent",
	scrollRestoration: true,
	defaultPreloadStaleTime: 0,
  context: {
    auth: 
  }
});

declare module "@tanstack/solid-router" {
	interface Register {
		router: typeof router;
	}
}

function App() {
	return (
		<AuthProvider>
			<RouterProvider context={{ auth }} router={router} />
		</AuthProvider>
	);
}

const rootElement = document.getElementById("app");
if (rootElement) {
	render(() => <App />, rootElement);
}
