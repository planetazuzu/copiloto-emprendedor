'use client'

import { useState } from 'react'
import { AppLayout } from '@/components/layout/app-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { User, Mail, Building, Target, Settings, Save, Camera } from 'lucide-react'
import { useAppStore } from '@/lib/store'

export default function ProfilePage() {
  const { user, setUser } = useAppStore()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    sector: user?.sector || '',
    stage: user?.stage || '',
    needs: user?.needs || ''
  })

  const handleSave = () => {
    if (user) {
      setUser({
        ...user,
        ...formData,
        updatedAt: new Date()
      })
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      sector: user?.sector || '',
      stage: user?.stage || '',
      needs: user?.needs || ''
    })
    setIsEditing(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Solo tengo una idea': return 'bg-blue-100 text-blue-800'
      case 'Startup temprana': return 'bg-green-100 text-green-800'
      case 'En crecimiento': return 'bg-yellow-100 text-yellow-800'
      case 'Empresa establecida': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mi Perfil</h1>
          <p className="mt-2 text-gray-600">
            Gestiona tu información personal y preferencias
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="relative inline-block">
                  <Avatar className="h-24 w-24 mx-auto mb-4">
                    <AvatarImage src={user?.image} />
                    <AvatarFallback className="text-lg">
                      {getInitials(user?.name || 'U')}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700">
                      <Camera className="h-4 w-4" />
                    </button>
                  )}
                </div>
                
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {isEditing ? formData.name : user?.name || 'Usuario'}
                </h2>
                <p className="text-gray-600 mb-4">{user?.email}</p>
                
                <div className="space-y-2">
                  <Badge className={getStageColor(user?.stage || '')}>
                    {user?.stage || 'No especificado'}
                  </Badge>
                  <p className="text-sm text-gray-500">{user?.sector || 'Sector no especificado'}</p>
                </div>

                <div className="mt-6">
                  <Button
                    onClick={() => setIsEditing(!isEditing)}
                    variant={isEditing ? "outline" : "default"}
                    className="w-full"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    {isEditing ? 'Cancelar' : 'Editar perfil'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Información personal</CardTitle>
                <CardDescription>
                  Actualiza tu información para recibir recomendaciones más precisas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nombre completo</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="Tu nombre completo"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sector">Sector de actividad</Label>
                    <select
                      id="sector"
                      name="sector"
                      value={formData.sector}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    >
                      <option value="">Selecciona tu sector</option>
                      <option value="tecnologia">Tecnología</option>
                      <option value="retail">Retail</option>
                      <option value="servicios">Servicios</option>
                      <option value="manufactura">Manufactura</option>
                      <option value="salud">Salud</option>
                      <option value="educacion">Educación</option>
                      <option value="finanzas">Finanzas</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="stage">Etapa de tu empresa</Label>
                    <select
                      id="stage"
                      name="stage"
                      value={formData.stage}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    >
                      <option value="">Selecciona la etapa</option>
                      <option value="Solo tengo una idea">Solo tengo una idea</option>
                      <option value="Startup temprana">Startup temprana</option>
                      <option value="En crecimiento">En crecimiento</option>
                      <option value="Empresa establecida">Empresa establecida</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="needs">Necesidades específicas</Label>
                  <textarea
                    id="needs"
                    name="needs"
                    value={formData.needs}
                    onChange={handleChange}
                    disabled={!isEditing}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    placeholder="Describe qué tipo de ayuda necesitas (financiación, formación, networking, etc.)"
                  />
                </div>

                {isEditing && (
                  <div className="flex gap-4 pt-4">
                    <Button onClick={handleSave} className="flex-1">
                      <Save className="h-4 w-4 mr-2" />
                      Guardar cambios
                    </Button>
                    <Button onClick={handleCancel} variant="outline" className="flex-1">
                      Cancelar
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Activity Summary */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Resumen de actividad</CardTitle>
                <CardDescription>
                  Tu progreso en la plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">12</div>
                    <div className="text-sm text-gray-600">Ayudas guardadas</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">3</div>
                    <div className="text-sm text-gray-600">Cursos completados</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">5</div>
                    <div className="text-sm text-gray-600">Cursos en progreso</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">28</div>
                    <div className="text-sm text-gray-600">Días activo</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
