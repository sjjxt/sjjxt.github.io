@echo off
chcp 65001 >nul
setlocal
pushd "%~dp0.."
if errorlevel 1 exit /b 1
powershell.exe -NoProfile -Command "$expected = [IO.Path]::GetFullPath('.tools\cloudflared.exe'); Get-Process cloudflared -ErrorAction SilentlyContinue | Where-Object { $_.Path -eq $expected } | Stop-Process; Remove-Item -LiteralPath '.share\分享链接.txt' -ErrorAction SilentlyContinue; Write-Host '此博客的临时分享已停止，本地预览仍可使用。'"
pause
popd
