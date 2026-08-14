// ==UserScript==
// @name         Gemsonas
// @namespace    https://gemini.google.com/
// @version      1.0.0
// @description  GitHub에서 실시간으로 프롬프트를 동기화하는 무지연 페르소나 슬래시 커맨드
// @match        https://gemini.google.com/*
// @grant        none
// ==/UserScript==

(() => {
	const PERSONAS_URL = "https://raw.githubusercontent.com/YOUR_USERNAME/gemsonas/main/personas/ponytail.txt";
})();

(() => {
  // 본인의 깃허브 '유저명/저장소명'으로 변경하세요.
  const REPO = "YOUR_USERNAME/gemsonas";
  const RAW_BASE = `https://raw.githubusercontent.com/${REPO}/main/personas`;

  const COMMAND_MAP = {
    "/ponytail": "ponytail.txt",
  };

  const cache = new Map();

  // 스크립트 실행 시 백그라운드 프리페치 (타이핑 시 0ms 즉각 반응)
  for (const [cmd, filename] of Object.entries(COMMAND_MAP)) {
    fetch(`${RAW_BASE}/${filename}`)
      .then((res) => (res.ok ? res.text() : ""))
      .then((text) => text && cache.set(cmd, text.trim()))
      .catch(() => {});
  }

  document.addEventListener(
    "input",
    (e) => {
      const target = e.target;
      if (!target?.isContentEditable) return;

      const text = target.textContent?.trim();
      if (!text || text[0] !== "/") return;

      const replacement = cache.get(text);
      if (replacement) {
        requestAnimationFrame(() => {
          target.focus();
          document.execCommand("selectAll", false, null);
          document.execCommand("insertText", false, replacement);
        });
      }
    },
    { passive: true }
  );
})();