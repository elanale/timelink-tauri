import { createFileRoute } from "@tanstack/solid-router";
import { createSignal, type Component } from "solid-js";

export const Route = createFileRoute("/download")({
    component: Download,
    head: () => ({
        meta: [
            {
                title: "Download - Timelink",
            },
            {
                name: "description",
                content: "Download Timelink to track your time.",
            },
        ],
    }),
});

const platforms = [
    { name: "macOS", link: "/download/macos" },
    { name: "Windows", link: "/download/windows" },
] as const;

const PlatformDownloads: Component = () => {
    const [selected, setSelected] = createSignal(platforms[0]);

    return (
        <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md max-w-md mx-auto">
            <ul class="flex flex-wrap gap-2 mb-6">
                {platforms.map((plat) => (
                    <li>
                        <button
                            class={`px-3 py-1 rounded-full border 
                ${selected().name === plat.name
                                    ? "bg-blue-600 text-white border-blue-600"
                                    : "bg-transparent text-gray-700 dark:text-gray-300 border-gray-400 dark:border-gray-600"
                                }
                hover:bg-blue-500 hover:text-white transition`}
                            onClick={() => setSelected(plat)}
                            type="button"
                        >
                            {plat.name}
                        </button>
                    </li>
                ))}
            </ul>
            <a
                href={selected().link}
                class="w-full block text-center bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition mb-2"
            >
                Download Timelink for {selected().name}
            </a>
        </div>
    );
};

function Download() {
    return (
        <>
            <header>
                <h1>Download</h1>
                <p>
                    Download the app to get started with tracking your time on your
                    device.
                </p>
            </header>
        </>
    );
}
