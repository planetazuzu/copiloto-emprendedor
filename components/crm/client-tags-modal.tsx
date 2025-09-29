'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Tag,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  X,
  Save,
  Palette,
  Star,
  Target,
  Users,
  Building2,
  DollarSign,
  Calendar,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'
import { useToast } from '@/lib/hooks/use-toast'

interface Tag {
  id: string
  name: string
  color: string
  description?: string
  category: 'client_type' | 'industry' | 'priority' | 'source' | 'status' | 'custom'
  usageCount: number
  createdAt: string
  updatedAt: string
}

import { Client } from '@/types'

interface ClientTagsModalProps {
  isOpen: boolean
  onClose: () => void
  client: Client | null
  onUpdateClient: (clientId: string, updatedClient: Partial<Client>) => void
}

const TAG_COLORS = [
  { name: 'Azul', value: 'bg-blue-100 text-blue-800 border-blue-200' },
  { name: 'Verde', value: 'bg-green-100 text-green-800 border-green-200' },
  { name: 'Rojo', value: 'bg-red-100 text-red-800 border-red-200' },
  { name: 'Amarillo', value: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  { name: 'Púrpura', value: 'bg-purple-100 text-purple-800 border-purple-200' },
  { name: 'Rosa', value: 'bg-pink-100 text-pink-800 border-pink-200' },
  { name: 'Naranja', value: 'bg-orange-100 text-orange-800 border-orange-200' },
  { name: 'Gris', value: 'bg-gray-100 text-gray-800 border-gray-200' },
  { name: 'Índigo', value: 'bg-indigo-100 text-indigo-800 border-indigo-200' },
  { name: 'Cian', value: 'bg-cyan-100 text-cyan-800 border-cyan-200' }
]

const TAG_CATEGORIES = [
  { id: 'client_type', name: 'Tipo de Cliente', icon: Users },
  { id: 'industry', name: 'Industria', icon: Building2 },
  { id: 'priority', name: 'Prioridad', icon: Star },
  { id: 'source', name: 'Fuente', icon: Target },
  { id: 'status', name: 'Estado', icon: CheckCircle2 },
  { id: 'custom', name: 'Personalizada', icon: Tag }
]

export function ClientTagsModal({ isOpen, onClose, client, onUpdateClient }: ClientTagsModalProps) {
  const [allTags, setAllTags] = useState<Tag[]>([])
  const [clientTags, setClientTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState({
    name: '',
    color: TAG_COLORS[0].value,
    description: '',
    category: 'custom' as Tag['category']
  })
  const [editingTag, setEditingTag] = useState<Tag | null>(null)
  const [isAddingTag, setIsAddingTag] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState<string>('')
  const [filterColor, setFilterColor] = useState<string>('')
  const toast = useToast()

  // Cargar etiquetas disponibles
  useEffect(() => {
    if (client) {
      // Simular carga de etiquetas desde la base de datos
      const mockTags: Tag[] = [
        {
          id: 'tag-1',
          name: 'VIP',
          color: 'bg-red-100 text-red-800 border-red-200',
          description: 'Cliente de alto valor',
          category: 'priority',
          usageCount: 5,
          createdAt: '2024-01-15T10:00:00Z',
          updatedAt: '2024-01-15T10:00:00Z'
        },
        {
          id: 'tag-2',
          name: 'Tecnología',
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          description: 'Empresa del sector tecnológico',
          category: 'industry',
          usageCount: 12,
          createdAt: '2024-01-15T10:00:00Z',
          updatedAt: '2024-01-15T10:00:00Z'
        },
        {
          id: 'tag-3',
          name: 'Web',
          color: 'bg-green-100 text-green-800 border-green-200',
          description: 'Cliente adquirido a través del sitio web',
          category: 'source',
          usageCount: 18,
          createdAt: '2024-01-15T10:00:00Z',
          updatedAt: '2024-01-15T10:00:00Z'
        },
        {
          id: 'tag-4',
          name: 'Referido',
          color: 'bg-purple-100 text-purple-800 border-purple-200',
          description: 'Cliente referido por otro cliente',
          category: 'source',
          usageCount: 8,
          createdAt: '2024-01-15T10:00:00Z',
          updatedAt: '2024-01-15T10:00:00Z'
        },
        {
          id: 'tag-5',
          name: 'Startup',
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          description: 'Empresa en fase de startup',
          category: 'client_type',
          usageCount: 15,
          createdAt: '2024-01-15T10:00:00Z',
          updatedAt: '2024-01-15T10:00:00Z'
        },
        {
          id: 'tag-6',
          name: 'PYME',
          color: 'bg-orange-100 text-orange-800 border-orange-200',
          description: 'Pequeña y mediana empresa',
          category: 'client_type',
          usageCount: 22,
          createdAt: '2024-01-15T10:00:00Z',
          updatedAt: '2024-01-15T10:00:00Z'
        },
        {
          id: 'tag-7',
          name: 'Manufactura',
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          description: 'Sector de manufactura',
          category: 'industry',
          usageCount: 7,
          createdAt: '2024-01-15T10:00:00Z',
          updatedAt: '2024-01-15T10:00:00Z'
        },
        {
          id: 'tag-8',
          name: 'Urgente',
          color: 'bg-red-100 text-red-800 border-red-200',
          description: 'Requiere atención urgente',
          category: 'priority',
          usageCount: 3,
          createdAt: '2024-01-15T10:00:00Z',
          updatedAt: '2024-01-15T10:00:00Z'
        },
        {
          id: 'tag-9',
          name: 'Evento',
          color: 'bg-pink-100 text-pink-800 border-pink-200',
          description: 'Cliente conocido en evento',
          category: 'source',
          usageCount: 6,
          createdAt: '2024-01-15T10:00:00Z',
          updatedAt: '2024-01-15T10:00:00Z'
        },
        {
          id: 'tag-10',
          name: 'Servicios',
          color: 'bg-cyan-100 text-cyan-800 border-cyan-200',
          description: 'Sector de servicios',
          category: 'industry',
          usageCount: 9,
          createdAt: '2024-01-15T10:00:00Z',
          updatedAt: '2024-01-15T10:00:00Z'
        }
      ]
      setAllTags(mockTags)
      setClientTags(client.tags || [])
    }
  }, [client])

  const handleToggleTag = (tagId: string) => {
    setClientTags(prev => {
      const newTags = prev.includes(tagId) 
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
      
      // Actualizar el cliente
      if (client) {
        onUpdateClient(client.id, { tags: newTags })
      }
      
      return newTags
    })
  }

  const handleAddTag = async () => {
    if (!newTag.name.trim()) return

    const tag: Tag = {
      id: `tag-${Date.now()}`,
      name: newTag.name,
      color: newTag.color,
      description: newTag.description,
      category: newTag.category,
      usageCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    setAllTags(prev => [tag, ...prev])
    setNewTag({
      name: '',
      color: TAG_COLORS[0].value,
      description: '',
      category: 'custom'
    })
    setIsAddingTag(false)

    toast.success({
      title: 'Etiqueta creada',
      description: 'La etiqueta se ha creado correctamente'
    })
  }

  const handleEditTag = async (tagId: string, updatedTag: Partial<Tag>) => {
    setAllTags(prev => prev.map(tag => 
      tag.id === tagId 
        ? { ...tag, ...updatedTag, updatedAt: new Date().toISOString() }
        : tag
    ))

    setEditingTag(null)
    toast.success({
      title: 'Etiqueta actualizada',
      description: 'La etiqueta se ha actualizado correctamente'
    })
  }

  const handleDeleteTag = async (tagId: string) => {
    // Verificar si la etiqueta está en uso
    const tag = allTags.find(t => t.id === tagId)
    if (tag && tag.usageCount > 0) {
      toast.error({
        title: 'No se puede eliminar',
        description: 'Esta etiqueta está siendo utilizada por otros clientes'
      })
      return
    }

    setAllTags(prev => prev.filter(tag => tag.id !== tagId))
    setClientTags(prev => prev.filter(id => id !== tagId))
    
    // Actualizar el cliente
    if (client) {
      onUpdateClient(client.id, { tags: clientTags.filter(id => id !== tagId) })
    }

    toast.success({
      title: 'Etiqueta eliminada',
      description: 'La etiqueta se ha eliminado correctamente'
    })
  }

  const getCategoryIcon = (category: Tag['category']) => {
    const categoryInfo = TAG_CATEGORIES.find(c => c.id === category)
    return categoryInfo ? categoryInfo.icon : Tag
  }

  const getCategoryName = (category: Tag['category']) => {
    const categoryInfo = TAG_CATEGORIES.find(c => c.id === category)
    return categoryInfo ? categoryInfo.name : 'Desconocida'
  }

  const filteredTags = allTags.filter(tag => {
    const matchesSearch = tag.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tag.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === '' || tag.category === filterCategory
    const matchesColor = filterColor === '' || tag.color === filterColor
    return matchesSearch && matchesCategory && matchesColor
  })

  const clientTagObjects = allTags.filter(tag => clientTags.includes(tag.id))

  if (!client) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Tag className="h-6 w-6 text-blue-600 mr-2" />
            Etiquetas - {client.name}
          </DialogTitle>
          <DialogDescription>
            Gestiona las etiquetas para categorizar y organizar a {client.company || client.name}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col h-[700px]">
          {/* Información del cliente */}
          <Card className="mb-4">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{client.name}</h3>
                    {client.company && (
                      <p className="text-sm text-gray-600">{client.company}</p>
                    )}
                    <p className="text-sm text-gray-500">{client.email}</p>
                  </div>
                </div>
                <div className="flex space-x-4 text-center">
                  <div>
                    <p className="text-xl font-bold text-blue-600">{clientTagObjects.length}</p>
                    <p className="text-xs text-gray-500">Etiquetas</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-green-600">{allTags.length}</p>
                    <p className="text-xs text-gray-500">Disponibles</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Etiquetas actuales del cliente */}
          {clientTagObjects.length > 0 && (
            <Card className="mb-4">
              <CardHeader>
                <CardTitle className="text-lg">Etiquetas Asignadas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {clientTagObjects.map(tag => (
                    <Badge
                      key={tag.id}
                      variant="outline"
                      className={`${tag.color} cursor-pointer hover:opacity-80`}
                      onClick={() => handleToggleTag(tag.id)}
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag.name}
                      <X className="h-3 w-3 ml-1" />
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Filtros */}
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div>
              <Label htmlFor="search">Buscar</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Buscar etiquetas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="filter-category">Categoría</Label>
              <select
                id="filter-category"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todas las categorías</option>
                {TAG_CATEGORIES.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="filter-color">Color</Label>
              <select
                id="filter-color"
                value={filterColor}
                onChange={(e) => setFilterColor(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todos los colores</option>
                {TAG_COLORS.map(color => (
                  <option key={color.value} value={color.value}>
                    {color.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <Button onClick={() => setIsAddingTag(true)} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Nueva Etiqueta
              </Button>
            </div>
          </div>

          {/* Lista de etiquetas disponibles */}
          <div className="flex-1 overflow-y-auto space-y-3">
            {filteredTags.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <Tag className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No hay etiquetas disponibles</p>
              </div>
            ) : (
              filteredTags.map((tag) => {
                const IconComponent = getCategoryIcon(tag.category)
                const isAssigned = clientTags.includes(tag.id)
                
                return (
                  <Card key={tag.id} className={`hover:shadow-md transition-shadow ${isAssigned ? 'ring-2 ring-blue-500' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          checked={isAssigned}
                          onCheckedChange={() => handleToggleTag(tag.id)}
                        />
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <Badge variant="outline" className={tag.color}>
                                  <Tag className="h-3 w-3 mr-1" />
                                  {tag.name}
                                </Badge>
                                <div className="flex items-center text-xs text-gray-500">
                                  <IconComponent className="h-3 w-3 mr-1" />
                                  {getCategoryName(tag.category)}
                                </div>
                              </div>
                              {tag.description && (
                                <p className="text-sm text-gray-600">{tag.description}</p>
                              )}
                            </div>
                            
                            <div className="flex items-center space-x-2 ml-4">
                              <span className="text-xs text-gray-500">
                                {tag.usageCount} uso{tag.usageCount !== 1 ? 's' : ''}
                              </span>
                              <div className="flex space-x-1">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setEditingTag(tag)}
                                  className="h-6 w-6 p-0"
                                  title="Editar etiqueta"
                                >
                                  <Edit className="h-3 w-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleDeleteTag(tag.id)}
                                  className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
                                  title="Eliminar etiqueta"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })
            )}
          </div>

          {/* Formulario para nueva etiqueta */}
          {isAddingTag && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg">Nueva Etiqueta</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="tag-name">Nombre *</Label>
                    <Input
                      id="tag-name"
                      value={newTag.name}
                      onChange={(e) => setNewTag(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Nombre de la etiqueta"
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="tag-category">Categoría</Label>
                    <select
                      id="tag-category"
                      value={newTag.category}
                      onChange={(e) => setNewTag(prev => ({ ...prev, category: e.target.value as Tag['category'] }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {TAG_CATEGORIES.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="tag-description">Descripción</Label>
                  <Input
                    id="tag-description"
                    value={newTag.description}
                    onChange={(e) => setNewTag(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Descripción de la etiqueta"
                    className="w-full"
                  />
                </div>
                
                <div>
                  <Label>Color</Label>
                  <div className="grid grid-cols-5 gap-2 mt-2">
                    {TAG_COLORS.map(color => (
                      <button
                        key={color.value}
                        onClick={() => setNewTag(prev => ({ ...prev, color: color.value }))}
                        className={`p-2 rounded border-2 ${
                          newTag.color === color.value ? 'border-blue-500' : 'border-gray-200'
                        } ${color.value}`}
                        title={color.name}
                      >
                        <Tag className="h-4 w-4" />
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsAddingTag(false)
                      setNewTag({
                        name: '',
                        color: TAG_COLORS[0].value,
                        description: '',
                        category: 'custom'
                      })
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleAddTag}
                    disabled={!newTag.name.trim()}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Crear Etiqueta
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
