@echo off
echo 🚀 Setting up NestJS Full-Stack Application...
echo.

echo 📦 Installing backend dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Backend dependency installation failed
    pause
    exit /b 1
)

echo.
echo 📦 Installing frontend dependencies...
cd frontend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Frontend dependency installation failed
    echo.
    echo 💡 Try running PowerShell as Administrator and execute:
    echo    Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
    echo.
    echo Or use Command Prompt instead of PowerShell
    pause
    exit /b 1
)

cd ..
echo.
echo ✅ Setup complete!
echo.
echo 🚀 To start the application:
echo    1. npm run start:dev        (for backend)
echo    2. cd frontend && npm start (for frontend in new terminal)
echo.
echo 🌐 Access points:
echo    Backend API: http://localhost:3000/api
echo    Frontend UI: http://localhost:3001
echo.
pause
