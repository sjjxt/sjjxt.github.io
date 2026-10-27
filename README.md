# sjjxt 的个人博客

> 记录学习的小日记。

你好，我是 **sjjxt**。这里是我的个人博客，用来记录学习知识的过程，整理实践中遇到的问题，也留下一些日常的想法和实践。

我希望从搭建一个博客开始，慢慢理解一个网站如何运行：文章怎样变成网页，页面与组件怎样组织，以及代码如何经过构建和部署，最终被其他人访问。

个人 GitHub：[sjjxt](https://github.com/sjjxt)

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

环境要求：Node.js **22.23.0 或以上**，pnpm **11.22.0**。当前本地与自动部署使用 Node.js 24。

```sh
# 首次安装依赖
pnpm install --frozen-lockfile

# 开发预览：修改并保存后更新页面
pnpm dev

# 检查项目
pnpm check
pnpm type-check

# 构建静态网站，生成到 dist
pnpm build

# 预览构建结果
pnpm preview
```

Windows 下也可以使用 [cmd 文件夹](./cmd/) 中的双击命令：

- `打开博客.cmd`：打开已构建的网站预览。
- `一键构建博客.cmd`：重新生成本地网页。
- `临时分享博客.cmd`：通过临时链接分享本地预览。
- `停止临时分享.cmd`：停止临时分享。
- `更新GitHub博客.cmd`：提交并推送更新，触发 GitHub 自动构建和发布。

本地预览、构建和线上发布是不同的步骤。修改文章后，需重新构建才能在构建预览中看到变化；重新发布后，线上网站才会更新。

## 写文章与动态

| 内容 | 保存位置 |
| --- | --- |
| 文章 | `src/content/posts/` |
| 动态 | `src/content/dynamic/` |
| 写作模板 | `src/content/templates/` |
| 关于我 | `src/content/spec/about.md` |
| 网站配置 | `src/config/` |
| 静态资源 | `public/` |

文章与动态使用不同的模板。文章准备发布时，将 Frontmatter 中的 `draft` 设置为 `false`。

使用 Obsidian 时，可以将 `src/content` 打开为仓库，并启用核心插件“模板”，将模板文件夹设置为 `templates`。私人笔记建议放在独立的 Obsidian 仓库中。

更多操作说明：

- [本地使用与配置](./开始使用.md)
- [Obsidian 写作指南](./docs/Obsidian写作指南.md)
- [临时分享说明](./docs/临时分享说明.md)
- [GitHub Pages 发布说明](./docs/GitHub-Pages发布说明.md)

## 来源与许可

本站基于 Firefly 主题修改，感谢 [CuteLeaf / Firefly](https://github.com/CuteLeaf/Firefly) 及其基础项目 [saicaca / fuwari](https://github.com/saicaca/fuwari) 的开源贡献。

原项目版权声明保留如下：

- Copyright (c) 2024 saicaca
- Copyright (c) 2025 CuteLeaf

原项目的 MIT 许可文本完整保留在 [LICENSE](./LICENSE) 文件中。本文档重写为个人博客说明，原有代码的版权声明与许可文本保持不变。
