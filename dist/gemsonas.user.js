// ==UserScript==
// @name		Gemsonas
// @description	Gemsonas
// @version		0.0.0
// @match		https://gemini.google.com/*
// @match		https://chatgpt.com/*
// @updateURL	https://github.com/KlartNET-UserScripts/gemsonas/raw/refs/heads/main/dist/gemsonas.user.js
// @downloadURL	https://github.com/KlartNET-UserScripts/gemsonas/raw/refs/heads/main/dist/gemsonas.user.js
// @connect		raw.githubusercontent.com
// @grant		GM_xmlhttpRequest
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
    GM.xmlHttpRequest({
      method: "GET",
      url: `${RAW_BASE}/${filename}`,
      onload: (res) => {
        if (res.status === 200 && res.responseText) {
          cache.set(cmd, res.responseText.trim());
        }
      }
    });
  }
  function expandPersona(target) {
    const text = target.textContent?.trim() || "";
    for (const [cmd, persona] of cache.entries()) {
      if (text.startsWith(cmd)) {
        const query = text.slice(cmd.length).trim();
        const content = query ? `${persona}

${query}` : persona;
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
      const eventTarget = event.target;
      const btn = eventTarget?.closest("button[aria-label*='\uBA54\uC2DC\uC9C0 \uBCF4\uB0B4\uAE30'], button[aria-label='\uD504\uB86C\uD504\uD2B8 \uBCF4\uB0B4\uAE30']");
      if (!btn) return;
      const target = document.querySelector("rich-textarea [contenteditable='true'], div[contenteditable='true']");
      if (target) {
        expandPersona(target);
        btn.click();
      }
    },
    { capture: true }
  );
})();
