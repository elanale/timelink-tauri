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
			<header>
				<h1>TimeLink</h1>
				<p>Welcome to TimeLink!</p>
			</header>

			<form
				onSubmit={(e) => {
					e.preventDefault();
					greet();
				}}
			>
				<label className="block" htmlFor="greet-input">
					Enter your name
				</label>

				<input
					className="border border-gray-300 rounded-lg p-2 mr-2"
					type="text"
					id="greet-input"
					onChange={(e) => setName(e.currentTarget.value)}
					placeholder="E.g. Elan Wygodski"
				/>

				<button className="bg-blue-500 rounded-lg p-2 text-white" type="submit">
					Greet
				</button>
			</form>
			<p>{greetMsg}</p>
		</main>
	);
}
