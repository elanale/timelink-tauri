import { Link, createFileRoute } from "@tanstack/solid-router";

export const Route = createFileRoute("/")({
	component: App,
	head: () => ({
		meta: [
			{ title: "TimeLink" },
			{ name: "description", content: "Welcome to TimeLink." },
		],
	}),
});

function App() {
	return (
		<main className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center text-center px-4 space-y-8">
			<header>
				<h1 className="text-4xl font-bold text-gray-800 dark:text-white">
					Welcome to TimeLink
				</h1>
				<p className="text-lg text-gray-600 dark:text-gray-300 max-w-md">
					Your time-tracking tool built with Tauri.
				</p>
			</header>
			<Link
				className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold px-8 py-4 rounded-lg transition"
				to="/login"
			>
				Log in
			</Link>
		</main>
	);
}
