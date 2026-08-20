// ==UserScript==
// @name		Gemsonas
// @description	Gemsonas
// @version		2026.08.20.160812
// @match		https://gemini.google.com/*
// @match		https://chatgpt.com/*
// @connect		raw.githubusercontent.com
// @grant		GM_xmlhttpRequest
// ==/UserScript==

"use strict";
(() => {
  // src/index.ts
  var REPO = "KlartNET-UserScripts/gemsonas";
  var RAW_BASE = `https://raw.githubusercontent.com/${REPO}/main/personas`;
  var COMMANDS = {
    "/pt": "ponytail.txt",
    "/ptl": "ponytail_lite.txt"
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
    const splits = text.split(" ");
    for (const [cmd, persona] of cache.entries()) {
      if (splits[0] === cmd) {
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
