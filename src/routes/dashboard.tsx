import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
	component: Dashboard,
	head: () => ({
		meta: [
			{
				title: "Dashboard - TimeLink",
			},
			{
				name: "description",
				content: "Dashboard for TimeLink.",
			},
		],
	}),
});

function Dashboard() {
	return (
		<div>
			<header>
				<h1>Dashboard</h1>
				<p>Welcome to the TimeLink Dashboard!</p>
			</header>
		</div>
	);
}
