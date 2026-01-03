@echo off
chcp 65001 > nul
title AI 대시보드 - 원클릭 설치

echo.
echo ========================================
echo   AI 프로젝트 대시보드 설치
echo ========================================
echo.
echo 설치 위치: %USERPROFILE%\Documents\AI-Dashboard
echo.
echo [1/4] 설치 폴더 생성 중...
if not exist "%USERPROFILE%\Documents\AI-Dashboard" (
    mkdir "%USERPROFILE%\Documents\AI-Dashboard"
)

echo [2/4] 파일 복사 중...
xcopy /E /I /Y "%~dp0dashboard" "%USERPROFILE%\Documents\AI-Dashboard\dashboard" >nul

echo [3/4] Node.js 확인 중...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo ========================================
    echo   Node.js가 설치되지 않았습니다
    echo ========================================
    echo.
    echo [자동 설치] Node.js 다운로드 페이지를 엽니다...
    echo.
    echo 1. 다운로드 시작 → "LTS" 버전 선택
    echo 2. 다운로드 완료 → 실행
    echo 3. 설치 완료 → PC 재부팅
    echo 4. 재부팅 후 이 파일 다시 실행
    echo.
    pause
    start https://nodejs.org/ko
    exit /b 0
)

echo [4/4] 패키지 설치 중... (2-3분 소요)
cd "%USERPROFILE%\Documents\AI-Dashboard\dashboard"
call npm install --silent

echo.
echo ========================================
echo   ✅ 설치 완료!
echo ========================================
echo.
echo 📍 설치 위치:
echo    %USERPROFILE%\Documents\AI-Dashboard
echo.
echo 🚀 실행 방법:
echo    1. 바탕화면의 "AI 대시보드 실행" 아이콘 더블클릭
echo    2. 또는 Documents\AI-Dashboard\[실행하기].bat
echo.

echo [바로가기 생성 중...]
set SHORTCUT_PATH=%USERPROFILE%\Desktop\AI 대시보드 실행.lnk
set TARGET_PATH=%USERPROFILE%\Documents\AI-Dashboard\[실행하기].bat

powershell -Command "$ws = New-Object -ComObject WScript.Shell; $s = $ws.CreateShortcut('%SHORTCUT_PATH%'); $s.TargetPath = '%TARGET_PATH%'; $s.WorkingDirectory = '%USERPROFILE%\Documents\AI-Dashboard'; $s.Save()"

echo.
echo ✅ 바탕화면에 바로가기가 생성되었습니다!
echo.
echo ========================================
echo   지금 바로 실행하시겠습니까?
echo ========================================
echo.
set /p RUN="실행하려면 Y를 입력하세요 (Y/N): "
if /i "%RUN%"=="Y" (
    start "" "%USERPROFILE%\Documents\AI-Dashboard\[실행하기].bat"
)

pause
