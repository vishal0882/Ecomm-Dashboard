# macOS Setup Guide

This guide will help you set up the E-Commerce Dashboard on your Mac.

## Step 1: Accept Xcode License (Required)

If you see an error about Xcode license, you need to accept it first:

```bash
sudo xcodebuild -license accept
```

You'll need to enter your Mac password. This is required for Homebrew and other development tools.

## Step 2: Install Node.js

### Option A: Using Homebrew (Recommended)

1. Install Homebrew (if not already installed):
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

2. Install Node.js:
```bash
brew install node
```

### Option B: Using Node.js Installer

1. Download Node.js from [nodejs.org](https://nodejs.org/)
2. Run the installer and follow the instructions
3. Restart your terminal

### Option C: Using nvm (Node Version Manager)

1. Install nvm:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

2. Restart your terminal or run:
```bash
source ~/.zshrc
```

3. Install Node.js:
```bash
nvm install 18
nvm use 18
```

## Step 3: Verify Installation

Check that Node.js and npm are installed:

```bash
node --version
npm --version
```

You should see version numbers (Node.js v18 or higher recommended).

## Step 4: Setup the Project

### Quick Setup (Automated)

Run the setup script:

```bash
./setup-mac.sh
```

### Manual Setup

1. Navigate to the project directory:
```bash
cd /Users/vishalj/Downloads/ecommerce-dashboard-main
```

2. Install dependencies:
```bash
npm install
```

## Step 5: Run the Development Server

Start the development server:

```bash
npm run dev
```

The application will automatically open in your browser at `https://localhost:3000`

**Note**: The application uses HTTPS with a self-signed certificate. Your browser will show a security warning - click "Advanced" and "Proceed to localhost" to continue.

## Step 6: Build for Production

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Troubleshooting

### "Command not found: node"
- Node.js is not installed or not in your PATH
- Follow Step 2 to install Node.js
- Restart your terminal after installation

### "Xcode license" errors
- Run: `sudo xcodebuild -license accept`
- Enter your password when prompted

### Port 3000 already in use
- Change the port in `vite.config.ts` or kill the process using port 3000:
```bash
lsof -ti:3000 | xargs kill -9
```

### Permission errors
- Make sure you have write permissions in the project directory
- You may need to use `sudo` for some operations (not recommended for npm install)

## Next Steps

- Configure API credentials in `.env` file (optional - app works with mock data)
- Explore the dashboard at `https://localhost:3000`
- Check the main README.md for more information about features and API integrations

