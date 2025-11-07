#!/bin/bash

echo "🔧 Setting up Arya.social SQLite database..."

cd /Users/Personall/Desktop/Social_Media_App/backend

# Load NVM
source ~/.nvm/nvm.sh
nvm use 20

echo "📦 Removing old PostgreSQL migrations..."
rm -rf prisma/migrations

echo "🔄 Generating Prisma client for SQLite..."
npx prisma generate

echo "🗄️ Creating SQLite database and migrations..."
npx prisma migrate dev --name init

echo "🌱 Seeding database with demo data..."
npm run db:seed

echo "✅ SQLite setup complete!"
echo ""
echo "🚀 Starting Arya.social backend server..."
npm run dev
