'use client'

import { useState, useEffect } from 'react'
import { AppLayout } from '@/components/layout/app-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Bookmark, 
  Search, 
  Filter, 
  ExternalLink, 
  Plus, 
  Shield,
  CheckCircle,
  AlertTriangle,
  Clock,
  Globe,
  Building2,
  FileText,
  Users,
  Edit,
  Trash2,
  Star,
  Link as LinkIcon
} from 'lucide-react'
import { useAppStore } from '@/lib/store'
import { useToast } from '@/lib/hooks/use-toast'
import { AddBookmarkModal } from '@/components/bookmarks/add-bookmark-modal'
import Link from 'next/link'

interface BookmarkLink {
  id: string
  title: string
  description: string
  url: string
  category: string
  institution: string
  isOfficial: boolean
  isVerified: boolean
  verificationDate?: string
  verifiedBy?: string
  tags: string[]
  clicks: number
  createdBy: string
  authorName: string
  createdAt: string
  lastChecked?: string
  status: 'active' | 'broken' | 'pending' | 'archived'
  isAdmin?: boolean
}

export default function BookmarksPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [showAdminPanel, setShowAdminPanel] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [bookmarks, setBookmarks] = useState<BookmarkLink[]>([])
  const { user, favorites, toggleFavorite, loadFavorites } = useAppStore()
  const toast = useToast()

  // Cargar favoritos al montar el componente
  useEffect(() => {
    loadFavorites()
    // Cargar marcadores iniciales
    setBookmarks([
      {
        id: 'bookmark-1',
        title: 'Portal de Ayudas del Ministerio de Industria',
        description: 'Portal oficial para consultar y solicitar ayudas del Ministerio de Industria, Comercio y Turismo',
        url: 'https://www.mincotur.gob.es/ayudas',
        category: 'Ayudas Públicas',
        institution: 'Ministerio de Industria, Comercio y Turismo',
        isOfficial: true,
        isVerified: true,
        verificationDate: '2024-01-15',
        verifiedBy: 'Admin',
        tags: ['ayudas', 'ministerio', 'oficial'],
        clicks: 245,
        createdBy: 'admin',
        authorName: 'Administrador',
        createdAt: '2024-01-10',
        lastChecked: '2024-01-20',
        status: 'active',
        isAdmin: true
      },
      {
        id: 'bookmark-2',
        title: 'ENISA - Empresa Nacional de Innovación',
        description: 'Financiación para empresas innovadoras y startups',
        url: 'https://www.enisa.es',
        category: 'Financiación',
        institution: 'ENISA',
        isOfficial: true,
        isVerified: true,
        verificationDate: '2024-01-12',
        verifiedBy: 'Admin',
        tags: ['financiación', 'startup', 'innovación'],
        clicks: 189,
        createdBy: 'admin',
        authorName: 'Administrador',
        createdAt: '2024-01-08',
        lastChecked: '2024-01-18',
        status: 'active',
        isAdmin: true
      },
      {
        id: 'bookmark-3',
        title: 'Cámara de Comercio de Madrid',
        description: 'Servicios y recursos para emprendedores en Madrid',
        url: 'https://www.camaramadrid.es',
        category: 'Servicios',
        institution: 'Cámara de Comercio de Madrid',
        isOfficial: true,
        isVerified: true,
        verificationDate: '2024-01-14',
        verifiedBy: 'Admin',
        tags: ['cámara', 'madrid', 'servicios'],
        clicks: 156,
        createdBy: 'admin',
        authorName: 'Administrador',
        createdAt: '2024-01-05',
        lastChecked: '2024-01-19',
        status: 'active',
        isAdmin: true
      },
      {
        id: 'bookmark-4',
        title: 'Mi Guía de Subvenciones Favorita',
        description: 'Recopilación personal de enlaces útiles para subvenciones',
        url: 'https://ejemplo.com/guia-subvenciones',
        category: 'Recursos',
        institution: 'Usuario',
        isOfficial: false,
        isVerified: false,
        tags: ['subvenciones', 'guía', 'personal'],
        clicks: 78,
        createdBy: 'user-1',
        authorName: 'Elena Vargas',
        createdAt: '2024-01-20',
        status: 'active',
        isAdmin: false
      },
      {
        id: 'bookmark-5',
        title: 'Portal de Contratación Pública',
        description: 'Acceso a licitaciones y contratos del sector público',
        url: 'https://www.contrataciondelestado.es',
        category: 'Contratación',
        institution: 'Ministerio de Hacienda',
        isOfficial: true,
        isVerified: true,
        verificationDate: '2024-01-16',
        verifiedBy: 'Admin',
        tags: ['contratación', 'pública', 'licitaciones'],
        clicks: 203,
        createdBy: 'admin',
        authorName: 'Administrador',
        createdAt: '2024-01-12',
        lastChecked: '2024-01-21',
        status: 'active',
        isAdmin: true
      }
    ])
  }, [loadFavorites])

  const categories = [
    'Todas',
    'Ayudas Públicas',
    'Financiación',
    'Servicios',
    'Recursos',
    'Contratación',
    'Formación',
    'Legal'
  ]

  const statuses = [
    'Todos',
    'Activos',
    'Pendientes',
    'Rotos',
    'Archivados'
  ]

  // Filtrar marcadores
  const filteredBookmarks = bookmarks.filter(bookmark => {
    const matchesSearch = bookmark.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bookmark.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bookmark.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bookmark.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === '' || selectedCategory === 'Todas' || 
                           bookmark.category === selectedCategory
    const matchesStatus = selectedStatus === '' || selectedStatus === 'Todos' || 
                         (selectedStatus === 'Activos' && bookmark.status === 'active') ||
                         (selectedStatus === 'Pendientes' && bookmark.status === 'pending') ||
                         (selectedStatus === 'Rotos' && bookmark.status === 'broken') ||
                         (selectedStatus === 'Archivados' && bookmark.status === 'archived')
    return matchesSearch && matchesCategory && matchesStatus
  })

  // Función para obtener el icono según la institución
  const getInstitutionIcon = (institution: string) => {
    if (institution.includes('Ministerio')) return <Building2 className="h-5 w-5 text-blue-600" />
    if (institution.includes('ENISA')) return <FileText className="h-5 w-5 text-green-600" />
    if (institution.includes('Cámara')) return <Users className="h-5 w-5 text-purple-600" />
    if (institution.includes('Usuario')) return <Star className="h-5 w-5 text-yellow-600" />
    return <Globe className="h-5 w-5 text-gray-600" />
  }

  // Función para obtener el badge de estado
  const getStatusBadge = (status: string, isVerified: boolean) => {
    switch (status) {
      case 'active':
        return isVerified ? (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Verificado
          </Badge>
        ) : (
          <Badge variant="secondary">Activo</Badge>
        )
      case 'pending':
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Clock className="h-3 w-3 mr-1" />
            Pendiente
          </Badge>
        )
      case 'broken':
        return (
          <Badge className="bg-red-100 text-red-800">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Roto
          </Badge>
        )
      case 'archived':
        return <Badge variant="outline">Archivado</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  // Función para manejar clics en enlaces
  const handleLinkClick = (bookmark: BookmarkLink) => {
    setBookmarks(prev => prev.map(b => 
      b.id === bookmark.id ? { ...b, clicks: b.clicks + 1 } : b
    ))
    toast.info({
      title: 'Enlace abierto',
      description: `Redirigiendo a ${bookmark.title}`
    })
  }

  // Función para manejar favoritos
  const handleToggleFavorite = (bookmarkId: string) => {
    toggleFavorite(bookmarkId)
  }

  // Función para eliminar marcador
  const handleDeleteBookmark = (bookmarkId: string) => {
    setBookmarks(prev => prev.filter(b => b.id !== bookmarkId))
    toast.warning({
      title: 'Marcador eliminado',
      description: 'El marcador ha sido eliminado'
    })
  }

  // Función para verificar enlace
  const handleVerifyLink = (bookmarkId: string) => {
    setBookmarks(prev => prev.map(b => 
      b.id === bookmarkId 
        ? { 
            ...b, 
            isVerified: true, 
            verificationDate: new Date().toISOString(),
            verifiedBy: 'Admin',
            status: 'active' as const
          } 
        : b
    ))
    toast.success({
      title: 'Enlace verificado',
      description: 'El enlace ha sido verificado y marcado como oficial'
    })
  }

  // Función para agregar nuevo marcador
  const handleAddBookmark = (newBookmark: BookmarkLink) => {
    setBookmarks(prev => [newBookmark, ...prev])
    toast.success({
      title: 'Marcador agregado',
      description: 'El marcador se ha agregado correctamente'
    })
  }

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Bookmark className="h-8 w-8 text-blue-600 mr-3" />
                Marcadores Oficiales
              </h1>
              <p className="mt-2 text-gray-600">
                Enlaces verificados y recursos oficiales para emprendedores
              </p>
            </div>
            <div className="flex gap-3">
              {user && (
                <Button
                  variant="outline"
                  onClick={() => setShowAdminPanel(!showAdminPanel)}
                  className="flex items-center"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  {showAdminPanel ? 'Vista Usuario' : 'Panel Admin'}
                </Button>
              )}
              <Button 
                className="flex items-center"
                onClick={() => setShowAddModal(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Agregar Marcador
              </Button>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar en marcadores..."
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
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {statuses.map(status => (
                    <option key={status} value={status === 'Todos' ? '' : status}>
                      {status}
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

        {/* Panel de Administración */}
        {showAdminPanel && (
          <Card className="mb-8 border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center text-orange-800">
                <Shield className="h-5 w-5 mr-2" />
                Panel de Administración
              </CardTitle>
              <CardDescription>
                Gestiona los marcadores y enlaces oficiales
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-white rounded-lg">
                  <Bookmark className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="font-semibold">Total Marcadores</p>
                  <p className="text-2xl font-bold text-blue-600">{bookmarks.length}</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="font-semibold">Verificados</p>
                  <p className="text-2xl font-bold text-green-600">
                    {bookmarks.filter(b => b.isVerified).length}
                  </p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <AlertTriangle className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                  <p className="font-semibold">Pendientes</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {bookmarks.filter(b => b.status === 'pending').length}
                  </p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <ExternalLink className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <p className="font-semibold">Total Clics</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {bookmarks.reduce((sum, b) => sum + b.clicks, 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Lista de marcadores */}
        {filteredBookmarks.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Bookmark className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No se encontraron marcadores
              </h3>
              <p className="text-gray-500 mb-6">
                Intenta ajustar los filtros de búsqueda o agrega un nuevo marcador
              </p>
              <Button onClick={() => setShowAddModal(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Agregar Marcador
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBookmarks.map((bookmark) => (
              <Card key={bookmark.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      {getInstitutionIcon(bookmark.institution)}
                      <div className="flex-1">
                        <CardTitle className="text-lg">{bookmark.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {bookmark.description}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => handleToggleFavorite(bookmark.id)}
                        className="p-1 hover:bg-gray-100 rounded"
                        title={favorites.includes(bookmark.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                      >
                        <Star className={`h-4 w-4 ${
                          favorites.includes(bookmark.id) 
                            ? 'text-yellow-500 fill-current' 
                            : 'text-gray-400 hover:text-yellow-500'
                        }`} />
                      </button>
                      {showAdminPanel && (
                        <button
                          onClick={() => handleDeleteBookmark(bookmark.id)}
                          className="p-1 hover:bg-red-100 rounded text-red-500"
                          title="Eliminar marcador"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{bookmark.category}</Badge>
                      {getStatusBadge(bookmark.status, bookmark.isVerified)}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span className="flex items-center">
                        <LinkIcon className="h-4 w-4 mr-1" />
                        {bookmark.institution}
                      </span>
                      <span className="flex items-center">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        {bookmark.clicks} clics
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {bookmark.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {bookmark.tags.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{bookmark.tags.length - 3}
                        </Badge>
                      )}
                    </div>

                    {bookmark.isVerified && bookmark.verificationDate && (
                      <div className="text-xs text-gray-500 bg-green-50 p-2 rounded">
                        <CheckCircle className="h-3 w-3 inline mr-1" />
                        Verificado el {new Date(bookmark.verificationDate).toLocaleDateString()} por {bookmark.verifiedBy}
                      </div>
                    )}
                    
                    <div className="flex gap-2 pt-2">
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleLinkClick(bookmark)}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Visitar
                      </Button>
                      {showAdminPanel && !bookmark.isVerified && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleVerifyLink(bookmark.id)}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Add Bookmark Modal */}
        <AddBookmarkModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddBookmark}
        />
      </div>
    </AppLayout>
  )
}
