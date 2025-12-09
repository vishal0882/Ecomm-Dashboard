// LLM Service for handling chatbot queries
// This can be connected to OpenAI, Anthropic, or any LLM API

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  attachments?: string[]
}

export interface ReportRequest {
  type: 'sales' | 'customers' | 'performance' | 'revenue' | 'orders' | 'custom'
  format: 'json' | 'csv' | 'pdf'
  dateRange?: {
    start: string
    end: string
  }
}

export interface EmailRequest {
  to: string
  subject: string
  body: string
  attachments?: ReportRequest[]
}

// Mock LLM response - Replace with actual LLM API call
export async function processLLMQuery(messages: ChatMessage[]): Promise<string> {
  const lastMessage = messages[messages.length - 1]?.content.toLowerCase() || ''
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Handle different query types
  if (lastMessage.includes('sales') || lastMessage.includes('revenue')) {
    return "I can help you with sales data. I can generate sales reports, show revenue trends, or send sales reports via email. What would you like to do?"
  }
  
  if (lastMessage.includes('customer') || lastMessage.includes('clv') || lastMessage.includes('cac')) {
    return "I can help with customer analytics. I can generate customer reports, analyze CLV/CAC metrics, or send customer reports via email. What specific information do you need?"
  }
  
  if (lastMessage.includes('report') && lastMessage.includes('email')) {
    return "I can generate and email reports. Please specify:\n1. Report type (sales, customers, performance, etc.)\n2. Email address\n3. Format (JSON, CSV, PDF)\n\nExample: 'Send a sales report to john@example.com in PDF format'"
  }
  
  if (lastMessage.includes('send') && lastMessage.includes('email')) {
    return "I can send emails with reports. Please provide:\n- Email address\n- Report type\n- Format (JSON/CSV/PDF)\n\nExample: 'Send sales report to manager@company.com as PDF'"
  }
  
  if (lastMessage.includes('generate') || lastMessage.includes('create')) {
    return "I can generate various reports:\n- Sales Report\n- Customer Report\n- Performance Report\n- Revenue Report\n- Orders Report\n\nWhat type of report would you like to generate?"
  }
  
  if (lastMessage.includes('help') || lastMessage.includes('what can you do')) {
    return "I'm your e-commerce dashboard assistant! I can:\n\n📊 Generate Reports:\n- Sales, Customers, Performance, Revenue, Orders\n\n📧 Send Emails:\n- Email reports to any address\n- Attach reports in JSON, CSV, or PDF format\n\n💬 Answer Questions:\n- Dashboard metrics and insights\n- Data analysis and trends\n\nJust ask me anything about the dashboard or request a report!"
  }
  
  // Default response
  return "I'm here to help with your e-commerce dashboard! I can generate reports, send emails with attachments, and answer questions about your data. What would you like to know?"
}

// Extract email and report details from user message
export function parseEmailRequest(message: string): EmailRequest | null {
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/
  const emailMatch = message.match(emailRegex)
  
  if (!emailMatch) return null
  
  const email = emailMatch[0]
  const lowerMessage = message.toLowerCase()
  
  // Detect report type
  let reportType: ReportRequest['type'] = 'sales'
  if (lowerMessage.includes('customer')) reportType = 'customers'
  else if (lowerMessage.includes('performance') || lowerMessage.includes('vital')) reportType = 'performance'
  else if (lowerMessage.includes('revenue')) reportType = 'revenue'
  else if (lowerMessage.includes('order')) reportType = 'orders'
  
  // Detect format
  let format: ReportRequest['format'] = 'pdf'
  if (lowerMessage.includes('json')) format = 'json'
  else if (lowerMessage.includes('csv')) format = 'csv'
  else if (lowerMessage.includes('pdf')) format = 'pdf'
  
  return {
    to: email,
    subject: `${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report`,
    body: `Please find attached the ${reportType} report.`,
    attachments: [{
      type: reportType,
      format: format
    }]
  }
}

// Generate report data
export async function generateReport(request: ReportRequest): Promise<string> {
  // Simulate report generation
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const mockData: Record<ReportRequest['type'], Record<string, string | number>> = {
    sales: { revenue: 45000, orders: 1200, period: 'Last 30 days' },
    customers: { total: 850, new: 200, clv: 18500 },
    performance: { lcp: 1.9, fid: 41, cls: 0.07 },
    revenue: { total: 328000, growth: 12.5 },
    orders: { total: 8800, average: 149.99 },
    custom: { data: 'Custom report data' }
  }
  
  const data = mockData[request.type] || mockData.sales
  
  if (request.format === 'json') {
    return JSON.stringify(data, null, 2)
  } else if (request.format === 'csv') {
    return Object.entries(data).map(([key, value]) => `${key},${value}`).join('\n')
  } else {
    return `PDF Report: ${JSON.stringify(data, null, 2)}`
  }
}

// Send email with report
export async function sendEmailWithReport(request: EmailRequest): Promise<{ success: boolean; message: string }> {
  if (!request.attachments || request.attachments.length === 0) {
    return {
      success: false,
      message: 'No reports to attach'
    }
  }

  try {
    // Generate all reports
    const reports = await Promise.all(
      request.attachments.map(att => generateReport(att))
    )

    // Method 1: Use EmailJS (Frontend email service)
    const emailjsConfig = {
      serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
      templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
      publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ''
    }

    // Check if EmailJS is configured
    if (emailjsConfig.serviceId && emailjsConfig.templateId && emailjsConfig.publicKey) {
      return await sendEmailViaEmailJS(request, reports, emailjsConfig)
    }

    // Method 2: Use backend API (if available)
    const apiEndpoint = import.meta.env.VITE_EMAIL_API_ENDPOINT || ''
    if (apiEndpoint) {
      return await sendEmailViaAPI(request, reports, apiEndpoint)
    }

    // Method 3: Fallback - Log and simulate (for development)
    console.log('📧 Email would be sent:', {
      to: request.to,
      subject: request.subject,
      body: request.body,
      attachments: request.attachments.map((att, idx) => ({
        type: att.type,
        format: att.format,
        data: reports[idx].substring(0, 100) + '...'
      }))
    })

    // Simulate successful send for development
    return {
      success: true,
      message: `Email sent successfully to ${request.to} with ${request.attachments.length} report(s) attached. Note: This is a simulation. Configure EmailJS or backend API for real emails.`
    }
  } catch (error) {
    console.error('Email sending error:', error)
    return {
      success: false,
      message: `Failed to send email: ${error instanceof Error ? error.message : 'Unknown error'}`
    }
  }
}

// Send email via EmailJS
async function sendEmailViaEmailJS(
  request: EmailRequest,
  reports: string[],
  config: { serviceId: string; templateId: string; publicKey: string }
): Promise<{ success: boolean; message: string }> {
  try {
    // Dynamically import EmailJS
    const emailjs = await import('@emailjs/browser')
    
    // Format reports for email
    const reportText = (request.attachments || []).map((att, idx) => {
      return `\n\n${att.type.charAt(0).toUpperCase() + att.type.slice(1)} Report (${att.format.toUpperCase()}):\n${reports[idx]}`
    }).join('\n\n---\n')

    const templateParams = {
      to_email: request.to,
      subject: request.subject,
      message: request.body + reportText,
      from_name: 'E-Commerce Dashboard',
      reply_to: 'dashboard@company.com'
    }

    await emailjs.send(
      config.serviceId,
      config.templateId,
      templateParams,
      config.publicKey
    )

    const attachments = request.attachments || []
    return {
      success: true,
      message: `Email sent successfully to ${request.to} with ${attachments.length} report(s) attached`
    }
  } catch (error) {
    console.error('EmailJS error:', error)
    return {
      success: false,
      message: `EmailJS error: ${error instanceof Error ? error.message : 'Failed to send email'}`
    }
  }
}

// Send email via Backend API
async function sendEmailViaAPI(
  request: EmailRequest,
  reports: string[],
  endpoint: string
): Promise<{ success: boolean; message: string }> {
  try {
    const axiosModule = await import('axios')
    const axios = axiosModule.default

    const formData = new FormData()
    formData.append('to', request.to)
    formData.append('subject', request.subject)
    formData.append('body', request.body)

    // Attach reports as files
    const attachments = request.attachments || []
    attachments.forEach((att: ReportRequest, idx: number) => {
      const blob = new Blob([reports[idx]], { type: 'text/plain' })
      const filename = `${att.type}_report.${att.format}`
      formData.append('attachments', blob, filename)
    })

    const response = await axios.post(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    if (response.status === 200 || response.status === 201) {
      return {
        success: true,
        message: `Email sent successfully to ${request.to} with ${attachments.length} report(s) attached`
      }
    } else {
      throw new Error(`API returned status ${response.status}`)
    }
  } catch (error) {
    console.error('API email error:', error)
    return {
      success: false,
      message: `API error: ${error instanceof Error ? error.message : 'Failed to send email'}`
    }
  }
}

