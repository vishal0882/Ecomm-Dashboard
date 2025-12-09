import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { 
  Send, Bot, User, Mail, FileText, Loader2, CheckCircle2, AlertCircle 
} from 'lucide-react'
import { ChatMessage, processLLMQuery, parseEmailRequest, sendEmailWithReport, generateReport, ReportRequest } from '@/services/llmService'

export default function Chatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Hello! I'm your e-commerce dashboard assistant. I can help you:\n\n📊 Generate reports (Sales, Customers, Performance, etc.)\n📧 Send emails with attached reports\n💬 Answer questions about your dashboard\n\nHow can I help you today?",
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [emailDialogOpen, setEmailDialogOpen] = useState(false)
  const [emailRequest, setEmailRequest] = useState<{ to: string; subject: string; body: string; attachments: ReportRequest[] } | null>(null)
  const [emailStatus, setEmailStatus] = useState<{ success: boolean; message: string } | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: ChatMessage = {
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      // Check if user wants to send email
      const emailReq = parseEmailRequest(input)
      if (emailReq) {
        setEmailRequest({
          to: emailReq.to,
          subject: emailReq.subject,
          body: emailReq.body,
          attachments: emailReq.attachments || []
        })
        setEmailDialogOpen(true)
        setIsLoading(false)
        return
      }

      // Process LLM query
      const response = await processLLMQuery([...messages, userMessage])
      
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: response,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmailSend = async () => {
    if (!emailRequest) return

    setIsLoading(true)
    setEmailStatus(null)

    try {
      // Generate reports (in production, these would be attached to the email)
      await Promise.all(
        emailRequest.attachments.map(att => generateReport(att))
      )

      // Send email
      const result = await sendEmailWithReport({
        ...emailRequest,
        attachments: emailRequest.attachments
      })

      setEmailStatus(result)

      if (result.success) {
        const successMessage: ChatMessage = {
          role: 'assistant',
          content: `✅ ${result.message}\n\nThe email has been sent with the following reports:\n${emailRequest.attachments.map(a => `- ${a.type.charAt(0).toUpperCase() + a.type.slice(1)} Report (${a.format.toUpperCase()})`).join('\n')}\n\n${result.message.includes('simulation') ? '⚠️ Note: Email service not configured. See EMAIL_SETUP_GUIDE.md for setup instructions.' : ''}`,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, successMessage])
        setEmailDialogOpen(false)
        setEmailRequest(null)
        setTimeout(() => setEmailStatus(null), 5000)
      } else {
        // Show error message in chat
        const errorMessage: ChatMessage = {
          role: 'assistant',
          content: `❌ ${result.message}\n\nTo enable real email sending, please configure EmailJS or a backend API. See EMAIL_SETUP_GUIDE.md for instructions.`,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, errorMessage])
      }
    } catch (error) {
      setEmailStatus({
        success: false,
        message: 'Failed to send email. Please try again.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      <Card className="h-[600px] flex flex-col">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Dashboard Assistant</CardTitle>
            </div>
            <Badge variant="secondary">AI Powered</Badge>
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 px-4">
            <div className="space-y-4 py-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`rounded-lg px-4 py-2 max-w-[80%] ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                  {message.role === 'user' && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-secondary">
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="rounded-lg px-4 py-2 bg-muted">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={scrollRef} />
            </div>
          </ScrollArea>
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about reports, send emails, or get insights..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-2 mt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInput('Generate a sales report')}
                className="text-xs"
              >
                <FileText className="h-3 w-3 mr-1" />
                Sales Report
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInput('Send customer report to manager@company.com as PDF')}
                className="text-xs"
              >
                <Mail className="h-3 w-3 mr-1" />
                Email Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Email Confirmation Dialog */}
      <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Email with Report</DialogTitle>
            <DialogDescription>
              Review and confirm the email details before sending
            </DialogDescription>
          </DialogHeader>
          {emailRequest && (
            <div className="space-y-4 py-4">
              <div>
                <Label>To</Label>
                <Input value={emailRequest.to} disabled />
              </div>
              <div>
                <Label>Subject</Label>
                <Input value={emailRequest.subject} disabled />
              </div>
              <div>
                <Label>Message</Label>
                <Textarea value={emailRequest.body} disabled rows={3} />
              </div>
              <div>
                <Label>Attachments</Label>
                <div className="space-y-2 mt-2">
                  {emailRequest.attachments.map((att, idx) => (
                    <Badge key={idx} variant="outline" className="mr-2">
                      <FileText className="h-3 w-3 mr-1" />
                      {att.type.charAt(0).toUpperCase() + att.type.slice(1)} ({att.format.toUpperCase()})
                    </Badge>
                  ))}
                </div>
              </div>
              {emailStatus && (
                <div className={`flex items-center gap-2 p-3 rounded-md ${
                  emailStatus.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                }`}>
                  {emailStatus.success ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  <span className="text-sm">{emailStatus.message}</span>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setEmailDialogOpen(false)
                setEmailStatus(null)
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleEmailSend}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

