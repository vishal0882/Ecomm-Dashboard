import { Metric } from '@/types'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MetricCardProps {
  metric: Metric
}

export default function MetricCard({ metric }: MetricCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-muted-foreground">{metric.label}</p>
        {metric.change !== undefined && (
          <div className={cn(
            "flex items-center gap-1 text-sm",
            metric.trend === 'up' ? "text-green-600" : "text-red-600"
          )}>
            {metric.trend === 'up' ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            {Math.abs(metric.change)}%
          </div>
        )}
      </div>
      <p className="text-2xl font-bold">{metric.value}</p>
    </div>
  )
}

