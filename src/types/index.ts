export interface Metric {
  label: string
  value: string | number
  change?: number
  trend?: 'up' | 'down'
}

export interface SalesData {
  date: string
  sales: number
  revenue: number
}

export interface Report {
  id: string
  name: string
  type: string
  generatedAt: string
  data: Record<string, unknown>
}

