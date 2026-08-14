import esbuild from "esbuild";

const now = new Date();
const pad = (n) => String(n).padStart(2, '0');
const version = `${now.getFullYear()}.${pad(now.getMonth() + 1)}.${pad(now.getDate())}.${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;

const banner = `// ==UserScript==
// @name		Gemsonas
// @description	Gemsonas
// @version		${version}
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