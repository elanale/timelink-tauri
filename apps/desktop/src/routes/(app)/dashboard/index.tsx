import { createFileRoute, useNavigate } from "@tanstack/solid-router";
import Clock from "@timelink/ui/components/Clock.tsx";
import { useAuth } from "@timelink/ui/context/AuthContext";
import { useEffect } from "react";

export const Route = createFileRoute("/dashboard/")({
	component: Dashboard,
	head: () => ({
		meta: [
			{ title: "Dashboard - TimeLink" },
			{ name: "description", content: "Dashboard for TimeLink." },
		],
	}),
});

function Dashboard() {
	const { user, loading, emailVerified } = useAuth();
	const navigate = useNavigate();

	// 1) redirect to login if not logged in
	useEffect(() => {
		if (!loading && !user) {
			navigate({ to: "/login", replace: true });
		}
	}, [user, loading]);

	// 2) show a "please verify" if user is logged in but unverified
	if (!loading && user && !emailVerified) {
		return (
			<main className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-6">
				<div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 max-w-lg text-center">
					<h2 className="text-xl font-bold text-yellow-400 mb-4">
						Email Not Verified
					</h2>
					<p className="text-gray-700 dark:text-gray-300">
						Please verify your email before accessing the dashboard.
						<br />
						Check your inbox (and spam) for the verification link.
					</p>
				</div>
			</main>
		);
	}

	// 3) while auth state is loading, render nothing
	if (loading || !user) {
		return null;
	}

	// 4) at this point: user exists and is verified
	return (
		<main className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
			<div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 space-y-6">
				<header>
					<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
						Welcome, {user.displayName || user.email}!
					</h1>
					<p className="text-gray-600 dark:text-gray-300">
						This is your personalized dashboard. Use the clock below to track
						your work time.
					</p>
				</header>

				<Clock />
			</div>
		</main>
	);
}
