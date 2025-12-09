import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { date: 'Jan', sales: 4000, revenue: 2400 },
  { date: 'Feb', sales: 3000, revenue: 1398 },
  { date: 'Mar', sales: 2000, revenue: 9800 },
  { date: 'Apr', sales: 2780, revenue: 3908 },
  { date: 'May', sales: 1890, revenue: 4800 },
  { date: 'Jun', sales: 2390, revenue: 3800 },
]

export default function SalesChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
        <Line type="monotone" dataKey="revenue" stroke="#82ca9d" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  )
}

