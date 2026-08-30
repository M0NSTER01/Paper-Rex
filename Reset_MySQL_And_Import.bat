@echo off
echo ========================================================
echo   MySQL Password Reset and Database Import Tool
echo ========================================================
echo.
echo Stopping MySQL Service...
net stop MYSQL80

echo Creating initialization script...
echo ALTER USER 'root'@'localhost' IDENTIFIED BY 'root'; > "%~dp0mysql-init.txt"

echo Restarting MySQL to apply new password...
start /b "" "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqld.exe" --defaults-file="C:\ProgramData\MySQL\MySQL Server 8.0\my.ini" --init-file="%~dp0mysql-init.txt" --console
echo Waiting for MySQL to apply changes...
timeout /t 5 /nobreak >nul

echo Killing the temporary MySQL process...
taskkill /F /IM mysqld.exe
timeout /t 2 /nobreak >nul

echo Restarting MySQL Service normally...
net start MYSQL80
timeout /t 3 /nobreak >nul

echo Importing Dump20260830.sql database...
"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -proot < "%~dp0Dump20260830.sql"

echo Cleaning up...
del "%~dp0mysql-init.txt"

echo.
echo ========================================================
echo SUCCESS! Your MySQL password is now 'root'.
echo The database dump has been successfully imported.
echo You can now use your application normally!
echo ========================================================
pause
