@echo off
setlocal
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0install-plugin.ps1" -Action Remove %*
set "RC=%ERRORLEVEL%"
echo.
if not "%RC%"=="0" echo [ERROR] Removal failed. Please read the message above.
pause
exit /b %RC%
