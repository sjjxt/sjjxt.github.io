import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const gh = path.join(root, ".tools/github-cli/bin/gh.exe");
const repository = "https://github.com/sjjxt/sjjxt.github.io.git";

if (process.argv.includes("--help")) {
	console.log("提交本地博客的新增、修改和删除，并推送到 GitHub，触发自动部署。\n网站地址：https://sjjxt.github.io/");
	process.exit(0);
}

const env = {
	...process.env,
	GH_CONFIG_DIR: path.join(root, ".tools/github-auth"),
};

function git(args, capture = false) {
	const result = spawnSync("git", args, {
		cwd: root,
		env,
		encoding: "utf8",
		stdio: capture ? "pipe" : "inherit",
		windowsHide: true,
	});
	if (result.error) throw result.error;
	if (result.status !== 0) {
		throw new Error(capture ? result.stderr.trim() : "Git 操作失败，请查看上方提示。");
	}
	return result.stdout?.trim() || "";
}

try {
	if (!existsSync(gh)) throw new Error("缺少本地 GitHub CLI，请先让助手恢复 GitHub 发布工具。");
	if (git(["remote", "get-url", "origin"], true) !== repository) {
		throw new Error("远程仓库与博客仓库不一致，已停止发布。");
	}
	if (git(["branch", "--show-current"], true) !== "main") {
		throw new Error("请在 main 分支发布博客。");
	}
	console.log("正在提交本地博客的新增、修改和删除……");
	git(["add", "--all"]);
	if (git(["diff", "--cached", "--name-only"], true)) {
		git(["commit", "-m", "content: update blog"]);
	} else {
		console.log("本地没有新的改动，继续检查推送。");
	}
	git([
		"-c", "credential.helper=",
		"-c", `credential.helper=!"${gh.replaceAll("\\", "/")}" auth git-credential`,
		"push", "-u", "origin", "main",
	]);
	console.log("\n推送成功！GitHub 将自动检查、构建并发布。\n请等待 Actions 部署成功后再刷新：https://sjjxt.github.io/\n部署进度：https://github.com/sjjxt/sjjxt.github.io/actions");
} catch (error) {
	console.error(`\n发布失败：${error.message}\n本地文章仍保留；修复问题后可以再次运行。`);
	process.exitCode = 1;
}
