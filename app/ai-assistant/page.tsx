'use client'

import { useState } from 'react'
import { AppLayout } from '@/components/layout/app-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Send, Bot, User, Sparkles, Lightbulb, BookOpen, TrendingUp, Target } from 'lucide-react'

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
  suggestions?: string[]
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: '¡Hola! Soy tu asistente de IA de Copiloto Emprendedor. Puedo ayudarte a resumir ayudas, analizar cursos, responder preguntas sobre emprendimiento y mucho más. ¿En qué puedo ayudarte hoy?',
      timestamp: new Date(),
      suggestions: [
        'Resumir una ayuda específica',
        'Analizar mi progreso en cursos',
        'Recomendaciones personalizadas',
        'Preguntas sobre emprendimiento'
      ]
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const quickActions = [
    {
      title: 'Resumir Ayuda',
      description: 'Analiza y resume cualquier ayuda o recurso',
      icon: BookOpen,
      prompt: 'Resume la siguiente ayuda: [pega aquí el texto de la ayuda]'
    },
    {
      title: 'Análisis de Progreso',
      description: 'Revisa tu progreso en cursos y recursos',
      icon: TrendingUp,
      prompt: 'Analiza mi progreso actual en los cursos y dame recomendaciones'
    },
    {
      title: 'Recomendaciones',
      description: 'Obtén sugerencias personalizadas',
      icon: Target,
      prompt: 'Basándote en mi perfil, ¿qué recursos me recomiendas?'
    },
    {
      title: 'Pregunta General',
      description: 'Haz cualquier pregunta sobre emprendimiento',
      icon: Lightbulb,
      prompt: '¿Cómo puedo mejorar mi plan de negocio?'
    }
  ]

  const handleSendMessage = async (message?: string) => {
    const messageToSend = message || inputMessage.trim()
    if (!messageToSend) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: messageToSend,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      // Simular respuesta de IA
      const response = await simulateAIResponse(messageToSend)
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response.content,
        timestamp: new Date(),
        suggestions: response.suggestions
      }

      setTimeout(() => {
        setMessages(prev => [...prev, assistantMessage])
        setIsLoading(false)
      }, 1500)
    } catch (error) {
      console.error('Error:', error)
      setIsLoading(false)
    }
  }

  const simulateAIResponse = async (message: string): Promise<{content: string, suggestions?: string[]}> => {
    // Simular diferentes tipos de respuestas según el contenido
    const lowerMessage = message.toLowerCase()
    
    if (lowerMessage.includes('resumir') || lowerMessage.includes('resumen')) {
      return {
        content: `He analizado el contenido que me has compartido. Aquí tienes un resumen estructurado:

**📋 Resumen Ejecutivo:**
- **Objetivo:** [Objetivo principal de la ayuda]
- **Beneficiarios:** [Quién puede acceder]
- **Plazo:** [Fecha límite de solicitud]
- **Importe:** [Cantidad o tipo de ayuda]

**🎯 Puntos Clave:**
• Requisitos principales: [Lista de requisitos]
• Documentación necesaria: [Documentos requeridos]
• Proceso de solicitud: [Pasos a seguir]

**💡 Recomendaciones:**
- [Sugerencia 1]
- [Sugerencia 2]
- [Sugerencia 3]

¿Te gustaría que profundice en algún aspecto específico?`,
        suggestions: ['Ver requisitos detallados', 'Proceso de solicitud', 'Documentación necesaria']
      }
    }
    
    if (lowerMessage.includes('progreso') || lowerMessage.includes('cursos')) {
      return {
        content: `📊 **Análisis de tu Progreso:**

**Cursos en Progreso:**
• Finanzas para emprendedores: 75% completado
• Marketing digital básico: 45% completado
• Gestión de equipos remotos: 0% completado

**Recomendaciones:**
1. **Prioriza** completar "Finanzas para emprendedores" - estás muy cerca del final
2. **Continúa** con "Marketing digital" - es fundamental para tu crecimiento
3. **Considera** empezar "Gestión de equipos" cuando tengas más tiempo

**Próximos Pasos Sugeridos:**
- Dedica 30 min/día a los cursos
- Aplica lo aprendido en tu negocio
- Completa al menos un curso por mes

¿Quieres que te ayude con algún tema específico de estos cursos?`,
        suggestions: ['Ver curso de finanzas', 'Continuar marketing digital', 'Plan de estudio']
      }
    }
    
    if (lowerMessage.includes('recomendación') || lowerMessage.includes('recomienda')) {
      return {
        content: `🎯 **Recomendaciones Personalizadas para ti:**

Basándome en tu perfil (Sector: Tecnología, Etapa: En crecimiento), te sugiero:

**📚 Cursos Prioritarios:**
1. **"Transformación Digital"** - Perfecto para tu sector
2. **"Gestión de Equipos Remotos"** - Esencial para startups tech
3. **"Ventas Consultivas"** - Para escalar tu negocio

**💰 Ayudas Relevantes:**
• Subvención para digitalización PYME (5.000€)
• Fondo de innovación tecnológica (25.000€)
• Ayuda para contratación de personal (3.000€)

**📈 Acciones Inmediatas:**
- Solicita la subvención de digitalización antes del 15/03
- Inicia el curso de transformación digital
- Prepara documentación para el fondo de innovación

¿Te interesa que profundice en alguna de estas recomendaciones?`,
        suggestions: ['Ver subvenciones', 'Iniciar curso', 'Preparar documentación']
      }
    }
    
    // Respuesta general
    return {
      content: `Entiendo tu consulta sobre "${message}". Como asistente de IA especializado en emprendimiento, puedo ayudarte con:

**🔍 Análisis y Resúmenes:**
- Resumir ayudas y recursos
- Analizar documentos empresariales
- Extraer información clave

**📊 Progreso y Recomendaciones:**
- Revisar tu avance en cursos
- Sugerir próximos pasos
- Personalizar recomendaciones

**💡 Asesoramiento:**
- Responder dudas sobre emprendimiento
- Ayudar con planificación
- Sugerir estrategias

¿Podrías ser más específico sobre lo que necesitas? Por ejemplo:
- "Resume esta ayuda: [texto]"
- "Analiza mi progreso en cursos"
- "¿Cómo puedo mejorar mi plan de negocio?"`,
      suggestions: ['Resumir ayuda', 'Ver progreso', 'Hacer pregunta específica']
    }
  }

  const handleQuickAction = (action: typeof quickActions[0]) => {
    setInputMessage(action.prompt)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion)
  }

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-4">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">IA Assistant</h1>
              <p className="text-gray-600">Tu asistente inteligente para el emprendimiento</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chat Area */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="border-b">
                <CardTitle className="flex items-center">
                  <Bot className="h-5 w-5 mr-2" />
                  Conversación
                </CardTitle>
                <CardDescription>
                  Chatea con tu asistente de IA
                </CardDescription>
              </CardHeader>
              
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <Avatar className="h-8 w-8 flex-shrink-0">
                        {message.type === 'user' ? (
                          <AvatarFallback className="bg-blue-600 text-white">
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        ) : (
                          <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div className={`ml-3 ${message.type === 'user' ? 'mr-3' : ''}`}>
                        <div
                          className={`p-3 rounded-lg ${
                            message.type === 'user'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        </div>
                        {message.suggestions && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {message.suggestions.map((suggestion, index) => (
                              <button
                                key={index}
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
                              >
                                {suggestion}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="ml-3">
                        <div className="bg-gray-100 p-3 rounded-lg">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              
              <div className="border-t p-4">
                <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex gap-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Escribe tu mensaje..."
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button type="submit" disabled={isLoading || !inputMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Acciones Rápidas</CardTitle>
                <CardDescription>
                  Funciones más utilizadas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickAction(action)}
                    className="w-full text-left p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start">
                      <action.icon className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-gray-900">{action.title}</h4>
                        <p className="text-sm text-gray-600">{action.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Capacidades de IA</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm">Resumir ayudas y recursos</span>
                  </div>
                  <div className="flex items-center">
                    <TrendingUp className="h-4 w-4 text-blue-600 mr-2" />
                    <span className="text-sm">Analizar progreso en cursos</span>
                  </div>
                  <div className="flex items-center">
                    <Target className="h-4 w-4 text-purple-600 mr-2" />
                    <span className="text-sm">Recomendaciones personalizadas</span>
                  </div>
                  <div className="flex items-center">
                    <Lightbulb className="h-4 w-4 text-yellow-600 mr-2" />
                    <span className="text-sm">Asesoramiento empresarial</span>
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
