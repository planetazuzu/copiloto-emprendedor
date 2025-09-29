'use client'

import { useState, useEffect } from 'react'
import { AppLayout } from '@/components/layout/app-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { BookOpen, Search, Filter, Heart, ExternalLink } from 'lucide-react'
import { useAppStore } from '@/lib/store'
import { useApiError } from '@/lib/hooks/use-api-error'
import { LoadingErrorFallback, SearchErrorFallback } from '@/components/error-fallbacks'

interface Resource {
  id: number
  title: string
  description: string
  category: string
  sector: string
  stage: string
  amount: string
  deadline: string
  status: string
  url?: string
  isBookmarked: boolean
}

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [resourcesData, setResourcesData] = useState<Resource[]>([])
  const [isLoadingResources, setIsLoadingResources] = useState(true)
  const { favorites, toggleFavorite, loadFavorites } = useAppStore()
  const { error, isLoading: isApiLoading, executeWithErrorHandling } = useApiError()

  // Cargar favoritos al montar el componente
  useEffect(() => {
    loadFavorites()
  }, [loadFavorites])

  const categories = [
    'Todas',
    'Digitalización',
    'Empleo',
    'Formación',
    'Financiación',
    'Internacionalización',
    'Innovación'
  ]

  const resources = [
    {
      id: 1,
      title: 'Subvención para digitalización PYME',
      description: 'Ayuda económica para la transformación digital de pequeñas y medianas empresas',
      category: 'Digitalización',
      amount: '5.000€',
      deadline: '2024-02-15',
      sector: 'Tecnología',
      stage: 'Startup temprana',
      url: 'https://ejemplo.com/ayuda-digitalizacion',
      isBookmarked: false
    },
    {
      id: 2,
      title: 'Programa de contratación de personal joven',
      description: 'Subvención para la contratación de jóvenes menores de 30 años',
      category: 'Empleo',
      amount: '3.000€',
      deadline: '2024-02-20',
      sector: 'Todos',
      stage: 'En crecimiento',
      url: 'https://ejemplo.com/ayuda-empleo',
      isBookmarked: false
    },
    {
      id: 3,
      title: 'Curso de mentoría empresarial',
      description: 'Programa gratuito de mentoría para emprendedores',
      category: 'Formación',
      amount: 'Gratuito',
      deadline: '2024-02-10',
      sector: 'Todos',
      stage: 'Solo tengo una idea',
      url: 'https://ejemplo.com/mentoria',
      isBookmarked: false
    },
    {
      id: 4,
      title: 'Ayuda para internacionalización',
      description: 'Subvención para empresas que quieren expandirse internacionalmente',
      category: 'Internacionalización',
      amount: '10.000€',
      deadline: '2024-03-01',
      sector: 'Manufactura',
      stage: 'Empresa establecida',
      url: 'https://ejemplo.com/internacionalizacion',
      isBookmarked: false
    },
    {
      id: 5,
      title: 'Fondo de innovación tecnológica',
      description: 'Financiación para proyectos de I+D+i',
      category: 'Innovación',
      amount: '25.000€',
      deadline: '2024-03-15',
      sector: 'Tecnología',
      stage: 'En crecimiento',
      url: 'https://ejemplo.com/innovacion',
      isBookmarked: false
    }
  ]

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === '' || selectedCategory === 'Todas' || 
                           resource.category === selectedCategory
    const matchesFavorites = selectedCategory === 'Favoritos' ? favorites.includes(resource.id.toString()) : true
    return matchesSearch && matchesCategory && matchesFavorites
  })

  // Función para manejar el toggle de favoritos
  const handleToggleFavorite = (resourceId: number) => {
    toggleFavorite(resourceId.toString())
  }

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Ayudas y Recursos</h1>
          <p className="mt-2 text-gray-600">
            Descubre ayudas, subvenciones y recursos específicos para tu sector
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
                    placeholder="Buscar ayudas..."
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
                  <option value="Favoritos">⭐ Favoritos ({favorites.length})</option>
                </select>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <Card key={resource.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                    <CardDescription className="mt-2">
                      {resource.description}
                    </CardDescription>
                  </div>
                  <button
                    onClick={() => handleToggleFavorite(resource.id)}
                    className="ml-2 p-1 hover:bg-gray-100 rounded"
                    title={favorites.includes(resource.id.toString()) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                  >
                    <Heart 
                      className={`h-5 w-5 ${
                        favorites.includes(resource.id.toString()) 
                          ? 'text-red-500 fill-current' 
                          : 'text-gray-400 hover:text-red-500'
                      }`} 
                    />
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{resource.category}</Badge>
                    <span className="text-lg font-semibold text-green-600">
                      {resource.amount}
                    </span>
                  </div>
                  
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><strong>Sector:</strong> {resource.sector}</p>
                    <p><strong>Etapa:</strong> {resource.stage}</p>
                    <p><strong>Vence:</strong> {resource.deadline}</p>
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button 
                      size="sm" 
                      className="flex-1"
                      onClick={() => {
                        // Simular ver detalles - en un proyecto real abrirías un modal o página de detalles
                        alert(`Detalles de: ${resource.title}\n\nCategoría: ${resource.category}\nSector: ${resource.sector}\nEtapa: ${resource.stage}\nVence: ${resource.deadline}`)
                      }}
                    >
                      Ver detalles
                    </Button>
                    {resource.url && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open(resource.url, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No se encontraron recursos
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
