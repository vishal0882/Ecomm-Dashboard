# Email Setup Guide for Chatbot

## Current Status

The chatbot currently uses a **simulation mode** for email sending. To enable real email functionality, you need to configure one of the following options:

## Option 1: EmailJS (Recommended for Frontend)

EmailJS allows sending emails directly from the frontend without a backend.

### Setup Steps

1. **Create EmailJS Account**:
   - Go to https://www.emailjs.com/
   - Sign up for a free account (200 emails/month free)

2. **Create Email Service**:
   - Go to "Email Services" in dashboard
   - Add a service (Gmail, Outlook, or Custom SMTP)
   - Note your Service ID

3. **Create Email Template**:
   - Go to "Email Templates"
   - Create a new template with these variables:
     - `{{to_email}}` - Recipient email
     - `{{subject}}` - Email subject
     - `{{message}}` - Email body with reports
     - `{{from_name}}` - Sender name
   - Note your Template ID

4. **Get Public Key**:
   - Go to "Account" → "General"
   - Copy your Public Key

5. **Configure Environment Variables**:
   ```bash
   # Create .env file in project root
   cp .env.example .env
   ```

   Edit `.env` and add:
   ```
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

6. **Restart Server**:
   ```bash
   npm run dev
   ```

### EmailJS Template Example

```
To: {{to_email}}
Subject: {{subject}}

{{message}}

---
Sent from E-Commerce Dashboard
```

## Option 2: Backend API

If you have a backend server, you can create an API endpoint for sending emails.

### Backend Endpoint Requirements

**Endpoint**: `POST /api/send-email`

**Request Format**:
```json
{
  "to": "recipient@example.com",
  "subject": "Report",
  "body": "Email body",
  "attachments": [
    {
      "filename": "report.json",
      "content": "report data",
      "type": "application/json"
    }
  ]
}
```

**Response Format**:
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

### Configure Environment Variable

```bash
# In .env file
VITE_EMAIL_API_ENDPOINT=https://your-backend.com/api/send-email
```

### Example Backend Implementation (Node.js/Express)

```javascript
const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer');

const app = express();
const upload = multer();

app.post('/api/send-email', upload.array('attachments'), async (req, res) => {
  const { to, subject, body } = req.body;
  const attachments = req.files.map(file => ({
    filename: file.originalname,
    content: file.buffer
  }));

  const transporter = nodemailer.createTransport({
    // Your email service configuration
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  try {
    await transporter.sendMail({
      from: 'dashboard@company.com',
      to: to,
      subject: subject,
      text: body,
      attachments: attachments
    });

    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
```

## Option 3: Other Email Services

### SendGrid

```typescript
// In llmService.ts, add SendGrid integration
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

const msg = {
  to: request.to,
  from: 'dashboard@company.com',
  subject: request.subject,
  text: request.body,
  attachments: reports.map((r, i) => ({
    content: Buffer.from(r).toString('base64'),
    filename: `report_${i}.${request.attachments[i].format}`,
    type: `application/${request.attachments[i].format}`
  }))
}

await sgMail.send(msg)
```

### AWS SES

```typescript
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'

const sesClient = new SESClient({ region: 'us-east-1' })

const command = new SendEmailCommand({
  Source: 'dashboard@company.com',
  Destination: { ToAddresses: [request.to] },
  Message: {
    Subject: { Data: request.subject },
    Body: { Text: { Data: request.body } }
  }
})

await sesClient.send(command)
```

## Testing Email Functionality

### Test with EmailJS

1. Set up EmailJS account and get credentials
2. Add credentials to `.env` file
3. Restart dev server
4. Try: "Send sales report to your-email@example.com as PDF"
5. Check your email inbox

### Test with Backend API

1. Set up backend endpoint
2. Add endpoint URL to `.env`
3. Restart dev server
4. Send test email from chatbot
5. Check backend logs and email inbox

## Current Behavior (Simulation Mode)

Without configuration, the chatbot will:
- ✅ Parse email requests correctly
- ✅ Generate reports
- ✅ Show success message
- ❌ **Not actually send emails** (logs to console only)

## Troubleshooting

### "Email sent successfully" but no email received

- Check if EmailJS/API is properly configured
- Verify environment variables are loaded
- Check browser console for errors
- Verify email service credentials

### EmailJS Errors

- Ensure Service ID, Template ID, and Public Key are correct
- Check EmailJS dashboard for service status
- Verify template variables match code

### API Errors

- Check backend server is running
- Verify endpoint URL is correct
- Check CORS settings
- Review backend logs

## Next Steps

1. **Choose an email service** (EmailJS recommended for quick setup)
2. **Set up credentials** and add to `.env`
3. **Restart server** to load environment variables
4. **Test email sending** from chatbot
5. **Verify emails** are received

The chatbot is ready - just needs email service configuration!

