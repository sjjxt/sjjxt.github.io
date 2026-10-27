@echo off
chcp 65001 >nul
setlocal
title 世界级小偷 - 一键构建博客

rem Always build from the project root above this file's folder, including when opened via a shortcut.
pushd "%~dp0.."
if errorlevel 1 goto folder_error

where node.exe >nul 2>&1
if errorlevel 1 goto node_error
where npm.cmd >nul 2>&1
if errorlevel 1 goto node_error
if not exist "node_modules\astro\package.json" goto dependency_error

echo.
echo 正在重新构建博客，请等待，不要关闭窗口……
echo 会自动清理旧缓存、生成网页并更新搜索索引。
echo.

rem Use the project's pnpm version; avoid the global pnpm version-switch issue.
call npm.cmd exec --yes --registry=https://registry.npmjs.org --package=pnpm@11.22.0 -- pnpm build
if errorlevel 1 goto build_error

echo.
echo ============================================================
echo 构建成功！文章、动态和搜索索引已更新。
echo 生成的网站位于：%CD%\dist
echo 现在可以刷新本地博客预览页面。
echo 本操作只生成本地网站，不会自动发布到互联网。
echo ============================================================
set "blogExitCode=0"
goto finish

:node_error
echo 未找到 Node.js 或 npm，请先安装 Node.js，再重新双击此文件。
set "blogExitCode=1"
goto finish

:dependency_error
echo 尚未安装项目依赖，请先按“开始使用.md”中的说明安装依赖。
set "blogExitCode=1"
goto finish

:build_error
echo.
echo 构建失败，请查看上方的错误信息。
echo 可以截图此窗口让我排查，修复后再双击重试。
set "blogExitCode=1"
goto finish

:folder_error
echo 无法进入博客目录，请将这个文件保留在博客的 cmd 文件夹中。
if /I not "%~1"=="--no-pause" pause
exit /b 1

:finish
if /I not "%~1"=="--no-pause" pause
popd
exit /b %blogExitCode%
