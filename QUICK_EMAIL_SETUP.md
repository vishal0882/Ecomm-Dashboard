# Quick Email Setup - Get Emails Working Now!

## ⚠️ Current Status

The chatbot is currently in **simulation mode** - it shows success messages but doesn't actually send emails. This is why you're not receiving emails.

## 🚀 Quick Fix: Use EmailJS (5 minutes)

### Step 1: Sign Up for EmailJS (Free)

1. Go to: https://www.emailjs.com/
2. Click "Sign Up" (free account = 200 emails/month)
3. Verify your email

### Step 2: Add Email Service

1. In EmailJS dashboard, go to **"Email Services"**
2. Click **"Add New Service"**
3. Choose your email provider:
   - **Gmail** (recommended for testing)
   - **Outlook**
   - **Custom SMTP**
4. Follow the setup instructions
5. **Copy your Service ID** (e.g., `service_abc123`)

### Step 3: Create Email Template

1. Go to **"Email Templates"**
2. Click **"Create New Template"**
3. Use this template:

```
To: {{to_email}}
Subject: {{subject}}

{{message}}

---
Sent from E-Commerce Dashboard
Reply to: {{reply_to}}
```

4. **Copy your Template ID** (e.g., `template_xyz789`)

### Step 4: Get Public Key

1. Go to **"Account"** → **"General"**
2. Find **"Public Key"**
3. **Copy your Public Key** (e.g., `abcdefghijklmnop`)

### Step 5: Configure in Project

1. **Create `.env` file** in project root:
   ```bash
   touch .env
   ```

2. **Add your EmailJS credentials**:
   ```bash
   VITE_EMAILJS_SERVICE_ID=your_service_id_here
   VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
   VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
   ```

3. **Restart the server**:
   ```bash
   # Stop current server (Ctrl+C)
   npm run dev
   ```

### Step 6: Test

1. Open chatbot at: https://localhost:3000/
2. Type: "Send sales report to your-email@example.com as PDF"
3. Confirm in dialog
4. **Check your email inbox!** 📧

## ✅ Verification

After setup, when you send an email:
- ✅ You'll see "Email sent successfully" message
- ✅ **You'll actually receive the email**
- ✅ Reports will be included in the email body

## 🔧 Alternative: Backend API

If you prefer a backend solution:

1. Set up a backend API endpoint
2. Add to `.env`:
   ```
   VITE_EMAIL_API_ENDPOINT=https://your-api.com/send-email
   ```
3. Restart server

See `EMAIL_SETUP_GUIDE.md` for detailed backend setup.

## 📝 Example .env File

```bash
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
VITE_EMAILJS_PUBLIC_KEY=abcdefghijklmnop
```

## 🐛 Troubleshooting

**Still not receiving emails?**

1. ✅ Check `.env` file exists and has correct values
2. ✅ Restart server after adding `.env`
3. ✅ Check browser console for errors (F12)
4. ✅ Verify EmailJS service is active in dashboard
5. ✅ Check spam folder
6. ✅ Verify email address is correct

**Error messages?**

- "EmailJS error": Check your credentials in `.env`
- "Service not found": Verify Service ID is correct
- "Template not found": Verify Template ID is correct

## 📚 More Help

See `EMAIL_SETUP_GUIDE.md` for:
- Detailed setup instructions
- Backend API setup
- Other email service options
- Advanced configuration

Once configured, emails will be sent for real! 🎉

