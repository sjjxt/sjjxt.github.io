@echo off
chcp 65001 >nul
setlocal
title 更新 GitHub 博客
pushd "%~dp0.."
node scripts\publish-github.mjs
set "BLOG_PUBLISH_RESULT=%ERRORLEVEL%"
popd
if /I not "%~1"=="--no-pause" pause
exit /b %BLOG_PUBLISH_RESULT%
