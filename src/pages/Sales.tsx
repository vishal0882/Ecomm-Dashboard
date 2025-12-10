import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts'
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Package } from 'lucide-react'

const salesData = [
  { month: 'Jan', revenue: 45000, orders: 1200, products: 850 },
  { month: 'Feb', revenue: 52000, orders: 1400, products: 920 },
  { month: 'Mar', revenue: 48000, orders: 1300, products: 880 },
  { month: 'Apr', revenue: 61000, orders: 1600, products: 1100 },
  { month: 'May', revenue: 55000, orders: 1500, products: 980 },
  { month: 'Jun', revenue: 67000, orders: 1800, products: 1250 },
]

const recentOrders = [
  { id: '#ORD-001', customer: 'John Doe', product: 'Premium Widget', amount: 299.99, status: 'completed', date: '2024-12-08' },
  { id: '#ORD-002', customer: 'Jane Smith', product: 'Standard Widget', amount: 149.99, status: 'pending', date: '2024-12-08' },
  { id: '#ORD-003', customer: 'Bob Johnson', product: 'Deluxe Widget', amount: 449.99, status: 'completed', date: '2024-12-07' },
  { id: '#ORD-004', customer: 'Alice Brown', product: 'Premium Widget', amount: 299.99, status: 'shipped', date: '2024-12-07' },
  { id: '#ORD-005', customer: 'Charlie Wilson', product: 'Standard Widget', amount: 149.99, status: 'completed', date: '2024-12-06' },
]

const radarData = [
  { subject: 'Revenue', current: 85, target: 100 },
  { subject: 'Orders', current: 78, target: 100 },
  { subject: 'Products', current: 92, target: 100 },
  { subject: 'Conversion', current: 65, target: 100 },
  { subject: 'Retention', current: 88, target: 100 },
  { subject: 'Satisfaction', current: 75, target: 100 },
]

export default function Sales() {
  const totalRevenue = salesData.reduce((sum, item) => sum + item.revenue, 0)
  const totalOrders = salesData.reduce((sum, item) => sum + item.orders, 0)
  const avgOrderValue = totalRevenue / totalOrders

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">Sales Dashboard</h2>
        <p className="text-sm sm:text-base text-muted-foreground">Track revenue, orders, and sales performance</p>
      </div>

      {/* Key Metrics - 1 col mobile, 3 cols tablet+ */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 sm:px-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <div className="text-xl sm:text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-[10px] sm:text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
              <span className="text-green-600">+12.5%</span> from last period
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 sm:px-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <div className="text-xl sm:text-2xl font-bold">{totalOrders.toLocaleString()}</div>
            <p className="text-[10px] sm:text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
              <span className="text-green-600">+8.2%</span> from last period
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 sm:px-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Avg Order Value</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <div className="text-xl sm:text-2xl font-bold">${avgOrderValue.toFixed(2)}</div>
            <p className="text-[10px] sm:text-xs text-muted-foreground flex items-center mt-1">
              <TrendingDown className="h-3 w-3 mr-1 text-red-600" />
              <span className="text-red-600">-2.1%</span> from last period
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts - stack on mobile, 2 cols on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card className="glass-card">
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="text-base sm:text-lg">Revenue Trend</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Monthly revenue over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent className="px-2 sm:px-6">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} name="Revenue ($)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="text-base sm:text-lg">Sales Breakdown</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Orders and products sold by month</CardDescription>
          </CardHeader>
          <CardContent className="px-2 sm:px-6">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="orders" fill="#10b981" name="Orders" />
                <Bar dataKey="products" fill="#3b82f6" name="Products" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Radar Chart */}
      <Card className="glass-card">
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="text-base sm:text-lg">Sales Performance Radar</CardTitle>
          <CardDescription className="text-xs sm:text-sm">Multi-dimensional analysis with current vs target</CardDescription>
        </CardHeader>
        <CardContent className="px-2 sm:px-6">
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
              <Radar name="Current" dataKey="current" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
              <Radar name="Target" dataKey="target" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 12 }} />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Orders Table - Scrollable on mobile */}
      <Card className="glass-card">
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="text-base sm:text-lg">Recent Orders</CardTitle>
          <CardDescription className="text-xs sm:text-sm">Latest customer orders and their status</CardDescription>
        </CardHeader>
        <CardContent className="px-0 sm:px-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs whitespace-nowrap">Order ID</TableHead>
                  <TableHead className="text-xs whitespace-nowrap">Customer</TableHead>
                  <TableHead className="text-xs whitespace-nowrap hidden sm:table-cell">Product</TableHead>
                  <TableHead className="text-xs whitespace-nowrap">Amount</TableHead>
                  <TableHead className="text-xs whitespace-nowrap">Status</TableHead>
                  <TableHead className="text-xs whitespace-nowrap hidden md:table-cell">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="text-xs sm:text-sm font-medium whitespace-nowrap">{order.id}</TableCell>
                    <TableCell className="text-xs sm:text-sm whitespace-nowrap">{order.customer}</TableCell>
                    <TableCell className="text-xs sm:text-sm hidden sm:table-cell">{order.product}</TableCell>
                    <TableCell className="text-xs sm:text-sm whitespace-nowrap">${order.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          order.status === 'completed'
                            ? 'default'
                            : order.status === 'shipped'
                            ? 'secondary'
                            : 'outline'
                        }
                        className="text-[10px] sm:text-xs"
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs sm:text-sm hidden md:table-cell">{order.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
