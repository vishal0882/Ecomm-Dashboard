import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import MetricCard from '@/components/cards/MetricCard'
import SalesChart from '@/components/charts/SalesChart'
import Chatbot from '@/components/chatbot/Chatbot'
import { Metric } from '@/types'
import { DollarSign, Users, Zap, GitBranch, TrendingUp, ArrowRight } from 'lucide-react'

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
    { path: '/sales', label: 'Sales', icon: DollarSign, description: 'Revenue, orders, and sales performance' },
    { path: '/customers', label: 'Customers', icon: Users, description: 'Customer insights, CLV, and CAC' },
    { path: '/core-web-vitals', label: 'Core Web Vitals', icon: Zap, description: 'Website performance metrics' },
    { path: '/scrum-of-scrum', label: 'Scrum of Scrum', icon: GitBranch, description: 'Cross-team coordination' },
    { path: '/funnel', label: 'Funnel Analysis', icon: TrendingUp, description: 'Combined metrics view' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2">Dashboard Overview</h2>
        <p className="text-muted-foreground">Real-time metrics and KPIs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} metric={metric} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sales Trend</CardTitle>
            <CardDescription>Monthly sales performance</CardDescription>
          </CardHeader>
          <CardContent>
            <SalesChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
            <CardDescription>Navigate to detailed dashboards</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {quickLinks.map((link) => {
              const Icon = link.icon
              return (
                <Link key={link.path} to={link.path}>
                  <Button variant="outline" className="w-full justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      <div className="text-left">
                        <div className="font-medium">{link.label}</div>
                        <div className="text-xs text-muted-foreground">{link.description}</div>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
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

