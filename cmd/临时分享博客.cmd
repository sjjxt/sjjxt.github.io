@echo off
chcp 65001 >nul
setlocal
title 世界级小偷 - 临时分享博客
pushd "%~dp0.."
if errorlevel 1 exit /b 1
node scripts/share-blog.mjs
echo.
echo 分享程序已结束。重新双击此文件可创建新的临时链接。
pause
popd
