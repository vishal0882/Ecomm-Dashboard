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
      content: "Hello! I'm your dashboard assistant. I can help you:\n\n📊 Generate reports\n📧 Send emails with reports\n💬 Answer questions\n\nHow can I help?",
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
      <Card className="h-[400px] sm:h-[500px] lg:h-[600px] flex flex-col glass-card">
        <CardHeader className="pb-2 sm:pb-3 px-3 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              <CardTitle className="text-sm sm:text-lg">AI Assistant</CardTitle>
            </div>
            <Badge variant="secondary" className="text-[10px] sm:text-xs">AI</Badge>
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
          <ScrollArea className="flex-1 px-3 sm:px-4">
            <div className="space-y-3 sm:space-y-4 py-3 sm:py-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-2 sm:gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <Avatar className="h-6 w-6 sm:h-8 sm:w-8 flex-shrink-0">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Bot className="h-3 w-3 sm:h-4 sm:w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`rounded-lg px-3 py-2 max-w-[85%] sm:max-w-[80%] ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-xs sm:text-sm whitespace-pre-wrap">{message.content}</p>
                    <p className="text-[10px] sm:text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  {message.role === 'user' && (
                    <Avatar className="h-6 w-6 sm:h-8 sm:w-8 flex-shrink-0">
                      <AvatarFallback className="bg-secondary">
                        <User className="h-3 w-3 sm:h-4 sm:w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-2 sm:gap-3 justify-start">
                  <Avatar className="h-6 w-6 sm:h-8 sm:w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot className="h-3 w-3 sm:h-4 sm:w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="rounded-lg px-3 py-2 bg-muted">
                    <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={scrollRef} />
            </div>
          </ScrollArea>
          <div className="border-t p-3 sm:p-4">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask anything..."
                disabled={isLoading}
                className="flex-1 text-sm h-9 sm:h-10"
              />
              <Button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                size="icon"
                className="h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-2 mt-2 overflow-x-auto pb-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInput('Generate a sales report')}
                className="text-[10px] sm:text-xs h-7 sm:h-8 px-2 sm:px-3 whitespace-nowrap flex-shrink-0"
              >
                <FileText className="h-3 w-3 mr-1" />
                Sales
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInput('Send customer report to manager@company.com as PDF')}
                className="text-[10px] sm:text-xs h-7 sm:h-8 px-2 sm:px-3 whitespace-nowrap flex-shrink-0"
              >
                <Mail className="h-3 w-3 mr-1" />
                Email
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Email Confirmation Dialog */}
      <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-lg mx-auto">
          <DialogHeader>
            <DialogTitle className="text-base sm:text-lg">Send Email with Report</DialogTitle>
            <DialogDescription className="text-xs sm:text-sm">
              Review and confirm the email details
            </DialogDescription>
          </DialogHeader>
          {emailRequest && (
            <div className="space-y-3 sm:space-y-4 py-2 sm:py-4">
              <div>
                <Label className="text-xs sm:text-sm">To</Label>
                <Input value={emailRequest.to} disabled className="text-sm h-9" />
              </div>
              <div>
                <Label className="text-xs sm:text-sm">Subject</Label>
                <Input value={emailRequest.subject} disabled className="text-sm h-9" />
              </div>
              <div>
                <Label className="text-xs sm:text-sm">Message</Label>
                <Textarea value={emailRequest.body} disabled rows={2} className="text-sm" />
              </div>
              <div>
                <Label className="text-xs sm:text-sm">Attachments</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {emailRequest.attachments.map((att, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      <FileText className="h-3 w-3 mr-1" />
                      {att.type} ({att.format})
                    </Badge>
                  ))}
                </div>
              </div>
              {emailStatus && (
                <div className={`flex items-center gap-2 p-2 sm:p-3 rounded-md text-xs sm:text-sm ${
                  emailStatus.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                }`}>
                  {emailStatus.success ? (
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  )}
                  <span>{emailStatus.message}</span>
                </div>
              )}
            </div>
          )}
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setEmailDialogOpen(false)
                setEmailStatus(null)
              }}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              onClick={handleEmailSend}
              disabled={isLoading}
              className="w-full sm:w-auto"
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
