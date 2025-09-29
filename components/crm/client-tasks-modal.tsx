'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import {
  CheckSquare,
  Square,
  Calendar,
  User,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Bell,
  Target,
  Flag,
  Phone,
  Mail,
  FileText,
  DollarSign
} from 'lucide-react'
import { useToast } from '@/lib/hooks/use-toast'

interface Task {
  id: string
  title: string
  description: string
  type: 'call' | 'email' | 'meeting' | 'follow-up' | 'proposal' | 'contract' | 'payment' | 'other'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled'
  dueDate: string
  completedAt?: string
  createdAt: string
  updatedAt: string
  author: string
  assignedTo: string
  reminder?: {
    enabled: boolean
    date: string
    time: string
  }
}

import { Client } from '@/types'

interface ClientTasksModalProps {
  isOpen: boolean
  onClose: () => void
  client: Client | null
  onUpdateClient: (clientId: string, updatedClient: Partial<Client>) => void
}

export function ClientTasksModal({ isOpen, onClose, client, onUpdateClient }: ClientTasksModalProps) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    type: 'follow-up' as Task['type'],
    priority: 'medium' as Task['priority'],
    dueDate: '',
    assignedTo: 'Usuario Actual',
    reminder: {
      enabled: false,
      date: '',
      time: ''
    }
  })
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [isAddingTask, setIsAddingTask] = useState(false)
  const [filterStatus, setFilterStatus] = useState<string>('')
  const [filterPriority, setFilterPriority] = useState<string>('')
  const [filterType, setFilterType] = useState<string>('')
  const toast = useToast()

  // Cargar tareas del cliente cuando se abre el modal
  useEffect(() => {
    if (client) {
      // Simular carga de tareas desde la base de datos
      const mockTasks: Task[] = [
        {
          id: 'task-1',
          title: 'Llamar para seguimiento de propuesta',
          description: 'Contactar al cliente para conocer su opinión sobre la propuesta enviada la semana pasada.',
          type: 'call',
          priority: 'high',
          status: 'pending',
          dueDate: '2024-01-25',
          createdAt: '2024-01-20T10:30:00Z',
          updatedAt: '2024-01-20T10:30:00Z',
          author: 'Usuario Actual',
          assignedTo: 'Usuario Actual',
          reminder: {
            enabled: true,
            date: '2024-01-25',
            time: '09:00'
          }
        },
        {
          id: 'task-2',
          title: 'Enviar contrato revisado',
          description: 'Enviar la versión final del contrato con las modificaciones solicitadas.',
          type: 'contract',
          priority: 'urgent',
          status: 'in-progress',
          dueDate: '2024-01-23',
          createdAt: '2024-01-19T14:15:00Z',
          updatedAt: '2024-01-21T09:30:00Z',
          author: 'Usuario Actual',
          assignedTo: 'Usuario Actual'
        },
        {
          id: 'task-3',
          title: 'Reunión de presentación',
          description: 'Presentar la solución completa al equipo técnico del cliente.',
          type: 'meeting',
          priority: 'high',
          status: 'completed',
          dueDate: '2024-01-22',
          completedAt: '2024-01-22T16:00:00Z',
          createdAt: '2024-01-18T16:45:00Z',
          updatedAt: '2024-01-22T16:00:00Z',
          author: 'Usuario Actual',
          assignedTo: 'Usuario Actual'
        }
      ]
      setTasks(mockTasks)
    }
  }, [client])

  const handleAddTask = async () => {
    if (!newTask.title.trim() || !newTask.dueDate || !client) return

    const task: Task = {
      id: `task-${Date.now()}`,
      title: newTask.title,
      description: newTask.description,
      type: newTask.type,
      priority: newTask.priority,
      status: 'pending',
      dueDate: newTask.dueDate,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      author: 'Usuario Actual',
      assignedTo: newTask.assignedTo,
      reminder: newTask.reminder.enabled ? newTask.reminder : undefined
    }

    setTasks(prev => [task, ...prev])
    setNewTask({
      title: '',
      description: '',
      type: 'follow-up',
      priority: 'medium',
      dueDate: '',
      assignedTo: 'Usuario Actual',
      reminder: {
        enabled: false,
        date: '',
        time: ''
      }
    })
    setIsAddingTask(false)

    toast.success({
      title: 'Tarea creada',
      description: 'La tarea se ha creado correctamente'
    })
  }

  const handleToggleTask = async (taskId: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const newStatus: 'completed' | 'pending' = task.status === 'completed' ? 'pending' : 'completed'
        const updatedTask = {
          ...task,
          status: newStatus,
          updatedAt: new Date().toISOString()
        }
        
        if (newStatus === 'completed') {
          updatedTask.completedAt = new Date().toISOString()
        } else {
          delete updatedTask.completedAt
        }

        return updatedTask
      }
      return task
    }))

    toast.success({
      title: 'Tarea actualizada',
      description: 'El estado de la tarea se ha actualizado'
    })
  }

  const handleEditTask = async (taskId: string, updatedTask: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, ...updatedTask, updatedAt: new Date().toISOString() }
        : task
    ))

    setEditingTask(null)
    toast.success({
      title: 'Tarea actualizada',
      description: 'La tarea se ha actualizado correctamente'
    })
  }

  const handleDeleteTask = async (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId))
    toast.success({
      title: 'Tarea eliminada',
      description: 'La tarea se ha eliminado correctamente'
    })
  }

  const getTypeIcon = (type: Task['type']) => {
    switch (type) {
      case 'call': return <Phone className="h-4 w-4 text-blue-600" />
      case 'email': return <Mail className="h-4 w-4 text-green-600" />
      case 'meeting': return <Calendar className="h-4 w-4 text-purple-600" />
      case 'follow-up': return <Clock className="h-4 w-4 text-orange-600" />
      case 'proposal': return <FileText className="h-4 w-4 text-indigo-600" />
      case 'contract': return <FileText className="h-4 w-4 text-red-600" />
      case 'payment': return <DollarSign className="h-4 w-4 text-green-600" />
      default: return <Target className="h-4 w-4 text-gray-600" />
    }
  }

  const getTypeLabel = (type: Task['type']) => {
    switch (type) {
      case 'call': return 'Llamada'
      case 'email': return 'Email'
      case 'meeting': return 'Reunión'
      case 'follow-up': return 'Seguimiento'
      case 'proposal': return 'Propuesta'
      case 'contract': return 'Contrato'
      case 'payment': return 'Pago'
      default: return 'Otro'
    }
  }

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200'
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'completed': return 'text-green-600'
      case 'in-progress': return 'text-blue-600'
      case 'pending': return 'text-yellow-600'
      case 'cancelled': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getStatusLabel = (status: Task['status']) => {
    switch (status) {
      case 'completed': return 'Completada'
      case 'in-progress': return 'En progreso'
      case 'pending': return 'Pendiente'
      case 'cancelled': return 'Cancelada'
      default: return 'Desconocido'
    }
  }

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date() && !tasks.find(t => t.dueDate === dueDate)?.completedAt
  }

  const filteredTasks = tasks.filter(task => {
    const matchesStatus = filterStatus === '' || task.status === filterStatus
    const matchesPriority = filterPriority === '' || task.priority === filterPriority
    const matchesType = filterType === '' || task.type === filterType
    return matchesStatus && matchesPriority && matchesType
  })

  const pendingTasks = tasks.filter(task => task.status === 'pending').length
  const completedTasks = tasks.filter(task => task.status === 'completed').length
  const overdueTasks = tasks.filter(task => isOverdue(task.dueDate)).length

  if (!client) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <CheckSquare className="h-6 w-6 text-blue-600 mr-2" />
            Tareas y Recordatorios - {client.name}
          </DialogTitle>
          <DialogDescription>
            Gestiona las tareas y recordatorios para {client.company || client.name}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col h-[600px]">
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
                  </div>
                </div>
                <div className="flex space-x-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-yellow-600">{pendingTasks}</p>
                    <p className="text-xs text-gray-500">Pendientes</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-600">{completedTasks}</p>
                    <p className="text-xs text-gray-500">Completadas</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-red-600">{overdueTasks}</p>
                    <p className="text-xs text-gray-500">Vencidas</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Filtros */}
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div>
              <Label htmlFor="filter-status">Estado</Label>
              <select
                id="filter-status"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todos los estados</option>
                <option value="pending">Pendiente</option>
                <option value="in-progress">En progreso</option>
                <option value="completed">Completada</option>
                <option value="cancelled">Cancelada</option>
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
                <option value="follow-up">Seguimiento</option>
                <option value="proposal">Propuesta</option>
                <option value="contract">Contrato</option>
                <option value="payment">Pago</option>
                <option value="other">Otro</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button onClick={() => setIsAddingTask(true)} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Nueva Tarea
              </Button>
            </div>
          </div>

          {/* Lista de tareas */}
          <div className="flex-1 overflow-y-auto space-y-3">
            {filteredTasks.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <CheckSquare className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No hay tareas para este cliente</p>
              </div>
            ) : (
              filteredTasks.map((task) => (
                <Card key={task.id} className={`hover:shadow-md transition-shadow ${
                  isOverdue(task.dueDate) ? 'border-red-200 bg-red-50' : ''
                }`}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        checked={task.status === 'completed'}
                        onCheckedChange={() => handleToggleTask(task.id)}
                        className="mt-1"
                      />
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className={`font-medium ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                              {task.title}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                          </div>
                          
                          <div className="flex items-center space-x-2 ml-4">
                            <div className="flex items-center space-x-1">
                              {getTypeIcon(task.type)}
                              <span className="text-xs text-gray-500">{getTypeLabel(task.type)}</span>
                            </div>
                            
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${getPriorityColor(task.priority)}`}
                            >
                              {task.priority === 'urgent' ? 'Urgente' : 
                               task.priority === 'high' ? 'Alta' : 
                               task.priority === 'medium' ? 'Media' : 'Baja'}
                            </Badge>
                            
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${getStatusColor(task.status)}`}
                            >
                              {getStatusLabel(task.status)}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                          <div className="flex items-center space-x-4">
                            <span className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              Vence: {new Date(task.dueDate).toLocaleDateString()}
                            </span>
                            {task.reminder?.enabled && (
                              <span className="flex items-center text-blue-600">
                                <Bell className="h-3 w-3 mr-1" />
                                Recordatorio: {task.reminder.date} {task.reminder.time}
                              </span>
                            )}
                            {isOverdue(task.dueDate) && (
                              <span className="flex items-center text-red-600">
                                <AlertTriangle className="h-3 w-3 mr-1" />
                                Vencida
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <span>Por {task.assignedTo}</span>
                            <div className="flex space-x-1">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setEditingTask(task)}
                                className="h-6 w-6 p-0"
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeleteTask(task.id)}
                                className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
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
              ))
            )}
          </div>

          {/* Formulario para nueva tarea */}
          {isAddingTask && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg">Nueva Tarea</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="task-title">Título *</Label>
                  <Input
                    id="task-title"
                    value={newTask.title}
                    onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Título de la tarea"
                    className="w-full"
                  />
                </div>
                
                <div>
                  <Label htmlFor="task-description">Descripción</Label>
                  <Textarea
                    id="task-description"
                    value={newTask.description}
                    onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Descripción de la tarea"
                    rows={3}
                    className="w-full"
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="task-type">Tipo</Label>
                    <select
                      id="task-type"
                      value={newTask.type}
                      onChange={(e) => setNewTask(prev => ({ ...prev, type: e.target.value as Task['type'] }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="follow-up">Seguimiento</option>
                      <option value="call">Llamada</option>
                      <option value="email">Email</option>
                      <option value="meeting">Reunión</option>
                      <option value="proposal">Propuesta</option>
                      <option value="contract">Contrato</option>
                      <option value="payment">Pago</option>
                      <option value="other">Otro</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="task-priority">Prioridad</Label>
                    <select
                      id="task-priority"
                      value={newTask.priority}
                      onChange={(e) => setNewTask(prev => ({ ...prev, priority: e.target.value as Task['priority'] }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="low">Baja</option>
                      <option value="medium">Media</option>
                      <option value="high">Alta</option>
                      <option value="urgent">Urgente</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="task-due-date">Fecha de vencimiento *</Label>
                    <Input
                      id="task-due-date"
                      type="date"
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="task-reminder"
                      checked={newTask.reminder.enabled}
                      onCheckedChange={(checked) => setNewTask(prev => ({
                        ...prev,
                        reminder: { ...prev.reminder, enabled: !!checked }
                      }))}
                    />
                    <Label htmlFor="task-reminder">Activar recordatorio</Label>
                  </div>
                  
                  {newTask.reminder.enabled && (
                    <div className="flex space-x-2">
                      <Input
                        type="date"
                        value={newTask.reminder.date}
                        onChange={(e) => setNewTask(prev => ({
                          ...prev,
                          reminder: { ...prev.reminder, date: e.target.value }
                        }))}
                        className="w-32"
                      />
                      <Input
                        type="time"
                        value={newTask.reminder.time}
                        onChange={(e) => setNewTask(prev => ({
                          ...prev,
                          reminder: { ...prev.reminder, time: e.target.value }
                        }))}
                        className="w-24"
                      />
                    </div>
                  )}
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsAddingTask(false)
                      setNewTask({
                        title: '',
                        description: '',
                        type: 'follow-up',
                        priority: 'medium',
                        dueDate: '',
                        assignedTo: 'Usuario Actual',
                        reminder: {
                          enabled: false,
                          date: '',
                          time: ''
                        }
                      })
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleAddTask}
                    disabled={!newTask.title.trim() || !newTask.dueDate}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Crear Tarea
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
