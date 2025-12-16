@echo off

echo Requesting all heroes
curl http://localhost:3000/heroes

echo.
echo.

echo Flash requesting
curl http://localhost:3000/heroes/1

echo.
echo.

echo Requesting with wrong body
curl -X POST ^
    --data-binary "{\"invalid\": \"data\"}" ^
    localhost:3000/heroes

echo.
echo.

echo Requesting with correct body
curl --silent -X POST ^
    --data-binary "{\"name\": \"Testing\", \"age\": 23, \"powers\": [\"Super Tester\"]}" ^
    localhost:3000/heroes

pause
