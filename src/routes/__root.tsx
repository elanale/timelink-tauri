import { HeadContent, Outlet, createRootRoute } from "@tanstack/react-router";
import Footer from "@/components/Footer.tsx";
import NavBar from "@/components/NavBar.tsx";

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
