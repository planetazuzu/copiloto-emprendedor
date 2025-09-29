'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  FileText,
  Calendar,
  User,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Clock,
  MessageSquare,
  Phone,
  Mail,
  Building2,
  Star,
  AlertCircle
} from 'lucide-react'
import { useToast } from '@/lib/hooks/use-toast'

interface Note {
  id: string
  content: string
  type: 'general' | 'call' | 'email' | 'meeting' | 'follow-up' | 'important'
  priority: 'low' | 'medium' | 'high'
  createdAt: string
  updatedAt: string
  author: string
}

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

interface ClientNotesModalProps {
  isOpen: boolean
  onClose: () => void
  client: Client | null
  onUpdateClient: (clientId: string, updatedClient: Partial<Client>) => void
}

export function ClientNotesModal({ isOpen, onClose, client, onUpdateClient }: ClientNotesModalProps) {
  const [notes, setNotes] = useState<Note[]>([])
  const [newNote, setNewNote] = useState({
    content: '',
    type: 'general' as Note['type'],
    priority: 'medium' as Note['priority']
  })
  const [editingNote, setEditingNote] = useState<Note | null>(null)
  const [isAddingNote, setIsAddingNote] = useState(false)
  const [filterType, setFilterType] = useState<string>('')
  const [filterPriority, setFilterPriority] = useState<string>('')
  const toast = useToast()

  // Cargar notas del cliente cuando se abre el modal
  useEffect(() => {
    if (client) {
      // Simular carga de notas desde la base de datos
      const mockNotes: Note[] = [
        {
          id: 'note-1',
          content: 'Cliente muy interesado en la propuesta. Necesita revisar presupuesto con su equipo.',
          type: 'call',
          priority: 'high',
          createdAt: '2024-01-20T10:30:00Z',
          updatedAt: '2024-01-20T10:30:00Z',
          author: 'Usuario Actual'
        },
        {
          id: 'note-2',
          content: 'Enviado email con propuesta detallada y casos de éxito similares.',
          type: 'email',
          priority: 'medium',
          createdAt: '2024-01-19T14:15:00Z',
          updatedAt: '2024-01-19T14:15:00Z',
          author: 'Usuario Actual'
        },
        {
          id: 'note-3',
          content: 'Reunión programada para el próximo martes a las 15:00.',
          type: 'meeting',
          priority: 'high',
          createdAt: '2024-01-18T16:45:00Z',
          updatedAt: '2024-01-18T16:45:00Z',
          author: 'Usuario Actual'
        }
      ]
      setNotes(mockNotes)
    }
  }, [client])

  const handleAddNote = async () => {
    if (!newNote.content.trim() || !client) return

    const note: Note = {
      id: `note-${Date.now()}`,
      content: newNote.content,
      type: newNote.type,
      priority: newNote.priority,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      author: 'Usuario Actual'
    }

    setNotes(prev => [note, ...prev])
    setNewNote({ content: '', type: 'general', priority: 'medium' })
    setIsAddingNote(false)

    // Actualizar último contacto del cliente
    onUpdateClient(client.id, {
      lastContact: new Date().toISOString().split('T')[0]
    })

    toast.success({
      title: 'Nota agregada',
      description: 'La nota se ha agregado correctamente'
    })
  }

  const handleEditNote = async (noteId: string, updatedContent: string) => {
    setNotes(prev => prev.map(note => 
      note.id === noteId 
        ? { ...note, content: updatedContent, updatedAt: new Date().toISOString() }
        : note
    ))

    setEditingNote(null)
    toast.success({
      title: 'Nota actualizada',
      description: 'La nota se ha actualizado correctamente'
    })
  }

  const handleDeleteNote = async (noteId: string) => {
    setNotes(prev => prev.filter(note => note.id !== noteId))
    toast.success({
      title: 'Nota eliminada',
      description: 'La nota se ha eliminado correctamente'
    })
  }

  const getTypeIcon = (type: Note['type']) => {
    switch (type) {
      case 'call': return <Phone className="h-4 w-4 text-blue-600" />
      case 'email': return <Mail className="h-4 w-4 text-green-600" />
      case 'meeting': return <Calendar className="h-4 w-4 text-purple-600" />
      case 'follow-up': return <Clock className="h-4 w-4 text-orange-600" />
      case 'important': return <Star className="h-4 w-4 text-red-600" />
      default: return <MessageSquare className="h-4 w-4 text-gray-600" />
    }
  }

  const getTypeLabel = (type: Note['type']) => {
    switch (type) {
      case 'call': return 'Llamada'
      case 'email': return 'Email'
      case 'meeting': return 'Reunión'
      case 'follow-up': return 'Seguimiento'
      case 'important': return 'Importante'
      default: return 'General'
    }
  }

  const getPriorityColor = (priority: Note['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const filteredNotes = notes.filter(note => {
    const matchesType = filterType === '' || note.type === filterType
    const matchesPriority = filterPriority === '' || note.priority === filterPriority
    return matchesType && matchesPriority
  })

  if (!client) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <FileText className="h-6 w-6 text-blue-600 mr-2" />
            Notas y Seguimiento - {client.name}
          </DialogTitle>
          <DialogDescription>
            Gestiona las notas y el historial de interacciones con {client.company || client.name}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col h-[600px]">
          {/* Información del cliente */}
          <Card className="mb-4">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Building2 className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{client.name}</h3>
                    {client.company && (
                      <p className="text-sm text-gray-600">{client.company}</p>
                    )}
                    <p className="text-sm text-gray-500">{client.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="mb-1">
                    €{client.value.toLocaleString()}
                  </Badge>
                  <p className="text-xs text-gray-500">
                    Último contacto: {client.lastContact}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Filtros */}
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <Label htmlFor="filter-type">Tipo de nota</Label>
              <select
                id="filter-type"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todos los tipos</option>
                <option value="general">General</option>
                <option value="call">Llamada</option>
                <option value="email">Email</option>
                <option value="meeting">Reunión</option>
                <option value="follow-up">Seguimiento</option>
                <option value="important">Importante</option>
              </select>
            </div>
            <div className="flex-1">
              <Label htmlFor="filter-priority">Prioridad</Label>
              <select
                id="filter-priority"
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todas las prioridades</option>
                <option value="high">Alta</option>
                <option value="medium">Media</option>
                <option value="low">Baja</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button onClick={() => setIsAddingNote(true)} className="flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Nueva Nota
              </Button>
            </div>
          </div>

          {/* Lista de notas */}
          <div className="flex-1 overflow-y-auto space-y-3">
            {filteredNotes.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No hay notas para este cliente</p>
              </div>
            ) : (
              filteredNotes.map((note) => (
                <Card key={note.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {getTypeIcon(note.type)}
                          <span className="text-sm font-medium text-gray-900">
                            {getTypeLabel(note.type)}
                          </span>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getPriorityColor(note.priority)}`}
                          >
                            {note.priority === 'high' ? 'Alta' : 
                             note.priority === 'medium' ? 'Media' : 'Baja'} prioridad
                          </Badge>
                        </div>
                        
                        {editingNote?.id === note.id ? (
                          <div className="space-y-2">
                            <Textarea
                              value={editingNote.content}
                              onChange={(e) => setEditingNote(prev => 
                                prev ? { ...prev, content: e.target.value } : null
                              )}
                              rows={3}
                              className="w-full"
                            />
                            <div className="flex space-x-2">
                              <Button 
                                size="sm" 
                                onClick={() => handleEditNote(note.id, editingNote.content)}
                              >
                                <Save className="h-4 w-4 mr-1" />
                                Guardar
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => setEditingNote(null)}
                              >
                                <X className="h-4 w-4 mr-1" />
                                Cancelar
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-gray-700 whitespace-pre-wrap">{note.content}</p>
                        )}
                        
                        <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                          <span>Por {note.author}</span>
                          <div className="flex items-center space-x-4">
                            <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                            {note.updatedAt !== note.createdAt && (
                              <span>(editado)</span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {editingNote?.id !== note.id && (
                        <div className="flex space-x-1 ml-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingNote(note)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteNote(note.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Formulario para nueva nota */}
          {isAddingNote && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg">Nueva Nota</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="note-content">Contenido *</Label>
                  <Textarea
                    id="note-content"
                    value={newNote.content}
                    onChange={(e) => setNewNote(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Escribe tu nota aquí..."
                    rows={4}
                    className="w-full"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="note-type">Tipo</Label>
                    <select
                      id="note-type"
                      value={newNote.type}
                      onChange={(e) => setNewNote(prev => ({ ...prev, type: e.target.value as Note['type'] }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="general">General</option>
                      <option value="call">Llamada</option>
                      <option value="email">Email</option>
                      <option value="meeting">Reunión</option>
                      <option value="follow-up">Seguimiento</option>
                      <option value="important">Importante</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="note-priority">Prioridad</Label>
                    <select
                      id="note-priority"
                      value={newNote.priority}
                      onChange={(e) => setNewNote(prev => ({ ...prev, priority: e.target.value as Note['priority'] }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="low">Baja</option>
                      <option value="medium">Media</option>
                      <option value="high">Alta</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsAddingNote(false)
                      setNewNote({ content: '', type: 'general', priority: 'medium' })
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleAddNote}
                    disabled={!newNote.content.trim()}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar Nota
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
