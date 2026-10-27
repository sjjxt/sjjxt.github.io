import { en } from "./languages/en";
import { zh_CN } from "./languages/zh_CN";

export type InterfaceLanguage = "zh-CN" | "en";
export const LANGUAGE_STORAGE_KEY = "firefly-interface-language";

const pairs: [string, string][] = Object.entries(zh_CN)
	.filter(([, value]) => /[\u3400-\u9fff]/.test(value))
	.map(([key, value]) => [value, en[key as keyof typeof en]]);

// Custom navigation labels and interface text outside the theme dictionaries.
pairs.push(
	["文章", "Articles"],
	["追番目录", "Anime List"],
	["B站", "Bilibili Profile"],
	["导航菜单", "Navigation menu"],
	["关闭菜单", "Close menu"],
	["天", "days"],
	["天前", "days ago"],
	["{year}年{month}月", "{year}-{month}"],
);

const dictionaries = {
	en: new Map(pairs),
	"zh-CN": new Map(pairs.map(([chinese, english]) => [english, chinese])),
};

// Match interpolated labels such as "2 天前" without touching arbitrary prose.
const templates = pairs.flatMap(([chinese, english]) => {
	if (!chinese.includes("{")) return [];
	const names: string[] = [];
	const pattern = chinese
		.split(/(\{\w+\})/)
		.map((part) => {
			if (/^\{\w+\}$/.test(part)) {
				names.push(part);
				return "(.+?)";
			}
			return part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		})
		.join("");
	return [{ pattern: new RegExp(`^${pattern}$`), english, names }];
});

export function translateInterfaceText(
	text: string,
	language: InterfaceLanguage,
): string {
	const trimmed = text.trim();
	const translated = dictionaries[language].get(trimmed);
	if (translated) return text.replace(trimmed, translated);
	if (language === "en") {
		for (const template of templates) {
			const match = trimmed.match(template.pattern);
			if (!match) continue;
			let result = template.english;
			template.names.forEach((name, index) => {
				result = result.replaceAll(name, () => match[index + 1]);
			});
			return text.replace(trimmed, () => result);
		}
	}
	return text;
}

export function readInterfaceLanguage(): InterfaceLanguage {
	try {
		const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
		if (stored === "en" || stored === "zh-CN") return stored;
	} catch {
		// The switch also works when browser storage is unavailable.
	}
	return "zh-CN";
}
