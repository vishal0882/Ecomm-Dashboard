# 🚀 Local Hosting Guide

## ✅ Current Status

Your e-commerce dashboard is **already running locally**!

## 🌐 Access Your Dashboard

**URL:** https://localhost:3000

### How to Access:

1. **Open your browser**
2. **Navigate to:** `https://localhost:3000`
3. **If you see a security warning:**
   - Click **"Advanced"** or **"Show Details"**
   - Click **"Proceed to localhost"** or **"Accept the Risk"**
   - This is normal for local HTTPS certificates

## 📋 Server Information

- **Port:** 3000
- **Protocol:** HTTPS (secure)
- **Status:** ✅ Running
- **SSL Certificates:** ✅ Configured

## 🛠️ Server Commands

### Start Server (if not running):
```bash
npm run dev
```

### Stop Server:
```bash
# Press Ctrl+C in the terminal where server is running
```

### Restart Server:
```bash
# Stop (Ctrl+C) then:
npm run dev
```

### Check if Server is Running:
```bash
# Check port 3000
lsof -ti:3000

# Or test connection
curl -k https://localhost:3000
```

### Kill Server (if port is busy):
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use the helper script
./kill-port.sh
```

## 🔧 Build for Production

### Build:
```bash
npm run build
```

### Preview Production Build:
```bash
npm run preview
```

## 📱 Access from Other Devices (Same Network)

If you want to access from your phone or another device:

1. **Find your local IP:**
   ```bash
   ifconfig | grep "inet " | grep -v 127.0.0.1
   ```
   Example: `192.168.1.100`

2. **Update `vite.config.ts`:**
   ```typescript
   server: {
     port: 3000,
     https: getCertificates(),
     host: '0.0.0.0', // Add this line
     open: true,
     strictPort: true,
   }
   ```

3. **Restart server:**
   ```bash
   npm run dev
   ```

4. **Access from other device:**
   - URL: `https://YOUR_IP:3000`
   - Example: `https://192.168.1.100:3000`

## 🔒 SSL Certificate Setup

SSL certificates are already configured:
- `localhost-key.pem` - Private key
- `localhost.pem` - Certificate

If you need to regenerate:
```bash
# Using mkcert (recommended)
mkcert localhost 127.0.0.1 ::1

# Rename files
mv localhost+2-key.pem localhost-key.pem
mv localhost+2.pem localhost.pem
```

## 🐛 Troubleshooting

### Port 3000 Already in Use:
```bash
# Kill process
lsof -ti:3000 | xargs kill -9

# Or use script
./kill-port.sh
```

### Certificate Error:
- Click "Advanced" → "Proceed to localhost"
- Or regenerate certificates using `mkcert`

### Server Not Starting:
```bash
# Check Node.js version
node --version

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Try again
npm run dev
```

### Can't Access from Browser:
1. Check server is running: `lsof -ti:3000`
2. Check URL: `https://localhost:3000` (not `http://`)
3. Try: `https://127.0.0.1:3000`
4. Check browser console (F12) for errors

## 📊 Dashboard Features

Once accessed, you'll have:
- ✅ Main Dashboard
- ✅ Sales Analytics
- ✅ Customer Analytics
- ✅ Core Web Vitals
- ✅ Scrum of Scrum
- ✅ Funnel Analysis
- ✅ Settings (API Integrations)
- ✅ AI Chatbot (with email sending)

## 🎉 You're All Set!

Your dashboard is live at: **https://localhost:3000**

Enjoy your e-commerce dashboard! 🚀
