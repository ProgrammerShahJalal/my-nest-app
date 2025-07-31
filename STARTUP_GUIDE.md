# 🚀 Full-Stack Application Startup Guide

## Quick Start Commands

### Option 1: Manual Setup (Recommended for learning)

**Terminal 1 - Backend:**
```bash
npm install
npm run start:dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install  
npm start
```

### Option 2: PowerShell Script (Windows)

Create a file called `start-app.ps1`:

```powershell
# Start NestJS Backend
Write-Host "🚀 Starting NestJS Backend..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run start:dev"

# Wait a moment for backend to initialize
Start-Sleep -Seconds 3

# Start React Frontend
Write-Host "🌐 Starting React Frontend..." -ForegroundColor Cyan
Set-Location "frontend"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm start"

Write-Host "✅ Both applications are starting!" -ForegroundColor Yellow
Write-Host "Backend: http://localhost:3000/api" -ForegroundColor Green
Write-Host "Frontend: http://localhost:3001" -ForegroundColor Cyan
```

### Option 3: Package.json Scripts

Add to your main `package.json`:

```json
{
  "scripts": {
    "dev": "concurrently \"npm run start:dev\" \"cd frontend && npm start\"",
    "install:all": "npm install && cd frontend && npm install"
  }
}
```

Then install concurrently:
```bash
npm install -D concurrently
```

And run:
```bash
npm run install:all
npm run dev
```

## 🎯 Access Points

- **Backend API**: http://localhost:3000/api
- **Frontend UI**: http://localhost:3001
- **API Documentation**: Check `CAT_API_DOCUMENTATION.md`
- **Learning Guide**: Check `NESTJS_LEARNING_GUIDE.md`

## 🔧 Troubleshooting

### Common Issues:

1. **Port 3000 already in use**
   ```bash
   # Find process using port 3000
   netstat -ano | findstr :3000
   # Kill the process (replace PID)
   taskkill /PID <PID> /F
   ```

2. **PowerShell execution policy error**
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

3. **npm install failures**
   ```bash
   # Clear npm cache
   npm cache clean --force
   # Delete node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **Frontend can't connect to backend**
   - Make sure backend is running on port 3000
   - Check if CORS is enabled in main.ts
   - Verify API base URL in frontend/src/services/api.ts

## 📝 Development Workflow

1. **Start Backend** (Terminal 1)
   ```bash
   npm run start:dev
   ```
   ✅ Backend running on http://localhost:3000

2. **Start Frontend** (Terminal 2)  
   ```bash
   cd frontend
   npm start
   ```
   ✅ Frontend running on http://localhost:3001

3. **Test API Endpoints**
   - Users: http://localhost:3000/api/users
   - Cats: http://localhost:3000/api/cats
   - Statistics: http://localhost:3000/api/cats/statistics

4. **Use Frontend Interface**
   - Dashboard: http://localhost:3001
   - Navigate between Users and Cats tabs
   - Test CRUD operations through the UI

## 🎉 Success Indicators

### Backend Ready:
```
🚀 Application is running on: http://localhost:3000
👥 User API endpoints: http://localhost:3000/api/users  
🐱 Cat API endpoints: http://localhost:3000/api/cats
📊 Cat statistics: http://localhost:3000/api/cats/statistics
```

### Frontend Ready:
```
Local:            http://localhost:3001
On Your Network:  http://192.168.x.x:3001

webpack compiled with 0 errors
```

### Both Connected:
- Dashboard loads with statistics
- Users and Cats sections show data
- System status shows green indicators

**Happy Coding! 🚀**
