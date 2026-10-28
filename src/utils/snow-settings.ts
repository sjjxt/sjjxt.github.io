import { snowConfig } from "@/config";

export function getSnowEnabled(): boolean {
	try {
		const stored = localStorage.getItem("snowEnabled");
		return stored === null ? snowConfig.enable : stored === "true";
	} catch {
		return snowConfig.enable;
	}
}

export function setSnowEnabled(enabled: boolean): void {
	try {
		localStorage.setItem("snowEnabled", String(enabled));
	} catch {
		// 禁用存储时仍支持本次访问内切换。
	}
	window.dispatchEvent(new CustomEvent("snowToggle", { detail: { enabled } }));
}
