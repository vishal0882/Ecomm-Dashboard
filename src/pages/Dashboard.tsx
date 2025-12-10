import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import MetricCard from '@/components/cards/MetricCard'
import SalesChart from '@/components/charts/SalesChart'
import Chatbot from '@/components/chatbot/Chatbot'
import { Metric } from '@/types'
import { DollarSign, Users, Zap, GitBranch, TrendingUp, ArrowRight, Sparkles } from 'lucide-react'

export default function Dashboard() {
  const [metrics, setMetrics] = useState<Metric[]>([])

  useEffect(() => {
    // Mock data for demonstration
    setMetrics([
      { label: 'Total Revenue', value: '$45,231', change: 20.1, trend: 'up' },
      { label: 'Orders', value: '1,234', change: -5.2, trend: 'down' },
      { label: 'Customers', value: '892', change: 12.5, trend: 'up' },
      { label: 'Conversion Rate', value: '3.2%', change: 2.1, trend: 'up' },
    ])
  }, [])

  const quickLinks = [
    { path: '/sales', label: 'Sales', icon: DollarSign, description: 'Revenue & orders', color: 'from-emerald-500 to-teal-500' },
    { path: '/customers', label: 'Customers', icon: Users, description: 'CLV & CAC', color: 'from-blue-500 to-cyan-500' },
    { path: '/core-web-vitals', label: 'Web Vitals', icon: Zap, description: 'Performance', color: 'from-amber-500 to-orange-500' },
    { path: '/scrum-of-scrum', label: 'Scrum', icon: GitBranch, description: 'Coordination', color: 'from-purple-500 to-pink-500' },
    { path: '/funnel', label: 'Funnel', icon: TrendingUp, description: 'Analytics', color: 'from-rose-500 to-red-500' },
  ]

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            <span className="text-xs sm:text-sm font-medium text-primary">Analytics Overview</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">Welcome back! Here's what's happening today.</p>
        </div>
      </div>

      {/* Metrics Grid - 1 col on mobile, 2 on tablet, 4 on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} metric={metric} index={index} />
        ))}
      </div>

      {/* Charts and Quick Links - Stack on mobile/tablet, 3 cols on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Sales Chart */}
        <Card className="glass-card">
          <CardHeader className="pb-4 px-4 sm:px-6">
            <CardTitle className="text-base sm:text-lg font-semibold">Sales Trend</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Monthly sales performance</CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <SalesChart />
          </CardContent>
        </Card>

        {/* Quick Navigation */}
        <Card className="glass-card">
          <CardHeader className="pb-4 px-4 sm:px-6">
            <CardTitle className="text-base sm:text-lg font-semibold">Quick Navigation</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Jump to dashboards</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 sm:space-y-3 px-4 sm:px-6">
            {quickLinks.map((link) => {
              const Icon = link.icon
              return (
                <Link key={link.path} to={link.path}>
                  <div className="group flex items-center gap-3 sm:gap-4 p-2.5 sm:p-3 rounded-xl hover:bg-secondary/50 transition-all duration-200 active:scale-[0.98]">
                    <div className={`p-2 sm:p-2.5 rounded-xl bg-gradient-to-br ${link.color} shadow-lg flex-shrink-0`}>
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{link.label}</p>
                      <p className="text-xs text-muted-foreground truncate">{link.description}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </div>
                </Link>
              )
            })}
          </CardContent>
        </Card>

        {/* Chatbot */}
        <div className="lg:col-span-1">
          <Chatbot />
        </div>
      </div>
    </div>
  )
}
