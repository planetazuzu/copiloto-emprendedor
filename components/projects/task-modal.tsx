'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { 
  FileText, 
  User, 
  Calendar,
  AlertCircle,
  Loader2
} from 'lucide-react'

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

interface TaskModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void
  task?: Task | null
}

export function TaskModal({ isOpen, onClose, onSave, task }: TaskModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending' as 'pending' | 'in_progress' | 'done',
    assignee: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    dueDate: '',
    tags: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const assignees = [
    'María González',
    'Carlos Ruiz',
    'Ana Martín',
    'Roberto Silva',
    'Laura Fernández'
  ]

  // Cargar datos de la tarea si está editando
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        status: task.status,
        assignee: task.assignee,
        priority: task.priority,
        dueDate: task.dueDate || '',
        tags: task.tags.join(', ')
      })
    } else {
      setFormData({
        title: '',
        description: '',
        status: 'pending',
        assignee: '',
        priority: 'medium',
        dueDate: '',
        tags: ''
      })
    }
  }, [task])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title || !formData.assignee) {
      return
    }

    setIsSubmitting(true)

    // Simular envío
    setTimeout(() => {
      onSave({
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      })
      setIsSubmitting(false)
    }, 1000)
  }

  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
      status: 'pending',
      assignee: '',
      priority: 'medium',
      dueDate: '',
      tags: ''
    })
    setIsSubmitting(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <FileText className="h-6 w-6 mr-2" />
            {task ? 'Editar Tarea' : 'Nueva Tarea'}
          </DialogTitle>
          <DialogDescription>
            {task ? 'Modifica los datos de la tarea' : 'Crea una nueva tarea para el proyecto'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Información básica */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Información Básica</h3>
            
            <div>
              <Label htmlFor="title">Título *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Título de la tarea"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Descripción detallada de la tarea"
                rows={3}
              />
            </div>
          </div>

          {/* Asignación y estado */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Asignación y Estado</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="assignee">Responsable *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <select
                    id="assignee"
                    value={formData.assignee}
                    onChange={(e) => setFormData(prev => ({ ...prev, assignee: e.target.value }))}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Seleccionar responsable</option>
                    {assignees.map(assignee => (
                      <option key={assignee} value={assignee}>{assignee}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="status">Estado</Label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="pending">Pendiente</option>
                  <option value="in_progress">En curso</option>
                  <option value="done">Hecho</option>
                </select>
              </div>
            </div>
          </div>

          {/* Prioridad y fecha */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Prioridad y Fechas</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="priority">Prioridad</Label>
                <div className="relative">
                  <AlertCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <select
                    id="priority"
                    value={formData.priority}
                    onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as any }))}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="low">Baja prioridad</option>
                    <option value="medium">Media prioridad</option>
                    <option value="high">Alta prioridad</option>
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="dueDate">Fecha de vencimiento</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="dueDate"
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Etiquetas */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Etiquetas</h3>
            
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
          </div>

          {/* Botones */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={!formData.title || !formData.assignee || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Guardando...
                </>
              ) : (
                task ? 'Actualizar Tarea' : 'Crear Tarea'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
