'use client'

import { useState, useEffect } from 'react'
import { AppLayout } from '@/components/layout/app-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Heart, ExternalLink, Search, Filter } from 'lucide-react'
import { useAppStore } from '@/lib/store'
import Link from 'next/link'

export default function FavoritesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const { favorites, toggleFavorite, loadFavorites } = useAppStore()

  // Cargar favoritos al montar el componente
  useEffect(() => {
    loadFavorites()
  }, [loadFavorites])

  // Datos dummy de recursos (en un proyecto real vendrían de una API)
  const allResources = [
    {
      id: 'resource-1',
      title: 'Subvención para digitalización PYME',
      description: 'Ayuda económica para la transformación digital de pequeñas y medianas empresas',
      category: 'Digitalización',
      sector: 'Tecnología',
      stage: 'Startup temprana',
      amount: '€5.000',
      deadline: '31/12/2024',
      url: 'https://ejemplo.com/digitalizacion'
    },
    {
      id: 'resource-2',
      title: 'Programa de contratación de personal joven',
      description: 'Subvención para la contratación de jóvenes menores de 30 años',
      category: 'Empleo',
      sector: 'Todos',
      stage: 'En crecimiento',
      amount: '€3.000',
      deadline: '15/03/2025',
      url: 'https://ejemplo.com/empleo'
    },
    {
      id: 'resource-3',
      title: 'Curso de mentoría empresarial',
      description: 'Programa gratuito de mentoría para emprendedores',
      category: 'Formación',
      sector: 'Todos',
      stage: 'Solo tengo una idea',
      amount: 'Gratuito',
      deadline: '30/06/2025',
      url: 'https://ejemplo.com/mentoria'
    },
    {
      id: 'resource-4',
      title: 'Ayuda para exportación',
      description: 'Fondo para empresas que quieren internacionalizarse',
      category: 'Internacionalización',
      sector: 'Todos',
      stage: 'En crecimiento',
      amount: '€10.000',
      deadline: '28/02/2025',
      url: 'https://ejemplo.com/exportacion'
    },
    {
      id: 'resource-5',
      title: 'Fondo de innovación',
      description: 'Financiación para proyectos de I+D+i',
      category: 'Innovación',
      sector: 'Tecnología',
      stage: 'Empresa establecida',
      amount: '€25.000',
      deadline: '01/09/2024',
      url: 'https://ejemplo.com/innovacion'
    }
  ]

  const categories = [
    'Todas',
    'Digitalización',
    'Empleo',
    'Formación',
    'Internacionalización',
    'Innovación'
  ]

  // Filtrar recursos favoritos
  const favoriteResources = allResources.filter(resource => 
    favorites.includes(resource.id)
  )

  const filteredResources = favoriteResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === '' || selectedCategory === 'Todas' || 
                           resource.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Función para manejar el toggle de favoritos
  const handleToggleFavorite = (resourceId: string) => {
    toggleFavorite(resourceId)
  }

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Heart className="h-8 w-8 text-red-500 mr-3" />
                Mis Favoritos
              </h1>
              <p className="mt-2 text-gray-600">
                Recursos que has marcado como favoritos ({favoriteResources.length})
              </p>
            </div>
            <Link href="/resources">
              <Button variant="outline">
                <Search className="h-4 w-4 mr-2" />
                Explorar más recursos
              </Button>
            </Link>
          </div>
        </div>

        {/* Filtros */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar en favoritos..."
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
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista de recursos favoritos */}
        {filteredResources.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                {favoriteResources.length === 0 ? 'No tienes favoritos aún' : 'No se encontraron resultados'}
              </h3>
              <p className="text-gray-500 mb-6">
                {favoriteResources.length === 0 
                  ? 'Explora recursos y marca los que te interesen como favoritos'
                  : 'Intenta ajustar los filtros de búsqueda'
                }
              </p>
              <Link href="/resources">
                <Button>
                  <Search className="h-4 w-4 mr-2" />
                  Explorar recursos
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
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
                      title="Quitar de favoritos"
                    >
                      <Heart className="h-5 w-5 text-red-500 fill-current" />
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
        )}
      </div>
    </AppLayout>
  )
}
