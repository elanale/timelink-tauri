import { createRootRoute, HeadContent, Outlet } from "@tanstack/react-router";
import { Footer, NavBar } from "@timelink/shared/components";

export const Route = createRootRoute({
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
