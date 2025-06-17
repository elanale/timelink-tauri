import { createFileRoute } from "@tanstack/react-router";
import { invoke } from "@tauri-apps/api/core";

import { useState } from "react";

export const Route = createFileRoute("/")({
	component: App,
	head: () => ({
		meta: [
			{
				title: "TimeLink",
			},
			{
				name: "description",
				content: "Welcome to TimeLink.",
			},
		],
	}),
});

function App() {
	const [greetMsg, setGreetMsg] = useState("");
	const [name, setName] = useState("");

	async function greet() {
		// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
		setGreetMsg(await invoke("greet", { name }));
	}

	return (
		<main>
			<h1>Welcome to TimeLink</h1>

			<p>Click on the Tauri, Vite, and React logos to learn more.</p>

			<form
				className="row"
				onSubmit={(e) => {
					e.preventDefault();
					greet();
				}}
			>
				<input
					id="greet-input"
					onChange={(e) => setName(e.currentTarget.value)}
					placeholder="Enter a name..."
				/>

				<button type="submit">Greet</button>
			</form>
			<p>{greetMsg}</p>
		</main>
	);
}
