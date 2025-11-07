# Quick Start Guide

## ✅ Steps to Run the Application

### 1. Start Backend Server (Terminal 1)
```bash
cd /Users/Personall/Desktop/Social_Media_App/backend
source ~/.nvm/nvm.sh
nvm use 20
npm install
npm run dev
```

**Expected output:**
```
🚀 Server running on port 5000
📊 Environment: development
Database connected successfully
```

### 2. Start Frontend Server (Terminal 2)
```bash
cd /Users/Personall/Desktop/Social_Media_App/frontend  
source ~/.nvm/nvm.sh
nvm use 20
npm start
```

**Expected output:**
```
Compiled successfully!
You can now view social-media-frontend in the browser.
  Local:            http://localhost:3000
```

### 3. Open Browser
Navigate to: **http://localhost:3000**

## 🐛 Current Status

✅ Node.js 20 installed
✅ Frontend dependencies installed
✅ Import paths fixed
✅ Type errors fixed
⏳ Need to start backend server
⏳ Need to set up database

## 📝 Next Steps

1. **Install PostgreSQL** (if not already installed):
   ```bash
   brew install postgresql
   brew services start postgresql
   ```

2. **Create Database**:
   ```bash
   createdb social_media_db
   ```

3. **Run Database Migrations**:
   ```bash
   cd /Users/Personall/Desktop/Social_Media_App/backend
   npx prisma migrate dev --name init
   npx prisma generate
   ```

4. **Seed Database** (optional - adds demo users):
   ```bash
   npm run db:seed
   ```

## 🎯 What's Fixed

- ✅ Node.js version (upgraded from v10 to v20)
- ✅ TypeScript version compatibility
- ✅ Import path resolution
- ✅ Type errors in Home and Profile pages
- ✅ Frontend dependencies installed

## ⚠️ Known Issues

- Backend needs to be started (proxy error will resolve)
- Database needs to be set up
- Need to run Prisma migrations

## 🚀 Quick Commands

**Check if backend is running:**
```bash
curl http://localhost:5000/health
```

**Check if frontend is running:**
```bash
curl http://localhost:3000
```

**Kill process on port (if needed):**
```bash
lsof -ti:5000 | xargs kill -9  # Backend
lsof -ti:3000 | xargs kill -9  # Frontend
```
