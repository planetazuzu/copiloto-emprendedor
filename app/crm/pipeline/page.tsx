'use client'

import { useState, useEffect } from 'react'
import { AppLayout } from '@/components/layout/app-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Calendar,
  Plus,
  Filter,
  Search,
  BarChart3,
  Target,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  FileText,
  CheckSquare,
  MessageSquare
} from 'lucide-react'
import { useToast } from '@/lib/hooks/use-toast'
import { AddClientPipelineModal } from '@/components/crm/add-client-pipeline-modal'
import { ClientNotesModal } from '@/components/crm/client-notes-modal'
import { ClientTasksModal } from '@/components/crm/client-tasks-modal'
import { CommunicationHistoryModal } from '@/components/crm/communication-history-modal'
import Link from 'next/link'

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

interface PipelineStage {
  id: string
  name: string
  clients: Client[]
  color: string
  bgColor: string
}

export default function PipelinePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPotential, setSelectedPotential] = useState('')
  const [showAddClient, setShowAddClient] = useState(false)
  const [showNotesModal, setShowNotesModal] = useState(false)
  const [selectedClientForNotes, setSelectedClientForNotes] = useState<Client | null>(null)
  const [showTasksModal, setShowTasksModal] = useState(false)
  const [selectedClientForTasks, setSelectedClientForTasks] = useState<Client | null>(null)
  const [showCommunicationModal, setShowCommunicationModal] = useState(false)
  const [selectedClientForCommunication, setSelectedClientForCommunication] = useState<Client | null>(null)
  const [draggedClient, setDraggedClient] = useState<Client | null>(null)
  const toast = useToast()

  // Datos mock del pipeline
  const [pipelineStages, setPipelineStages] = useState<PipelineStage[]>([
    {
      id: 'leads',
      name: 'Leads',
      color: 'text-gray-600',
      bgColor: 'bg-gray-100',
      clients: [
        {
          id: '1',
          name: 'Ana Martín',
          company: 'Retail Plus',
          email: 'ana@retailplus.com',
          phone: '+34 123 456 789',
          status: 'lead',
          potential: 'medium',
          value: 5000,
          lastContact: '2024-01-20',
          notes: 'Interesada en solución de inventario',
          source: 'Web',
          createdAt: '2024-01-15'
        },
        {
          id: '2',
          name: 'Carlos Ruiz',
          company: 'Innovación Digital',
          email: 'carlos@innovacion.com',
          phone: '+34 987 654 321',
          status: 'lead',
          potential: 'high',
          value: 15000,
          lastContact: '2024-01-18',
          notes: 'Necesita consultoría digital',
          source: 'Referido',
          createdAt: '2024-01-10'
        }
      ]
    },
    {
      id: 'qualified',
      name: 'Calificados',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      clients: [
        {
          id: '3',
          name: 'María González',
          company: 'TechStart S.L.',
          email: 'maria@techstart.com',
          phone: '+34 555 123 456',
          status: 'qualified',
          potential: 'high',
          value: 25000,
          lastContact: '2024-01-19',
          notes: 'Presupuesto aprobado, esperando propuesta',
          source: 'Evento',
          createdAt: '2024-01-05'
        }
      ]
    },
    {
      id: 'proposal',
      name: 'Propuesta',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      clients: [
        {
          id: '4',
          name: 'Luis Fernández',
          company: 'Manufactura Pro',
          email: 'luis@manufactura.com',
          phone: '+34 666 789 012',
          status: 'proposal',
          potential: 'medium',
          value: 12000,
          lastContact: '2024-01-17',
          notes: 'Propuesta enviada, esperando respuesta',
          source: 'LinkedIn',
          createdAt: '2024-01-08'
        }
      ]
    },
    {
      id: 'negotiation',
      name: 'Negociación',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      clients: [
        {
          id: '5',
          name: 'Elena Vázquez',
          company: 'Servicios Empresariales',
          email: 'elena@servicios.com',
          phone: '+34 777 345 678',
          status: 'negotiation',
          potential: 'high',
          value: 30000,
          lastContact: '2024-01-21',
          notes: 'Negociando términos del contrato',
          source: 'Web',
          createdAt: '2024-01-12'
        }
      ]
    },
    {
      id: 'closed-won',
      name: 'Ganados',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      clients: [
        {
          id: '6',
          name: 'Roberto Silva',
          company: 'Consultoría Avanzada',
          email: 'roberto@consultoria.com',
          phone: '+34 888 456 789',
          status: 'closed-won',
          potential: 'high',
          value: 45000,
          lastContact: '2024-01-15',
          notes: 'Contrato firmado, proyecto iniciado',
          source: 'Referido',
          createdAt: '2024-01-01'
        }
      ]
    },
    {
      id: 'closed-lost',
      name: 'Perdidos',
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      clients: [
        {
          id: '7',
          name: 'Patricia López',
          company: 'Empresa Ejemplo',
          email: 'patricia@ejemplo.com',
          phone: '+34 999 567 890',
          status: 'closed-lost',
          potential: 'low',
          value: 8000,
          lastContact: '2024-01-10',
          notes: 'Presupuesto insuficiente',
          source: 'Web',
          createdAt: '2023-12-20'
        }
      ]
    }
  ])

  // Calcular métricas del pipeline
  const totalClients = pipelineStages.reduce((sum, stage) => sum + stage.clients.length, 0)
  const totalValue = pipelineStages.reduce((sum, stage) => 
    sum + stage.clients.reduce((stageSum, client) => stageSum + client.value, 0), 0
  )
  const wonClients = pipelineStages.find(stage => stage.id === 'closed-won')?.clients.length || 0
  const lostClients = pipelineStages.find(stage => stage.id === 'closed-lost')?.clients.length || 0
  const conversionRate = totalClients > 0 ? ((wonClients / (wonClients + lostClients)) * 100).toFixed(1) : '0'

  // Filtrar clientes
  const filteredStages = pipelineStages.map(stage => ({
    ...stage,
    clients: stage.clients.filter(client => {
      const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           client.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           client.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesPotential = selectedPotential === '' || client.potential === selectedPotential
      return matchesSearch && matchesPotential
    })
  }))

  // Manejar drag and drop
  const handleDragStart = (client: Client) => {
    setDraggedClient(client)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, targetStageId: string) => {
    e.preventDefault()
    
    if (!draggedClient) return

    const newStatus = targetStageId as Client['status']
    
    // Actualizar el estado del pipeline
    setPipelineStages(prevStages => {
      const newStages = prevStages.map(stage => ({
        ...stage,
        clients: stage.clients.filter(client => client.id !== draggedClient.id)
      }))

      // Agregar el cliente a la nueva etapa
      const targetStageIndex = newStages.findIndex(stage => stage.id === targetStageId)
      if (targetStageIndex !== -1) {
        newStages[targetStageIndex].clients.push({
          ...draggedClient,
          status: newStatus,
          lastContact: new Date().toISOString().split('T')[0]
        })
      }

      return newStages
    })

    toast.success({
      title: 'Cliente movido',
      description: `${draggedClient.name} ha sido movido a ${pipelineStages.find(s => s.id === targetStageId)?.name}`
    })

    setDraggedClient(null)
  }

  const handleAddClient = (clientData: Omit<Client, 'id' | 'createdAt'>) => {
    const newClient: Client = {
      ...clientData,
      id: `client-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    }

    // Agregar el cliente a la etapa correspondiente
    setPipelineStages(prevStages => {
      const newStages = [...prevStages]
      const targetStageIndex = newStages.findIndex(stage => stage.id === clientData.status)
      if (targetStageIndex !== -1) {
        newStages[targetStageIndex].clients.push(newClient)
      }
      return newStages
    })

    toast.success({
      title: 'Cliente agregado',
      description: `${clientData.name} ha sido agregado al pipeline`
    })

    setShowAddClient(false)
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
    setPipelineStages(prevStages => 
      prevStages.map(stage => ({
        ...stage,
        clients: stage.clients.map(client => 
          client.id === clientId 
            ? { ...client, ...updatedClient }
            : client
        )
      }))
    )
  }

  const getPotentialIcon = (potential: string) => {
    switch (potential) {
      case 'high': return <TrendingUp className="h-4 w-4 text-green-600" />
      case 'medium': return <Target className="h-4 w-4 text-yellow-600" />
      case 'low': return <AlertCircle className="h-4 w-4 text-red-600" />
      default: return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'closed-won': return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case 'closed-lost': return <XCircle className="h-4 w-4 text-red-600" />
      default: return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <BarChart3 className="h-8 w-8 text-blue-600 mr-3" />
                Pipeline de Ventas
              </h1>
              <p className="mt-2 text-gray-600">
                Gestiona tu pipeline de ventas con drag & drop
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/crm/reports">
                <Button variant="outline">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Reportes
                </Button>
              </Link>
              <Button onClick={() => setShowAddClient(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Cliente
              </Button>
            </div>
          </div>
        </div>

        {/* Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-blue-100">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Clientes</p>
                  <p className="text-2xl font-bold text-gray-900">{totalClients}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-green-100">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Valor Total</p>
                  <p className="text-2xl font-bold text-gray-900">€{totalValue.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-purple-100">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Tasa Conversión</p>
                  <p className="text-2xl font-bold text-gray-900">{conversionRate}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-orange-100">
                  <Calendar className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Ganados</p>
                  <p className="text-2xl font-bold text-gray-900">{wonClients}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
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
                  value={selectedPotential}
                  onChange={(e) => setSelectedPotential(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Todos los potenciales</option>
                  <option value="high">Alto potencial</option>
                  <option value="medium">Medio potencial</option>
                  <option value="low">Bajo potencial</option>
                </select>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pipeline */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
          {filteredStages.map((stage) => (
            <Card key={stage.id} className="min-h-[600px]">
              <CardHeader className={`${stage.bgColor} rounded-t-lg`}>
                <CardTitle className={`${stage.color} flex items-center justify-between`}>
                  {stage.name}
                  <Badge variant="outline" className="bg-white">
                    {stage.clients.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent 
                className="p-4 min-h-[500px]"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, stage.id)}
              >
                <div className="space-y-3">
                  {stage.clients.map((client) => (
                    <Card 
                      key={client.id}
                      className="p-4 cursor-move hover:shadow-md transition-shadow"
                      draggable
                      onDragStart={() => handleDragStart(client)}
                    >
                      <div className="space-y-2">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{client.name}</h4>
                            {client.company && (
                              <p className="text-sm text-gray-600">{client.company}</p>
                            )}
                          </div>
                          <div className="flex items-center space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleViewNotes(client)
                              }}
                              title="Ver notas"
                              className="h-6 w-6 p-0"
                            >
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleViewTasks(client)
                              }}
                              title="Ver tareas"
                              className="h-6 w-6 p-0"
                            >
                              <CheckSquare className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleViewCommunications(client)
                              }}
                              title="Ver comunicaciones"
                              className="h-6 w-6 p-0"
                            >
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                            {getPotentialIcon(client.potential)}
                            {getStatusIcon(client.status)}
                          </div>
                        </div>
                        
                        <div className="text-sm text-gray-500">
                          <p>€{client.value.toLocaleString()}</p>
                          <p>Último contacto: {client.lastContact}</p>
                        </div>
                        
                        {client.notes && (
                          <p className="text-xs text-gray-400 line-clamp-2">{client.notes}</p>
                        )}
                        
                        <div className="flex items-center justify-between">
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${
                              client.potential === 'high' ? 'border-green-200 text-green-700' :
                              client.potential === 'medium' ? 'border-yellow-200 text-yellow-700' :
                              'border-red-200 text-red-700'
                            }`}
                          >
                            {client.potential === 'high' ? 'Alto' :
                             client.potential === 'medium' ? 'Medio' : 'Bajo'} potencial
                          </Badge>
                          {client.source && (
                            <span className="text-xs text-gray-400">{client.source}</span>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                  
                  {stage.clients.length === 0 && (
                    <div className="text-center py-8 text-gray-400">
                      <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No hay clientes en esta etapa</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Modal para agregar cliente */}
        <AddClientPipelineModal
          isOpen={showAddClient}
          onClose={() => setShowAddClient(false)}
          onAdd={handleAddClient}
        />

        {/* Modal de notas */}
        <ClientNotesModal
          isOpen={showNotesModal}
          onClose={() => {
            setShowNotesModal(false)
            setSelectedClientForNotes(null)
          }}
          client={selectedClientForNotes}
          onUpdateClient={handleUpdateClient}
        />

        {/* Modal de tareas */}
        <ClientTasksModal
          isOpen={showTasksModal}
          onClose={() => {
            setShowTasksModal(false)
            setSelectedClientForTasks(null)
          }}
          client={selectedClientForTasks}
          onUpdateClient={handleUpdateClient}
        />

        {/* Modal de comunicaciones */}
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
