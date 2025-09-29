'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Target, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  DollarSign,
  Users,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react'

interface Metric {
  title: string
  value: string | number
  change: number
  changeType: 'increase' | 'decrease' | 'neutral'
  icon: React.ReactNode
  description?: string
  target?: number
  current?: number
}

interface PerformanceMetricsProps {
  metrics: Metric[]
  title?: string
}

export function PerformanceMetrics({ metrics, title = "Métricas de Rendimiento" }: PerformanceMetricsProps) {
  const getChangeColor = (changeType: string) => {
    switch (changeType) {
      case 'increase': return 'text-green-600'
      case 'decrease': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getChangeIcon = (changeType: string) => {
    switch (changeType) {
      case 'increase': return <TrendingUp className="h-4 w-4" />
      case 'decrease': return <TrendingDown className="h-4 w-4" />
      default: return <div className="h-4 w-4 bg-gray-400 rounded-full"></div>
    }
  }

  return (
    <div className="space-y-6">
      {title && (
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    {metric.icon}
                  </div>
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {metric.title}
                  </CardTitle>
                </div>
                <div className={`flex items-center space-x-1 ${getChangeColor(metric.changeType)}`}>
                  {getChangeIcon(metric.changeType)}
                  <span className="text-sm font-medium">
                    {metric.change > 0 ? '+' : ''}{metric.change}%
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-gray-900">
                  {typeof metric.value === 'number' ? metric.value.toLocaleString() : metric.value}
                </div>
                {metric.description && (
                  <p className="text-sm text-gray-500">{metric.description}</p>
                )}
                {metric.target && metric.current !== undefined && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progreso</span>
                      <span className="font-medium">
                        {Math.round((metric.current / metric.target) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${Math.min((metric.current / metric.target) * 100, 100)}%` 
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{metric.current.toLocaleString()}</span>
                      <span>{metric.target.toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// Componente específico para métricas de CRM
export function CRMMetrics() {
  const crmMetrics: Metric[] = [
    {
      title: "Clientes Totales",
      value: 47,
      change: 12,
      changeType: 'increase',
      icon: <Users className="h-5 w-5 text-blue-600" />,
      description: "Clientes activos en el CRM",
      target: 50,
      current: 47
    },
    {
      title: "Valor del Pipeline",
      value: "€1,250,000",
      change: 18,
      changeType: 'increase',
      icon: <DollarSign className="h-5 w-5 text-green-600" />,
      description: "Valor total de oportunidades",
      target: 1000000,
      current: 1250000
    },
    {
      title: "Tasa de Conversión",
      value: "23.4%",
      change: -2.1,
      changeType: 'decrease',
      icon: <Target className="h-5 w-5 text-purple-600" />,
      description: "Leads convertidos a clientes"
    },
    {
      title: "Velocidad de Ventas",
      value: "45 días",
      change: -8,
      changeType: 'increase',
      icon: <Clock className="h-5 w-5 text-orange-600" />,
      description: "Tiempo promedio del ciclo"
    },
    {
      title: "Tareas Completadas",
      value: "98/156",
      change: 15,
      changeType: 'increase',
      icon: <CheckCircle2 className="h-5 w-5 text-green-600" />,
      description: "Tareas finalizadas este mes",
      target: 150,
      current: 98
    },
    {
      title: "Salud del Pipeline",
      value: "78%",
      change: 5,
      changeType: 'increase',
      icon: <AlertTriangle className="h-5 w-5 text-yellow-600" />,
      description: "Calidad general del pipeline"
    }
  ]

  return <PerformanceMetrics metrics={crmMetrics} />
}
