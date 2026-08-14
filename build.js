import esbuild from "esbuild";

const banner = `// ==UserScript==
// @name         Gemsonas
// @description  Gemsonas
// @version      0.0.0
// @match        https://gemini.google.com/*
// @grant        none
// ==/UserScript==\n`;

await esbuild.build({
	entryPoints: ["src/index.ts"],
	outfile: "dist/gemsonas.user.js",
	bundle: true,
	banner: {
		js: banner
	},
});