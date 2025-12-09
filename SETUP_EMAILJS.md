# 🚀 Quick EmailJS Setup (5 Minutes)

## Why You're Seeing "Simulation" Message

The chatbot is working correctly, but it needs EmailJS credentials to send real emails. Currently, it's in simulation mode because no email service is configured.

## ✅ Step-by-Step Setup

### Step 1: Sign Up for EmailJS (Free)

1. Go to: **https://www.emailjs.com/**
2. Click **"Sign Up"** (top right)
3. Use your email: **vishal0882@gmail.com**
4. Verify your email address
5. You get **200 free emails/month** 🎉

### Step 2: Add Email Service (Gmail)

1. In EmailJS Dashboard, click **"Email Services"** (left sidebar)
2. Click **"Add New Service"**
3. Choose **"Gmail"** (or Outlook if you prefer)
4. Click **"Connect Account"**
5. Sign in with your Gmail account
6. **Copy the Service ID** (starts with `service_`)
   - Example: `service_abc123xyz`

### Step 3: Create Email Template

1. Click **"Email Templates"** (left sidebar)
2. Click **"Create New Template"**
3. Use this template:

```
To: {{to_email}}
Subject: {{subject}}

{{message}}

---
Sent from E-Commerce Dashboard
```

4. **Save the template**
5. **Copy the Template ID** (starts with `template_`)
   - Example: `template_xyz789abc`

### Step 4: Get Public Key

1. Click **"Account"** (left sidebar)
2. Click **"General"** tab
3. Find **"Public Key"** section
4. **Copy the Public Key**
   - Example: `abcdefghijklmnopqrstuvwxyz123456`

### Step 5: Create .env File

In your project root, create a file named `.env`:

```bash
# Copy .env.example to .env
cp .env.example .env
```

Then edit `.env` and replace with your actual values:

```bash
VITE_EMAILJS_SERVICE_ID=service_abc123xyz
VITE_EMAILJS_TEMPLATE_ID=template_xyz789abc
VITE_EMAILJS_PUBLIC_KEY=abcdefghijklmnopqrstuvwxyz123456
```

### Step 6: Restart Server

**IMPORTANT:** You must restart the server after creating `.env` file!

```bash
# Stop server (Ctrl+C) if running
# Then restart:
npm run dev
```

### Step 7: Test!

1. Open: **https://localhost:3000/**
2. Open the chatbot
3. Type: **"Send sales report to vishal0882@gmail.com as PDF"**
4. Check your inbox! 📧

## 🎯 Quick Copy-Paste Commands

```bash
# 1. Create .env file
cat > .env << 'EOF'
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
EOF

# 2. Edit .env with your actual values (use nano, vim, or VS Code)
nano .env

# 3. Restart server
npm run dev
```

## ✅ Verification Checklist

- [ ] EmailJS account created
- [ ] Email service added (Gmail/Outlook)
- [ ] Email template created
- [ ] Service ID copied
- [ ] Template ID copied
- [ ] Public Key copied
- [ ] `.env` file created with correct values
- [ ] Server restarted
- [ ] Test email sent successfully

## 🐛 Troubleshooting

### Still seeing "simulation" message?

1. ✅ Check `.env` file exists in project root
2. ✅ Verify all three values are correct (no typos)
3. ✅ **Restart server** (this is critical!)
4. ✅ Check browser console (F12) for errors
5. ✅ Verify EmailJS service is active in dashboard

### Error: "EmailJS error: Service not found"

- Double-check Service ID is correct
- Ensure service is active in EmailJS dashboard

### Error: "Template not found"

- Double-check Template ID is correct
- Ensure template is saved and active

### Not receiving emails?

- Check spam/junk folder
- Verify email address is correct
- Check EmailJS dashboard for delivery status
- Free tier: 200 emails/month limit

## 📧 Email Template Variables

Your template should use these variables:
- `{{to_email}}` - Recipient email
- `{{subject}}` - Email subject
- `{{message}}` - Email body with report
- `{{from_name}}` - Sender name (optional)
- `{{reply_to}}` - Reply-to address (optional)

## 🎉 Success!

Once configured, you'll see:
- ✅ "Email sent successfully" (no "simulation" message)
- ✅ Real emails in your inbox
- ✅ Reports included in email body

**No more simulation mode!** 🚀

