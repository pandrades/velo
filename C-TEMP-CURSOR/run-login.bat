@echo off
cd /d "%~dp0"
if not exist node_modules (
  call npm install
  call npx playwright install chromium
)
if not exist .env (
  copy .env.example .env
  echo Edite o arquivo .env com usuario e senha e rode de novo.
  pause
  exit /b 1
)
call npm run test:headed -- tests/login.spec.ts
pause
