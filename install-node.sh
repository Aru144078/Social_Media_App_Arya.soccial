#!/bin/bash

echo "🚀 Installing Node.js using NVM (no sudo required)..."

# Install NVM
if [ ! -d "$HOME/.nvm" ]; then
    echo "📦 Installing NVM..."
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    
    # Load NVM
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    
    # Add to shell profile
    if [ -f "$HOME/.zshrc" ]; then
        echo 'export NVM_DIR="$HOME/.nvm"' >> ~/.zshrc
        echo '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"' >> ~/.zshrc
        echo "✅ Added NVM to ~/.zshrc"
    fi
else
    echo "✅ NVM already installed"
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
fi

# Install Node.js 20
echo "📦 Installing Node.js 20..."
nvm install 20
nvm use 20
nvm alias default 20

# Verify installation
echo ""
echo "✅ Node.js installation complete!"
echo "Node version: $(node --version)"
echo "NPM version: $(npm --version)"
echo ""
echo "🎉 You can now install dependencies and start the server!"
echo ""
echo "Next steps:"
echo "1. Close and reopen your terminal (or run: source ~/.zshrc)"
echo "2. cd /Users/Personall/Desktop/Social_Media_App/backend"
echo "3. npm install"
echo "4. npm run dev"
