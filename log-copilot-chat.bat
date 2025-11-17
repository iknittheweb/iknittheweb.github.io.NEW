@echo off
REM Run AutoHotkey script to copy chat buffer
start /wait "" "%~dp0copy-copilot-chat.ahk"
REM Run PowerShell script to save clipboard to log
powershell -ExecutionPolicy Bypass -File "%~dp0scripts\save-copilot-chat.ps1"
