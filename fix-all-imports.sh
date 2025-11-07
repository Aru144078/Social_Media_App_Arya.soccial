#!/bin/bash

echo "🔧 Fixing all import paths..."

cd /Users/Personall/Desktop/Social_Media_App/frontend/src

# Fix components/layout imports (need to go up one level to components, then to src)
echo "Fixing components/layout imports..."
find components/layout -type f -name "*.tsx" -exec sed -i '' \
  -e "s|from '\./components/ui/|from '../ui/|g" \
  -e "s|from '\.\.\.\.\/contexts/|from '../../contexts/|g" \
  {} \;

# Fix components/posts imports
echo "Fixing components/posts imports..."
find components/posts -type f -name "*.tsx" -exec sed -i '' \
  -e "s|from '\./components/ui/|from '../ui/|g" \
  -e "s|from '\.\.\.\.\/types'|from '../../types'|g" \
  -e "s|from '\.\.\.\.\/services/|from '../../services/|g" \
  -e "s|from '\.\.\.\.\/contexts/|from '../../contexts/|g" \
  {} \;

# Fix components/ProtectedRoute imports
echo "Fixing ProtectedRoute imports..."
sed -i '' \
  -e "s|from '\.\.\.\.\/contexts/AuthContext'|from '../contexts/AuthContext'|g" \
  components/ProtectedRoute.tsx

# Fix contexts imports
echo "Fixing contexts imports..."
find contexts -type f -name "*.tsx" -exec sed -i '' \
  -e "s|from '\./types'|from '../types'|g" \
  -e "s|from '\./services/|from '../services/|g" \
  -e "s|from '\./utils/|from '../utils/|g" \
  {} \;

# Fix services imports
echo "Fixing services imports..."
find services -type f -name "*.ts" -exec sed -i '' \
  -e "s|from '\./types'|from '../types'|g" \
  -e "s|from '\./utils/|from '../utils/|g" \
  {} \;

# Fix pages imports (already correct with ../)
echo "Pages imports should already be correct..."

# Fix utils imports if needed
echo "Fixing utils imports..."
find utils -type f -name "*.ts" -exec sed -i '' \
  -e "s|from '\./types'|from '../types'|g" \
  {} \;

echo "✅ All import paths fixed!"
