# Fix: ERR_CERT_AUTHORITY_INVALID Error

## ✅ Solution Applied

Trusted SSL certificates have been generated using `mkcert` to fix the certificate error.

## What Was Done

1. ✅ Installed `mkcert` tool
2. ✅ Generated trusted certificates for localhost
3. ✅ Updated certificate files
4. ✅ Server restarted with new certificates

## Current Status

The server is now using trusted certificates. However, to completely eliminate the browser warning, you need to install the local CA.

## Complete the Setup (Choose One Option)

### Option 1: Install Local CA (Recommended - No More Warnings)

Run this command and enter your Mac password when prompted:

```bash
./install-trusted-cert.sh
```

Or manually:
```bash
mkcert -install
```

**After installation:**
- Restart your browser
- Access https://localhost:3000
- No more security warnings! ✅

### Option 2: Accept Certificate Manually (Quick Fix)

If you don't want to install the CA system-wide:

1. **Chrome/Edge**: 
   - Click "Advanced" on the warning page
   - Click "Proceed to localhost (unsafe)"
   - The certificate will be trusted for this session

2. **Safari**:
   - Click "Show Details"
   - Click "visit this website"
   - Confirm the exception

3. **Firefox**:
   - Click "Advanced"
   - Click "Accept the Risk and Continue"

## Verify the Fix

1. Open your browser
2. Navigate to: **https://localhost:3000**
3. You should see:
   - ✅ No security warning (if CA is installed)
   - ✅ Or a one-time warning you can accept (if CA not installed)

## Certificate Details

- **Valid for**: localhost, 127.0.0.1, ::1
- **Expires**: March 8, 2028
- **Type**: Trusted (mkcert generated)
- **Files**: 
  - `localhost-key.pem` (private key)
  - `localhost.pem` (certificate)

## Troubleshooting

### Still seeing the error?

1. **Clear browser cache and restart browser**
2. **Check certificate files exist**:
   ```bash
   ls -la localhost*.pem
   ```
3. **Restart the server**:
   ```bash
   lsof -ti:3000 | xargs kill
   npm run preview
   ```

### Certificate expired?

Regenerate certificates:
```bash
mkcert localhost 127.0.0.1 ::1
mv localhost+2-key.pem localhost-key.pem
mv localhost+2.pem localhost.pem
```

## Next Steps

1. **Install the CA** (recommended): `./install-trusted-cert.sh`
2. **Restart your browser**
3. **Access https://localhost:3000**
4. **Enjoy secure, trusted HTTPS!** 🎉

