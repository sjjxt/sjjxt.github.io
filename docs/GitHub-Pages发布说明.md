# GitHub Pages 发布说明

博客网址：https://sjjxt.github.io/

源代码仓库：https://github.com/sjjxt/sjjxt.github.io

部署进度：https://github.com/sjjxt/sjjxt.github.io/actions

## 以后怎么更新

1. 在 Obsidian 编辑文章、动态，保存文件。正式发布的文章设置 `draft: false`。
2. 可以先用本地开发预览检查效果。
3. 双击 `cmd/更新GitHub博客.cmd`。它会提交本地博客的新增、修改和删除，并推送到 GitHub。
4. 在 Actions 页面等待 `Deploy to GitHub Pages` 成功，再刷新正式网址。

仅保存 Obsidian 文件、运行本地构建或打开本地预览，都不会更新线上博客。GitHub 部署失败时，上一次成功发布的网站通常仍可访问，查看 Actions 的错误后修复并重新推送即可。

删除文章也是同样流程：删除源 Markdown，再运行更新命令。网站由 GitHub 托管，电脑关机后仍可访问。

## 文件和登录信息

仓库公开，文章和源文件可被其他人查看。密码、API Key、私人笔记不要放进项目。

`.tools` 中的本地 GitHub 发布工具和登录信息、`.share`、`.sample-backups`、Obsidian 设置、日志、依赖和 `dist` 已被 Git 忽略。不要把 `.tools` 打包分享；换电脑后需要重新安装发布工具并登录 GitHub。

自动部署配置在 `.github/workflows/deploy.yml`，正式网址在 `src/config/siteConfig.ts`。
