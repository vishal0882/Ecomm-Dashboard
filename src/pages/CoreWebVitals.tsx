import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { Gauge, Zap, MousePointerClick } from 'lucide-react'

const vitalsData = [
  { date: '2024-12-01', lcp: 2.1, fid: 45, cls: 0.08, fcp: 1.2, ttfb: 180 },
  { date: '2024-12-02', lcp: 1.9, fid: 42, cls: 0.07, fcp: 1.1, ttfb: 175 },
  { date: '2024-12-03', lcp: 2.3, fid: 48, cls: 0.09, fcp: 1.3, ttfb: 185 },
  { date: '2024-12-04', lcp: 1.8, fid: 40, cls: 0.06, fcp: 1.0, ttfb: 170 },
  { date: '2024-12-05', lcp: 2.0, fid: 43, cls: 0.08, fcp: 1.2, ttfb: 178 },
  { date: '2024-12-06', lcp: 1.7, fid: 38, cls: 0.05, fcp: 0.9, ttfb: 165 },
  { date: '2024-12-07', lcp: 1.9, fid: 41, cls: 0.07, fcp: 1.1, ttfb: 172 },
]

const deviceBreakdown = [
  { device: 'Desktop', lcp: 1.5, fid: 35, cls: 0.04, users: 4500 },
  { device: 'Mobile', lcp: 2.8, fid: 55, cls: 0.12, users: 3200 },
  { device: 'Tablet', lcp: 2.2, fid: 48, cls: 0.09, users: 800 },
]

const getVitalStatus = (metric: string, value: number) => {
  const thresholds: Record<string, { good: number; needsImprovement: number }> = {
    lcp: { good: 2.5, needsImprovement: 4.0 },
    fid: { good: 100, needsImprovement: 300 },
    cls: { good: 0.1, needsImprovement: 0.25 },
    fcp: { good: 1.8, needsImprovement: 3.0 },
    ttfb: { good: 200, needsImprovement: 500 },
  }

  const threshold = thresholds[metric]
  if (!threshold) return { status: 'unknown', color: 'gray' }

  if (value <= threshold.good) {
    return { status: 'good', color: 'green' }
  } else if (value <= threshold.needsImprovement) {
    return { status: 'needs improvement', color: 'yellow' }
  } else {
    return { status: 'poor', color: 'red' }
  }
}

export default function CoreWebVitals() {
  const latest = vitalsData[vitalsData.length - 1]
  const lcpStatus = getVitalStatus('lcp', latest.lcp)
  const fidStatus = getVitalStatus('fid', latest.fid)
  const clsStatus = getVitalStatus('cls', latest.cls)

  const lcpScore = lcpStatus.status === 'good' ? 100 : lcpStatus.status === 'needs improvement' ? 60 : 30
  const fidScore = fidStatus.status === 'good' ? 100 : fidStatus.status === 'needs improvement' ? 60 : 30
  const clsScore = clsStatus.status === 'good' ? 100 : clsStatus.status === 'needs improvement' ? 60 : 30

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2">Core Web Vitals</h2>
        <p className="text-muted-foreground">Monitor and optimize website performance metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">LCP</CardTitle>
            <Gauge className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{latest.lcp}s</div>
            <p className="text-xs text-muted-foreground mt-1 mb-2">Largest Contentful Paint</p>
            <Progress value={lcpScore} className="h-2 mb-2" />
            <Badge
              variant={lcpStatus.status === 'good' ? 'default' : lcpStatus.status === 'needs improvement' ? 'secondary' : 'destructive'}
            >
              {lcpStatus.status}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">FID</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{latest.fid}ms</div>
            <p className="text-xs text-muted-foreground mt-1 mb-2">First Input Delay</p>
            <Progress value={fidScore} className="h-2 mb-2" />
            <Badge
              variant={fidStatus.status === 'good' ? 'default' : fidStatus.status === 'needs improvement' ? 'secondary' : 'destructive'}
            >
              {fidStatus.status}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CLS</CardTitle>
            <MousePointerClick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{latest.cls.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1 mb-2">Cumulative Layout Shift</p>
            <Progress value={clsScore} className="h-2 mb-2" />
            <Badge
              variant={clsStatus.status === 'good' ? 'default' : clsStatus.status === 'needs improvement' ? 'secondary' : 'destructive'}
            >
              {clsStatus.status}
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>FCP</CardTitle>
            <CardDescription>First Contentful Paint</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">{latest.fcp}s</div>
            <Progress value={latest.fcp < 1.8 ? 100 : latest.fcp < 3.0 ? 60 : 30} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {latest.fcp < 1.8 ? 'Good' : latest.fcp < 3.0 ? 'Needs Improvement' : 'Poor'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>TTFB</CardTitle>
            <CardDescription>Time to First Byte</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">{latest.ttfb}ms</div>
            <Progress value={latest.ttfb < 200 ? 100 : latest.ttfb < 500 ? 60 : 30} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {latest.ttfb < 200 ? 'Good' : latest.ttfb < 500 ? 'Needs Improvement' : 'Poor'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Core Web Vitals Trend</CardTitle>
            <CardDescription>LCP, FID, and CLS over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={vitalsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="lcp" stroke="#8884d8" strokeWidth={2} name="LCP (s)" />
                <Line type="monotone" dataKey="fid" stroke="#82ca9d" strokeWidth={2} name="FID (ms)" />
                <Line type="monotone" dataKey="cls" stroke="#ffc658" strokeWidth={2} name="CLS" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance by Device</CardTitle>
            <CardDescription>Core Web Vitals breakdown by device type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={deviceBreakdown}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="device" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="lcp" fill="#8884d8" name="LCP (s)" />
                <Bar dataKey="fid" fill="#82ca9d" name="FID (ms)" />
                <Bar dataKey="cls" fill="#ffc658" name="CLS" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Device Breakdown Table */}
      <Card>
        <CardHeader>
          <CardTitle>Performance by Device Type</CardTitle>
          <CardDescription>Detailed metrics across different devices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {deviceBreakdown.map((device) => (
              <div key={device.device} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold">{device.device}</h4>
                  <Badge variant="outline">{device.users.toLocaleString()} users</Badge>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">LCP</p>
                    <p className="text-lg font-semibold">{device.lcp}s</p>
                    <Progress
                      value={device.lcp < 2.5 ? 100 : device.lcp < 4.0 ? 60 : 30}
                      className="h-1 mt-1"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">FID</p>
                    <p className="text-lg font-semibold">{device.fid}ms</p>
                    <Progress
                      value={device.fid < 100 ? 100 : device.fid < 300 ? 60 : 30}
                      className="h-1 mt-1"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">CLS</p>
                    <p className="text-lg font-semibold">{device.cls.toFixed(2)}</p>
                    <Progress
                      value={device.cls < 0.1 ? 100 : device.cls < 0.25 ? 60 : 30}
                      className="h-1 mt-1"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

