const REPO = "KlartNET-UserScripts/gemsonas";
const RAW_BASE = `https://raw.githubusercontent.com/${REPO}/main/personas`;

const COMMANDS = {
	"/ponytail": "ponytail.txt",
} as const;

const cache = new Map<string, string>();

for (const [cmd, filename] of Object.entries(COMMANDS)) {
	fetch(`${RAW_BASE}/${filename}`)
		.then(res => res.ok? res.text() : "")
		.then(text => text && cache.set(cmd, text.trim()));
}

function expandPersona(target: HTMLElement) {
	const text = target.textContent?.trim() || "";

	for (const [cmd, persona] of cache.entries()) {
		if (text.startsWith(cmd)) {
			const query = text.slice(cmd.length).trim();
			const content = query? `${query}\n\n${persona}` : persona;

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
		const btn = (event.target as HTMLButtonElement)?.closest("button[aria-label*='메시지 보내기']");
		if (!btn) return;

		const target = document.querySelector<HTMLElement>('rich-textarea [contenteditable="true"], div[contenteditable="true"]');
		if (target) {
			expandPersona(target);
		}
	},
	{ capture: true }
);