'use client'

import { useState, useEffect } from 'react'
import { AppLayout } from '@/components/layout/app-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  Upload, 
  Plus, 
  Eye, 
  Edit, 
  Trash2,
  BookOpen,
  FileSpreadsheet,
  FileImage,
  FileText as FilePdf,
  Users,
  Shield
} from 'lucide-react'
import { useAppStore } from '@/lib/store'
import { useToast } from '@/lib/hooks/use-toast'
import { UploadModal } from '@/components/documents/upload-modal'
import Link from 'next/link'

interface Document {
  id: string
  title: string
  description: string
  type: 'template' | 'resource' | 'guide' | 'form'
  category: string
  fileUrl?: string
  fileSize?: string
  fileType?: string
  isPublic: boolean
  isTemplate: boolean
  createdBy?: string
  authorName?: string
  downloads: number
  tags: string[]
  createdAt: string
  isAdmin?: boolean
}

export default function LibraryPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [showAdminPanel, setShowAdminPanel] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [documents, setDocuments] = useState<Document[]>([])
  const { user, favorites, toggleFavorite, loadFavorites } = useAppStore()
  const toast = useToast()

  // Cargar favoritos al montar el componente
  useEffect(() => {
    loadFavorites()
    // Cargar documentos iniciales
    setDocuments([
    {
      id: 'doc-1',
      title: 'Plantilla de Plan de Negocio',
      description: 'Plantilla completa para crear un plan de negocio profesional',
      type: 'template',
      category: 'Planificación',
      fileUrl: '#',
      fileSize: '2.3 MB',
      fileType: 'PDF',
      isPublic: true,
      isTemplate: true,
      authorName: 'Admin',
      downloads: 245,
      tags: ['plan-negocio', 'plantilla', 'emprendimiento'],
      createdAt: '2024-01-15',
      isAdmin: true
    },
    {
      id: 'doc-2',
      title: 'Guía de Financiación para Startups',
      description: 'Guía completa sobre opciones de financiación para startups',
      type: 'guide',
      category: 'Finanzas',
      fileUrl: '#',
      fileSize: '1.8 MB',
      fileType: 'PDF',
      isPublic: true,
      isTemplate: false,
      authorName: 'Admin',
      downloads: 189,
      tags: ['financiación', 'startup', 'guía'],
      createdAt: '2024-01-10',
      isAdmin: true
    },
    {
      id: 'doc-3',
      title: 'Formulario de Análisis de Mercado',
      description: 'Plantilla para realizar análisis de mercado detallado',
      type: 'form',
      category: 'Marketing',
      fileUrl: '#',
      fileSize: '850 KB',
      fileType: 'Excel',
      isPublic: true,
      isTemplate: true,
      authorName: 'Admin',
      downloads: 156,
      tags: ['análisis', 'mercado', 'formulario'],
      createdAt: '2024-01-08',
      isAdmin: true
    },
    {
      id: 'doc-4',
      title: 'Mi Experiencia con Subvenciones',
      description: 'Documento compartido por usuario sobre su experiencia',
      type: 'resource',
      category: 'Experiencias',
      fileUrl: '#',
      fileSize: '1.2 MB',
      fileType: 'PDF',
      isPublic: true,
      isTemplate: false,
      createdBy: 'user-1',
      authorName: 'Elena Vargas',
      downloads: 78,
      tags: ['subvenciones', 'experiencia', 'usuario'],
      createdAt: '2024-01-20',
      isAdmin: false
    },
    {
      id: 'doc-5',
      title: 'Checklist de Legalización',
      description: 'Lista de verificación para legalizar una empresa',
      type: 'template',
      category: 'Legal',
      fileUrl: '#',
      fileSize: '650 KB',
      fileType: 'PDF',
      isPublic: true,
      isTemplate: true,
      authorName: 'Admin',
      downloads: 203,
      tags: ['legal', 'checklist', 'empresa'],
      createdAt: '2024-01-12',
      isAdmin: true
    }
    ])
  }, [loadFavorites])

  const categories = [
    'Todas',
    'Planificación',
    'Finanzas',
    'Marketing',
    'Legal',
    'Experiencias',
    'Tecnología',
    'Recursos Humanos'
  ]

  const types = [
    'Todos',
    'Plantillas',
    'Guías',
    'Formularios',
    'Recursos'
  ]

  // Filtrar documentos
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === '' || selectedCategory === 'Todas' || 
                           doc.category === selectedCategory
    const matchesType = selectedType === '' || selectedType === 'Todos' || 
                       (selectedType === 'Plantillas' && doc.isTemplate) ||
                       (selectedType === 'Guías' && doc.type === 'guide') ||
                       (selectedType === 'Formularios' && doc.type === 'form') ||
                       (selectedType === 'Recursos' && doc.type === 'resource')
    return matchesSearch && matchesCategory && matchesType
  })

  // Función para obtener el icono según el tipo de archivo
  const getFileIcon = (fileType?: string, docType?: string) => {
    if (docType === 'template') return <FileText className="h-5 w-5 text-blue-600" />
    if (fileType === 'PDF') return <FilePdf className="h-5 w-5 text-red-600" />
    if (fileType === 'Excel') return <FileSpreadsheet className="h-5 w-5 text-green-600" />
    if (fileType === 'Word') return <FileText className="h-5 w-5 text-blue-600" />
    if (fileType?.includes('image')) return <FileImage className="h-5 w-5 text-purple-600" />
    return <FileText className="h-5 w-5 text-gray-600" />
  }

  // Función para manejar descarga
  const handleDownload = (document: Document) => {
    toast.success({
      title: 'Descarga iniciada',
      description: `Descargando ${document.title}`
    })
    // En un proyecto real, aquí se manejaría la descarga real
  }

  // Función para manejar favoritos
  const handleToggleFavorite = (docId: string) => {
    toggleFavorite(docId)
  }

  // Función para eliminar documento (solo admin)
  const handleDeleteDocument = (docId: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== docId))
    toast.warning({
      title: 'Documento eliminado',
      description: 'El documento ha sido eliminado de la biblioteca'
    })
  }

  // Función para manejar la subida de documentos
  const handleDocumentUpload = (newDocument: Document) => {
    setDocuments(prev => [newDocument, ...prev])
    toast.success({
      title: 'Documento subido',
      description: 'El documento se ha agregado a la biblioteca'
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
                <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
                Biblioteca de Recursos
              </h1>
              <p className="mt-2 text-gray-600">
                Plantillas, guías y recursos para emprendedores
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
                onClick={() => setShowUploadModal(true)}
              >
                <Upload className="h-4 w-4 mr-2" />
                Subir Documento
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
                    placeholder="Buscar en la biblioteca..."
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
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {types.map(type => (
                    <option key={type} value={type === 'Todos' ? '' : type}>
                      {type}
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
                Gestiona la biblioteca de recursos y documentos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white rounded-lg">
                  <FileText className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="font-semibold">Total Documentos</p>
                  <p className="text-2xl font-bold text-blue-600">{documents.length}</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="font-semibold">Documentos Usuario</p>
                  <p className="text-2xl font-bold text-green-600">
                    {documents.filter(doc => !doc.isAdmin).length}
                  </p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <Download className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <p className="font-semibold">Total Descargas</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {documents.reduce((sum, doc) => sum + doc.downloads, 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Lista de documentos */}
        {filteredDocuments.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No se encontraron documentos
              </h3>
              <p className="text-gray-500 mb-6">
                Intenta ajustar los filtros de búsqueda o sube un nuevo documento
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Subir Documento
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocuments.map((document) => (
              <Card key={document.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      {getFileIcon(document.fileType, document.type)}
                      <div className="flex-1">
                        <CardTitle className="text-lg">{document.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {document.description}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => handleToggleFavorite(document.id)}
                        className="p-1 hover:bg-gray-100 rounded"
                        title={favorites.includes(document.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                      >
                        <BookOpen className={`h-4 w-4 ${
                          favorites.includes(document.id) 
                            ? 'text-red-500 fill-current' 
                            : 'text-gray-400 hover:text-red-500'
                        }`} />
                      </button>
                      {showAdminPanel && (
                        <button
                          onClick={() => handleDeleteDocument(document.id)}
                          className="p-1 hover:bg-red-100 rounded text-red-500"
                          title="Eliminar documento"
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
                      <Badge variant="outline">{document.category}</Badge>
                      <div className="flex items-center text-sm text-gray-500">
                        <Download className="h-4 w-4 mr-1" />
                        {document.downloads}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{document.fileSize}</span>
                      <span>{document.authorName}</span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {document.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {document.tags.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{document.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex gap-2 pt-2">
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleDownload(document)}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Descargar
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => toast.info({
                          title: 'Vista previa',
                          description: 'En un proyecto real se abriría la vista previa'
                        })}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Upload Modal */}
        <UploadModal
          isOpen={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          onUpload={handleDocumentUpload}
        />
      </div>
    </AppLayout>
  )
}
