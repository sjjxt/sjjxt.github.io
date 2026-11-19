# sjjxt 的个人博客

> 记录学习的小日记。

你好，我是 **sjjxt**。这里是我的个人博客，用来记录学习知识的过程，整理实践中遇到的问题，也留下一些日常的想法和实践。

我希望从搭建一个博客开始，慢慢理解一个网站如何运行：文章怎样变成网页，页面与组件怎样组织，以及代码如何经过构建和部署，最终被其他人访问。

🖥️**[在线预览](https://sjjxt.github.io/)**

## 这里会记录什么

- **学习笔记**：前端基础、网站架构，以及逐步接触的计算机知识。
- **实践记录**：博客搭建、功能调整、插件开发和问题排查。
- **日常动态**：生活中的想法、灵感与阶段性的进展。

内容会随着学习慢慢补充，不追求一开始就完整，先把每一次尝试记录下来。

## 关于这个博客

本站基于 [Firefly](https://github.com/CuteLeaf/Firefly) 主题修改。

博客采用静态网站的方式：使用 Markdown 写作，由 Astro 构建为网页。日常使用 Obsidian 编辑文章和动态，并按自己的喜好调整主题、图片和音乐。

| 工具 / 技术 | 用途 |
| --- | --- |
| Astro | 构建静态网页、组织页面和布局 |
| Firefly | 博客主题与功能基础 |
| Svelte、TypeScript | 交互组件与类型检查 |
| Tailwind CSS | 页面样式 |
| Markdown、Obsidian | 文章和动态写作 |
| Git、GitHub Actions | 版本管理与自动构建部署 |
| GitHub Pages | 配置发布后托管静态网站 |

博客通过 GitHub Pages 托管，推送更新后由 GitHub Actions 自动检查、构建并发布。

## 本地使用

### 用 Docker 打开网页

Windows 上双击 [打开博客.cmd](./cmd/打开博客.cmd)。它会按需启动 Docker Desktop，等待博客就绪，再打开 [本地博客](http://127.0.0.1:4321/)。也可以在 Docker Desktop 的 Containers 页面找到 `sjjxt-blog`，点击启动，再点击 `4321` 端口。需要停止时，点击该项目的停止按钮。

写完文章或改完配置后，双击 [一键构建博客.cmd](./cmd/一键构建博客.cmd)，等它更新容器后刷新浏览器。Docker 镜像只包含正式网页及静态文件服务，文章、草稿和开发工具仍在项目目录中。已经打包的版本可以独立启动。

### 开发与首次构建

新电脑首次构建需要 Node.js **22.23.0 或以上**、pnpm **11.22.0** 和 Docker。当前本地与自动部署使用 Node.js 24。在项目根目录执行以下命令。

```sh
# 首次安装依赖
pnpm install --frozen-lockfile

# 构建正式网页和搜索索引
pnpm build

# 将最新的 dist 打包并在本机启动
docker compose up -d --build --wait
```

日后可用 `docker compose up -d --wait` 打开已有版本，用 `docker compose stop` 停止。打包时限定读取 `dist/` 和网页服务配置。若提示 4321 端口被占用，请先关闭占用它的本地预览。

开发时运行 `pnpm dev` 可边改边看，终端会显示访问地址。提交代码前可用 `pnpm check` 和 `pnpm type-check` 检查项目。

本地构建只更新本机。要发布到 GitHub Pages，双击 `cmd/更新GitHub博客.cmd`。临时分享与停止分享的入口也在 [cmd 文件夹](./cmd/)。

## 写文章与动态

| 内容 | 保存位置 |
| --- | --- |
| 文章 | `src/content/posts/` |
| 动态 | `src/content/dynamic/` |
| 写作模板 | `src/content/templates/` |
| 关于我 | `src/content/spec/about.md` |
| 网站配置 | `src/config/` |
| 静态资源 | `public/` |

文章与动态使用不同的模板。也可以用 `pnpm new-post my-first-note` 新建文章。文章准备发布时，将 Frontmatter 中的 `draft` 设置为 `false`。

使用 Obsidian 时，可以将 `src/content` 打开为仓库，并启用核心插件“模板”，将模板文件夹设置为 `templates`。私人笔记建议放在独立的 Obsidian 仓库中。

更多操作说明：

- [Obsidian 写作指南](./docs/Obsidian写作指南.md)
- [站点名称、头像、壁纸与导航的配置位置](./src/config/README.md)
- [临时分享说明](./docs/临时分享说明.md)
- [GitHub Pages 发布说明](./docs/GitHub-Pages发布说明.md)

## 来源与许可

本站基于 Firefly 主题修改，感谢 [CuteLeaf / Firefly](https://github.com/CuteLeaf/Firefly) 及其基础项目 [saicaca / fuwari](https://github.com/saicaca/fuwari) 的开源贡献。

原项目版权声明保留如下：

- Copyright (c) 2024 saicaca
- Copyright (c) 2025 CuteLeaf

原项目的 MIT 许可文本完整保留在 [LICENSE](./LICENSE) 文件中。本文档重写为个人博客说明，原有代码的版权声明与许可文本保持不变。
