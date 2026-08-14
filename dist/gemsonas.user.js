// ==UserScript==
// @name		Gemsonas
// @description	Gemsonas
// @version		0.0.0
// @match		https://gemini.google.com/*
// @grant		none
// ==/UserScript==

(() => {
  // src/index.ts
  var REPO = "KlartNET-UserScripts/gemsonas";
  var RAW_BASE = `https://raw.githubusercontent.com/${REPO}/main/personas`;
  var COMMANDS = {
    "/ponytail": "ponytail.txt"
  };
  var cache = /* @__PURE__ */ new Map();
  for (const [cmd, filename] of Object.entries(COMMANDS)) {
    fetch(`${RAW_BASE}/${filename}`).then((res) => res.ok ? res.text() : "").then((text) => text && cache.set(cmd, text.trim()));
  }
  function expandPersona(target) {
    const text = target.textContent?.trim() || "";
    for (const [cmd, persona] of cache.entries()) {
      if (text.startsWith(cmd)) {
        const query = text.slice(cmd.length).trim();
        const content = query ? `${query}

${persona}` : persona;
        target.focus();
        document.execCommand("selectAll", false);
        document.execCommand("insertText", false, content);
        break;
      }
    }
  }
  document.addEventListener(
    "keydown",
    (event) => {
      if (event.key !== "Enter" || event.shiftKey || event.isComposing) return;
      const target = event.target;
      if (target?.isContentEditable) {
        expandPersona(target);
      }
    },
    { capture: true }
  );
  document.addEventListener(
    "pointerdown",
    (event) => {
      const btn = event.target?.closest("button[aria-label*='\uBA54\uC2DC\uC9C0 \uBCF4\uB0B4\uAE30']");
      if (!btn) return;
      const target = document.querySelector('rich-textarea [contenteditable="true"], div[contenteditable="true"]');
      if (target) {
        expandPersona(target);
      }
    },
    { capture: true }
  );
})();
