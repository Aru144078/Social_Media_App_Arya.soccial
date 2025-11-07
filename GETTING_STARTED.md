# Getting Started Guide

## 🚀 Quick Setup (Recommended)

1. **Run the automated setup script:**
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```

2. **Start the application:**
   ```bash
   # Terminal 1 - Start backend
   cd backend && npm run dev
   
   # Terminal 2 - Start frontend
   cd frontend && npm start
   ```

3. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📋 Manual Setup Steps

If the automated script doesn't work, follow these steps:

### 1. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### 2. Database Setup

**Create PostgreSQL database:**
```bash
createdb social_media_db
```

**Run migrations:**
```bash
cd backend
npx prisma migrate dev --name init
npx prisma generate
```

**Seed database (optional):**
```bash
npm run db:seed
```

### 3. Environment Configuration

**Backend (.env):**
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/social_media_db"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_EXPIRES_IN="7d"
PORT=5000
NODE_ENV="development"
FRONTEND_URL="http://localhost:3000"
MAX_FILE_SIZE=5242880
UPLOAD_PATH="./uploads"
```

**Frontend (.env):**
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_APP_NAME="Social Media App"
```

### 4. Start Development Servers

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm start
```

## 🧪 Test the Application

1. **Register a new account** at http://localhost:3000/register
2. **Login** with your credentials
3. **Create a post** with text and/or image
4. **Like and comment** on posts
5. **View user profiles** and follow other users

## 📝 Demo Data

If you ran the seed script, you can login with:
- **Email:** john@example.com **Password:** password123
- **Email:** jane@example.com **Password:** password123

## 🐛 Troubleshooting

**PostgreSQL not running:**
```bash
# macOS
brew services start postgresql

# Linux
sudo service postgresql start

# Windows
net start postgresql-x64-15
```

**Port already in use:**
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

**Database connection error:**
- Check PostgreSQL is running
- Verify database credentials in .env
- Ensure database exists: `createdb social_media_db`

**Module not found errors:**
```bash
# Clear and reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## 🚀 Next Steps

1. **Explore the codebase** - Check out the well-structured components and API routes
2. **Customize the UI** - Modify Tailwind classes and components
3. **Add features** - Extend the application with new functionality
4. **Deploy to AWS** - Use the provided deployment scripts

## 📚 Key Files to Understand

- `backend/src/app.js` - Express app configuration
- `backend/src/routes/` - API route definitions
- `frontend/src/App.tsx` - React app entry point
- `frontend/src/contexts/AuthContext.tsx` - Authentication logic
- `backend/prisma/schema.prisma` - Database schema

Happy coding! 🎉
