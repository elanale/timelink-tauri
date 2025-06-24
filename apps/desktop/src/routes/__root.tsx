import {
	createRootRouteWithContext,
	HeadContent,
	Outlet,
} from "@tanstack/solid-router";
import { Footer, NavBar } from "@ui/components";

interface RouterContext {
	auth: AuthContext;
}

export const Route = createRootRouteWithContext<RouterContext>()({
	component: Root,
});

function Root() {
	return (
		<>
			<HeadContent />
			<NavBar />
			<Outlet />
			<Footer />
		</>
	);
}
