'use client'

import { useState, useRef } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  X, 
  Shield,
  Eye,
  Download,
  FileText as FilePdf,
  FileSpreadsheet,
  FileImage
} from 'lucide-react'
import { useToast } from '@/lib/hooks/use-toast'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

interface UploadModalProps {
  isOpen: boolean
  onClose: () => void
  onUpload: (document: any) => void
}

interface DocumentFile {
  file: File
  preview: string
  type: string
  size: string
}

interface SignatureVerification {
  isValid: boolean
  issuer: string
  date: string
  algorithm: string
  status: 'verified' | 'invalid' | 'pending' | 'not_signed'
}

export function UploadModal({ isOpen, onClose, onUpload }: UploadModalProps) {
  const [step, setStep] = useState(1) // 1: Upload, 2: Details, 3: Verification, 4: Review
  const [selectedFile, setSelectedFile] = useState<DocumentFile | null>(null)
  const [documentDetails, setDocumentDetails] = useState({
    title: '',
    description: '',
    category: '',
    tags: '',
    isOfficial: false,
    source: '',
    institution: ''
  })
  const [signatureVerification, setSignatureVerification] = useState<SignatureVerification | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const toast = useToast()

  const categories = [
    'Planificación',
    'Finanzas',
    'Marketing',
    'Legal',
    'Experiencias',
    'Tecnología',
    'Recursos Humanos',
    'Formación'
  ]

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validar tipo de archivo
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'image/jpeg',
      'image/png'
    ]

    if (!allowedTypes.includes(file.type)) {
      toast.error({
        title: 'Tipo de archivo no válido',
        description: 'Solo se permiten PDF, Word, Excel e imágenes'
      })
      return
    }

    // Validar tamaño (máximo 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error({
        title: 'Archivo demasiado grande',
        description: 'El archivo no puede superar los 10MB'
      })
      return
    }

    const fileType = getFileType(file.type)
    const preview = URL.createObjectURL(file)
    
    setSelectedFile({
      file,
      preview,
      type: fileType,
      size: formatFileSize(file.size)
    })

    // Si es un documento oficial, verificar firma automáticamente
    if (documentDetails.isOfficial) {
      verifySignature(file)
    }
  }

  const getFileType = (mimeType: string) => {
    if (mimeType === 'application/pdf') return 'PDF'
    if (mimeType.includes('word')) return 'Word'
    if (mimeType.includes('sheet')) return 'Excel'
    if (mimeType.includes('image')) return 'Imagen'
    return 'Documento'
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'PDF': return <FilePdf className="h-8 w-8 text-red-600" />
      case 'Word': return <FileText className="h-8 w-8 text-blue-600" />
      case 'Excel': return <FileSpreadsheet className="h-8 w-8 text-green-600" />
      case 'Imagen': return <FileImage className="h-8 w-8 text-purple-600" />
      default: return <FileText className="h-8 w-8 text-gray-600" />
    }
  }

  const verifySignature = async (file: File) => {
    setIsVerifying(true)
    
    // Simular verificación de firma digital (en un proyecto real usarías una librería como pdf-lib)
    setTimeout(() => {
      const isSigned = Math.random() > 0.3 // 70% de probabilidad de estar firmado
      
      if (isSigned) {
        setSignatureVerification({
          isValid: true,
          issuer: 'Ministerio de Industria, Comercio y Turismo',
          date: new Date().toISOString(),
          algorithm: 'RSA-SHA256',
          status: 'verified'
        })
        toast.success({
          title: 'Firma verificada',
          description: 'El documento tiene una firma digital válida'
        })
      } else {
        setSignatureVerification({
          isValid: false,
          issuer: '',
          date: '',
          algorithm: '',
          status: 'not_signed'
        })
        toast.warning({
          title: 'Sin firma digital',
          description: 'Este documento no tiene firma digital'
        })
      }
      
      setIsVerifying(false)
    }, 2000)
  }

  const handleUpload = async () => {
    if (!selectedFile || !documentDetails.title || !documentDetails.category) {
      toast.error({
        title: 'Campos requeridos',
        description: 'Por favor completa todos los campos obligatorios'
      })
      return
    }

    setIsUploading(true)

    // Simular subida del archivo
    setTimeout(() => {
      const newDocument = {
        id: `doc-${Date.now()}`,
        title: documentDetails.title,
        description: documentDetails.description,
        type: documentDetails.isOfficial ? 'official' : 'resource',
        category: documentDetails.category,
        fileUrl: selectedFile.preview,
        fileSize: selectedFile.size,
        fileType: selectedFile.type,
        isPublic: true,
        isTemplate: false,
        authorName: 'Usuario Actual',
        downloads: 0,
        tags: documentDetails.tags.split(',').map(tag => tag.trim()),
        createdAt: new Date().toISOString(),
        isAdmin: false,
        signatureVerification,
        source: documentDetails.source,
        institution: documentDetails.institution
      }

      onUpload(newDocument)
      toast.success({
        title: 'Documento subido',
        description: 'El documento se ha subido correctamente'
      })
      handleClose()
    }, 2000)
  }

  const handleClose = () => {
    setStep(1)
    setSelectedFile(null)
    setDocumentDetails({
      title: '',
      description: '',
      category: '',
      tags: '',
      isOfficial: false,
      source: '',
      institution: ''
    })
    setSignatureVerification(null)
    setIsVerifying(false)
    setIsUploading(false)
    onClose()
  }

  const canProceed = () => {
    switch (step) {
      case 1: return selectedFile !== null
      case 2: return documentDetails.title && documentDetails.category
      case 3: return !documentDetails.isOfficial || signatureVerification
      case 4: return true
      default: return false
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Upload className="h-6 w-6 mr-2" />
            Subir Documento
          </DialogTitle>
          <DialogDescription>
            Sube un documento a la biblioteca de recursos
          </DialogDescription>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-6">
          {[1, 2, 3, 4].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= stepNumber 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {stepNumber}
              </div>
              {stepNumber < 4 && (
                <div className={`w-12 h-1 mx-2 ${
                  step > stepNumber ? 'bg-blue-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: File Upload */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-900 mb-2">
                Selecciona un archivo
              </p>
              <p className="text-sm text-gray-500 mb-4">
                PDF, Word, Excel o imágenes (máximo 10MB)
              </p>
              <Button onClick={() => fileInputRef.current?.click()}>
                Seleccionar archivo
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            {selectedFile && (
              <div className="border rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  {getFileIcon(selectedFile.type)}
                  <div className="flex-1">
                    <p className="font-medium">{selectedFile.file.name}</p>
                    <p className="text-sm text-gray-500">{selectedFile.size}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(selectedFile.preview, '_blank')}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Document Details */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Título *</Label>
              <Input
                id="title"
                value={documentDetails.title}
                onChange={(e) => setDocumentDetails(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Título del documento"
              />
            </div>

            <div>
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={documentDetails.description}
                onChange={(e) => setDocumentDetails(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Descripción del documento"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Categoría *</Label>
                <select
                  id="category"
                  value={documentDetails.category}
                  onChange={(e) => setDocumentDetails(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seleccionar categoría</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="tags">Etiquetas</Label>
                <Input
                  id="tags"
                  value={documentDetails.tags}
                  onChange={(e) => setDocumentDetails(prev => ({ ...prev, tags: e.target.value }))}
                  placeholder="etiqueta1, etiqueta2, etiqueta3"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isOfficial"
                checked={documentDetails.isOfficial}
                onChange={(e) => setDocumentDetails(prev => ({ ...prev, isOfficial: e.target.checked }))}
                className="rounded"
              />
              <Label htmlFor="isOfficial" className="flex items-center">
                <Shield className="h-4 w-4 mr-1" />
                Documento oficial (requiere verificación de firma)
              </Label>
            </div>

            {documentDetails.isOfficial && (
              <div className="space-y-3 p-4 bg-blue-50 rounded-lg">
                <div>
                  <Label htmlFor="source">Fuente del documento *</Label>
                  <Input
                    id="source"
                    value={documentDetails.source}
                    onChange={(e) => setDocumentDetails(prev => ({ ...prev, source: e.target.value }))}
                    placeholder="URL o referencia de la fuente oficial"
                  />
                </div>
                <div>
                  <Label htmlFor="institution">Institución *</Label>
                  <Input
                    id="institution"
                    value={documentDetails.institution}
                    onChange={(e) => setDocumentDetails(prev => ({ ...prev, institution: e.target.value }))}
                    placeholder="Ministerio, Ayuntamiento, etc."
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Signature Verification */}
        {step === 3 && documentDetails.isOfficial && (
          <div className="space-y-4">
            <div className="text-center">
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold">Verificación de Firma Digital</h3>
              <p className="text-gray-600">
                Verificando la autenticidad del documento oficial...
              </p>
            </div>

            {isVerifying ? (
              <LoadingSpinner text="Verificando firma digital..." />
            ) : signatureVerification ? (
              <div className={`p-4 rounded-lg ${
                signatureVerification.status === 'verified' 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-yellow-50 border border-yellow-200'
              }`}>
                <div className="flex items-center space-x-2 mb-2">
                  {signatureVerification.status === 'verified' ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  )}
                  <span className="font-medium">
                    {signatureVerification.status === 'verified' ? 'Firma Verificada' : 'Sin Firma Digital'}
                  </span>
                </div>
                
                {signatureVerification.status === 'verified' && (
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><strong>Emisor:</strong> {signatureVerification.issuer}</p>
                    <p><strong>Fecha:</strong> {new Date(signatureVerification.date).toLocaleDateString()}</p>
                    <p><strong>Algoritmo:</strong> {signatureVerification.algorithm}</p>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        )}

        {/* Step 4: Review */}
        {step === 4 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Revisar Documento</h3>
            
            <div className="border rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                {selectedFile && getFileIcon(selectedFile.type)}
                <div>
                  <p className="font-medium">{documentDetails.title}</p>
                  <p className="text-sm text-gray-500">{selectedFile?.file.name}</p>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <p><strong>Categoría:</strong> {documentDetails.category}</p>
                <p><strong>Descripción:</strong> {documentDetails.description || 'Sin descripción'}</p>
                {documentDetails.tags && (
                  <div className="flex flex-wrap gap-1">
                    <strong>Etiquetas:</strong>
                    {documentDetails.tags.split(',').map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag.trim()}
                      </Badge>
                    ))}
                  </div>
                )}
                {documentDetails.isOfficial && (
                  <div className="mt-3 p-3 bg-blue-50 rounded">
                    <p><strong>Tipo:</strong> Documento Oficial</p>
                    <p><strong>Fuente:</strong> {documentDetails.source}</p>
                    <p><strong>Institución:</strong> {documentDetails.institution}</p>
                    {signatureVerification && (
                      <p className={`font-medium ${
                        signatureVerification.status === 'verified' ? 'text-green-600' : 'text-yellow-600'
                      }`}>
                        <strong>Firma:</strong> {signatureVerification.status === 'verified' ? 'Verificada' : 'No verificada'}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={() => step > 1 ? setStep(step - 1) : handleClose()}
            disabled={isUploading}
          >
            {step === 1 ? 'Cancelar' : 'Anterior'}
          </Button>
          
          <Button
            onClick={() => step < 4 ? setStep(step + 1) : handleUpload()}
            disabled={!canProceed() || isUploading}
          >
            {isUploading ? (
              <>
                <LoadingSpinner size="sm" />
                Subiendo...
              </>
            ) : step === 4 ? (
              'Subir Documento'
            ) : (
              'Siguiente'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
