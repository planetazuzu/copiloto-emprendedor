'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { 
  Plus, 
  Link as LinkIcon, 
  Building2, 
  Globe, 
  CheckCircle,
  AlertTriangle,
  Loader2
} from 'lucide-react'
import { useToast } from '@/lib/hooks/use-toast'

interface AddBookmarkModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (bookmark: any) => void
}

interface LinkValidation {
  isValid: boolean
  title?: string
  description?: string
  status: 'checking' | 'valid' | 'invalid' | 'error'
}

export function AddBookmarkModal({ isOpen, onClose, onAdd }: AddBookmarkModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    category: '',
    institution: '',
    tags: '',
    isOfficial: false
  })
  const [linkValidation, setLinkValidation] = useState<LinkValidation | null>(null)
  const [isValidating, setIsValidating] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const toast = useToast()

  const categories = [
    'Ayudas Públicas',
    'Financiación',
    'Servicios',
    'Recursos',
    'Contratación',
    'Formación',
    'Legal',
    'Tecnología'
  ]

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const handleUrlChange = async (url: string) => {
    setFormData(prev => ({ ...prev, url }))
    
    if (!url) {
      setLinkValidation(null)
      return
    }

    if (!validateUrl(url)) {
      setLinkValidation({
        isValid: false,
        status: 'invalid'
      })
      return
    }

    setIsValidating(true)
    setLinkValidation({ isValid: false, status: 'checking' })

    // Simular validación del enlace (en un proyecto real harías una petición HEAD)
    setTimeout(() => {
      const isValid = Math.random() > 0.2 // 80% de probabilidad de ser válido
      
      if (isValid) {
        setLinkValidation({
          isValid: true,
          title: `Título extraído de ${url}`,
          description: 'Descripción extraída automáticamente del sitio web',
          status: 'valid'
        })
        
        // Auto-completar título si está vacío
        if (!formData.title) {
          setFormData(prev => ({ 
            ...prev, 
            title: `Título extraído de ${url}`,
            description: prev.description || 'Descripción extraída automáticamente del sitio web'
          }))
        }
      } else {
        setLinkValidation({
          isValid: false,
          status: 'invalid'
        })
      }
      
      setIsValidating(false)
    }, 1500)
  }

  const handleSubmit = async () => {
    if (!formData.title || !formData.url || !formData.category) {
      toast.error({
        title: 'Campos requeridos',
        description: 'Por favor completa todos los campos obligatorios'
      })
      return
    }

    if (!validateUrl(formData.url)) {
      toast.error({
        title: 'URL inválida',
        description: 'Por favor ingresa una URL válida'
      })
      return
    }

    setIsSubmitting(true)

    // Simular envío
    setTimeout(() => {
      const newBookmark = {
        id: `bookmark-${Date.now()}`,
        title: formData.title,
        description: formData.description,
        url: formData.url,
        category: formData.category,
        institution: formData.institution || 'Usuario',
        isOfficial: formData.isOfficial,
        isVerified: false,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        clicks: 0,
        createdBy: 'user-current',
        authorName: 'Usuario Actual',
        createdAt: new Date().toISOString(),
        status: 'pending' as const,
        isAdmin: false
      }

      onAdd(newBookmark)
      toast.success({
        title: 'Marcador agregado',
        description: 'El marcador se ha agregado correctamente'
      })
      handleClose()
    }, 1000)
  }

  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
      url: '',
      category: '',
      institution: '',
      tags: '',
      isOfficial: false
    })
    setLinkValidation(null)
    setIsValidating(false)
    setIsSubmitting(false)
    onClose()
  }

  const getValidationIcon = () => {
    if (isValidating) {
      return <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
    }
    
    if (!linkValidation) return null
    
    switch (linkValidation.status) {
      case 'valid':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'invalid':
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return null
    }
  }

  const getValidationMessage = () => {
    if (isValidating) return 'Validando enlace...'
    if (!linkValidation) return null
    
    switch (linkValidation.status) {
      case 'valid':
        return 'Enlace válido y accesible'
      case 'invalid':
        return 'Enlace no válido o no accesible'
      default:
        return null
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Plus className="h-6 w-6 mr-2" />
            Agregar Marcador
          </DialogTitle>
          <DialogDescription>
            Añade un nuevo enlace a la colección de marcadores
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* URL */}
          <div>
            <Label htmlFor="url">URL del enlace *</Label>
            <div className="relative">
              <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                id="url"
                type="url"
                value={formData.url}
                onChange={(e) => handleUrlChange(e.target.value)}
                placeholder="https://ejemplo.com"
                className="pl-10 pr-10"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {getValidationIcon()}
              </div>
            </div>
            {getValidationMessage() && (
              <p className={`text-sm mt-1 ${
                linkValidation?.status === 'valid' ? 'text-green-600' : 'text-red-600'
              }`}>
                {getValidationMessage()}
              </p>
            )}
          </div>

          {/* Título */}
          <div>
            <Label htmlFor="title">Título *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Título descriptivo del enlace"
            />
          </div>

          {/* Descripción */}
          <div>
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Descripción del contenido del enlace"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Categoría */}
            <div>
              <Label htmlFor="category">Categoría *</Label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Seleccionar categoría</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Institución */}
            <div>
              <Label htmlFor="institution">Institución/Organización</Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="institution"
                  value={formData.institution}
                  onChange={(e) => setFormData(prev => ({ ...prev, institution: e.target.value }))}
                  placeholder="Ej: Ministerio, Ayuntamiento..."
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* Etiquetas */}
          <div>
            <Label htmlFor="tags">Etiquetas</Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
              placeholder="etiqueta1, etiqueta2, etiqueta3"
            />
            <p className="text-xs text-gray-500 mt-1">
              Separa las etiquetas con comas
            </p>
          </div>

          {/* Documento oficial */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isOfficial"
              checked={formData.isOfficial}
              onChange={(e) => setFormData(prev => ({ ...prev, isOfficial: e.target.checked }))}
              className="rounded"
            />
            <Label htmlFor="isOfficial" className="flex items-center">
              <Globe className="h-4 w-4 mr-1" />
              Marcar como enlace oficial (requiere verificación)
            </Label>
          </div>

          {formData.isOfficial && (
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Nota:</strong> Los enlaces oficiales serán verificados por un administrador 
                antes de ser marcados como verificados y aparecer en la lista principal.
              </p>
            </div>
          )}
        </div>

        {/* Botones */}
        <div className="flex justify-end space-x-2 pt-4">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!formData.title || !formData.url || !formData.category || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Agregando...
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                Agregar Marcador
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
