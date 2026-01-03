Set WshShell = CreateObject("WScript.Shell")
WshShell.Run chr(34) & "실행하기.bat" & chr(34), 0
Set WshShell = Nothing
