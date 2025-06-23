import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { invoke } from "@tauri-apps/api/core";
import { useState } from "react";






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
  const navigate = useNavigate();
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center text-center px-4 space-y-8">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Welcome to TimeLink</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md">
        Your time-tracking tool built with Tauri.
      </p>

      <button
        onClick={() => navigate({ to: "/login" })}
        className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold px-8 py-4 rounded-lg transition"
      >
        Go to Login
      </button>
    
    </main>
  );
}
