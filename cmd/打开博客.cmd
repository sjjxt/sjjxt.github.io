@echo off
chcp 65001 >nul
setlocal
pushd "%~dp0.."
if errorlevel 1 exit /b 1

node scripts\open-blog.mjs
if errorlevel 1 (
  echo 打开博客失败，请查看上方错误。
  if /I not "%~1"=="--no-open" pause
  popd
  exit /b 1
)

if /I not "%~1"=="--no-open" start "" "http://127.0.0.1:4321/"
popd
exit /b 0
