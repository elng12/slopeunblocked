@echo off
echo 🚀 Starting Slope Unblocked Development Server...
echo.
echo 📂 Current directory: %CD%
echo 🌐 Server will be available at: http://localhost:8000
echo 🔄 Cache-busting enabled for development
echo ⏹️  Press Ctrl+C to stop the server
echo.
echo ================================================
echo.

REM Check if Python is available
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python is not installed or not in PATH
    echo Please install Python 3.x from https://python.org
    pause
    exit /b 1
)

REM Start the development server
python dev-server.py 8000

pause