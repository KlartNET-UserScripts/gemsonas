declare const GM: {
	xmlHttpRequest(details: any): void;
};

const REPO = "KlartNET-UserScripts/gemsonas";
const RAW_BASE = `https://raw.githubusercontent.com/${REPO}/main/personas`;

const COMMANDS = {
	"/ponytail": "ponytail.txt",
} as const;

const cache = new Map<string, string>();

for (const [cmd, filename] of Object.entries(COMMANDS)) {
	GM.xmlHttpRequest({
		method: "GET",
		url: `${RAW_BASE}/${filename}`,
		onload: (res: any) => {
			if (res.status === 200 && res.responseText) {
				cache.set(cmd, res.responseText.trim());
			}
		},
	});
}

function expandPersona(target: HTMLInputElement) {
	const text = target.textContent?.trim() || "";

	for (const [cmd, persona] of cache.entries()) {
		if (text.startsWith(cmd)) {
			const query = text.slice(cmd.length).trim();
			const content = query? `${persona}\n\n${query}` : persona;

			target.focus();
			document.execCommand("selectAll", false);
			document.execCommand("insertText", false, content);

			break;
		}
	}
}

document.addEventListener(
	"keydown",
	(event: KeyboardEvent) => {
		if (event.key !== "Enter" || event.shiftKey || event.isComposing) return;
		const target = event.target as HTMLInputElement | null;

		if (target?.isContentEditable) {
			expandPersona(target);
		}
	},
	{ capture: true }
);

document.addEventListener(
	"pointerdown",
	(event: MouseEvent) => {
		const eventTarget = event.target as HTMLElement | null;
		const btn = eventTarget?.closest("button[aria-label*='메시지 보내기'], button[aria-label='프롬프트 보내기']") as HTMLButtonElement | null;
		if (!btn) return;

		const target = document.querySelector<HTMLInputElement>("rich-textarea [contenteditable='true'], div[contenteditable='true']");
		if (target) {
			expandPersona(target);
			btn.click();
		}
	},
	{ capture: true }
);