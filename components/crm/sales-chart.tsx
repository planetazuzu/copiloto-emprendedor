'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react'

interface ChartData {
  month: string
  clients: number
  value: number
  trend?: 'up' | 'down' | 'stable'
}

interface SalesChartProps {
  data: ChartData[]
  title: string
  description?: string
  type?: 'clients' | 'value' | 'both'
}

export function SalesChart({ data, title, description, type = 'both' }: SalesChartProps) {
  const maxValue = Math.max(...data.map(d => type === 'clients' ? d.clients : d.value))
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BarChart3 className="h-5 w-5 mr-2" />
          {title}
        </CardTitle>
        {description && (
          <CardDescription>{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((item, index) => {
            const currentValue = type === 'clients' ? item.clients : item.value
            const percentage = (currentValue / maxValue) * 100
            const isIncreasing = index > 0 && currentValue > (type === 'clients' ? data[index - 1].clients : data[index - 1].value)
            const isDecreasing = index > 0 && currentValue < (type === 'clients' ? data[index - 1].clients : data[index - 1].value)
            
            return (
              <div key={item.month} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-sm">{item.month}</span>
                    {index > 0 && (
                      <div className="flex items-center">
                        {isIncreasing && <TrendingUp className="h-3 w-3 text-green-600" />}
                        {isDecreasing && <TrendingDown className="h-3 w-3 text-red-600" />}
                        {!isIncreasing && !isDecreasing && <div className="h-3 w-3 bg-gray-400 rounded-full"></div>}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    {type === 'clients' || type === 'both' ? (
                      <span className="text-blue-600 font-semibold">{item.clients} clientes</span>
                    ) : null}
                    {type === 'value' || type === 'both' ? (
                      <span className="text-green-600 font-semibold">€{item.value.toLocaleString()}</span>
                    ) : null}
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-500 ${
                      type === 'clients' ? 'bg-blue-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
