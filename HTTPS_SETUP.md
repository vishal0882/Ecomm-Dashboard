# HTTPS Configuration for Local Development

## ✅ HTTPS Enabled

The application is now configured to run with HTTPS encryption on `https://localhost:3000`.

## Configuration Details

### SSL Certificate
- **Type**: Self-signed certificate (for local development)
- **Files**: 
  - `localhost-key.pem` (private key)
  - `localhost.pem` (certificate)
- **Validity**: 365 days
- **Generated**: Automatically via `generate-cert.sh` script

### Vite Configuration
The `vite.config.ts` has been updated to:
- Enable HTTPS on port 3000
- Use the generated SSL certificates
- Fallback to Vite's automatic certificate generation if certificates don't exist

## Running the Application

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Access the application**:
   Open your browser and navigate to: **https://localhost:3000**

3. **Browser Security Warning**:
   - Your browser will show a security warning because the certificate is self-signed
   - This is normal for local development
   - Click "Advanced" or "Show Details"
   - Click "Proceed to localhost" or "Accept the Risk and Continue"
   - The application will load normally after accepting the certificate

## Generating Certificates

### Option 1: Use the Provided Script (Self-Signed)
```bash
./generate-cert.sh
```

This generates a self-signed certificate that works but shows a browser warning.

### Option 2: Use mkcert (Trusted Certificate - Recommended)
For a certificate that browsers trust automatically:

1. **Install mkcert**:
   ```bash
   brew install mkcert  # macOS
   # or
   # Follow mkcert installation for your OS
   ```

2. **Install the local CA**:
   ```bash
   mkcert -install
   ```

3. **Generate trusted certificate**:
   ```bash
   mkcert localhost 127.0.0.1 ::1
   ```

4. **Rename the files**:
   ```bash
   mv localhost+2-key.pem localhost-key.pem
   mv localhost+2.pem localhost.pem
   ```

This creates a certificate that browsers trust without warnings.

## Security Notes

### Development vs Production
- **Development**: Self-signed certificates are fine for local development
- **Production**: Use proper SSL certificates from a trusted Certificate Authority (CA)

### Certificate Files
- Certificate files are excluded from git (see `.gitignore`)
- Never commit private keys to version control
- Each developer should generate their own certificates for local development

## Troubleshooting

### Certificate Errors
If you see certificate errors:
1. Delete the certificate files: `rm localhost-key.pem localhost.pem`
2. Regenerate: `./generate-cert.sh`
3. Restart the dev server

### Port Already in Use
If port 3000 is already in use:
```bash
lsof -ti:3000 | xargs kill
npm run dev
```

### Browser Still Shows HTTP
- Clear browser cache
- Use incognito/private mode
- Ensure you're accessing `https://` not `http://`

## Files Modified

- ✅ `vite.config.ts` - Added HTTPS configuration
- ✅ `.gitignore` - Added certificate files to ignore list
- ✅ `generate-cert.sh` - Script to generate SSL certificates
- ✅ Documentation files updated to reflect HTTPS URLs

## Benefits of HTTPS in Development

1. **Security**: Encrypted communication between browser and server
2. **Testing**: Test HTTPS-specific features (Service Workers, PWA, etc.)
3. **Consistency**: Match production environment
4. **Modern APIs**: Some browser APIs require HTTPS context

