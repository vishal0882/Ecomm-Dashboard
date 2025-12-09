# Quick Start Guide for macOS

## 🚀 Get Started in 3 Steps

### Step 1: Install Node.js

**If you see Xcode license errors**, first run:
```bash
sudo xcodebuild -license accept
```

Then install Node.js using one of these methods:

**Option 1: Homebrew (Easiest)**
```bash
brew install node
```

**Option 2: Direct Download**
- Visit https://nodejs.org/
- Download the macOS installer
- Run the installer

**Option 3: nvm**
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.zshrc
nvm install 18
```

### Step 2: Install Dependencies

```bash
cd /Users/vishalj/Downloads/ecommerce-dashboard-main
npm install
```

### Step 3: Start the Server

```bash
npm run dev
```

The app will open automatically at **https://localhost:3000** 🎉

**Note**: The app uses HTTPS with a self-signed certificate. Your browser will show a security warning - click "Advanced" and "Proceed to localhost" to continue.

---

## 📦 Build for Production

```bash
npm run build
npm run preview
```

## 📚 More Information

- See `MAC_SETUP.md` for detailed setup instructions
- See `README.md` for project documentation

## ✅ What's Already Done

- ✅ All source code files created
- ✅ Project structure set up
- ✅ Configuration files ready
- ⏳ Just need Node.js installed!

