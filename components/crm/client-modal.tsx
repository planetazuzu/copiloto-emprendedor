'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { 
  User, 
  Building2, 
  Mail, 
  Phone, 
  FileText,
  Loader2
} from 'lucide-react'
import { useFormValidation, commonValidationRules } from '@/lib/hooks/use-form-validation'
import { useApiError } from '@/lib/hooks/use-api-error'
import { FormErrorFallback } from '@/components/error-fallbacks'
import { Client } from '@/types'

interface ClientModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (client: Omit<Client, 'id' | 'createdAt'>) => void
  client?: Client | null
}

export function ClientModal({ isOpen, onClose, onSave, client }: ClientModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    status: 'lead' as 'lead' | 'qualified' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost',
    notes: '',
    potential: 'medium' as 'high' | 'medium' | 'low',
    source: '',
    value: 0,
    lastContact: new Date().toISOString().split('T')[0]
  })

  // Validación del formulario
  const validationRules = {
    name: { ...commonValidationRules.name },
    email: { ...commonValidationRules.email },
    company: { ...commonValidationRules.company },
    phone: { ...commonValidationRules.phone },
    notes: { ...commonValidationRules.description }
  }

  const { errors, validateForm, clearErrors, setError } = useFormValidation(validationRules)
  const { executeWithErrorHandling, isLoading } = useApiError()

  // Cargar datos del cliente si está editando
  useEffect(() => {
    if (client) {
      setFormData({
        name: client.name,
        company: client.company || '',
        email: client.email,
        phone: client.phone || '',
        status: client.status,
        notes: client.notes || '',
        potential: client.potential,
        source: client.source || '',
        value: client.value || 0,
        lastContact: client.lastContact
      })
    } else {
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        status: 'lead',
        notes: '',
        potential: 'medium',
        source: '',
        value: 0,
        lastContact: new Date().toISOString().split('T')[0]
      })
    }
  }, [client])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validar formulario
    if (!validateForm(formData)) {
      return
    }

    // Ejecutar con manejo de errores
    await executeWithErrorHandling(
      async () => {
        // Simular envío con posibilidad de error
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            // Simular error ocasional (10% de probabilidad)
            if (Math.random() < 0.1) {
              reject(new Error('Error de conexión. Intenta de nuevo.'))
            } else {
              resolve(true)
            }
          }, 1000)
        })
        
        onSave(formData)
      },
      {
        showToast: true,
        customErrorMessage: 'Error al guardar el cliente'
      }
    )
  }

  const handleClose = () => {
    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      status: 'lead',
      notes: '',
      potential: 'medium',
      source: '',
      value: 0,
      lastContact: new Date().toISOString().split('T')[0]
    })
    clearErrors()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <User className="h-6 w-6 mr-2" />
            {client ? 'Editar Cliente' : 'Nuevo Cliente'}
          </DialogTitle>
          <DialogDescription>
            {client ? 'Modifica los datos del cliente' : 'Agrega un nuevo cliente al CRM'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Mostrar errores de formulario */}
          {Object.keys(errors).length > 0 && (
            <FormErrorFallback errors={errors} />
          )}

          {/* Información básica */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Información Básica</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nombre *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, name: e.target.value }))
                      // Validación en tiempo real
                      if (e.target.value.trim()) {
                        setError('name', null)
                      }
                    }}
                    placeholder="Nombre completo"
                    className={`pl-10 ${errors.name ? 'border-red-500' : ''}`}
                    required
                  />
                </div>
                {errors.name && (
                  <p className="text-sm text-red-600 mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <Label htmlFor="company">Empresa</Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                    placeholder="Nombre de la empresa"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="email@empresa.com"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone">Teléfono</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+34 600 123 456"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Estado y potencial */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Estado y Potencial</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="status">Estado *</Label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="lead">Lead</option>
                  <option value="qualified">Calificado</option>
                  <option value="proposal">Propuesta</option>
                  <option value="negotiation">Negociación</option>
                  <option value="closed-won">Ganado</option>
                  <option value="closed-lost">Perdido</option>
                </select>
              </div>

              <div>
                <Label htmlFor="potential">Potencial</Label>
                <select
                  id="potential"
                  value={formData.potential}
                  onChange={(e) => setFormData(prev => ({ ...prev, potential: e.target.value as any }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Bajo potencial</option>
                  <option value="medium">Medio potencial</option>
                  <option value="high">Alto potencial</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="source">Fuente</Label>
                <Input
                  id="source"
                  value={formData.source}
                  onChange={(e) => setFormData(prev => ({ ...prev, source: e.target.value }))}
                  placeholder="Web, Referido, LinkedIn, Feria..."
                />
              </div>
              <div>
                <Label htmlFor="value">Valor (€)</Label>
                <Input
                  id="value"
                  type="number"
                  value={formData.value}
                  onChange={(e) => setFormData(prev => ({ ...prev, value: Number(e.target.value) }))}
                  placeholder="0"
                  min="0"
                />
              </div>
            </div>
          </div>

          {/* Notas */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Información Adicional</h3>
            
            <div>
              <Label htmlFor="notes">Notas</Label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Información adicional sobre el cliente, intereses, historial..."
                  rows={4}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={!formData.name || !formData.email || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Guardando...
                </>
              ) : (
                client ? 'Actualizar Cliente' : 'Crear Cliente'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
