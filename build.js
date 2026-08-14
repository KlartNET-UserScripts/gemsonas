import esbuild from "esbuild";

const banner = `// ==UserScript==
// @name		Gemsonas
// @description	Gemsonas
// @version		0.0.0
// @match		https://gemini.google.com/*
// @match		https://chatgpt.com/*
// @updateURL	https://github.com/KlartNET-UserScripts/gemsonas/raw/refs/heads/main/dist/gemsonas.user.js
// @downloadURL	https://github.com/KlartNET-UserScripts/gemsonas/raw/refs/heads/main/dist/gemsonas.user.js
// @connect		raw.githubusercontent.com
// @grant		GM_xmlhttpRequest
// ==/UserScript==\n`;

await esbuild.build({
	entryPoints: ["src/index.ts"],
	outfile: "dist/gemsonas.user.js",
	bundle: true,
	banner: {
		js: banner
	},
});