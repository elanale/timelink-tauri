import { resolve } from "node:path";

import { tanstackRouter } from "@tanstack/router-plugin/vite";
import tailwindCSS from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		tanstackRouter({ target: "react", autoCodeSplitting: true }),
		react(),
		tailwindCSS(),
	],
	resolve: {
		alias: {
			"@ui": resolve(__dirname, "../../packages/ui/src"),
            "@utils": resolve(__dirname, "../../packages/utils/src"),
		},
	},
	server: {
		port: 9705,
	},
});
