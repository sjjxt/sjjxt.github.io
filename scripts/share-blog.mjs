import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
process.chdir(root);
const origin = "http://127.0.0.1:4321";
const binary = path.join(root, ".tools", "cloudflared.exe");
const output = path.join(root, ".share");

async function main() {
	if (!fs.existsSync(binary)) throw new Error("尚未安装 cloudflared，请先完成安装。");
	if (!fs.existsSync("dist/index.html")) throw new Error("请先双击 cmd 文件夹中的“一键构建博客.cmd”，再开启分享。");
	const expectedTitle = fs.readFileSync("dist/index.html", "utf8").match(/<title[^>]*>([\s\S]*?)<\/title>/)?.[1];
	if (!expectedTitle) throw new Error("无法确认构建后的博客标题，请重新构建。");
	let response;
	try {
		response = await fetch(origin, { signal: AbortSignal.timeout(5000) });
	} catch {
		console.log("正在启动本地博客预览……");
		const preview = spawn(process.execPath, ["node_modules/astro/bin/astro.mjs", "preview", "--background", "--host", "127.0.0.1", "--port", "4321"], { cwd: root, stdio: "inherit", windowsHide: true });
		await new Promise((resolve, reject) => {
			preview.on("error", reject);
			preview.on("close", code => code === 0 ? resolve() : reject(new Error("本地预览启动失败。")));
		});
		response = await fetch(origin, { signal: AbortSignal.timeout(10000) });
	}
	const html = await response.text();
	if (!response.ok || !html.includes(`<title>${expectedTitle}</title>`)) {
		throw new Error("4321 端口没有提供当前博客，请检查预览服务后重试。");
	}
	fs.mkdirSync(output, { recursive: true });
	fs.writeFileSync(path.join(output, "share.log"), "");
	console.log("正在创建临时分享链接。拿到链接的人均可访问；关闭分享后失效。");
	const tunnel = spawn(binary, ["tunnel", "--url", origin, "--http-host-header", "127.0.0.1:4321", "--protocol", "http2", "--no-autoupdate"], { cwd: root, windowsHide: true, stdio: ["inherit", "pipe", "pipe"] });
	fs.writeFileSync(path.join(output, "tunnel.pid"), String(tunnel.pid));
	let sharedUrl = "";
	let pending = "";
	const report = chunk => {
		const text = chunk.toString();
		process.stdout.write(text);
		fs.appendFileSync(path.join(output, "share.log"), text);
		pending = (pending + text).slice(-8192);
		const url = pending.match(/https:\/\/[a-z0-9-]+\.trycloudflare\.com/)?.[0];
		if (url && url !== sharedUrl) {
			sharedUrl = url;
			fs.writeFileSync(path.join(output, "分享链接.txt"), url + "\n");
			console.log(`\n临时链接：${url}\n链接也保存在 .share/分享链接.txt。\n保持本窗口运行；停止分享请按 Ctrl+C，或双击 cmd 文件夹中的“停止临时分享.cmd”。\n`);
		}
	};
	tunnel.stdout.on("data", report);
	tunnel.stderr.on("data", report);
	process.on("SIGINT", () => tunnel.kill());
	process.on("SIGTERM", () => tunnel.kill());
	tunnel.on("error", error => { console.error(error.message); process.exitCode = 1; });
	tunnel.on("close", code => { process.exitCode = code ?? 1; });
}

main().catch(error => { console.error(error.message); process.exitCode = 1; });
