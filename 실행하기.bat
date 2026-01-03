@echo off
cd /d "%~dp0"

REM 필수 폴더 확인
if not exist "dashboard\" (
    echo [오류] dashboard 폴더가 없습니다.
    echo 설치가 올바르게 되지 않았습니다.
    pause
    exit /b 1
)

if not exist "node\node.exe" (
    echo [오류] Node.js가 없습니다.
    echo 설치가 올바르게 되지 않았습니다.
    pause
    exit /b 1
)

REM Node.js 서버 시작 (백그라운드)
cd dashboard
start /B ..\node\node.exe ..\node\node_modules\npm\bin\npm-cli.js run start

REM 서버 준비 대기 (포트 확인)
echo 서버 시작 중...
:WAIT
timeout /t 1 /nobreak >nul
netstat -an | findstr :3000 >nul
if errorlevel 1 goto WAIT

REM 브라우저 자동 열기 (기본 브라우저)
echo 브라우저를 엽니다...
start "" http://localhost:3000
