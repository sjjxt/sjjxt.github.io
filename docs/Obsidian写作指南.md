# 用 Obsidian 写博客

Obsidian 负责编辑本地 Markdown，Astro 负责把文章生成网页。Obsidian 本身不会自动把文章发布到你的博客。

## 打开博客内容目录

在 Obsidian 中选择“打开文件夹作为仓库”，选择 `D:\LJR\blog\src\content`。这样可以同时看到文章、动态和模板。

- `posts/`：博客文章，Markdown 文件需要有标题、发布日期等开头信息。
- `dynamic/`：动态，Markdown 文件需要有发布日期。
- `templates/`：写作模板，不会作为文章或动态发布。
- `spec/`：关于我等独立页面，保留原结构。
- `projects/`：项目展示内容，保留原结构。

不要直接在 posts 或 dynamic 中放无文章信息的普通笔记，否则构建可能提示缺少字段。私人笔记建议保存在另外的 Obsidian 仓库。

## 启用模板

1. 在“设置 → 核心插件”启用“模板”。
2. 在模板设置中，将模板文件夹设为 `templates`。
3. 在 posts 中新建文章，建议先使用英文短文件名，如 `learning-html.md`，网址会使用这个名字；正文标题可以用中文。
4. 切到源码模式，执行命令面板里的“模板：插入模板”，选择“文章模板”。
5. 填写 title、description、tags、category，并开始写正文。

模板中的日期会在插入时自动替换。请保持 published 为未加引号的日期，例如 `published: 2026-10-26`；当前博客配置将它作为日期读取。

`draft: true` 表示草稿，开发模式下可查看，但不会进入正式构建。准备展示时改为 `draft: false`。

动态也可以在 dynamic 中新建 .md 文件后插入“动态模板”。动态没有 draft 字段，构建时会显示已保存的动态；未准备好的动态先放在另外的笔记中。

## 图片和链接

“设置 → 文件与链接”建议：

- 关闭“使用双链”，使用标准 Markdown 链接和图片格式。
- 新链接格式选择“相对路径”。
- 新附件默认位置选择“当前文件所在文件夹下的子文件夹”，子文件夹名填写 `assets`。

这样在文章中粘贴图片时，可生成类似 `![配图](assets/example.png)` 的引用。图片保存在文章旁的 assets 中，方便随文章整理，也便于 Astro 处理。Obsidian 的双链、嵌入和社区插件输出不一定完全等同于网页效果，以博客预览为准。

链接另一篇博客文章时，建议使用实际网站路径，例如 `[学习 HTML](/posts/learning-html/)`，不要直接假定 Obsidian 中的 .md 文件链接会自动成为正确的网页地址。

## 预览和构建

在博客根目录 D:\LJR\blog 的 PowerShell 中运行：

```powershell
npm.cmd run dev
```

打开终端实际显示的 Local 地址，编辑并保存后看更新。当前 4321 若正被正式预览占用，开发预览可能使用其他端口。

需要更新正式静态预览或生成部署文件时运行：

```powershell
npm.cmd run build
```

构建成功后刷新预览。当前还未配置公网部署，不会自动发布到互联网。

参考：[Obsidian 仓库管理](https://obsidian.md/help/Files+and+folders/Manage+vaults)、[模板](https://obsidian.md/help/plugins/templates)、[设置](https://obsidian.md/help/settings)。
