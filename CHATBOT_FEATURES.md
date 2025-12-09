# LLM Chatbot Features

## ✅ Chatbot Added to Dashboard

An AI-powered chatbot has been integrated into the Dashboard page with the following capabilities:

### Features

1. **Query Handling**
   - Answers questions about the e-commerce dashboard
   - Provides insights on sales, customers, performance metrics
   - Explains dashboard features and functionality

2. **Report Generation**
   - Generates various report types:
     - Sales Report
     - Customer Report
     - Performance Report
     - Revenue Report
     - Orders Report
   - Supports multiple formats: JSON, CSV, PDF

3. **Email Functionality**
   - Sends emails to any email address
   - Attaches generated reports
   - Supports multiple report attachments
   - Email confirmation dialog before sending

### How to Use

#### Access the Chatbot
- Navigate to Dashboard: https://localhost:3000/
- The chatbot appears on the right side of the dashboard

#### Example Queries

**Generate Reports:**
```
"Generate a sales report"
"Create a customer report in JSON format"
"Show me a performance report"
```

**Send Emails:**
```
"Send sales report to manager@company.com as PDF"
"Email customer report to john@example.com in CSV format"
"Send performance report to team@company.com"
```

**Ask Questions:**
```
"What is the total revenue?"
"Show me customer insights"
"How can I view sales data?"
"What reports are available?"
```

**Quick Actions:**
- Click "Sales Report" button for quick report generation
- Click "Email Report" button for quick email template

### Chatbot Interface

- **Chat History**: Scrollable message history
- **Input Field**: Type your queries or requests
- **Send Button**: Submit your message
- **Quick Actions**: Pre-filled buttons for common tasks
- **Email Dialog**: Confirmation dialog when sending emails

### Email Workflow

1. **User Request**: "Send sales report to email@example.com as PDF"
2. **Email Parsing**: Chatbot extracts email, report type, and format
3. **Confirmation Dialog**: Review email details
4. **Report Generation**: Reports are generated in requested format
5. **Email Sending**: Email is sent with attachments
6. **Confirmation**: Success message displayed

### Report Types Available

- **Sales Report**: Revenue, orders, products sold
- **Customer Report**: Customer segments, CLV, CAC
- **Performance Report**: Core Web Vitals, metrics
- **Revenue Report**: Revenue trends and growth
- **Orders Report**: Order statistics and details

### Report Formats

- **JSON**: Structured data format
- **CSV**: Spreadsheet-compatible format
- **PDF**: Document format (simulated)

### Integration Points

The chatbot can be connected to:
- **OpenAI API**: For advanced LLM capabilities
- **Anthropic Claude**: Alternative LLM provider
- **Email Services**: SendGrid, AWS SES, SMTP
- **Report Services**: Backend API for report generation

### Files Created

1. **Chatbot Component**: `src/components/chatbot/Chatbot.tsx`
2. **LLM Service**: `src/services/llmService.ts`
3. **UI Components**: 
   - `src/components/ui/scroll-area.tsx`
   - `src/components/ui/avatar.tsx`
   - `src/components/ui/dialog.tsx`

### Current Implementation

- ✅ Chat interface with message history
- ✅ LLM query processing (mock implementation)
- ✅ Email parsing and extraction
- ✅ Report generation (mock data)
- ✅ Email sending simulation
- ✅ Confirmation dialogs
- ✅ Error handling

### Production Setup

To connect to real services:

1. **LLM Integration**:
   ```typescript
   // In llmService.ts, replace processLLMQuery with:
   const response = await fetch('https://api.openai.com/v1/chat/completions', {
     method: 'POST',
     headers: {
       'Authorization': `Bearer ${API_KEY}`,
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({
       model: 'gpt-4',
       messages: messages.map(m => ({ role: m.role, content: m.content }))
     })
   })
   ```

2. **Email Service**:
   ```typescript
   // Replace sendEmailWithReport with actual email API:
   const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
     method: 'POST',
     headers: {
       'Authorization': `Bearer ${SENDGRID_API_KEY}`,
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({
       personalizations: [{ to: [{ email: request.to }] }],
       from: { email: 'dashboard@company.com' },
       subject: request.subject,
       content: [{ type: 'text/plain', value: request.body }],
       attachments: reports.map(r => ({
         content: r,
         filename: `report.${format}`,
         type: `application/${format}`
       }))
     })
   })
   ```

### Testing

1. **Open Dashboard**: https://localhost:3000/
2. **Find Chatbot**: Right side of the dashboard
3. **Try Queries**:
   - "What can you do?"
   - "Generate a sales report"
   - "Send customer report to test@example.com as PDF"
4. **Check Email Dialog**: Confirmation appears before sending

### Next Steps

- Connect to real LLM API (OpenAI, Anthropic, etc.)
- Integrate with email service (SendGrid, AWS SES)
- Add backend API for report generation
- Implement file download functionality
- Add more report types and customization options

The chatbot is ready to use and can be enhanced with real API integrations!

