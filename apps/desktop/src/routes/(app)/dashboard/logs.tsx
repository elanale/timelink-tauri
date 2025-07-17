import { createFileRoute, Link, useNavigate } from "@tanstack/solid-router";
import { useAuth } from "@timelink/ui/context/AuthContext.tsx";
import { auth } from "@timelink/utils/firebase";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/logs")({
	component: Logs,
	head: () => ({
		meta: [
			{
				title: "Logs - Timelink",
			},
			{
				name: "description",
				content: "Keep track of your time logs.",
			},
		],
	}),
});

function Logs() {
	return (
		<>
			<header>
				<h1>Logs</h1>
				<p>Inspect and export your time logs.</p>
			</header>
			<button className="" type="button">
				Export logs
			</button>
		</>
	);
}
