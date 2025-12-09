#!/bin/bash

# Script to generate self-signed SSL certificate for localhost development
# This creates a certificate that browsers will trust (after accepting the warning)

echo "Generating SSL certificate for localhost:3000..."

# Check if OpenSSL is installed
if ! command -v openssl &> /dev/null; then
    echo "Error: OpenSSL is not installed. Please install OpenSSL first."
    exit 1
fi

# Generate private key
openssl genrsa -out localhost-key.pem 2048

# Generate certificate signing request
openssl req -new -key localhost-key.pem -out localhost.csr -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"

# Generate self-signed certificate valid for 365 days
openssl x509 -req -days 365 -in localhost.csr -signkey localhost-key.pem -out localhost.pem

# Clean up CSR file
rm localhost.csr

echo "✅ SSL certificate generated successfully!"
echo "Files created:"
echo "  - localhost-key.pem (private key)"
echo "  - localhost.pem (certificate)"
echo ""
echo "⚠️  Note: Browsers will show a security warning for self-signed certificates."
echo "   Click 'Advanced' and 'Proceed to localhost' to continue."
echo ""
echo "To use trusted certificates in development, install mkcert:"
echo "  brew install mkcert  # macOS"
echo "  mkcert -install"
echo "  mkcert localhost 127.0.0.1 ::1"

