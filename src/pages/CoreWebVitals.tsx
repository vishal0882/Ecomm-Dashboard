import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { Gauge, Zap, MousePointerClick } from 'lucide-react'

const vitalsData = [
  { date: 'Dec 01', lcp: 2.1, fid: 45, cls: 0.08, fcp: 1.2, ttfb: 180 },
  { date: 'Dec 02', lcp: 1.9, fid: 42, cls: 0.07, fcp: 1.1, ttfb: 175 },
  { date: 'Dec 03', lcp: 2.3, fid: 48, cls: 0.09, fcp: 1.3, ttfb: 185 },
  { date: 'Dec 04', lcp: 1.8, fid: 40, cls: 0.06, fcp: 1.0, ttfb: 170 },
  { date: 'Dec 05', lcp: 2.0, fid: 43, cls: 0.08, fcp: 1.2, ttfb: 178 },
  { date: 'Dec 06', lcp: 1.7, fid: 38, cls: 0.05, fcp: 0.9, ttfb: 165 },
  { date: 'Dec 07', lcp: 1.9, fid: 41, cls: 0.07, fcp: 1.1, ttfb: 172 },
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
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">Core Web Vitals</h2>
        <p className="text-sm sm:text-base text-muted-foreground">Monitor and optimize website performance metrics</p>
      </div>

      {/* Key Metrics - 1 col mobile, 3 cols tablet+ */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 sm:px-6">
            <CardTitle className="text-xs sm:text-sm font-medium">LCP</CardTitle>
            <Gauge className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <div className="text-xl sm:text-2xl font-bold">{latest.lcp}s</div>
            <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 mb-2">Largest Contentful Paint</p>
            <Progress value={lcpScore} className="h-2 mb-2" />
            <Badge
              variant={lcpStatus.status === 'good' ? 'default' : lcpStatus.status === 'needs improvement' ? 'secondary' : 'destructive'}
              className="text-[10px] sm:text-xs"
            >
              {lcpStatus.status}
            </Badge>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 sm:px-6">
            <CardTitle className="text-xs sm:text-sm font-medium">FID</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <div className="text-xl sm:text-2xl font-bold">{latest.fid}ms</div>
            <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 mb-2">First Input Delay</p>
            <Progress value={fidScore} className="h-2 mb-2" />
            <Badge
              variant={fidStatus.status === 'good' ? 'default' : fidStatus.status === 'needs improvement' ? 'secondary' : 'destructive'}
              className="text-[10px] sm:text-xs"
            >
              {fidStatus.status}
            </Badge>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 sm:px-6">
            <CardTitle className="text-xs sm:text-sm font-medium">CLS</CardTitle>
            <MousePointerClick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <div className="text-xl sm:text-2xl font-bold">{latest.cls.toFixed(2)}</div>
            <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 mb-2">Cumulative Layout Shift</p>
            <Progress value={clsScore} className="h-2 mb-2" />
            <Badge
              variant={clsStatus.status === 'good' ? 'default' : clsStatus.status === 'needs improvement' ? 'secondary' : 'destructive'}
              className="text-[10px] sm:text-xs"
            >
              {clsStatus.status}
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Additional Metrics - 2 cols on mobile+ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <Card className="glass-card">
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="text-base sm:text-lg">FCP</CardTitle>
            <CardDescription className="text-xs sm:text-sm">First Contentful Paint</CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <div className="text-2xl sm:text-3xl font-bold mb-2">{latest.fcp}s</div>
            <Progress value={latest.fcp < 1.8 ? 100 : latest.fcp < 3.0 ? 60 : 30} className="h-2" />
            <p className="text-[10px] sm:text-xs text-muted-foreground mt-2">
              {latest.fcp < 1.8 ? 'Good' : latest.fcp < 3.0 ? 'Needs Improvement' : 'Poor'}
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="text-base sm:text-lg">TTFB</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Time to First Byte</CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <div className="text-2xl sm:text-3xl font-bold mb-2">{latest.ttfb}ms</div>
            <Progress value={latest.ttfb < 200 ? 100 : latest.ttfb < 500 ? 60 : 30} className="h-2" />
            <p className="text-[10px] sm:text-xs text-muted-foreground mt-2">
              {latest.ttfb < 200 ? 'Good' : latest.ttfb < 500 ? 'Needs Improvement' : 'Poor'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card className="glass-card">
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="text-base sm:text-lg">Core Web Vitals Trend</CardTitle>
            <CardDescription className="text-xs sm:text-sm">LCP, FID, and CLS over time</CardDescription>
          </CardHeader>
          <CardContent className="px-2 sm:px-6">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={vitalsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line type="monotone" dataKey="lcp" stroke="#10b981" strokeWidth={2} name="LCP (s)" />
                <Line type="monotone" dataKey="fid" stroke="#3b82f6" strokeWidth={2} name="FID (ms)" />
                <Line type="monotone" dataKey="cls" stroke="#f59e0b" strokeWidth={2} name="CLS" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="text-base sm:text-lg">Performance by Device</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Core Web Vitals breakdown by device type</CardDescription>
          </CardHeader>
          <CardContent className="px-2 sm:px-6">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={deviceBreakdown}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="device" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="lcp" fill="#10b981" name="LCP (s)" />
                <Bar dataKey="fid" fill="#3b82f6" name="FID (ms)" />
                <Bar dataKey="cls" fill="#f59e0b" name="CLS" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Device Breakdown Table */}
      <Card className="glass-card">
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="text-base sm:text-lg">Performance by Device Type</CardTitle>
          <CardDescription className="text-xs sm:text-sm">Detailed metrics across different devices</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 px-4 sm:px-6">
          {deviceBreakdown.map((device) => (
            <div key={device.device} className="border rounded-lg p-3 sm:p-4 space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-sm sm:text-base">{device.device}</h4>
                <Badge variant="outline" className="text-[10px] sm:text-xs">{device.users.toLocaleString()} users</Badge>
              </div>
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                <div>
                  <p className="text-[10px] sm:text-sm text-muted-foreground">LCP</p>
                  <p className="text-sm sm:text-lg font-semibold">{device.lcp}s</p>
                  <Progress
                    value={device.lcp < 2.5 ? 100 : device.lcp < 4.0 ? 60 : 30}
                    className="h-1 mt-1"
                  />
                </div>
                <div>
                  <p className="text-[10px] sm:text-sm text-muted-foreground">FID</p>
                  <p className="text-sm sm:text-lg font-semibold">{device.fid}ms</p>
                  <Progress
                    value={device.fid < 100 ? 100 : device.fid < 300 ? 60 : 30}
                    className="h-1 mt-1"
                  />
                </div>
                <div>
                  <p className="text-[10px] sm:text-sm text-muted-foreground">CLS</p>
                  <p className="text-sm sm:text-lg font-semibold">{device.cls.toFixed(2)}</p>
                  <Progress
                    value={device.cls < 0.1 ? 100 : device.cls < 0.25 ? 60 : 30}
                    className="h-1 mt-1"
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
