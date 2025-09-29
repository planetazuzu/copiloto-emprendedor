'use client'

import { useState } from 'react'
import { AppLayout } from '@/components/layout/app-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { GraduationCap, Search, Filter, Play, Clock, Award, Star } from 'lucide-react'

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('')

  const categories = [
    'Todas',
    'Finanzas',
    'Marketing',
    'Gestión',
    'Tecnología',
    'Ventas',
    'Liderazgo'
  ]

  const levels = [
    'Todas',
    'Principiante',
    'Intermedio',
    'Avanzado'
  ]

  const courses = [
    {
      id: 1,
      title: 'Finanzas para emprendedores',
      description: 'Aprende a gestionar las finanzas de tu empresa desde cero',
      category: 'Finanzas',
      level: 'Intermedio',
      duration: 150, // minutos
      progress: 75,
      completed: false,
      rating: 4.8,
      students: 1250,
      instructor: 'María González',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400',
      modules: [
        'Introducción a las finanzas empresariales',
        'Presupuestos y flujo de caja',
        'Análisis financiero básico',
        'Financiación y inversión'
      ]
    },
    {
      id: 2,
      title: 'Marketing digital básico',
      description: 'Domina las herramientas esenciales del marketing online',
      category: 'Marketing',
      level: 'Principiante',
      duration: 120,
      progress: 45,
      completed: false,
      rating: 4.6,
      students: 2100,
      instructor: 'Carlos Ruiz',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
      modules: [
        'Fundamentos del marketing digital',
        'Redes sociales para empresas',
        'Email marketing',
        'SEO básico'
      ]
    },
    {
      id: 3,
      title: 'Gestión de equipos remotos',
      description: 'Lidera equipos distribuidos de manera efectiva',
      category: 'Gestión',
      level: 'Avanzado',
      duration: 180,
      progress: 0,
      completed: false,
      rating: 4.9,
      students: 890,
      instructor: 'Ana Martín',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400',
      modules: [
        'Fundamentos del trabajo remoto',
        'Herramientas de colaboración',
        'Comunicación efectiva',
        'Gestión del rendimiento'
      ]
    },
    {
      id: 4,
      title: 'Ventas consultivas',
      description: 'Técnicas avanzadas para vender productos y servicios',
      category: 'Ventas',
      level: 'Intermedio',
      duration: 135,
      progress: 100,
      completed: true,
      rating: 4.7,
      students: 1680,
      instructor: 'Roberto Silva',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400',
      modules: [
        'Proceso de ventas consultivas',
        'Identificación de necesidades',
        'Presentación de soluciones',
        'Cierre de ventas'
      ]
    },
    {
      id: 5,
      title: 'Liderazgo empresarial',
      description: 'Desarrolla habilidades de liderazgo para dirigir tu empresa',
      category: 'Liderazgo',
      level: 'Intermedio',
      duration: 165,
      progress: 30,
      completed: false,
      rating: 4.8,
      students: 1450,
      instructor: 'Laura Fernández',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      modules: [
        'Estilos de liderazgo',
        'Motivación de equipos',
        'Toma de decisiones',
        'Gestión del cambio'
      ]
    },
    {
      id: 6,
      title: 'Transformación digital',
      description: 'Guía completa para digitalizar tu negocio',
      category: 'Tecnología',
      level: 'Principiante',
      duration: 200,
      progress: 0,
      completed: false,
      rating: 4.5,
      students: 980,
      instructor: 'David López',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400',
      modules: [
        'Estrategia digital',
        'Herramientas digitales',
        'Automatización de procesos',
        'Medición y análisis'
      ]
    }
  ]

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === '' || selectedCategory === 'Todas' || 
                           course.category === selectedCategory
    const matchesLevel = selectedLevel === '' || selectedLevel === 'Todas' || 
                        course.level === selectedLevel
    return matchesSearch && matchesCategory && matchesLevel
  })

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}h ${mins}min` : `${mins}min`
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Principiante': return 'bg-green-100 text-green-800'
      case 'Intermedio': return 'bg-yellow-100 text-yellow-800'
      case 'Avanzado': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Cursos</h1>
          <p className="mt-2 text-gray-600">
            Desarrolla tus habilidades empresariales con nuestros microcursos
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Buscar cursos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category === 'Todas' ? '' : category}>
                      {category}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {levels.map(level => (
                    <option key={level} value={level === 'Todas' ? '' : level}>
                      {level}
                    </option>
                  ))}
                </select>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute top-4 right-4">
                  <Badge className={getLevelColor(course.level)}>
                    {course.level}
                  </Badge>
                </div>
                {course.completed && (
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-green-600 text-white">
                      <Award className="h-3 w-3 mr-1" />
                      Completado
                    </Badge>
                  </div>
                )}
              </div>
              
              <CardHeader>
                <CardTitle className="text-lg">{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  {/* Progress */}
                  {course.progress > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progreso</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  )}

                  {/* Course Info */}
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {formatDuration(course.duration)}
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-500" />
                      {course.rating}
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    <p>Instructor: {course.instructor}</p>
                    <p>{course.students.toLocaleString()} estudiantes</p>
                  </div>

                  {/* Modules */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Módulos:</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {course.modules.slice(0, 2).map((module, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-1 h-1 bg-gray-400 rounded-full mr-2" />
                          {module}
                        </li>
                      ))}
                      {course.modules.length > 2 && (
                        <li className="text-gray-500">
                          +{course.modules.length - 2} módulos más
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Action Button */}
                  <Button 
                    className="w-full" 
                    variant={course.completed ? "outline" : "default"}
                    onClick={() => {
                      if (course.completed) {
                        alert(`¡Felicidades! Has completado el curso "${course.title}". En un proyecto real aquí se descargaría el certificado.`)
                      } else if (course.progress > 0) {
                        alert(`Continuando curso "${course.title}" desde el ${course.progress}%. En un proyecto real aquí se abriría el curso.`)
                      } else {
                        alert(`Iniciando curso "${course.title}". En un proyecto real aquí se abriría la primera lección.`)
                      }
                    }}
                  >
                    {course.completed ? (
                      <>
                        <Award className="h-4 w-4 mr-2" />
                        Ver certificado
                      </>
                    ) : course.progress > 0 ? (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Continuar curso
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Empezar curso
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No se encontraron cursos
              </h3>
              <p className="text-gray-500">
                Intenta ajustar los filtros o términos de búsqueda
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  )
}
