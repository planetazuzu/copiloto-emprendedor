'use client'

import { useState, useEffect } from 'react'
import { AppLayout } from '@/components/layout/app-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Mail, 
  Phone, 
  Building2,
  Star,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3,
  FileText,
  CheckSquare,
  MessageSquare
} from 'lucide-react'
import { useToast } from '@/lib/hooks/use-toast'
import { ClientModal } from '@/components/crm/client-modal'
import { ClientNotesModal } from '@/components/crm/client-notes-modal'
import { ClientTasksModal } from '@/components/crm/client-tasks-modal'
import { CommunicationHistoryModal } from '@/components/crm/communication-history-modal'
import { QuickCommunicationPanel } from '@/components/crm/quick-communication-panel'
import Link from 'next/link'

interface Client {
  id: string
  name: string
  company?: string
  email: string
  phone?: string
  status: 'lead' | 'qualified' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost'
  notes?: string
  createdAt: string
  lastContact: string
  potential: 'high' | 'medium' | 'low'
  source?: string
  value?: number
  tags?: string[]
}

export default function CRMPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedPotential, setSelectedPotential] = useState('')
  const [showClientModal, setShowClientModal] = useState(false)
  const [showNotesModal, setShowNotesModal] = useState(false)
  const [selectedClientForNotes, setSelectedClientForNotes] = useState<Client | null>(null)
  const [showTasksModal, setShowTasksModal] = useState(false)
  const [selectedClientForTasks, setSelectedClientForTasks] = useState<Client | null>(null)
  const [showCommunicationModal, setShowCommunicationModal] = useState(false)
  const [selectedClientForCommunication, setSelectedClientForCommunication] = useState<Client | null>(null)
  const [editingClient, setEditingClient] = useState<Client | null>(null)
  const [clients, setClients] = useState<Client[]>([])
  const toast = useToast()

  // Cargar clientes iniciales
  useEffect(() => {
    setClients([
      {
        id: 'client-1',
        name: 'María González',
        company: 'TechStart S.L.',
        email: 'maria@techstart.com',
        phone: '+34 600 123 456',
        status: 'closed-won',
        notes: 'Cliente satisfecho con nuestros servicios. Interesado en ampliar el proyecto.',
        createdAt: '2024-01-15',
        lastContact: '2024-01-20',
        potential: 'high',
        source: 'Referido',
        value: 25000
      },
      {
        id: 'client-2',
        name: 'Carlos Ruiz',
        company: 'Innovación Digital',
        email: 'carlos@innodig.com',
        phone: '+34 600 789 012',
        status: 'negotiation',
        notes: 'En proceso de negociación para proyecto de digitalización. Presupuesto aprobado.',
        createdAt: '2024-01-18',
        lastContact: '2024-01-22',
        potential: 'high',
        source: 'Web',
        value: 18000
      },
      {
        id: 'client-3',
        name: 'Ana Martín',
        company: 'Retail Plus',
        email: 'ana@retailplus.es',
        phone: '+34 600 345 678',
        status: 'qualified',
        notes: 'Primer contacto realizado. Interesada en consultoría de marketing digital.',
        createdAt: '2024-01-20',
        lastContact: '2024-01-21',
        potential: 'medium',
        source: 'LinkedIn',
        value: 12000
      },
      {
        id: 'client-4',
        name: 'Roberto Silva',
        company: 'Construcciones Silva',
        email: 'roberto@construcciones-silva.com',
        phone: '+34 600 901 234',
        status: 'lead',
        notes: 'Lead frío. Necesita seguimiento para reactivar el interés.',
        createdAt: '2024-01-10',
        lastContact: '2024-01-15',
        potential: 'low',
        source: 'Feria',
        value: 5000
      },
      {
        id: 'client-5',
        name: 'Laura Fernández',
        company: 'Consultoría Empresarial',
        email: 'laura@consultoria-empresarial.es',
        phone: '+34 600 567 890',
        status: 'closed-won',
        notes: 'Cliente recurrente. Proyecto de formación en curso.',
        createdAt: '2024-01-05',
        lastContact: '2024-01-23',
        potential: 'high',
        source: 'Referido',
        value: 30000
      }
    ])
  }, [])

  const statuses = [
    'Todos',
    'Lead',
    'Calificado',
    'Propuesta',
    'Negociación',
    'Ganado',
    'Perdido'
  ]

  const potentials = [
    'Todos',
    'Alto potencial',
    'Medio potencial',
    'Bajo potencial'
  ]

  // Filtrar clientes
  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = selectedStatus === '' || selectedStatus === 'Todos' || 
                         (selectedStatus === 'Lead' && client.status === 'lead') ||
                         (selectedStatus === 'Calificado' && client.status === 'qualified') ||
                         (selectedStatus === 'Propuesta' && client.status === 'proposal') ||
                         (selectedStatus === 'Negociación' && client.status === 'negotiation') ||
                         (selectedStatus === 'Ganado' && client.status === 'closed-won') ||
                         (selectedStatus === 'Perdido' && client.status === 'closed-lost')
    
    const matchesPotential = selectedPotential === '' || selectedPotential === 'Todos' ||
                            (selectedPotential === 'Alto potencial' && client.potential === 'high') ||
                            (selectedPotential === 'Medio potencial' && client.potential === 'medium') ||
                            (selectedPotential === 'Bajo potencial' && client.potential === 'low')
    
    return matchesSearch && matchesStatus && matchesPotential
  })

  // Estadísticas
  const stats = {
    total: clients.length,
    leads: clients.filter(c => c.status === 'lead').length,
    qualified: clients.filter(c => c.status === 'qualified').length,
    proposal: clients.filter(c => c.status === 'proposal').length,
    negotiation: clients.filter(c => c.status === 'negotiation').length,
    won: clients.filter(c => c.status === 'closed-won').length,
    lost: clients.filter(c => c.status === 'closed-lost').length,
    highPotential: clients.filter(c => c.potential === 'high').length
  }

  // Función para obtener el badge de estado
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'lead':
        return <Badge className="bg-yellow-100 text-yellow-800">Lead</Badge>
      case 'qualified':
        return <Badge className="bg-blue-100 text-blue-800">Calificado</Badge>
      case 'proposal':
        return <Badge className="bg-purple-100 text-purple-800">Propuesta</Badge>
      case 'negotiation':
        return <Badge className="bg-orange-100 text-orange-800">Negociación</Badge>
      case 'closed-won':
        return <Badge className="bg-green-100 text-green-800">Ganado</Badge>
      case 'closed-lost':
        return <Badge className="bg-red-100 text-red-800">Perdido</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  // Función para obtener el badge de potencial
  const getPotentialBadge = (potential: string) => {
    switch (potential) {
      case 'high':
        return (
          <Badge className="bg-green-100 text-green-800">
            <TrendingUp className="h-3 w-3 mr-1" />
            Alto potencial
          </Badge>
        )
      case 'medium':
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Clock className="h-3 w-3 mr-1" />
            Medio potencial
          </Badge>
        )
      case 'low':
        return (
          <Badge className="bg-red-100 text-red-800">
            <TrendingDown className="h-3 w-3 mr-1" />
            Bajo potencial
          </Badge>
        )
      default:
        return <Badge variant="secondary">{potential}</Badge>
    }
  }

  // Función para generar resumen IA
  const generateAISummary = (client: Client) => {
    if (client.potential === 'high' && client.status === 'client') {
      return 'Cliente con alto potencial y satisfacción'
    }
    if (client.potential === 'high' && client.status === 'negotiation') {
      return 'Lead con alto potencial, priorizar seguimiento'
    }
    if (client.potential === 'low' && client.status === 'lead') {
      return 'Lead con bajo interés, considerar reactivación'
    }
    if (client.status === 'client') {
      return 'Cliente activo y satisfecho'
    }
    return 'Lead en proceso de calificación'
  }

  // Función para manejar edición
  const handleEditClient = (client: Client) => {
    setEditingClient(client)
    setShowClientModal(true)
  }

  const handleViewNotes = (client: Client) => {
    setSelectedClientForNotes(client)
    setShowNotesModal(true)
  }

  const handleViewTasks = (client: Client) => {
    setSelectedClientForTasks(client)
    setShowTasksModal(true)
  }

  const handleViewCommunications = (client: Client) => {
    setSelectedClientForCommunication(client)
    setShowCommunicationModal(true)
  }

  const handleUpdateClient = (clientId: string, updatedClient: Partial<Client>) => {
    setClients(prev => prev.map(client => 
      client.id === clientId 
        ? { ...client, ...updatedClient }
        : client
    ))
  }

  // Función para manejar eliminación
  const handleDeleteClient = (clientId: string) => {
    setClients(prev => prev.filter(c => c.id !== clientId))
    toast.warning({
      title: 'Cliente eliminado',
      description: 'El cliente ha sido eliminado del CRM'
    })
  }

  // Función para manejar adición/edición
  const handleSaveClient = (clientData: Omit<Client, 'id' | 'createdAt'>) => {
    if (editingClient) {
      // Editar cliente existente
      setClients(prev => prev.map(c => 
        c.id === editingClient.id 
          ? { ...c, ...clientData, lastContact: new Date().toISOString().split('T')[0] }
          : c
      ))
      toast.success({
        title: 'Cliente actualizado',
        description: 'Los datos del cliente han sido actualizados'
      })
    } else {
      // Agregar nuevo cliente
      const newClient: Client = {
        ...clientData,
        id: `client-${Date.now()}`,
        createdAt: new Date().toISOString().split('T')[0]
      }
      setClients(prev => [newClient, ...prev])
      toast.success({
        title: 'Cliente agregado',
        description: 'El nuevo cliente ha sido agregado al CRM'
      })
    }
    setEditingClient(null)
    setShowClientModal(false)
  }

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Users className="h-8 w-8 text-blue-600 mr-3" />
                CRM - Gestión de Clientes
              </h1>
              <p className="mt-2 text-gray-600">
                Gestiona tus clientes, leads y oportunidades de negocio
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/crm/pipeline">
                <Button variant="outline">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Ver Pipeline
                </Button>
              </Link>
              <Link href="/crm/reports">
                <Button variant="outline">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Reportes
                </Button>
              </Link>
              <Button onClick={() => setShowClientModal(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Cliente
              </Button>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <AlertCircle className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Leads</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.leads}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Calificados</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.qualified}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Negociación</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.negotiation}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Ganados</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.won}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Star className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Alto potencial</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.highPotential}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar clientes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
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
                <select
                  value={selectedPotential}
                  onChange={(e) => setSelectedPotential(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {potentials.map(potential => (
                    <option key={potential} value={potential === 'Todos' ? '' : potential}>
                      {potential}
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

        {/* Lista de clientes */}
        {filteredClients.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No se encontraron clientes
              </h3>
              <p className="text-gray-500 mb-6">
                Intenta ajustar los filtros de búsqueda o agrega un nuevo cliente
              </p>
              <Button onClick={() => setShowClientModal(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Agregar Cliente
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredClients.map((client) => (
              <Card key={client.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <Building2 className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{client.name}</CardTitle>
                        <CardDescription className="mt-1">
                          {client.company || 'Sin empresa'}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewNotes(client)}
                        title="Ver notas"
                      >
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewTasks(client)}
                        title="Ver tareas"
                      >
                        <CheckSquare className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewCommunications(client)}
                        title="Ver comunicaciones"
                      >
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditClient(client)}
                        title="Editar cliente"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteClient(client.id)}
                        className="text-red-500 hover:text-red-700"
                        title="Eliminar cliente"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      {getStatusBadge(client.status)}
                      {getPotentialBadge(client.potential)}
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2" />
                        {client.email}
                      </div>
                      {client.phone && (
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2" />
                          {client.phone}
                        </div>
                      )}
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        Último contacto: {client.lastContact || 'Nunca'}
                      </div>
                    </div>

                    <div className="text-sm">
                      <p className="font-medium text-gray-900 mb-1">Notas:</p>
                      <p className="text-gray-600 line-clamp-2">{client.notes}</p>
                    </div>

                    <div className="p-2 bg-gray-50 rounded text-xs">
                      <p className="font-medium text-gray-700">Resumen IA:</p>
                      <p className="text-gray-600">{generateAISummary(client)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Client Modal */}
        <ClientModal
          isOpen={showClientModal}
          onClose={() => {
            setShowClientModal(false)
            setEditingClient(null)
          }}
          onSave={handleSaveClient}
          client={editingClient}
        />

        {/* Notes Modal */}
        <ClientNotesModal
          isOpen={showNotesModal}
          onClose={() => {
            setShowNotesModal(false)
            setSelectedClientForNotes(null)
          }}
          client={selectedClientForNotes}
          onUpdateClient={handleUpdateClient}
        />

        {/* Tasks Modal */}
        <ClientTasksModal
          isOpen={showTasksModal}
          onClose={() => {
            setShowTasksModal(false)
            setSelectedClientForTasks(null)
          }}
          client={selectedClientForTasks}
          onUpdateClient={handleUpdateClient}
        />

        {/* Communication Modal */}
        <CommunicationHistoryModal
          isOpen={showCommunicationModal}
          onClose={() => {
            setShowCommunicationModal(false)
            setSelectedClientForCommunication(null)
          }}
          client={selectedClientForCommunication}
          onUpdateClient={handleUpdateClient}
        />
      </div>
    </AppLayout>
  )
}
