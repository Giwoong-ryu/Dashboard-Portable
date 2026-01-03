Set WshShell = CreateObject("WScript.Shell")

' 포트 3000 사용 프로세스만 종료 (다른 Node.js 앱 보호)
WshShell.Run "cmd /c for /f ""tokens=5"" %a in ('netstat -aon ^| findstr :3000') do @taskkill /F /PID %a 2>nul", 0, True

Set WshShell = Nothing

MsgBox "AI 대시보드가 종료되었습니다.", vbInformation, "종료 완료"
