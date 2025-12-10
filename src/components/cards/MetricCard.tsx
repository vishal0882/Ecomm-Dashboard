import { Metric } from '@/types'
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Percent } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MetricCardProps {
  metric: Metric
  index?: number
}

const iconMap: Record<string, React.ElementType> = {
  'Total Revenue': DollarSign,
  'Orders': ShoppingCart,
  'Customers': Users,
  'Conversion Rate': Percent,
}

export default function MetricCard({ metric, index = 0 }: MetricCardProps) {
  const Icon = iconMap[metric.label] || DollarSign
  const isPositive = metric.trend === 'up'
  
  return (
    <div 
      className={cn(
        "metric-card bg-card border border-border rounded-2xl p-6 relative overflow-hidden",
        `stagger-${index + 1}`
      )}
      style={{ animationFillMode: 'both' }}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 bg-primary/10 rounded-xl">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          {metric.change !== undefined && (
            <div className={cn(
              "flex items-center gap-1 text-sm font-medium px-2.5 py-1 rounded-full",
              isPositive 
                ? "text-emerald-600 bg-emerald-500/10" 
                : "text-rose-600 bg-rose-500/10"
            )}>
              {isPositive ? (
                <TrendingUp className="w-3.5 h-3.5" />
              ) : (
                <TrendingDown className="w-3.5 h-3.5" />
              )}
              {Math.abs(metric.change)}%
            </div>
          )}
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
          <p className="text-3xl font-bold tracking-tight">{metric.value}</p>
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground">
            {isPositive ? 'Increased' : 'Decreased'} from last month
          </p>
        </div>
      </div>
    </div>
  )
}
