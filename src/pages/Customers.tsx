import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Progress } from '@/components/ui/progress'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, RadialBarChart, RadialBar } from 'recharts'
import { Users, UserPlus, DollarSign, TrendingUp } from 'lucide-react'

const customerSegments = [
  { name: 'New Customers', value: 35, color: '#8884d8' },
  { name: 'Returning Customers', value: 45, color: '#82ca9d' },
  { name: 'VIP Customers', value: 20, color: '#ffc658' },
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
  { name: 'New Customers', value: 35, fill: '#8884d8' },
  { name: 'Returning', value: 45, fill: '#82ca9d' },
  { name: 'VIP', value: 20, fill: '#ffc658' },
]

export default function Customers() {
  const totalCustomers = customerGrowth[customerGrowth.length - 1].total
  const newCustomers = customerGrowth[customerGrowth.length - 1].new
  const avgCLV = topCustomers.reduce((sum, c) => sum + c.clv, 0) / topCustomers.length
  const avgCAC = cacData.reduce((sum, c) => sum + (c.cost * c.customers), 0) / cacData.reduce((sum, c) => sum + c.customers, 0)

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2">Customers Dashboard</h2>
        <p className="text-muted-foreground">Customer insights, CLV, CAC, and segmentation</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
              <span className="text-green-600">+{newCustomers}</span> new this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Customers</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{newCustomers}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
              <span className="text-green-600">+15%</span> growth rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg CLV</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(avgCLV / 1000).toFixed(1)}k</div>
            <p className="text-xs text-muted-foreground">Customer Lifetime Value</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg CAC</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${avgCAC.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Customer Acquisition Cost</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Customer Segments</CardTitle>
            <CardDescription>Distribution of customer types</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={customerSegments}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {customerSegments.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Growth</CardTitle>
            <CardDescription>New vs returning customers over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={customerGrowth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="new" fill="#8884d8" name="New Customers" />
                <Bar dataKey="returning" fill="#82ca9d" name="Returning Customers" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Radial Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Distribution Radial Chart</CardTitle>
          <CardDescription>Customer segment breakdown with labeled values</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
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
                  fontSize: 14,
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
                  <Cell key={`radial-cell-${index}`} fill={entry.fill || '#8884d8'} />
                ))}
              </RadialBar>
              <Tooltip
                formatter={(value: number | string) => {
                  const numValue = typeof value === 'number' ? value : parseFloat(String(value))
                  return [`${numValue}%`, 'Percentage']
                }}
                labelFormatter={(label) => {
                  const entry = radialData.find(d => d.name === label)
                  return entry ? entry.name : label
                }}
                contentStyle={{
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  border: 'none',
                  borderRadius: '4px',
                  color: '#fff'
                }}
              />
              <Legend
                iconSize={12}
                layout="vertical"
                verticalAlign="middle"
                align="right"
                formatter={(value) => {
                  const entry = radialData.find(d => d.name === value)
                  return entry ? entry.name : value
                }}
              />
            </RadialBarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* CAC by Channel */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Acquisition Cost by Channel</CardTitle>
          <CardDescription>CAC breakdown across different marketing channels</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {cacData.map((item) => (
            <div key={item.channel} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{item.channel}</span>
                <span className="font-medium">${item.cost} per customer</span>
              </div>
              <Progress value={(item.customers / 1000) * 100} className="h-2" />
              <p className="text-xs text-muted-foreground">{item.customers} customers acquired</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Top Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Top Customers</CardTitle>
          <CardDescription>Highest value customers by CLV</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>CLV</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.orders}</TableCell>
                  <TableCell>${customer.totalSpent.toLocaleString()}</TableCell>
                  <TableCell>${customer.clv.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={customer.status === 'VIP' ? 'default' : 'secondary'}>
                      {customer.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

