import { createRouter, RouterProvider } from "@tanstack/solid-router";
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
});

declare module "@tanstack/solid-router" {
	interface Register {
		router: typeof router;
	}
}

function App() {
	return (
		<>
			<AuthProvider>
				<RouterProvider router={router} />
			</AuthProvider>
		</>
	);
}

const rootElement = document.getElementById("app");
if (rootElement) {
	render(() => <App />, rootElement);
}
