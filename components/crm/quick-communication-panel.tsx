'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
  Phone,
  Mail,
  MessageSquare,
  Send,
  Clock,
  Calendar,
  User,
  Building2,
  Copy,
  ExternalLink,
  CheckCircle2
} from 'lucide-react'
import { useToast } from '@/lib/hooks/use-toast'

interface Client {
  id: string
  name: string
  company?: string
  email: string
  phone?: string
  status: 'lead' | 'qualified' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost'
  potential: 'high' | 'medium' | 'low'
  value: number
  lastContact: string
  notes?: string
  source?: string
  createdAt: string
}

interface QuickCommunicationPanelProps {
  client: Client
  onCommunicationAdded?: () => void
}

export function QuickCommunicationPanel({ client, onCommunicationAdded }: QuickCommunicationPanelProps) {
  const [quickMessage, setQuickMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const toast = useToast()

  const handleWhatsAppContact = () => {
    const phoneNumber = client.phone?.replace(/\D/g, '') || ''
    if (phoneNumber) {
      const message = quickMessage ? encodeURIComponent(quickMessage) : ''
      const whatsappUrl = `https://wa.me/${phoneNumber}${message ? `?text=${message}` : ''}`
      window.open(whatsappUrl, '_blank')
      toast.success({
        title: 'WhatsApp abierto',
        description: `Abriendo conversación con ${client.name} en WhatsApp`
      })
      setQuickMessage('')
    } else {
      toast.error({
        title: 'Número no disponible',
        description: 'Este cliente no tiene número de teléfono registrado'
      })
    }
  }

  const handleEmailContact = () => {
    const subject = encodeURIComponent(`Seguimiento - ${client.company || client.name}`)
    const body = encodeURIComponent(quickMessage || `Estimado/a ${client.name},\n\nEspero que se encuentre bien.\n\nMe pongo en contacto con usted para hacer seguimiento...\n\nQuedo a la espera de su respuesta.\n\nSaludos cordiales,\n[Su nombre]`)
    const emailUrl = `mailto:${client.email}?subject=${subject}&body=${body}`
    window.location.href = emailUrl
    toast.success({
      title: 'Email abierto',
      description: `Abriendo cliente de email para ${client.name}`
    })
    setQuickMessage('')
  }

  const handleCallClient = () => {
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

  const handleCopyContactInfo = () => {
    const contactInfo = `Nombre: ${client.name}\nEmpresa: ${client.company || 'N/A'}\nEmail: ${client.email}\nTeléfono: ${client.phone || 'N/A'}\nEstado: ${client.status}\nPotencial: ${client.potential}\nValor: €${client.value.toLocaleString()}`
    navigator.clipboard.writeText(contactInfo)
    toast.success({
      title: 'Información copiada',
      description: 'Los datos de contacto se han copiado al portapapeles'
    })
  }

  const getStatusColor = (status: Client['status']) => {
    switch (status) {
      case 'lead': return 'bg-blue-100 text-blue-800'
      case 'qualified': return 'bg-green-100 text-green-800'
      case 'proposal': return 'bg-yellow-100 text-yellow-800'
      case 'negotiation': return 'bg-orange-100 text-orange-800'
      case 'closed-won': return 'bg-green-100 text-green-800'
      case 'closed-lost': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: Client['status']) => {
    switch (status) {
      case 'lead': return 'Lead'
      case 'qualified': return 'Calificado'
      case 'proposal': return 'Propuesta'
      case 'negotiation': return 'Negociación'
      case 'closed-won': return 'Ganado'
      case 'closed-lost': return 'Perdido'
      default: return 'Desconocido'
    }
  }

  const getPotentialColor = (potential: Client['potential']) => {
    switch (potential) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPotentialLabel = (potential: Client['potential']) => {
    switch (potential) {
      case 'high': return 'Alto'
      case 'medium': return 'Medio'
      case 'low': return 'Bajo'
      default: return 'Desconocido'
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-lg">
          <User className="h-5 w-5 mr-2 text-blue-600" />
          Comunicación Rápida
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Información del cliente */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">{client.name}</h3>
            <Badge className={getStatusColor(client.status)}>
              {getStatusLabel(client.status)}
            </Badge>
          </div>
          {client.company && (
            <div className="flex items-center text-sm text-gray-600">
              <Building2 className="h-4 w-4 mr-1" />
              {client.company}
            </div>
          )}
          <div className="flex items-center text-sm text-gray-600">
            <Mail className="h-4 w-4 mr-1" />
            {client.email}
          </div>
          {client.phone && (
            <div className="flex items-center text-sm text-gray-600">
              <Phone className="h-4 w-4 mr-1" />
              {client.phone}
            </div>
          )}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-gray-600">
              <Clock className="h-4 w-4 mr-1" />
              Último contacto: {client.lastContact}
            </div>
            <Badge variant="outline" className={getPotentialColor(client.potential)}>
              {getPotentialLabel(client.potential)}
            </Badge>
          </div>
        </div>

        {/* Mensaje rápido */}
        <div className="space-y-2">
          <Label htmlFor="quick-message">Mensaje rápido (opcional)</Label>
          <Textarea
            id="quick-message"
            value={quickMessage}
            onChange={(e) => setQuickMessage(e.target.value)}
            placeholder="Escribe un mensaje personalizado..."
            rows={3}
            className="text-sm"
          />
        </div>

        {/* Botones de acción */}
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            {client.phone && (
              <>
                <Button
                  onClick={handleCallClient}
                  className="text-green-600 hover:text-green-700"
                  variant="outline"
                  size="sm"
                >
                  <Phone className="h-4 w-4 mr-1" />
                  Llamar
                </Button>
                <Button
                  onClick={handleWhatsAppContact}
                  className="text-green-600 hover:text-green-700"
                  variant="outline"
                  size="sm"
                >
                  <MessageSquare className="h-4 w-4 mr-1" />
                  WhatsApp
                </Button>
              </>
            )}
          </div>
          <Button
            onClick={handleEmailContact}
            className="w-full text-blue-600 hover:text-blue-700"
            variant="outline"
            size="sm"
          >
            <Mail className="h-4 w-4 mr-1" />
            Enviar Email
          </Button>
          <Button
            onClick={handleCopyContactInfo}
            className="w-full text-gray-600 hover:text-gray-700"
            variant="outline"
            size="sm"
          >
            <Copy className="h-4 w-4 mr-1" />
            Copiar Información
          </Button>
        </div>

        {/* Información adicional */}
        <div className="pt-3 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Valor del cliente:</span>
            <span className="font-semibold text-green-600">€{client.value.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-600 mt-1">
            <span>Cliente desde:</span>
            <span>{new Date(client.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
