import { spawn, spawnSync } from "node:child_process";
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
	const preview = spawnSync("cmd.exe", ["/d", "/c", "call cmd\\打开博客.cmd --no-open"], {
		cwd: root, stdio: "inherit", windowsHide: true,
	});
	if (preview.error) throw preview.error;
	if (preview.status !== 0) throw new Error("本地 Docker 博客启动失败。");
	const response = await fetch(origin, { method: "HEAD", signal: AbortSignal.timeout(5000) });
	if (!response.ok) throw new Error(`本地博客返回 HTTP ${response.status}，请先检查本地预览。`);
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
