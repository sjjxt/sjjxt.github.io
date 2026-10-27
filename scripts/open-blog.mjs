import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { setTimeout } from "node:timers/promises";

const root = fileURLToPath(new URL("../", import.meta.url));
const origin = "http://127.0.0.1:4321";

async function main() {
	const htmlPath = path.join(root, "dist", "index.html");
	if (!fs.existsSync(htmlPath)) throw new Error("尚未生成博客，请先运行 cmd 文件夹中的“一键构建博客.cmd”。");
	const expectedTitle = fs.readFileSync(htmlPath, "utf8").match(/<title[^>]*>([\s\S]*?)<\/title>/)?.[1];
	if (!expectedTitle) throw new Error("无法读取博客标题，请重新构建。");
	async function isReady() {
		let response;
		try {
			response = await fetch(origin, { signal: AbortSignal.timeout(2500) });
		} catch {
			return false;
		}
		const html = await response.text();
		if (!response.ok || !html.includes(`<title>${expectedTitle}</title>`)) {
			throw new Error("4321 端口上的页面与当前博客不符，请检查占用此端口的程序后重试。");
		}
		return true;
	}
	if (await isReady()) {
		console.log(`博客预览已在运行，直接打开：${origin}/`);
		return;
	}
	console.log("正在后台启动博客预览……");
	const server = spawn(process.execPath, [path.join(root, "node_modules", "astro", "bin", "astro.mjs"), "preview", "--background", "--host", "127.0.0.1", "--port", "4321"], { cwd: root, stdio: "inherit", windowsHide: true });
	await new Promise((resolve, reject) => {
		server.on("error", reject);
		server.on("close", code => code === 0 ? resolve() : reject(new Error("博客预览启动失败，请查看上方错误。")));
	});
	for (let attempt = 0; attempt < 20; attempt++) {
		if (await isReady()) {
			console.log(`博客预览已就绪：${origin}/`);
			return;
		}
		await setTimeout(500);
	}
	throw new Error("预览服务尚未就绪，请稍后重试。");
}

main().catch(error => { console.error(error.message); process.exitCode = 1; });
