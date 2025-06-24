import { createFileRoute, redirect } from "@tanstack/solid-router";

export const Route = createFileRoute("/dashboard")({
	beforeLoad: ({ context, location }) => {
		if (!context.auth.isAuthenticated) {
			throw redirect({
				to: "/login",
				search: {
					redirect: location.href,
				},
			});
		}
	},
});
