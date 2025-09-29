'use client'

import { useState } from 'react'
import { AppLayout } from '@/components/layout/app-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Users, MessageCircle, Hash, Send, Search, Filter } from 'lucide-react'

export default function CommunityPage() {
  const [selectedChannel, setSelectedChannel] = useState('asesoria')
  const [newMessage, setNewMessage] = useState('')

  const channels = [
    {
      id: 'asesoria',
      name: 'Asesoría',
      description: 'Preguntas y respuestas sobre asesoría empresarial',
      messageCount: 1247,
      lastMessage: 'Hace 2 horas',
      isActive: true
    },
    {
      id: 'logistica',
      name: 'Logística',
      description: 'Discusiones sobre logística y cadena de suministro',
      messageCount: 892,
      lastMessage: 'Hace 1 hora',
      isActive: false
    },
    {
      id: 'finanzas',
      name: 'Finanzas',
      description: 'Todo sobre gestión financiera y contabilidad',
      messageCount: 1563,
      lastMessage: 'Hace 30 min',
      isActive: false
    },
    {
      id: 'marketing',
      name: 'Marketing',
      description: 'Estrategias de marketing y ventas',
      messageCount: 2104,
      lastMessage: 'Hace 15 min',
      isActive: false
    },
    {
      id: 'tecnologia',
      name: 'Tecnología',
      description: 'Herramientas tecnológicas para empresas',
      messageCount: 743,
      lastMessage: 'Hace 3 horas',
      isActive: false
    },
    {
      id: 'networking',
      name: 'Networking',
      description: 'Conecta con otros emprendedores',
      messageCount: 1892,
      lastMessage: 'Hace 45 min',
      isActive: false
    }
  ]

  const messages = {
    asesoria: [
      {
        id: 1,
        author: 'María González',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40',
        content: '¿Alguien conoce alguna subvención para digitalización de PYMEs?',
        timestamp: '14:30',
        isOwn: false
      },
      {
        id: 2,
        author: 'Carlos Ruiz',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40',
        content: 'Sí, hay una del Ministerio de Industria que puede darte hasta 5.000€. Te paso el enlace.',
        timestamp: '14:35',
        isOwn: false
      },
      {
        id: 3,
        author: 'Ana Martín',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40',
        content: 'También puedes revisar las ayudas de tu comunidad autónoma, suelen tener convocatorias específicas.',
        timestamp: '14:42',
        isOwn: false
      },
      {
        id: 4,
        author: 'Tú',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40',
        content: 'Perfecto, muchas gracias por la información. ¿Sabéis cuál es el plazo de presentación?',
        timestamp: '14:45',
        isOwn: true
      }
    ],
    logistica: [
      {
        id: 1,
        author: 'Roberto Silva',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40',
        content: '¿Qué proveedores de transporte recomendáis para envíos nacionales?',
        timestamp: '13:20',
        isOwn: false
      },
      {
        id: 2,
        author: 'Laura Fernández',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40',
        content: 'Depende del volumen, pero para envíos pequeños Correos Express está bien.',
        timestamp: '13:25',
        isOwn: false
      }
    ],
    finanzas: [
      {
        id: 1,
        author: 'David López',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40',
        content: '¿Alguien usa algún software de contabilidad que recomiende?',
        timestamp: '12:15',
        isOwn: false
      },
      {
        id: 2,
        author: 'Elena García',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40',
        content: 'Yo uso ContaSOL, es muy intuitivo y económico para pequeñas empresas.',
        timestamp: '12:18',
        isOwn: false
      }
    ]
  }

  const currentMessages = messages[selectedChannel as keyof typeof messages] || []

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      // En un proyecto real, aquí enviarías el mensaje al servidor
      console.log('Enviando mensaje:', newMessage)
      setNewMessage('')
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Comunidad B2B</h1>
          <p className="mt-2 text-gray-600">
            Conecta con otros emprendedores y comparte experiencias
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
          {/* Channels Sidebar */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Hash className="h-5 w-5 mr-2" />
                  Canales
                </CardTitle>
                <CardDescription>
                  Selecciona un canal para participar
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {channels.map((channel) => (
                    <button
                      key={channel.id}
                      onClick={() => setSelectedChannel(channel.id)}
                      className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
                        selectedChannel === channel.id ? 'bg-blue-50 border-r-2 border-blue-600' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 truncate">
                            #{channel.name}
                          </h3>
                          <p className="text-sm text-gray-500 truncate">
                            {channel.description}
                          </p>
                          <div className="flex items-center mt-1 text-xs text-gray-400">
                            <MessageCircle className="h-3 w-3 mr-1" />
                            {channel.messageCount} mensajes
                          </div>
                        </div>
                        {channel.isActive && (
                          <div className="w-2 h-2 bg-green-500 rounded-full ml-2" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-full flex flex-col">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <Hash className="h-5 w-5 mr-2" />
                      {channels.find(c => c.id === selectedChannel)?.name}
                    </CardTitle>
                    <CardDescription>
                      {channels.find(c => c.id === selectedChannel)?.description}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <Input
                        placeholder="Buscar mensajes..."
                        className="pl-10 w-64"
                      />
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {currentMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                    >
                      {!message.isOwn && (
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={message.avatar} />
                          <AvatarFallback className="text-xs">
                            {getInitials(message.author)}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.isOwn
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        {!message.isOwn && (
                          <p className="text-xs font-medium mb-1">{message.author}</p>
                        )}
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.isOwn ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>

              {/* Message Input */}
              <div className="border-t p-4">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Escribe un mensaje..."
                    className="flex-1"
                  />
                  <Button type="submit" disabled={!newMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </Card>
          </div>
        </div>

        {/* Community Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">2,847</div>
              <div className="text-sm text-gray-600">Miembros activos</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <MessageCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">15,234</div>
              <div className="text-sm text-gray-600">Mensajes enviados</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Hash className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">6</div>
              <div className="text-sm text-gray-600">Canales activos</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}
