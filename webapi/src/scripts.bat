@echo off

echo Requesting all heroes
curl http://localhost:3000/heroes

echo.
echo.

echo Flash requesting
curl http://localhost:3000/heroes/1

echo.

pause
