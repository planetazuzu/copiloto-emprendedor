'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  MessageSquare,
  Phone,
  Mail,
  Calendar,
  Video,
  FileText,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Clock,
  User,
  CheckCircle2,
  AlertCircle,
  Send,
  Download,
  Paperclip,
  Eye,
  Star,
  Flag,
  ExternalLink,
  Copy,
  Share2
} from 'lucide-react'
import { useToast } from '@/lib/hooks/use-toast'

interface Communication {
  id: string
  clientId: string
  type: 'call' | 'email' | 'meeting' | 'video_call' | 'sms' | 'whatsapp' | 'linkedin' | 'other'
  direction: 'inbound' | 'outbound'
  subject?: string
  content: string
  duration?: number // en minutos para llamadas
  participants?: string[]
  attachments?: Array<{
    name: string
    size: number
    type: string
    url: string
  }>
  status: 'completed' | 'scheduled' | 'cancelled' | 'no_answer'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  outcome?: 'positive' | 'neutral' | 'negative' | 'follow_up_needed'
  createdAt: string
  updatedAt: string
  author: string
  scheduledFor?: string
  tags?: string[]
}

import { Client } from '@/types'

interface CommunicationHistoryModalProps {
  isOpen: boolean
  onClose: () => void
  client: Client | null
  onUpdateClient: (clientId: string, updatedClient: Partial<Client>) => void
}

export function CommunicationHistoryModal({ isOpen, onClose, client, onUpdateClient }: CommunicationHistoryModalProps) {
  const [communications, setCommunications] = useState<Communication[]>([])
  const [newCommunication, setNewCommunication] = useState({
    type: 'call' as Communication['type'],
    direction: 'outbound' as Communication['direction'],
    subject: '',
    content: '',
    duration: 0,
    participants: [''],
    status: 'completed' as Communication['status'],
    priority: 'medium' as Communication['priority'],
    outcome: 'neutral' as Communication['outcome'],
    scheduledFor: '',
    tags: [] as string[]
  })
  const [editingCommunication, setEditingCommunication] = useState<Communication | null>(null)
  const [isAddingCommunication, setIsAddingCommunication] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<string>('')
  const [filterStatus, setFilterStatus] = useState<string>('')
  const [filterPriority, setFilterPriority] = useState<string>('')
  const [selectedAttachment, setSelectedAttachment] = useState<File | null>(null)
  const toast = useToast()

  // Cargar comunicaciones del cliente
  useEffect(() => {
    if (client) {
      // Simular carga de comunicaciones desde la base de datos
      const mockCommunications: Communication[] = [
        {
          id: 'comm-1',
          clientId: client.id,
          type: 'call',
          direction: 'outbound',
          subject: 'Seguimiento de propuesta',
          content: 'Llamada de seguimiento para conocer la opinión sobre la propuesta enviada. El cliente mostró interés y solicitó una reunión para la próxima semana.',
          duration: 15,
          status: 'completed',
          priority: 'high',
          outcome: 'positive',
          createdAt: '2024-01-24T10:30:00Z',
          updatedAt: '2024-01-24T10:30:00Z',
          author: 'Usuario Demo',
          tags: ['seguimiento', 'propuesta']
        },
        {
          id: 'comm-2',
          clientId: client.id,
          type: 'email',
          direction: 'outbound',
          subject: 'Propuesta comercial - Servicios de digitalización',
          content: 'Estimado cliente,\n\nAdjunto encontrará nuestra propuesta detallada para los servicios de digitalización que discutimos en nuestra reunión anterior.\n\nLa propuesta incluye:\n- Análisis de procesos actuales\n- Plan de digitalización\n- Cronograma de implementación\n- Inversión requerida\n\nQuedo a la espera de sus comentarios.\n\nSaludos cordiales.',
          status: 'completed',
          priority: 'urgent',
          outcome: 'neutral',
          createdAt: '2024-01-22T14:15:00Z',
          updatedAt: '2024-01-22T14:15:00Z',
          author: 'Usuario Demo',
          attachments: [
            {
              name: 'propuesta_digitalizacion.pdf',
              size: 2048576,
              type: 'application/pdf',
              url: '/attachments/propuesta_digitalizacion.pdf'
            }
          ],
          tags: ['propuesta', 'comercial']
        },
        {
          id: 'comm-3',
          clientId: client.id,
          type: 'meeting',
          direction: 'outbound',
          subject: 'Reunión inicial - Presentación de servicios',
          content: 'Reunión presencial en las oficinas del cliente para presentar nuestros servicios de digitalización. El cliente mostró mucho interés y solicitó una propuesta detallada.',
          duration: 60,
          participants: ['Usuario Demo', 'Cliente', 'Director Técnico'],
          status: 'completed',
          priority: 'high',
          outcome: 'positive',
          createdAt: '2024-01-20T16:00:00Z',
          updatedAt: '2024-01-20T16:00:00Z',
          author: 'Usuario Demo',
          tags: ['reunión', 'presentación']
        },
        {
          id: 'comm-4',
          clientId: client.id,
          type: 'email',
          direction: 'inbound',
          subject: 'Consulta sobre servicios',
          content: 'Hola,\n\nMe puse en contacto con ustedes a través de su sitio web. Estoy interesado en conocer más sobre sus servicios de digitalización para mi empresa.\n\n¿Podrían contactarme para agendar una reunión?\n\nGracias.',
          status: 'completed',
          priority: 'medium',
          outcome: 'positive',
          createdAt: '2024-01-18T09:45:00Z',
          updatedAt: '2024-01-18T09:45:00Z',
          author: 'Cliente',
          tags: ['consulta', 'web']
        },
        {
          id: 'comm-5',
          clientId: client.id,
          type: 'call',
          direction: 'outbound',
          subject: 'Llamada de seguimiento',
          content: 'Llamada programada para seguimiento. El cliente no contestó. Dejar mensaje de voz.',
          status: 'no_answer',
          priority: 'medium',
          outcome: 'follow_up_needed',
          createdAt: '2024-01-25T11:00:00Z',
          updatedAt: '2024-01-25T11:00:00Z',
          author: 'Usuario Demo',
          scheduledFor: '2024-01-25T11:00:00Z',
          tags: ['seguimiento', 'no_contesta']
        }
      ]
      setCommunications(mockCommunications.filter(comm => comm.clientId === client.id))
    }
  }, [client])

  const handleAddCommunication = async () => {
    if (!newCommunication.content.trim() || !client) return

    const communication: Communication = {
      id: `comm-${Date.now()}`,
      clientId: client.id,
      type: newCommunication.type,
      direction: newCommunication.direction,
      subject: newCommunication.subject,
      content: newCommunication.content,
      duration: newCommunication.duration,
      participants: newCommunication.participants.filter(p => p.trim()),
      status: newCommunication.status,
      priority: newCommunication.priority,
      outcome: newCommunication.outcome,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      author: 'Usuario Demo',
      scheduledFor: newCommunication.scheduledFor || undefined,
      tags: newCommunication.tags
    }

    setCommunications(prev => [communication, ...prev])
    
    // Actualizar último contacto del cliente
    onUpdateClient(client.id, { lastContact: new Date().toISOString().split('T')[0] })

    setNewCommunication({
      type: 'call',
      direction: 'outbound',
      subject: '',
      content: '',
      duration: 0,
      participants: [''],
      status: 'completed',
      priority: 'medium',
      outcome: 'neutral',
      scheduledFor: '',
      tags: []
    })
    setIsAddingCommunication(false)

    toast.success({
      title: 'Comunicación registrada',
      description: 'La comunicación se ha registrado correctamente'
    })
  }

  const handleEditCommunication = async (communicationId: string, updatedComm: Partial<Communication>) => {
    setCommunications(prev => prev.map(comm => 
      comm.id === communicationId 
        ? { ...comm, ...updatedComm, updatedAt: new Date().toISOString() }
        : comm
    ))

    setEditingCommunication(null)
    toast.success({
      title: 'Comunicación actualizada',
      description: 'La comunicación se ha actualizado correctamente'
    })
  }

  const handleDeleteCommunication = async (communicationId: string) => {
    setCommunications(prev => prev.filter(comm => comm.id !== communicationId))
    toast.success({
      title: 'Comunicación eliminada',
      description: 'La comunicación se ha eliminado correctamente'
    })
  }

  const getTypeIcon = (type: Communication['type']) => {
    switch (type) {
      case 'call': return <Phone className="h-4 w-4 text-blue-600" />
      case 'email': return <Mail className="h-4 w-4 text-green-600" />
      case 'meeting': return <Calendar className="h-4 w-4 text-purple-600" />
      case 'video_call': return <Video className="h-4 w-4 text-indigo-600" />
      case 'sms': return <MessageSquare className="h-4 w-4 text-orange-600" />
      case 'whatsapp': return <MessageSquare className="h-4 w-4 text-green-600" />
      case 'linkedin': return <MessageSquare className="h-4 w-4 text-blue-600" />
      default: return <MessageSquare className="h-4 w-4 text-gray-600" />
    }
  }

  const getTypeLabel = (type: Communication['type']) => {
    switch (type) {
      case 'call': return 'Llamada'
      case 'email': return 'Email'
      case 'meeting': return 'Reunión'
      case 'video_call': return 'Videollamada'
      case 'sms': return 'SMS'
      case 'whatsapp': return 'WhatsApp'
      case 'linkedin': return 'LinkedIn'
      default: return 'Otro'
    }
  }

  const getDirectionLabel = (direction: Communication['direction']) => {
    return direction === 'inbound' ? 'Entrante' : 'Saliente'
  }

  const getStatusColor = (status: Communication['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200'
      case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200'
      case 'no_answer': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusLabel = (status: Communication['status']) => {
    switch (status) {
      case 'completed': return 'Completada'
      case 'scheduled': return 'Programada'
      case 'cancelled': return 'Cancelada'
      case 'no_answer': return 'Sin respuesta'
      default: return 'Desconocido'
    }
  }

  const getPriorityColor = (priority: Communication['priority']) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200'
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPriorityLabel = (priority: Communication['priority']) => {
    switch (priority) {
      case 'urgent': return 'Urgente'
      case 'high': return 'Alta'
      case 'medium': return 'Media'
      case 'low': return 'Baja'
      default: return 'Desconocida'
    }
  }

  const getOutcomeIcon = (outcome?: Communication['outcome']) => {
    switch (outcome) {
      case 'positive': return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case 'negative': return <AlertCircle className="h-4 w-4 text-red-600" />
      case 'follow_up_needed': return <Flag className="h-4 w-4 text-orange-600" />
      default: return <div className="h-4 w-4 bg-gray-400 rounded-full"></div>
    }
  }

  const getOutcomeLabel = (outcome?: Communication['outcome']) => {
    switch (outcome) {
      case 'positive': return 'Positivo'
      case 'negative': return 'Negativo'
      case 'neutral': return 'Neutral'
      case 'follow_up_needed': return 'Requiere seguimiento'
      default: return 'Sin resultado'
    }
  }

  // Funciones para integración con WhatsApp y Email
  const handleWhatsAppContact = (client: Client) => {
    const phoneNumber = client.phone?.replace(/\D/g, '') || ''
    if (phoneNumber) {
      const whatsappUrl = `https://wa.me/${phoneNumber}`
      window.open(whatsappUrl, '_blank')
      toast.success({
        title: 'WhatsApp abierto',
        description: `Abriendo conversación con ${client.name} en WhatsApp`
      })
    } else {
      toast.error({
        title: 'Número no disponible',
        description: 'Este cliente no tiene número de teléfono registrado'
      })
    }
  }

  const handleEmailContact = (client: Client) => {
    const subject = encodeURIComponent(`Consulta sobre servicios - ${client.company || client.name}`)
    const body = encodeURIComponent(`Estimado/a ${client.name},\n\nEspero que se encuentre bien.\n\nMe pongo en contacto con usted para...\n\nQuedo a la espera de su respuesta.\n\nSaludos cordiales,\n[Su nombre]`)
    const emailUrl = `mailto:${client.email}?subject=${subject}&body=${body}`
    window.location.href = emailUrl
    toast.success({
      title: 'Email abierto',
      description: `Abriendo cliente de email para ${client.name}`
    })
  }

  const handleCallClient = (client: Client) => {
    const phoneNumber = client.phone || ''
    if (phoneNumber) {
      const callUrl = `tel:${phoneNumber}`
      window.location.href = callUrl
      toast.success({
        title: 'Llamada iniciada',
        description: `Iniciando llamada a ${client.name}`
      })
    } else {
      toast.error({
        title: 'Número no disponible',
        description: 'Este cliente no tiene número de teléfono registrado'
      })
    }
  }

  const handleCopyContactInfo = (client: Client) => {
    const contactInfo = `Nombre: ${client.name}\nEmpresa: ${client.company || 'N/A'}\nEmail: ${client.email}\nTeléfono: ${client.phone || 'N/A'}`
    navigator.clipboard.writeText(contactInfo)
    toast.success({
      title: 'Información copiada',
      description: 'Los datos de contacto se han copiado al portapapeles'
    })
  }

  const filteredCommunications = communications.filter(comm => {
    const matchesSearch = comm.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comm.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === '' || comm.type === filterType
    const matchesStatus = filterStatus === '' || comm.status === filterStatus
    const matchesPriority = filterPriority === '' || comm.priority === filterPriority
    return matchesSearch && matchesType && matchesStatus && matchesPriority
  })

  const communicationStats = {
    total: communications.length,
    calls: communications.filter(c => c.type === 'call').length,
    emails: communications.filter(c => c.type === 'email').length,
    meetings: communications.filter(c => c.type === 'meeting').length,
    inbound: communications.filter(c => c.direction === 'inbound').length,
    outbound: communications.filter(c => c.direction === 'outbound').length
  }

  if (!client) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[1000px] max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <MessageSquare className="h-6 w-6 text-blue-600 mr-2" />
            Historial de Comunicaciones - {client.name}
          </DialogTitle>
          <DialogDescription>
            Registro completo de todas las comunicaciones con {client.company || client.name}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col h-[700px]">
          {/* Información del cliente y estadísticas */}
          <Card className="mb-4">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{client.name}</h3>
                    {client.company && (
                      <p className="text-sm text-gray-600">{client.company}</p>
                    )}
                    <p className="text-sm text-gray-500">{client.email}</p>
                    {client.phone && (
                      <p className="text-sm text-gray-500">{client.phone}</p>
                    )}
                  </div>
                </div>
                <div className="flex space-x-6 text-center">
                  <div>
                    <p className="text-xl font-bold text-blue-600">{communicationStats.total}</p>
                    <p className="text-xs text-gray-500">Total</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-green-600">{communicationStats.calls}</p>
                    <p className="text-xs text-gray-500">Llamadas</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-purple-600">{communicationStats.emails}</p>
                    <p className="text-xs text-gray-500">Emails</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-orange-600">{communicationStats.meetings}</p>
                    <p className="text-xs text-gray-500">Reuniones</p>
                  </div>
                </div>
              </div>
              
              {/* Botones de acción rápida */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-700">Acciones Rápidas:</h4>
                  <div className="flex space-x-2">
                    {client.phone && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleCallClient(client)}
                          className="text-green-600 hover:text-green-700"
                        >
                          <Phone className="h-4 w-4 mr-1" />
                          Llamar
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleWhatsAppContact(client)}
                          className="text-green-600 hover:text-green-700"
                        >
                          <MessageSquare className="h-4 w-4 mr-1" />
                          WhatsApp
                        </Button>
                      </>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEmailContact(client)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Mail className="h-4 w-4 mr-1" />
                      Email
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCopyContactInfo(client)}
                      className="text-gray-600 hover:text-gray-700"
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Copiar
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Filtros y búsqueda */}
          <div className="grid grid-cols-5 gap-4 mb-4">
            <div>
              <Label htmlFor="search">Buscar</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="filter-type">Tipo</Label>
              <select
                id="filter-type"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todos los tipos</option>
                <option value="call">Llamada</option>
                <option value="email">Email</option>
                <option value="meeting">Reunión</option>
                <option value="video_call">Videollamada</option>
                <option value="sms">SMS</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="linkedin">LinkedIn</option>
                <option value="other">Otro</option>
              </select>
            </div>
            <div>
              <Label htmlFor="filter-status">Estado</Label>
              <select
                id="filter-status"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todos los estados</option>
                <option value="completed">Completada</option>
                <option value="scheduled">Programada</option>
                <option value="cancelled">Cancelada</option>
                <option value="no_answer">Sin respuesta</option>
              </select>
            </div>
            <div>
              <Label htmlFor="filter-priority">Prioridad</Label>
              <select
                id="filter-priority"
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todas las prioridades</option>
                <option value="urgent">Urgente</option>
                <option value="high">Alta</option>
                <option value="medium">Media</option>
                <option value="low">Baja</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button onClick={() => setIsAddingCommunication(true)} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Nueva Comunicación
              </Button>
            </div>
          </div>

          {/* Lista de comunicaciones */}
          <div className="flex-1 overflow-y-auto space-y-3">
            {filteredCommunications.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No hay comunicaciones para este cliente</p>
              </div>
            ) : (
              filteredCommunications.map((comm) => (
                <Card key={comm.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-gray-100 rounded-full">
                        {getTypeIcon(comm.type)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="font-medium text-gray-900">
                                {comm.subject || `${getTypeLabel(comm.type)} - ${getDirectionLabel(comm.direction)}`}
                              </h4>
                              <Badge variant="outline" className={getStatusColor(comm.status)}>
                                {getStatusLabel(comm.status)}
                              </Badge>
                              <Badge variant="outline" className={getPriorityColor(comm.priority)}>
                                {getPriorityLabel(comm.priority)}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{comm.content}</p>
                          </div>
                          
                          <div className="flex items-center space-x-2 ml-4">
                            {getOutcomeIcon(comm.outcome)}
                            <div className="flex space-x-1">
                              {/* Botones de acción rápida según el tipo de comunicación */}
                              {comm.type === 'call' && client.phone && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleCallClient(client)}
                                  className="h-6 w-6 p-0 text-green-600 hover:text-green-700"
                                  title="Llamar ahora"
                                >
                                  <Phone className="h-3 w-3" />
                                </Button>
                              )}
                              {comm.type === 'email' && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleEmailContact(client)}
                                  className="h-6 w-6 p-0 text-blue-600 hover:text-blue-700"
                                  title="Enviar email"
                                >
                                  <Mail className="h-3 w-3" />
                                </Button>
                              )}
                              {(comm.type === 'whatsapp' || comm.type === 'sms') && client.phone && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleWhatsAppContact(client)}
                                  className="h-6 w-6 p-0 text-green-600 hover:text-green-700"
                                  title="Abrir WhatsApp"
                                >
                                  <MessageSquare className="h-3 w-3" />
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setEditingCommunication(comm)}
                                className="h-6 w-6 p-0"
                                title="Editar comunicación"
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeleteCommunication(comm.id)}
                                className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
                                title="Eliminar comunicación"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                          <div className="flex items-center space-x-4">
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {new Date(comm.createdAt).toLocaleString()}
                            </span>
                            {comm.duration && (
                              <span>Duración: {comm.duration} min</span>
                            )}
                            {comm.participants && comm.participants.length > 0 && (
                              <span>Participantes: {comm.participants.join(', ')}</span>
                            )}
                            {comm.attachments && comm.attachments.length > 0 && (
                              <span className="flex items-center text-blue-600">
                                <Paperclip className="h-3 w-3 mr-1" />
                                {comm.attachments.length} archivo(s)
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <span>Por {comm.author}</span>
                            {comm.tags && comm.tags.length > 0 && (
                              <div className="flex space-x-1">
                                {comm.tags.map(tag => (
                                  <Badge key={tag} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Formulario para nueva comunicación */}
          {isAddingCommunication && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg">Nueva Comunicación</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="comm-type">Tipo *</Label>
                    <select
                      id="comm-type"
                      value={newCommunication.type}
                      onChange={(e) => setNewCommunication(prev => ({ ...prev, type: e.target.value as Communication['type'] }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="call">Llamada</option>
                      <option value="email">Email</option>
                      <option value="meeting">Reunión</option>
                      <option value="video_call">Videollamada</option>
                      <option value="sms">SMS</option>
                      <option value="whatsapp">WhatsApp</option>
                      <option value="linkedin">LinkedIn</option>
                      <option value="other">Otro</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="comm-direction">Dirección</Label>
                    <select
                      id="comm-direction"
                      value={newCommunication.direction}
                      onChange={(e) => setNewCommunication(prev => ({ ...prev, direction: e.target.value as Communication['direction'] }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="outbound">Saliente</option>
                      <option value="inbound">Entrante</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="comm-priority">Prioridad</Label>
                    <select
                      id="comm-priority"
                      value={newCommunication.priority}
                      onChange={(e) => setNewCommunication(prev => ({ ...prev, priority: e.target.value as Communication['priority'] }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="low">Baja</option>
                      <option value="medium">Media</option>
                      <option value="high">Alta</option>
                      <option value="urgent">Urgente</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="comm-subject">Asunto</Label>
                  <Input
                    id="comm-subject"
                    value={newCommunication.subject}
                    onChange={(e) => setNewCommunication(prev => ({ ...prev, subject: e.target.value }))}
                    placeholder="Asunto de la comunicación"
                    className="w-full"
                  />
                </div>
                
                <div>
                  <Label htmlFor="comm-content">Contenido *</Label>
                  <Textarea
                    id="comm-content"
                    value={newCommunication.content}
                    onChange={(e) => setNewCommunication(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Detalles de la comunicación..."
                    rows={4}
                    className="w-full"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="comm-duration">Duración (minutos)</Label>
                    <Input
                      id="comm-duration"
                      type="number"
                      value={newCommunication.duration}
                      onChange={(e) => setNewCommunication(prev => ({ ...prev, duration: parseInt(e.target.value) || 0 }))}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="comm-outcome">Resultado</Label>
                    <select
                      id="comm-outcome"
                      value={newCommunication.outcome}
                      onChange={(e) => setNewCommunication(prev => ({ ...prev, outcome: e.target.value as Communication['outcome'] }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="neutral">Neutral</option>
                      <option value="positive">Positivo</option>
                      <option value="negative">Negativo</option>
                      <option value="follow_up_needed">Requiere seguimiento</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsAddingCommunication(false)
                      setNewCommunication({
                        type: 'call',
                        direction: 'outbound',
                        subject: '',
                        content: '',
                        duration: 0,
                        participants: [''],
                        status: 'completed',
                        priority: 'medium',
                        outcome: 'neutral',
                        scheduledFor: '',
                        tags: []
                      })
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleAddCommunication}
                    disabled={!newCommunication.content.trim()}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Registrar Comunicación
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
