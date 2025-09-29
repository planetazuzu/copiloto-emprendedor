'use client'

import { useState, useEffect } from 'react'
import { AppLayout } from '@/components/layout/app-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Users,
  Target,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  PieChart,
  Activity,
  Clock,
  CheckCircle2,
  AlertCircle,
  Star,
  Phone,
  Mail,
  Calendar as CalendarIcon,
  FileText
} from 'lucide-react'
import { useToast } from '@/lib/hooks/use-toast'
import { SalesChart } from '@/components/crm/sales-chart'
import { CRMMetrics } from '@/components/crm/performance-metrics'

interface ReportData {
  totalClients: number
  totalValue: number
  conversionRate: number
  averageDealSize: number
  salesVelocity: number
  pipelineHealth: number
  topSources: Array<{ source: string; count: number; value: number }>
  monthlyTrends: Array<{ month: string; clients: number; value: number }>
  statusDistribution: Array<{ status: string; count: number; percentage: number }>
  priorityDistribution: Array<{ priority: string; count: number; percentage: number }>
  taskCompletion: {
    total: number
    completed: number
    pending: number
    overdue: number
  }
  activitySummary: Array<{ type: string; count: number; trend: 'up' | 'down' | 'stable' }>
}

export default function ReportsPage() {
  const [reportData, setReportData] = useState<ReportData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState('30d')
  const [selectedMetric, setSelectedMetric] = useState('all')
  const toast = useToast()

  // Cargar datos de reportes
  useEffect(() => {
    const loadReportData = async () => {
      setIsLoading(true)
      
      // Simular carga de datos
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const mockData: ReportData = {
        totalClients: 47,
        totalValue: 1250000,
        conversionRate: 23.4,
        averageDealSize: 26600,
        salesVelocity: 45,
        pipelineHealth: 78,
        topSources: [
          { source: 'Web', count: 18, value: 450000 },
          { source: 'Referido', count: 12, value: 380000 },
          { source: 'Evento', count: 8, value: 220000 },
          { source: 'LinkedIn', count: 6, value: 150000 },
          { source: 'Email', count: 3, value: 50000 }
        ],
        monthlyTrends: [
          { month: 'Oct', clients: 8, value: 180000 },
          { month: 'Nov', clients: 12, value: 280000 },
          { month: 'Dic', clients: 15, value: 350000 },
          { month: 'Ene', clients: 12, value: 440000 }
        ],
        statusDistribution: [
          { status: 'Lead', count: 15, percentage: 32 },
          { status: 'Calificado', count: 12, percentage: 25 },
          { status: 'Propuesta', count: 8, percentage: 17 },
          { status: 'Negociación', count: 6, percentage: 13 },
          { status: 'Ganado', count: 4, percentage: 8 },
          { status: 'Perdido', count: 2, percentage: 5 }
        ],
        priorityDistribution: [
          { priority: 'Alto', count: 18, percentage: 38 },
          { priority: 'Medio', count: 20, percentage: 43 },
          { priority: 'Bajo', count: 9, percentage: 19 }
        ],
        taskCompletion: {
          total: 156,
          completed: 98,
          pending: 45,
          overdue: 13
        },
        activitySummary: [
          { type: 'Llamadas', count: 45, trend: 'up' },
          { type: 'Emails', count: 78, trend: 'stable' },
          { type: 'Reuniones', count: 23, trend: 'up' },
          { type: 'Tareas', count: 156, trend: 'down' },
          { type: 'Notas', count: 89, trend: 'up' }
        ]
      }
      
      setReportData(mockData)
      setIsLoading(false)
    }

    loadReportData()
  }, [selectedPeriod])

  const handleExportReport = (format: 'pdf' | 'excel' | 'csv') => {
    toast.success({
      title: 'Reporte exportado',
      description: `El reporte se ha exportado en formato ${format.toUpperCase()}`
    })
  }

  const handleRefreshData = () => {
    toast.info({
      title: 'Actualizando datos',
      description: 'Los datos se están actualizando...'
    })
    // Simular actualización
    setTimeout(() => {
      toast.success({
        title: 'Datos actualizados',
        description: 'Los datos se han actualizado correctamente'
      })
    }, 2000)
  }

  if (isLoading) {
    return (
      <AppLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <RefreshCw className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
              <p className="text-gray-600">Cargando reportes...</p>
            </div>
          </div>
        </div>
      </AppLayout>
    )
  }

  if (!reportData) return null

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <BarChart3 className="h-8 w-8 text-blue-600 mr-3" />
                Reportes y Analytics
              </h1>
              <p className="mt-2 text-gray-600">
                Análisis detallado del rendimiento del CRM
              </p>
            </div>
            <div className="flex gap-3">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="7d">Últimos 7 días</option>
                <option value="30d">Últimos 30 días</option>
                <option value="90d">Últimos 90 días</option>
                <option value="1y">Último año</option>
              </select>
              <Button variant="outline" onClick={handleRefreshData}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Actualizar
              </Button>
              <Button onClick={() => handleExportReport('pdf')}>
                <Download className="h-4 w-4 mr-2" />
                Exportar PDF
              </Button>
            </div>
          </div>
        </div>

        {/* Métricas principales */}
        <div className="mb-8">
          <CRMMetrics />
        </div>

        {/* Gráficos principales */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Distribución por estado */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChart className="h-5 w-5 mr-2" />
                Distribución por Estado
              </CardTitle>
              <CardDescription>
                Clientes distribuidos por etapa del pipeline
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportData.statusDistribution.map((item, index) => {
                  const colors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-orange-500', 'bg-purple-500', 'bg-red-500']
                  return (
                    <div key={item.status} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-4 h-4 rounded-full ${colors[index]} mr-3`}></div>
                        <span className="text-sm font-medium">{item.status}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">{item.count} clientes</span>
                        <Badge variant="outline">{item.percentage}%</Badge>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Fuentes principales */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="h-5 w-5 mr-2" />
                Fuentes Principales
              </CardTitle>
              <CardDescription>
                Clientes por fuente de origen
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportData.topSources.map((source, index) => (
                  <div key={source.source} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{source.source}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">{source.count} clientes</span>
                        <span className="text-sm font-semibold text-green-600">€{source.value.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(source.count / Math.max(...reportData.topSources.map(s => s.count))) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tendencias mensuales */}
        <div className="mb-8">
          <SalesChart 
            data={reportData.monthlyTrends}
            title="Tendencias Mensuales"
            description="Evolución de clientes y valor en los últimos meses"
            type="both"
          />
        </div>

        {/* Actividad y tareas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Resumen de tareas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle2 className="h-5 w-5 mr-2" />
                Resumen de Tareas
              </CardTitle>
              <CardDescription>
                Estado actual de las tareas del equipo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">{reportData.taskCompletion.completed}</p>
                    <p className="text-sm text-gray-600">Completadas</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <p className="text-2xl font-bold text-yellow-600">{reportData.taskCompletion.pending}</p>
                    <p className="text-sm text-gray-600">Pendientes</p>
                  </div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <p className="text-2xl font-bold text-red-600">{reportData.taskCompletion.overdue}</p>
                  <p className="text-sm text-gray-600">Vencidas</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full" 
                    style={{ width: `${(reportData.taskCompletion.completed / reportData.taskCompletion.total) * 100}%` }}
                  ></div>
                </div>
                <p className="text-center text-sm text-gray-600">
                  {((reportData.taskCompletion.completed / reportData.taskCompletion.total) * 100).toFixed(1)}% de tareas completadas
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Resumen de actividad */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                Resumen de Actividad
              </CardTitle>
              <CardDescription>
                Actividad del equipo en el período seleccionado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportData.activitySummary.map((activity) => (
                  <div key={activity.type} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {activity.type === 'Llamadas' && <Phone className="h-4 w-4 text-blue-600" />}
                      {activity.type === 'Emails' && <Mail className="h-4 w-4 text-green-600" />}
                      {activity.type === 'Reuniones' && <CalendarIcon className="h-4 w-4 text-purple-600" />}
                      {activity.type === 'Tareas' && <CheckCircle2 className="h-4 w-4 text-orange-600" />}
                      {activity.type === 'Notas' && <FileText className="h-4 w-4 text-gray-600" />}
                      <span className="font-medium">{activity.type}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold">{activity.count}</span>
                      {activity.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-600" />}
                      {activity.trend === 'down' && <TrendingDown className="h-4 w-4 text-red-600" />}
                      {activity.trend === 'stable' && <div className="h-4 w-4 bg-gray-400 rounded-full"></div>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Métricas adicionales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-600">Velocidad de Ventas</p>
                <p className="text-2xl font-bold text-gray-900">{reportData.salesVelocity} días</p>
                <p className="text-sm text-gray-500">Promedio por ciclo</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-600">Tamaño Promedio</p>
                <p className="text-2xl font-bold text-gray-900">€{reportData.averageDealSize.toLocaleString()}</p>
                <p className="text-sm text-gray-500">Por transacción</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <Target className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-600">Objetivo Mensual</p>
                <p className="text-2xl font-bold text-gray-900">€500,000</p>
                <p className="text-sm text-green-600">+150% completado</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}
