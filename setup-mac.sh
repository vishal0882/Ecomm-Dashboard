#!/bin/bash

# E-Commerce Dashboard - macOS Setup Script
# This script sets up the project on macOS

set -e

echo "🚀 Setting up E-Commerce Dashboard on macOS..."

# Check if Node.js is installed
if command -v node &> /dev/null; then
    echo "✅ Node.js is already installed: $(node --version)"
else
    echo "📦 Node.js not found. Installing..."
    
    # Check if Homebrew is installed
    if command -v brew &> /dev/null; then
        echo "Installing Node.js via Homebrew..."
        brew install node
    else
        echo "❌ Homebrew not found. Please install Homebrew first:"
        echo "   /bin/bash -c \"\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\""
        echo ""
        echo "Or install Node.js manually from: https://nodejs.org/"
        exit 1
    fi
fi

# Verify Node.js installation
if ! command -v node &> /dev/null; then
    echo "❌ Node.js installation failed. Please install manually from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js installed: $(node --version)"
echo "✅ npm installed: $(npm --version)"

# Install project dependencies
echo ""
echo "📦 Installing project dependencies..."
npm install

echo ""
echo "✅ Setup complete!"
echo ""
echo "To start the development server, run:"
echo "  npm run dev"
echo ""
echo "The application will be available at https://localhost:3000"
echo ""
echo "Note: The app uses HTTPS with a self-signed certificate."
echo "Your browser will show a security warning - click 'Advanced' and 'Proceed to localhost' to continue."

