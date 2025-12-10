import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Progress } from '@/components/ui/progress'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, RadialBarChart, RadialBar } from 'recharts'
import { Users, UserPlus, DollarSign, TrendingUp } from 'lucide-react'

const customerSegments = [
  { name: 'New Customers', value: 35, color: '#10b981' },
  { name: 'Returning Customers', value: 45, color: '#3b82f6' },
  { name: 'VIP Customers', value: 20, color: '#f59e0b' },
]

const customerGrowth = [
  { month: 'Jan', new: 120, returning: 450, total: 570 },
  { month: 'Feb', new: 135, returning: 480, total: 615 },
  { month: 'Mar', new: 150, returning: 520, total: 670 },
  { month: 'Apr', new: 165, returning: 560, total: 725 },
  { month: 'May', new: 180, returning: 600, total: 780 },
  { month: 'Jun', new: 200, returning: 650, total: 850 },
]

const topCustomers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', orders: 45, totalSpent: 13450, clv: 28500, status: 'VIP' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', orders: 38, totalSpent: 11200, clv: 24000, status: 'VIP' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', orders: 32, totalSpent: 8900, clv: 18000, status: 'Premium' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', orders: 28, totalSpent: 7200, clv: 15000, status: 'Premium' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', orders: 25, totalSpent: 5800, clv: 12000, status: 'Standard' },
]

const cacData = [
  { channel: 'Organic', cost: 15, customers: 450 },
  { channel: 'Paid Ads', cost: 45, customers: 280 },
  { channel: 'Social Media', cost: 25, customers: 320 },
  { channel: 'Email', cost: 10, customers: 180 },
]

const radialData = [
  { name: 'New Customers', value: 35, fill: '#10b981' },
  { name: 'Returning', value: 45, fill: '#3b82f6' },
  { name: 'VIP', value: 20, fill: '#f59e0b' },
]

export default function Customers() {
  const totalCustomers = customerGrowth[customerGrowth.length - 1].total
  const newCustomers = customerGrowth[customerGrowth.length - 1].new
  const avgCLV = topCustomers.reduce((sum, c) => sum + c.clv, 0) / topCustomers.length
  const avgCAC = cacData.reduce((sum, c) => sum + (c.cost * c.customers), 0) / cacData.reduce((sum, c) => sum + c.customers, 0)

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">Customers Dashboard</h2>
        <p className="text-sm sm:text-base text-muted-foreground">Customer insights, CLV, CAC, and segmentation</p>
      </div>

      {/* Key Metrics - 2 cols mobile, 4 cols desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6 sm:pb-2">
            <CardTitle className="text-[10px] sm:text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-3 pt-0 sm:p-6 sm:pt-0">
            <div className="text-lg sm:text-2xl font-bold">{totalCustomers.toLocaleString()}</div>
            <p className="text-[9px] sm:text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1 text-green-600" />
              <span className="text-green-600">+{newCustomers}</span> new
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6 sm:pb-2">
            <CardTitle className="text-[10px] sm:text-sm font-medium">New Customers</CardTitle>
            <UserPlus className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-3 pt-0 sm:p-6 sm:pt-0">
            <div className="text-lg sm:text-2xl font-bold">{newCustomers}</div>
            <p className="text-[9px] sm:text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1 text-green-600" />
              <span className="text-green-600">+15%</span> growth
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6 sm:pb-2">
            <CardTitle className="text-[10px] sm:text-sm font-medium">Avg CLV</CardTitle>
            <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-3 pt-0 sm:p-6 sm:pt-0">
            <div className="text-lg sm:text-2xl font-bold">${(avgCLV / 1000).toFixed(1)}k</div>
            <p className="text-[9px] sm:text-xs text-muted-foreground">Lifetime Value</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6 sm:pb-2">
            <CardTitle className="text-[10px] sm:text-sm font-medium">Avg CAC</CardTitle>
            <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-3 pt-0 sm:p-6 sm:pt-0">
            <div className="text-lg sm:text-2xl font-bold">${avgCAC.toFixed(2)}</div>
            <p className="text-[9px] sm:text-xs text-muted-foreground">Acquisition Cost</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts - stack on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card className="glass-card">
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="text-base sm:text-lg">Customer Segments</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Distribution of customer types</CardDescription>
          </CardHeader>
          <CardContent className="px-2 sm:px-6">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={customerSegments}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {customerSegments.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="text-base sm:text-lg">Customer Growth</CardTitle>
            <CardDescription className="text-xs sm:text-sm">New vs returning customers over time</CardDescription>
          </CardHeader>
          <CardContent className="px-2 sm:px-6">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={customerGrowth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="new" fill="#10b981" name="New Customers" />
                <Bar dataKey="returning" fill="#3b82f6" name="Returning" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Radial Chart */}
      <Card className="glass-card">
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="text-base sm:text-lg">Customer Distribution</CardTitle>
          <CardDescription className="text-xs sm:text-sm">Segment breakdown with labeled values</CardDescription>
        </CardHeader>
        <CardContent className="px-2 sm:px-6">
          <ResponsiveContainer width="100%" height={300}>
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="20%"
              outerRadius="80%"
              data={radialData}
              startAngle={90}
              endAngle={-270}
            >
              <RadialBar
                dataKey="value"
                cornerRadius={10}
                label={{
                  position: 'insideStart',
                  fill: '#fff',
                  fontSize: 12,
                  fontWeight: 'bold',
                  formatter: (value: number) => {
                    if (typeof value === 'number' && !isNaN(value)) {
                      return `${value}%`
                    }
                    return '0%'
                  }
                }}
              >
                {radialData.map((entry, index) => (
                  <Cell key={`radial-cell-${index}`} fill={entry.fill || '#10b981'} />
                ))}
              </RadialBar>
              <Tooltip
                formatter={(value: number | string) => {
                  const numValue = typeof value === 'number' ? value : parseFloat(String(value))
                  return [`${numValue}%`, 'Percentage']
                }}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} iconSize={10} />
            </RadialBarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* CAC by Channel */}
      <Card className="glass-card">
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="text-base sm:text-lg">Customer Acquisition Cost by Channel</CardTitle>
          <CardDescription className="text-xs sm:text-sm">CAC breakdown across marketing channels</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 px-4 sm:px-6">
          {cacData.map((item) => (
            <div key={item.channel} className="space-y-2">
              <div className="flex justify-between text-xs sm:text-sm">
                <span>{item.channel}</span>
                <span className="font-medium">${item.cost}/customer</span>
              </div>
              <Progress value={(item.customers / 1000) * 100} className="h-2" />
              <p className="text-[10px] sm:text-xs text-muted-foreground">{item.customers} customers acquired</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Top Customers Table */}
      <Card className="glass-card">
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="text-base sm:text-lg">Top Customers</CardTitle>
          <CardDescription className="text-xs sm:text-sm">Highest value customers by CLV</CardDescription>
        </CardHeader>
        <CardContent className="px-0 sm:px-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs whitespace-nowrap">Name</TableHead>
                  <TableHead className="text-xs whitespace-nowrap hidden sm:table-cell">Email</TableHead>
                  <TableHead className="text-xs whitespace-nowrap">Orders</TableHead>
                  <TableHead className="text-xs whitespace-nowrap hidden md:table-cell">Total Spent</TableHead>
                  <TableHead className="text-xs whitespace-nowrap">CLV</TableHead>
                  <TableHead className="text-xs whitespace-nowrap">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="text-xs sm:text-sm font-medium whitespace-nowrap">{customer.name}</TableCell>
                    <TableCell className="text-xs sm:text-sm hidden sm:table-cell">{customer.email}</TableCell>
                    <TableCell className="text-xs sm:text-sm">{customer.orders}</TableCell>
                    <TableCell className="text-xs sm:text-sm hidden md:table-cell">${customer.totalSpent.toLocaleString()}</TableCell>
                    <TableCell className="text-xs sm:text-sm whitespace-nowrap">${customer.clv.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={customer.status === 'VIP' ? 'default' : 'secondary'} className="text-[10px] sm:text-xs">
                        {customer.status}
                      </Badge>
                    </TableCell>
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
