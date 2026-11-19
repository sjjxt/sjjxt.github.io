@echo off
chcp 65001 >nul
setlocal
pushd "%~dp0.."
if errorlevel 1 exit /b 1

where docker.exe >nul 2>&1
if errorlevel 1 goto docker_missing
docker --context desktop-linux info --format "{{.ServerVersion}}" >nul 2>&1
if errorlevel 1 (
  echo 正在启动 Docker Desktop……
  docker desktop start --timeout 120
  if errorlevel 1 goto failed
)

set "buildOption="
if /I "%~2"=="--build" set "buildOption=--build"
docker --context desktop-linux compose up -d --wait --wait-timeout 60 %buildOption% web
if errorlevel 1 goto failed

if /I not "%~1"=="--no-open" start "" "http://127.0.0.1:4321/"
popd
exit /b 0

:docker_missing
echo 请先安装 Docker Desktop，再重新打开博客。
goto finish_error

:failed
echo 博客启动失败，请查看上方提示。首次运行需要先用“一键构建博客.cmd”生成网页。

:finish_error
if /I not "%~1"=="--no-open" pause
popd
exit /b 1
