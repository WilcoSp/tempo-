import { fileURLToPath, URL } from "node:url";

import { defineConfig, Plugin } from "vite";
import vue from "@vitejs/plugin-vue";
import { visualizer } from "rollup-plugin-visualizer";
import { readFileSync, writeFileSync } from "node:fs";

const outDir = "dist/with";

function changeScriptTag() {
	const index = readFileSync("index.html", {
		encoding: "utf8",
	});

	writeFileSync("index.html", index.replace("main.without.ts", "main.with.ts"), {
		encoding: "utf8",
	});
}

changeScriptTag();

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		visualizer({
			filename: `${outDir}/visualizer.html`,
			brotliSize: true,
			gzipSize: true,
		}),
	],
	esbuild: {
		keepNames: true,
	},

	build: {
		outDir,
	},
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
	optimizeDeps: {
		holdUntilCrawlEnd: false,
	},
});
