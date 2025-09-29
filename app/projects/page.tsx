'use client'

import { useState, useEffect } from 'react'
import { AppLayout } from '@/components/layout/app-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Kanban, 
  Plus, 
  Filter, 
  Search,
  User,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle,
  Edit,
  Trash2,
  MoreVertical
} from 'lucide-react'
import { useToast } from '@/lib/hooks/use-toast'
import { TaskModal } from '@/components/projects/task-modal'

interface Task {
  id: string
  title: string
  description: string
  status: 'pending' | 'in_progress' | 'done'
  assignee: string
  priority: 'low' | 'medium' | 'high'
  dueDate?: string
  createdAt: string
  updatedAt: string
  tags: string[]
}

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedAssignee, setSelectedAssignee] = useState('')
  const [selectedPriority, setSelectedPriority] = useState('')
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const toast = useToast()

  // Cargar tareas iniciales
  useEffect(() => {
    setTasks([
      {
        id: 'task-1',
        title: 'Diseñar nueva landing page',
        description: 'Crear el diseño de la nueva landing page para el producto principal',
        status: 'in_progress',
        assignee: 'María González',
        priority: 'high',
        dueDate: '2024-02-15',
        createdAt: '2024-01-20',
        updatedAt: '2024-01-22',
        tags: ['diseño', 'frontend']
      },
      {
        id: 'task-2',
        title: 'Implementar autenticación',
        description: 'Desarrollar el sistema de autenticación con JWT',
        status: 'pending',
        assignee: 'Carlos Ruiz',
        priority: 'high',
        dueDate: '2024-02-10',
        createdAt: '2024-01-18',
        updatedAt: '2024-01-18',
        tags: ['backend', 'seguridad']
      },
      {
        id: 'task-3',
        title: 'Configurar base de datos',
        description: 'Configurar la base de datos PostgreSQL y crear las migraciones',
        status: 'done',
        assignee: 'Ana Martín',
        priority: 'medium',
        dueDate: '2024-01-25',
        createdAt: '2024-01-15',
        updatedAt: '2024-01-25',
        tags: ['backend', 'database']
      },
      {
        id: 'task-4',
        title: 'Escribir documentación API',
        description: 'Crear documentación completa de la API REST',
        status: 'pending',
        assignee: 'Roberto Silva',
        priority: 'low',
        dueDate: '2024-02-20',
        createdAt: '2024-01-22',
        updatedAt: '2024-01-22',
        tags: ['documentación', 'api']
      },
      {
        id: 'task-5',
        title: 'Optimizar rendimiento',
        description: 'Optimizar el rendimiento de la aplicación web',
        status: 'in_progress',
        assignee: 'Laura Fernández',
        priority: 'medium',
        dueDate: '2024-02-18',
        createdAt: '2024-01-19',
        updatedAt: '2024-01-23',
        tags: ['optimización', 'frontend']
      },
      {
        id: 'task-6',
        title: 'Implementar tests unitarios',
        description: 'Crear tests unitarios para los componentes principales',
        status: 'pending',
        assignee: 'María González',
        priority: 'medium',
        dueDate: '2024-02-12',
        createdAt: '2024-01-21',
        updatedAt: '2024-01-21',
        tags: ['testing', 'calidad']
      }
    ])
  }, [])

  const assignees = [
    'Todos',
    'María González',
    'Carlos Ruiz',
    'Ana Martín',
    'Roberto Silva',
    'Laura Fernández'
  ]

  const priorities = [
    'Todas',
    'Alta prioridad',
    'Media prioridad',
    'Baja prioridad'
  ]

  const statuses = [
    { key: 'pending', label: 'Pendiente', color: 'bg-yellow-100 text-yellow-800' },
    { key: 'in_progress', label: 'En curso', color: 'bg-blue-100 text-blue-800' },
    { key: 'done', label: 'Hecho', color: 'bg-green-100 text-green-800' }
  ]

  // Filtrar tareas
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesAssignee = selectedAssignee === '' || selectedAssignee === 'Todos' || 
                           task.assignee === selectedAssignee
    
    const matchesPriority = selectedPriority === '' || selectedPriority === 'Todas' ||
                           (selectedPriority === 'Alta prioridad' && task.priority === 'high') ||
                           (selectedPriority === 'Media prioridad' && task.priority === 'medium') ||
                           (selectedPriority === 'Baja prioridad' && task.priority === 'low')
    
    return matchesSearch && matchesAssignee && matchesPriority
  })

  // Agrupar tareas por estado
  const tasksByStatus = statuses.map(status => ({
    ...status,
    tasks: filteredTasks.filter(task => task.status === status.key)
  }))

  // Estadísticas
  const stats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in_progress').length,
    done: tasks.filter(t => t.status === 'done').length,
    overdue: tasks.filter(t => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'done').length
  }

  // Función para obtener el badge de prioridad
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-100 text-red-800">Alta</Badge>
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800">Media</Badge>
      case 'low':
        return <Badge className="bg-green-100 text-green-800">Baja</Badge>
      default:
        return <Badge variant="secondary">{priority}</Badge>
    }
  }

  // Función para mover tarea entre columnas
  const moveTask = (taskId: string, newStatus: 'pending' | 'in_progress' | 'done') => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, status: newStatus, updatedAt: new Date().toISOString().split('T')[0] }
        : task
    ))
    toast.success({
      title: 'Tarea actualizada',
      description: 'El estado de la tarea ha sido actualizado'
    })
  }

  // Función para manejar edición
  const handleEditTask = (task: Task) => {
    setEditingTask(task)
    setShowTaskModal(true)
  }

  // Función para manejar eliminación
  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId))
    toast.warning({
      title: 'Tarea eliminada',
      description: 'La tarea ha sido eliminada del proyecto'
    })
  }

  // Función para manejar adición/edición
  const handleSaveTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingTask) {
      // Editar tarea existente
      setTasks(prev => prev.map(t => 
        t.id === editingTask.id 
          ? { ...t, ...taskData, updatedAt: new Date().toISOString().split('T')[0] }
          : t
      ))
      toast.success({
        title: 'Tarea actualizada',
        description: 'Los datos de la tarea han sido actualizados'
      })
    } else {
      // Agregar nueva tarea
      const newTask: Task = {
        ...taskData,
        id: `task-${Date.now()}`,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      }
      setTasks(prev => [newTask, ...prev])
      toast.success({
        title: 'Tarea creada',
        description: 'La nueva tarea ha sido agregada al proyecto'
      })
    }
    setEditingTask(null)
    setShowTaskModal(false)
  }

  // Función para generar resumen IA
  const generateAISummary = () => {
    const criticalTasks = tasks.filter(t => t.priority === 'high' && t.status !== 'done').length
    const overdueTasks = stats.overdue
    
    if (overdueTasks > 0) {
      return `${overdueTasks} tareas vencidas requieren atención inmediata`
    }
    if (criticalTasks > 0) {
      return `${criticalTasks} tareas críticas pendientes esta semana`
    }
    if (stats.done > stats.total * 0.8) {
      return 'Excelente progreso, más del 80% de tareas completadas'
    }
    return 'Progreso normal en el proyecto'
  }

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Kanban className="h-8 w-8 text-blue-600 mr-3" />
                Gestión de Proyectos
              </h1>
              <p className="mt-2 text-gray-600">
                Organiza tus tareas y proyectos con el tablero Kanban
              </p>
            </div>
            <Button onClick={() => setShowTaskModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Nueva Tarea
            </Button>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Kanban className="h-8 w-8 text-blue-600" />
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
                <Clock className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pendientes</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <AlertCircle className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">En curso</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.inProgress}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Completadas</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.done}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Vencidas</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.overdue}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resumen IA */}
        <Card className="mb-8 bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-full mr-3">
                <AlertCircle className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-blue-900">Resumen Inteligente</p>
                <p className="text-blue-700">{generateAISummary()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filtros */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Buscar tareas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  value={selectedAssignee}
                  onChange={(e) => setSelectedAssignee(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {assignees.map(assignee => (
                    <option key={assignee} value={assignee === 'Todos' ? '' : assignee}>
                      {assignee}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {priorities.map(priority => (
                    <option key={priority} value={priority === 'Todas' ? '' : priority}>
                      {priority}
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

        {/* Tablero Kanban */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {tasksByStatus.map((status) => (
            <Card key={status.key} className="h-fit">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge className={status.color}>
                      {status.label}
                    </Badge>
                    <span className="text-sm text-gray-500">
                      ({status.tasks.length})
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {status.tasks.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Kanban className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                    <p>No hay tareas en este estado</p>
                  </div>
                ) : (
                  status.tasks.map((task) => (
                    <Card key={task.id} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <h4 className="font-medium text-gray-900 line-clamp-2">
                              {task.title}
                            </h4>
                            <div className="flex items-center space-x-1 ml-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditTask(task)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteTask(task.id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          <p className="text-sm text-gray-600 line-clamp-2">
                            {task.description}
                          </p>

                          <div className="flex items-center justify-between">
                            {getPriorityBadge(task.priority)}
                            <div className="flex items-center text-xs text-gray-500">
                              <User className="h-3 w-3 mr-1" />
                              {task.assignee}
                            </div>
                          </div>

                          {task.dueDate && (
                            <div className="flex items-center text-xs text-gray-500">
                              <Calendar className="h-3 w-3 mr-1" />
                              Vence: {new Date(task.dueDate).toLocaleDateString()}
                            </div>
                          )}

                          <div className="flex flex-wrap gap-1">
                            {task.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          {/* Botones de acción para mover entre columnas */}
                          <div className="flex gap-1 pt-2">
                            {status.key !== 'pending' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => moveTask(task.id, 'pending')}
                                className="text-xs"
                              >
                                ← Pendiente
                              </Button>
                            )}
                            {status.key !== 'in_progress' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => moveTask(task.id, 'in_progress')}
                                className="text-xs"
                              >
                                En curso →
                              </Button>
                            )}
                            {status.key !== 'done' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => moveTask(task.id, 'done')}
                                className="text-xs"
                              >
                                Hecho →
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Task Modal */}
        <TaskModal
          isOpen={showTaskModal}
          onClose={() => {
            setShowTaskModal(false)
            setEditingTask(null)
          }}
          onSave={handleSaveTask}
          task={editingTask}
        />
      </div>
    </AppLayout>
  )
}
