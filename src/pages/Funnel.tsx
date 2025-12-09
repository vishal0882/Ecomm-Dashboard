import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area, ComposedChart
} from 'recharts'
import { TrendingUp, Users, DollarSign, Zap, ArrowRight } from 'lucide-react'

// Combined data from Sales, Customers, and Core Web Vitals
const combinedMetrics = [
  { 
    date: '2024-12-01', 
    revenue: 45000, 
    customers: 570, 
    lcp: 2.1, 
    conversion: 3.2,
    orders: 1200,
    newCustomers: 120
  },
  { 
    date: '2024-12-02', 
    revenue: 48000, 
    customers: 585, 
    lcp: 1.9, 
    conversion: 3.4,
    orders: 1250,
    newCustomers: 135
  },
  { 
    date: '2024-12-03', 
    revenue: 52000, 
    customers: 600, 
    lcp: 2.3, 
    conversion: 3.1,
    orders: 1300,
    newCustomers: 150
  },
  { 
    date: '2024-12-04', 
    revenue: 55000, 
    customers: 625, 
    lcp: 1.8, 
    conversion: 3.6,
    orders: 1400,
    newCustomers: 165
  },
  { 
    date: '2024-12-05', 
    revenue: 58000, 
    customers: 650, 
    lcp: 2.0, 
    conversion: 3.5,
    orders: 1500,
    newCustomers: 180
  },
  { 
    date: '2024-12-06', 
    revenue: 61000, 
    customers: 680, 
    lcp: 1.7, 
    conversion: 3.8,
    orders: 1600,
    newCustomers: 200
  },
  { 
    date: '2024-12-07', 
    revenue: 64000, 
    customers: 710, 
    lcp: 1.9, 
    conversion: 3.7,
    orders: 1700,
    newCustomers: 220
  },
]

const funnelData = [
  { stage: 'Visitors', count: 100000, percentage: 100, color: '#8884d8' },
  { stage: 'Page Views', count: 75000, percentage: 75, color: '#82ca9d' },
  { stage: 'Add to Cart', count: 25000, percentage: 25, color: '#ffc658' },
  { stage: 'Checkout', count: 12000, percentage: 12, color: '#ff6b6b' },
  { stage: 'Purchase', count: 8000, percentage: 8, color: '#8dd1e1' },
]

const correlationData = combinedMetrics.map(item => ({
  date: item.date,
  revenue: item.revenue,
  lcp: item.lcp * 10000, // Scale for visibility
  conversion: item.conversion * 1000, // Scale for visibility
  customers: item.customers * 50, // Scale for visibility
}))

const performanceImpact = [
  { metric: 'LCP < 2.5s', revenue: 52000, conversion: 3.5, customers: 650 },
  { metric: 'LCP 2.5-4.0s', revenue: 45000, conversion: 3.0, customers: 580 },
  { metric: 'LCP > 4.0s', revenue: 35000, conversion: 2.2, customers: 450 },
]

export default function Funnel() {
  const latest = combinedMetrics[combinedMetrics.length - 1]
  const avgRevenue = combinedMetrics.reduce((sum, item) => sum + item.revenue, 0) / combinedMetrics.length
  const avgConversion = combinedMetrics.reduce((sum, item) => sum + item.conversion, 0) / combinedMetrics.length

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2">Funnel Analysis</h2>
        <p className="text-muted-foreground">Combined view of Sales, Customers, and Core Web Vitals</p>
      </div>

      {/* Key Combined Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${latest.revenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
              <span className="text-green-600">Avg: ${avgRevenue.toLocaleString()}</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{latest.customers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
              <span className="text-green-600">+{latest.newCustomers} new</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{latest.conversion.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Avg: {avgConversion.toFixed(1)}%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">LCP</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{latest.lcp.toFixed(1)}s</div>
            <p className="text-xs text-muted-foreground">
              {latest.lcp < 2.5 ? (
                <span className="text-green-600">Good</span>
              ) : (
                <span className="text-yellow-600">Needs Improvement</span>
              )}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Conversion Funnel */}
      <Card>
        <CardHeader>
          <CardTitle>Conversion Funnel</CardTitle>
          <CardDescription>User journey from visitors to purchases</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {funnelData.map((stage, index) => (
              <div key={stage.stage} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{stage.stage}</p>
                      <p className="text-sm text-muted-foreground">
                        {stage.count.toLocaleString()} ({stage.percentage}%)
                      </p>
                    </div>
                  </div>
                  {index < funnelData.length - 1 && (
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <Progress value={stage.percentage} className="h-3" style={{ 
                  ['--progress-background' as string]: stage.color 
                }} />
                {index < funnelData.length - 1 && (
                  <div className="text-xs text-muted-foreground text-center">
                    {((funnelData[index + 1].count / stage.count) * 100).toFixed(1)}% continue to {funnelData[index + 1].stage}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tabs for different views */}
      <Tabs defaultValue="correlation" className="space-y-4">
        <TabsList>
          <TabsTrigger value="correlation">Performance Correlation</TabsTrigger>
          <TabsTrigger value="trends">Combined Trends</TabsTrigger>
          <TabsTrigger value="impact">Performance Impact</TabsTrigger>
        </TabsList>

        <TabsContent value="correlation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance vs Revenue Correlation</CardTitle>
              <CardDescription>How Core Web Vitals affect sales and customer acquisition</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={correlationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="revenue"
                    fill="#8884d8"
                    fillOpacity={0.6}
                    stroke="#8884d8"
                    name="Revenue ($)"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="lcp"
                    stroke="#ff6b6b"
                    strokeWidth={2}
                    name="LCP (scaled)"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="conversion"
                    stroke="#82ca9d"
                    strokeWidth={2}
                    name="Conversion (scaled)"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue & Orders Trend</CardTitle>
                <CardDescription>Sales performance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={combinedMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="revenue" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} name="Revenue ($)" />
                    <Area type="monotone" dataKey="orders" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} name="Orders" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customers & LCP Trend</CardTitle>
                <CardDescription>Customer growth vs performance</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={combinedMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="customers" fill="#8884d8" name="Customers" />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="lcp"
                      stroke="#ff6b6b"
                      strokeWidth={2}
                      name="LCP (s)"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="impact" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Impact on Business Metrics</CardTitle>
              <CardDescription>How Core Web Vitals affect revenue, conversion, and customers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {performanceImpact.map((item) => (
                  <div key={item.metric} className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{item.metric}</h4>
                      <Badge variant={item.metric.includes('< 2.5s') ? 'default' : item.metric.includes('2.5-4.0s') ? 'secondary' : 'destructive'}>
                        {item.metric.includes('< 2.5s') ? 'Optimal' : item.metric.includes('2.5-4.0s') ? 'Acceptable' : 'Poor'}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Revenue</p>
                        <p className="text-xl font-semibold">${item.revenue.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Conversion</p>
                        <p className="text-xl font-semibold">{item.conversion}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Customers</p>
                        <p className="text-xl font-semibold">{item.customers}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium mb-2">Key Insight:</p>
                <p className="text-sm text-muted-foreground">
                  Improving LCP from {'> 4.0s'} to {'< 2.5s'} can increase revenue by{' '}
                  <span className="font-semibold text-foreground">
                    ${((performanceImpact[0].revenue - performanceImpact[2].revenue) / 1000).toFixed(0)}k
                  </span>{' '}
                  and conversion rate by{' '}
                  <span className="font-semibold text-foreground">
                    {(performanceImpact[0].conversion - performanceImpact[2].conversion).toFixed(1)}%
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

