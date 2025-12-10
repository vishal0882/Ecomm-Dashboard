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
        "metric-card bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 relative overflow-hidden",
        `stagger-${index + 1}`
      )}
      style={{ animationFillMode: 'both' }}
    >
      {/* Background decoration - smaller on mobile */}
      <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      
      <div className="relative">
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div className="p-2 sm:p-3 bg-primary/10 rounded-lg sm:rounded-xl">
            <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          </div>
          {metric.change !== undefined && (
            <div className={cn(
              "flex items-center gap-1 text-xs sm:text-sm font-medium px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full",
              isPositive 
                ? "text-emerald-600 bg-emerald-500/10" 
                : "text-rose-600 bg-rose-500/10"
            )}>
              {isPositive ? (
                <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              ) : (
                <TrendingDown className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              )}
              {Math.abs(metric.change)}%
            </div>
          )}
        </div>
        
        <div>
          <p className="text-xs sm:text-sm text-muted-foreground mb-0.5 sm:mb-1">{metric.label}</p>
          <p className="text-2xl sm:text-3xl font-bold tracking-tight">{metric.value}</p>
        </div>
        
        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-border">
          <p className="text-[10px] sm:text-xs text-muted-foreground">
            {isPositive ? 'Increased' : 'Decreased'} from last month
          </p>
        </div>
      </div>
    </div>
  )
}
