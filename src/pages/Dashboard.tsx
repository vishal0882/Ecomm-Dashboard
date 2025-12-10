import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
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
    { path: '/sales', label: 'Sales', icon: DollarSign, description: 'Revenue, orders, and sales performance', color: 'from-emerald-500 to-teal-500' },
    { path: '/customers', label: 'Customers', icon: Users, description: 'Customer insights, CLV, and CAC', color: 'from-blue-500 to-cyan-500' },
    { path: '/core-web-vitals', label: 'Core Web Vitals', icon: Zap, description: 'Website performance metrics', color: 'from-amber-500 to-orange-500' },
    { path: '/scrum-of-scrum', label: 'Scrum of Scrum', icon: GitBranch, description: 'Cross-team coordination', color: 'from-purple-500 to-pink-500' },
    { path: '/funnel', label: 'Funnel Analysis', icon: TrendingUp, description: 'Combined metrics view', color: 'from-rose-500 to-red-500' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary">Analytics Overview</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground mt-1">Welcome back! Here's what's happening with your store today.</p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} metric={metric} index={index} />
        ))}
      </div>

      {/* Charts and Quick Links */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="glass-card lg:col-span-1">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold">Sales Trend</CardTitle>
            <CardDescription>Monthly sales performance overview</CardDescription>
          </CardHeader>
          <CardContent>
            <SalesChart />
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold">Quick Navigation</CardTitle>
            <CardDescription>Jump to detailed dashboards</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickLinks.map((link) => {
              const Icon = link.icon
              return (
                <Link key={link.path} to={link.path}>
                  <div className="group flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/50 transition-all duration-200">
                    <div className={`p-2.5 rounded-xl bg-gradient-to-br ${link.color} shadow-lg`}>
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{link.label}</p>
                      <p className="text-xs text-muted-foreground truncate">{link.description}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              )
            })}
          </CardContent>
        </Card>

        <div className="lg:col-span-1">
          <Chatbot />
        </div>
      </div>
    </div>
  )
}
