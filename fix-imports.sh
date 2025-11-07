#!/bin/bash

echo "🔧 Fixing import paths..."

cd frontend/src

# Fix all @/ imports to relative imports
find . -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' \
  -e "s|from '@/types'|from './types'|g" \
  -e "s|from '@/types/|from './types/|g" \
  -e "s|from '@/utils/cn'|from './utils/cn'|g" \
  -e "s|from '@/utils/auth'|from './utils/auth'|g" \
  -e "s|from '@/services/api'|from './services/api'|g" \
  -e "s|from '@/services/auth'|from './services/auth'|g" \
  -e "s|from '@/services/posts'|from './services/posts'|g" \
  -e "s|from '@/services/users'|from './services/users'|g" \
  -e "s|from '@/contexts/AuthContext'|from './contexts/AuthContext'|g" \
  -e "s|from '@/components/ui/Button'|from './components/ui/Button'|g" \
  -e "s|from '@/components/ui/Input'|from './components/ui/Input'|g" \
  -e "s|from '@/components/ui/Card'|from './components/ui/Card'|g" \
  -e "s|from '@/components/ui/Avatar'|from './components/ui/Avatar'|g" \
  -e "s|from '@/components/layout/Header'|from './components/layout/Header'|g" \
  -e "s|from '@/components/layout/Layout'|from './components/layout/Layout'|g" \
  -e "s|from '@/components/ProtectedRoute'|from './components/ProtectedRoute'|g" \
  -e "s|from '@/components/posts/PostCard'|from './components/posts/PostCard'|g" \
  -e "s|from '@/components/posts/CreatePostForm'|from './components/posts/CreatePostForm'|g" \
  -e "s|from '@/pages/Home'|from './pages/Home'|g" \
  -e "s|from '@/pages/Login'|from './pages/Login'|g" \
  -e "s|from '@/pages/Register'|from './pages/Register'|g" \
  -e "s|from '@/pages/Profile'|from './pages/Profile'|g" \
  -e "s|from '@/pages/CreatePost'|from './pages/CreatePost'|g" \
  {} \;

echo "✅ Import paths fixed!"
