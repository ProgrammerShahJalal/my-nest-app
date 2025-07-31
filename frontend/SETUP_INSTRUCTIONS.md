# 🔧 Frontend Setup Instructions

## Issue: PowerShell Execution Policy Error

If you're getting the error:
```
npm : File C:\Program Files\nodejs\npm.ps1 cannot be loaded because running scripts is disabled on this system.
```

## Solution Options:

### Option 1: Fix PowerShell Execution Policy (Recommended)

**Run PowerShell as Administrator** and execute:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Then try:
```bash
npm install
npm start
```

### Option 2: Use Command Prompt Instead

1. Open **Command Prompt** (cmd) instead of PowerShell
2. Navigate to the frontend directory:
   ```cmd
   cd c:\projects\my-nest-app\frontend
   ```
3. Install dependencies:
   ```cmd
   npm install
   ```
4. Start the frontend:
   ```cmd
   npm start
   ```

### Option 3: Use npx directly

```cmd
npx create-react-app . --template typescript
```

Then copy our custom files over the generated ones.

### Option 4: Manual Setup (If npm still doesn't work)

If you still can't run npm commands, you can:

1. Download Node.js directly from nodejs.org
2. Make sure npm is in your PATH
3. Try running commands in Git Bash or VS Code terminal

## 🚀 Expected Result

Once dependencies are installed, you should be able to:

1. **Start the frontend**:
   ```bash
   npm start
   ```

2. **Access the application**:
   - Frontend: http://localhost:3001
   - Backend: http://localhost:3000/api

## 📝 Dependencies That Will Be Installed

- **react** & **react-dom** - Core React libraries
- **typescript** - TypeScript support
- **@types/react** - React TypeScript definitions
- **axios** - HTTP client for API calls
- **react-scripts** - Build and development tools

## 🔍 Verification

After installation, check that these files exist:
- `node_modules/` folder
- `package-lock.json` file

And you should be able to run:
```bash
npm start
```

Without any "Cannot find module 'react'" errors.

## 🆘 Still Having Issues?

If you're still experiencing problems:

1. **Check Node.js installation**:
   ```bash
   node --version
   npm --version
   ```

2. **Clear npm cache**:
   ```bash
   npm cache clean --force
   ```

3. **Try using Yarn instead**:
   ```bash
   npm install -g yarn
   yarn install
   yarn start
   ```

4. **Use VS Code integrated terminal** - It often has better permissions

---

**Once this is resolved, your React frontend will work perfectly with your NestJS backend! 🚀**
