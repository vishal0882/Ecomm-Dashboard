# ⚡ Quick Fix: Enable Real Email Sending

## 🔍 Current Issue

You're seeing this message:
```
Email sent successfully to vishal0882@gmail.com with 1 report(s) attached. 
Note: This is a simulation. Configure EmailJS or backend API for real emails.
```

**This means:** The chatbot is working, but EmailJS credentials are not configured yet.

## ✅ Solution: 5-Minute Setup

### Option 1: Use Setup Script (Easiest)

```bash
# Run the setup script
./setup-email.sh
```

Follow the prompts and enter your EmailJS credentials.

### Option 2: Manual Setup

#### Step 1: Get EmailJS Credentials

1. **Sign up**: https://www.emailjs.com/ (free = 200 emails/month)
2. **Add Email Service**:
   - Dashboard → Email Services → Add New Service
   - Choose Gmail (or Outlook)
   - Connect your account
   - **Copy Service ID** (starts with `service_`)

3. **Create Template**:
   - Dashboard → Email Templates → Create New Template
   - Use this template:
     ```
     To: {{to_email}}
     Subject: {{subject}}
     
     {{message}}
     ```
   - Save and **Copy Template ID** (starts with `template_`)

4. **Get Public Key**:
   - Dashboard → Account → General
   - Find "Public Key"
   - **Copy Public Key**

#### Step 2: Create .env File

In your project root, create `.env` file:

```bash
# Create .env file
cat > .env << 'EOF'
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
EOF
```

Then edit it with your actual values:
```bash
nano .env
# or use VS Code: code .env
```

Replace:
- `your_service_id_here` → Your actual Service ID
- `your_template_id_here` → Your actual Template ID  
- `your_public_key_here` → Your actual Public Key

#### Step 3: Restart Server

**CRITICAL:** You must restart the server!

```bash
# Stop current server (Ctrl+C)
# Then restart:
npm run dev
```

#### Step 4: Test

1. Open: https://localhost:3000/
2. Chatbot: "Send sales report to vishal0882@gmail.com as PDF"
3. Check inbox! 📧

## 🎯 Expected Result

**Before:**
```
❌ Note: This is a simulation
❌ Email service not configured
```

**After:**
```
✅ Email sent successfully to vishal0882@gmail.com with 1 report(s) attached
✅ (No simulation message)
✅ Real email in your inbox!
```

## 🐛 Troubleshooting

### Still seeing "simulation"?

1. ✅ Check `.env` file exists in project root
2. ✅ Verify all 3 values are correct (no typos, no quotes)
3. ✅ **Restart server** (this is required!)
4. ✅ Check browser console (F12) for errors

### Not receiving emails?

- Check spam folder
- Verify email address is correct
- Check EmailJS dashboard for delivery status
- Free tier: 200 emails/month limit

## 📚 More Help

- **Detailed Guide**: See `SETUP_EMAILJS.md`
- **EmailJS Docs**: https://www.emailjs.com/docs/

## ✅ Quick Checklist

- [ ] EmailJS account created
- [ ] Service ID copied
- [ ] Template ID copied
- [ ] Public Key copied
- [ ] `.env` file created with correct values
- [ ] Server restarted
- [ ] Test email sent successfully

**Once configured, you'll receive real emails!** 🎉

