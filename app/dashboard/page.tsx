'use client'

import { useState, useEffect } from 'react'
import { AppLayout } from '@/components/layout/app-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { BookOpen, GraduationCap, Calendar, TrendingUp, Users, Zap, BarChart3, Kanban } from 'lucide-react'
import { OnboardingModal } from '@/components/onboarding/onboarding-modal'
import { useAppStore } from '@/lib/store'
import Link from 'next/link'

export default function DashboardPage() {
  const [showOnboarding, setShowOnboarding] = useState(false)
  const { user, favorites, loadFavorites } = useAppStore()

  // Cargar favoritos al montar el componente
  useEffect(() => {
    loadFavorites()
  }, [loadFavorites])

  // Verificar si es la primera vez que el usuario accede
  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding')
    if (!hasSeenOnboarding) {
      setShowOnboarding(true)
    }
  }, [])

  const handleCloseOnboarding = () => {
    setShowOnboarding(false)
    localStorage.setItem('hasSeenOnboarding', 'true')
  }

  // Datos dummy para el dashboard
  const stats = [
    {
      title: 'Clientes activos',
      value: '5',
      description: 'En tu pipeline de ventas',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Tareas pendientes',
      value: '3',
      description: 'En tu tablero Kanban',
      icon: Kanban,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Favoritos guardados',
      value: favorites.length.toString(),
      description: 'Recursos que te interesan',
      icon: BookOpen,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      title: 'Cursos en progreso',
      value: '2',
      description: 'Cursos pendientes de completar',
      icon: GraduationCap,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ]

  const recentResources = [
    {
      id: 1,
      title: 'Subvención para digitalización PYME',
      category: 'Digitalización',
      amount: '5.000€',
      deadline: '2024-02-15',
      status: 'Disponible'
    },
    {
      id: 2,
      title: 'Ayuda para contratación de personal',
      category: 'Empleo',
      amount: '3.000€',
      deadline: '2024-02-20',
      status: 'Disponible'
    },
    {
      id: 3,
      title: 'Programa de mentoría empresarial',
      category: 'Formación',
      amount: 'Gratuito',
      deadline: '2024-02-10',
      status: 'Urgente'
    }
  ]

  const courses = [
    {
      id: 1,
      title: 'Finanzas para emprendedores',
      progress: 75,
      duration: '2h 30min',
      level: 'Intermedio'
    },
    {
      id: 2,
      title: 'Marketing digital básico',
      progress: 45,
      duration: '1h 45min',
      level: 'Principiante'
    },
    {
      id: 3,
      title: 'Gestión de equipos remotos',
      progress: 0,
      duration: '3h 15min',
      level: 'Avanzado'
    }
  ]

  return (
    <>
      <OnboardingModal 
        isOpen={showOnboarding} 
        onClose={handleCloseOnboarding}
        userName={user?.name}
      />
      
      <AppLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="mt-2 text-gray-600">
                Bienvenido de vuelta. Aquí tienes un resumen de tu actividad.
              </p>
            </div>
            <button
              onClick={() => setShowOnboarding(true)}
              className="flex items-center px-4 py-2 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Zap className="h-4 w-4 mr-2" />
              Ver guía de inicio
            </button>
          </div>
        </div>

            {/* Quick Actions */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Acciones rápidas</CardTitle>
                <CardDescription>
                  Herramientas y funciones más utilizadas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  <Link href="/ai-assistant" className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors group">
                    <Zap className="h-8 w-8 text-yellow-600 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">IA Assistant</span>
                  </Link>
                  <Link href="/productivity" className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors group">
                    <BarChart3 className="h-8 w-8 text-purple-600 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">Productividad</span>
                  </Link>
                  <Link href="/crm" className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors group">
                    <Users className="h-8 w-8 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">CRM</span>
                  </Link>
                  <Link href="/projects" className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors group">
                    <Kanban className="h-8 w-8 text-green-600 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">Proyectos</span>
                  </Link>
                  <Link href="/resources" className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors group">
                    <BookOpen className="h-8 w-8 text-orange-600 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">Ayudas</span>
                  </Link>
                  <Link href="/courses" className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors group">
                    <GraduationCap className="h-8 w-8 text-indigo-600 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">Cursos</span>
                  </Link>
                </div>
              </CardContent>
            </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-500">{stat.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Clients */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Clientes Recientes
              </CardTitle>
              <CardDescription>
                Últimos clientes agregados a tu CRM
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Link href="/crm" className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors group">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 group-hover:text-blue-600">María González - TechStart S.L.</h4>
                    <p className="text-sm text-gray-500">Cliente • Alto potencial</p>
                    <p className="text-xs text-gray-400">Agregado: 20/01/2024</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Cliente</Badge>
                </Link>
                <Link href="/crm" className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors group">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 group-hover:text-blue-600">Carlos Ruiz - Innovación Digital</h4>
                    <p className="text-sm text-gray-500">En negociación • Alto potencial</p>
                    <p className="text-xs text-gray-400">Agregado: 18/01/2024</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">En negociación</Badge>
                </Link>
                <Link href="/crm" className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors group">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 group-hover:text-blue-600">Ana Martín - Retail Plus</h4>
                    <p className="text-sm text-gray-500">Lead • Medio potencial</p>
                    <p className="text-xs text-gray-400">Agregado: 20/01/2024</p>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800">Lead</Badge>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Recent Tasks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Kanban className="h-5 w-5 mr-2" />
                Tareas Recientes
              </CardTitle>
              <CardDescription>
                Últimas tareas en tu tablero Kanban
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Link href="/projects" className="block space-y-2 p-3 rounded-lg hover:bg-gray-50 transition-colors group">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900 group-hover:text-blue-600">Diseñar nueva landing page</h4>
                    <Badge className="bg-blue-100 text-blue-800">En curso</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>María González</span>
                    <span>Vence: 15/02/2024</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </Link>
                <Link href="/projects" className="block space-y-2 p-3 rounded-lg hover:bg-gray-50 transition-colors group">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900 group-hover:text-blue-600">Implementar autenticación</h4>
                    <Badge className="bg-yellow-100 text-yellow-800">Pendiente</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Carlos Ruiz</span>
                    <span>Vence: 10/02/2024</span>
                  </div>
                  <Progress value={0} className="h-2" />
                </Link>
                <Link href="/projects" className="block space-y-2 p-3 rounded-lg hover:bg-gray-50 transition-colors group">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900 group-hover:text-blue-600">Configurar base de datos</h4>
                    <Badge className="bg-green-100 text-green-800">Completada</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Ana Martín</span>
                    <span>Completada: 25/01/2024</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        </div>
      </AppLayout>
    </>
  )
}
