import { resolve } from "node:path";

import tailwindCSS from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		tanstackRouter({ target: "solid", autoCodeSplitting: true }),
		solid(),
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
