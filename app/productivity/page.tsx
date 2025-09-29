'use client'

import { useState, useEffect } from 'react'
import { AppLayout } from '@/components/layout/app-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  TrendingUp, 
  Users, 
  Kanban, 
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  Calendar,
  BarChart3,
  Activity,
  Target,
  Zap
} from 'lucide-react'
import Link from 'next/link'

interface ProductivityStats {
  clients: {
    total: number
    leads: number
    negotiation: number
    clients: number
    highPotential: number
  }
  tasks: {
    total: number
    pending: number
    inProgress: number
    done: number
    overdue: number
  }
  recentActivity: {
    type: 'client' | 'task'
    title: string
    description: string
    timestamp: string
    status?: string
  }[]
}

export default function ProductivityPage() {
  const [stats, setStats] = useState<ProductivityStats>({
    clients: {
      total: 0,
      leads: 0,
      negotiation: 0,
      clients: 0,
      highPotential: 0
    },
    tasks: {
      total: 0,
      pending: 0,
      inProgress: 0,
      done: 0,
      overdue: 0
    },
    recentActivity: []
  })

  // Cargar estadísticas iniciales
  useEffect(() => {
    setStats({
      clients: {
        total: 5,
        leads: 2,
        negotiation: 1,
        clients: 2,
        highPotential: 3
      },
      tasks: {
        total: 6,
        pending: 3,
        inProgress: 2,
        done: 1,
        overdue: 1
      },
      recentActivity: [
        {
          type: 'client',
          title: 'Nuevo cliente agregado',
          description: 'María González - TechStart S.L.',
          timestamp: '2024-01-23T10:30:00Z',
          status: 'client'
        },
        {
          type: 'task',
          title: 'Tarea completada',
          description: 'Configurar base de datos - Ana Martín',
          timestamp: '2024-01-23T09:15:00Z',
          status: 'done'
        },
        {
          type: 'client',
          title: 'Lead actualizado',
          description: 'Carlos Ruiz - En negociación',
          timestamp: '2024-01-22T16:45:00Z',
          status: 'negotiation'
        },
        {
          type: 'task',
          title: 'Tarea movida',
          description: 'Diseñar nueva landing page - En curso',
          timestamp: '2024-01-22T14:20:00Z',
          status: 'in_progress'
        },
        {
          type: 'task',
          title: 'Nueva tarea creada',
          description: 'Implementar tests unitarios - María González',
          timestamp: '2024-01-21T11:00:00Z',
          status: 'pending'
        }
      ]
    })
  }, [])

  // Función para generar resumen IA
  const generateAISummary = () => {
    const completionRate = (stats.tasks.done / stats.tasks.total) * 100
    const clientConversionRate = (stats.clients.clients / stats.clients.total) * 100
    
    if (stats.tasks.overdue > 0) {
      return `⚠️ ${stats.tasks.overdue} tareas vencidas requieren atención inmediata`
    }
    if (completionRate > 80) {
      return `🎉 Excelente progreso: ${completionRate.toFixed(0)}% de tareas completadas`
    }
    if (clientConversionRate > 60) {
      return `📈 Alta conversión de clientes: ${clientConversionRate.toFixed(0)}% de leads convertidos`
    }
    if (stats.clients.highPotential > stats.clients.total * 0.5) {
      return `⭐ ${stats.clients.highPotential} clientes de alto potencial identificados`
    }
    return '📊 Progreso normal en productividad'
  }

  // Función para formatear fecha
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Hace unos minutos'
    if (diffInHours < 24) return `Hace ${diffInHours} horas`
    if (diffInHours < 48) return 'Ayer'
    return date.toLocaleDateString()
  }

  // Función para obtener el icono de actividad
  const getActivityIcon = (type: string, status?: string) => {
    if (type === 'client') {
      switch (status) {
        case 'client': return <CheckCircle className="h-4 w-4 text-green-600" />
        case 'negotiation': return <Clock className="h-4 w-4 text-blue-600" />
        default: return <Users className="h-4 w-4 text-yellow-600" />
      }
    } else {
      switch (status) {
        case 'done': return <CheckCircle className="h-4 w-4 text-green-600" />
        case 'in_progress': return <Activity className="h-4 w-4 text-blue-600" />
        default: return <Kanban className="h-4 w-4 text-yellow-600" />
      }
    }
  }

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <BarChart3 className="h-8 w-8 text-blue-600 mr-3" />
                Dashboard de Productividad
              </h1>
              <p className="mt-2 text-gray-600">
                Resumen general de tu actividad y progreso
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/crm">
                <Button variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Ver CRM
                </Button>
              </Link>
              <Link href="/projects">
                <Button variant="outline">
                  <Kanban className="h-4 w-4 mr-2" />
                  Ver Proyectos
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Resumen IA */}
        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full mr-4">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-900">Resumen Inteligente</h3>
                <p className="text-blue-700 mt-1">{generateAISummary()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Métricas principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Clientes</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.clients.total}</p>
                  <p className="text-xs text-gray-500">
                    {stats.clients.clients} activos
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Kanban className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Tareas</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.tasks.total}</p>
                  <p className="text-xs text-gray-500">
                    {stats.tasks.done} completadas
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Target className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Tasa de Completado</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {((stats.tasks.done / stats.tasks.total) * 100).toFixed(0)}%
                  </p>
                  <p className="text-xs text-gray-500">
                    Progreso general
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Star className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Alto Potencial</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.clients.highPotential}</p>
                  <p className="text-xs text-gray-500">
                    Clientes prioritarios
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Resumen de Clientes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Resumen de Clientes
              </CardTitle>
              <CardDescription>
                Estado actual de tu pipeline de clientes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mr-3" />
                    <span className="font-medium">Leads</span>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800">
                    {stats.clients.leads}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-blue-600 mr-3" />
                    <span className="font-medium">En negociación</span>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">
                    {stats.clients.negotiation}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                    <span className="font-medium">Clientes activos</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    {stats.clients.clients}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resumen de Proyectos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Kanban className="h-5 w-5 mr-2" />
                Resumen de Proyectos
              </CardTitle>
              <CardDescription>
                Estado actual de tus tareas y proyectos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-yellow-600 mr-3" />
                    <span className="font-medium">Pendientes</span>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800">
                    {stats.tasks.pending}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center">
                    <Activity className="h-5 w-5 text-blue-600 mr-3" />
                    <span className="font-medium">En curso</span>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">
                    {stats.tasks.inProgress}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                    <span className="font-medium">Completadas</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    {stats.tasks.done}
                  </Badge>
                </div>

                {stats.tasks.overdue > 0 && (
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div className="flex items-center">
                      <AlertCircle className="h-5 w-5 text-red-600 mr-3" />
                      <span className="font-medium">Vencidas</span>
                    </div>
                    <Badge className="bg-red-100 text-red-800">
                      {stats.tasks.overdue}
                    </Badge>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actividad Reciente */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Actividad Reciente
            </CardTitle>
            <CardDescription>
              Últimas actualizaciones en clientes y proyectos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 mt-1">
                    {getActivityIcon(activity.type, activity.status)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.title}
                    </p>
                    <p className="text-sm text-gray-600">
                      {activity.description}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDate(activity.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
