'use client'

import { AppLayout } from '@/components/layout/app-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Sparkles, 
  BookOpen, 
  FileText, 
  GraduationCap, 
  Target, 
  Lightbulb,
  CheckCircle,
  ArrowRight,
  Database,
  Brain,
  Shield,
  Zap
} from 'lucide-react'
import Link from 'next/link'

export default function AIGuidePage() {
  const capabilities = [
    {
      icon: BookOpen,
      title: 'Análisis de Ayudas y Subvenciones',
      description: 'Procesa y resume automáticamente ayudas de instituciones oficiales',
      examples: [
        'Resumir subvenciones del Ministerio de Industria',
        'Extraer requisitos de ayudas de la UE',
        'Analizar convocatorias de comunidades autónomas'
      ]
    },
    {
      icon: FileText,
      title: 'Procesamiento de Documentos PDF',
      description: 'Lee y analiza documentos oficiales, guías y normativas',
      examples: [
        'Interpretar guías de solicitud de ayudas',
        'Extraer información clave de normativas',
        'Resumir documentos técnicos complejos'
      ]
    },
    {
      icon: GraduationCap,
      title: 'Análisis de Cursos y Formación',
      description: 'Evalúa contenido educativo y proporciona recomendaciones',
      examples: [
        'Analizar contenido de cursos online',
        'Sugerir itinerarios formativos personalizados',
        'Evaluar progreso y competencias'
      ]
    },
    {
      icon: Target,
      title: 'Recomendaciones Personalizadas',
      description: 'Sugiere recursos basados en tu perfil y necesidades',
      examples: [
        'Recomendar ayudas específicas para tu sector',
        'Sugerir cursos según tu etapa empresarial',
        'Identificar oportunidades de financiación'
      ]
    }
  ]

  const dataSources = [
    {
      institution: 'Ministerio de Industria, Comercio y Turismo',
      type: 'Subvenciones y ayudas',
      examples: ['Plan de Recuperación', 'Programa Kit Digital', 'Ayudas I+D+i']
    },
    {
      institution: 'Comisión Europea',
      type: 'Fondos europeos',
      examples: ['Horizon Europe', 'FEDER', 'Programa COSME']
    },
    {
      institution: 'Comunidades Autónomas',
      type: 'Ayudas regionales',
      examples: ['Madrid Emprende', 'Catalunya Emprèn', 'Andalucía Emprende']
    },
    {
      institution: 'Instituciones Financieras',
      type: 'Productos financieros',
      examples: ['ICO', 'ENISA', 'Fondos de inversión']
    },
    {
      institution: 'Cámaras de Comercio',
      type: 'Servicios y formación',
      examples: ['Cursos especializados', 'Asesoramiento', 'Networking']
    }
  ]

  const useCases = [
    {
      title: 'Resumir una Subvención Compleja',
      description: 'Pega el texto de cualquier ayuda y obtén un resumen estructurado con requisitos, plazos y recomendaciones.',
      prompt: 'Resume esta subvención: [pega aquí el texto completo]',
      result: 'Obtienes un resumen ejecutivo con objetivos, beneficios, requisitos y próximos pasos.'
    },
    {
      title: 'Analizar tu Progreso',
      description: 'Revisa tu avance en cursos y recursos para obtener recomendaciones personalizadas.',
      prompt: 'Analiza mi progreso actual y dame recomendaciones',
      result: 'Recibes un análisis detallado con sugerencias de próximos pasos y recursos relevantes.'
    },
    {
      title: 'Buscar Oportunidades',
      description: 'Describe tu situación y obtén recomendaciones específicas de ayudas y recursos.',
      prompt: 'Soy una startup de tecnología en crecimiento, ¿qué ayudas me recomiendas?',
      result: 'Obtienes una lista personalizada de ayudas, cursos y recursos adaptados a tu perfil.'
    },
    {
      title: 'Interpretar Documentación',
      description: 'Sube o pega documentos oficiales para obtener explicaciones claras y accionables.',
      prompt: 'Explica este documento: [pega el contenido del PDF o documento]',
      result: 'Recibes una explicación clara con puntos clave, requisitos y pasos a seguir.'
    }
  ]

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mr-4">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Guía del IA Assistant</h1>
              <p className="text-xl text-gray-600">Tu asistente especializado en emprendimiento</p>
            </div>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-700 mb-6">
              Nuestro IA Assistant no es una inteligencia artificial genérica. Es un sistema especializado 
              <strong className="text-blue-600"> entrenado específicamente con recursos, documentos y guías</strong> 
              de instituciones oficiales de emprendimiento.
            </p>
            
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center">
                <Database className="h-5 w-5 mr-2 text-blue-600" />
                <span>Base de datos especializada</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-green-600" />
                <span>Fuentes oficiales verificadas</span>
              </div>
              <div className="flex items-center">
                <Zap className="h-5 w-5 mr-2 text-purple-600" />
                <span>Respuestas contextualizadas</span>
              </div>
            </div>
          </div>
        </div>

        {/* ¿Qué hace especial a nuestra IA? */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Sparkles className="h-6 w-6 mr-3 text-blue-600" />
              ¿Qué hace especial a nuestra IA?
            </CardTitle>
            <CardDescription className="text-lg">
              No es solo un chatbot. Es un experto en emprendimiento con acceso a información oficial.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">🧠 Entrenamiento Especializado</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Entrenada con miles de documentos oficiales de instituciones de emprendimiento</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Conoce las últimas convocatorias y ayudas disponibles</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Entiende la terminología y procesos específicos del emprendimiento</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">📚 Fuentes de Información</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Documentos oficiales de ministerios y organismos públicos</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Guías y manuales de instituciones de apoyo al emprendimiento</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Normativas y regulaciones actualizadas</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Capacidades */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Capacidades Especializadas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {capabilities.map((capability, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <capability.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">{capability.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    {capability.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold text-gray-900 mb-3">Ejemplos de uso:</h4>
                  <ul className="space-y-2">
                    {capability.examples.map((example, idx) => (
                      <li key={idx} className="flex items-start">
                        <ArrowRight className="h-4 w-4 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{example}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Fuentes de datos */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Fuentes de Información Oficiales</CardTitle>
            <CardDescription>
              Nuestra IA está entrenada con datos de instituciones reconocidas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dataSources.map((source, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{source.institution}</h3>
                  <Badge variant="outline" className="mb-3">{source.type}</Badge>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Ejemplos:</h4>
                    <ul className="space-y-1">
                      {source.examples.map((example, idx) => (
                        <li key={idx} className="text-sm text-gray-600">• {example}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Casos de uso prácticos */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Casos de Uso Prácticos</h2>
          <div className="space-y-6">
            {useCases.map((useCase, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{useCase.title}</h3>
                      <p className="text-gray-600">{useCase.description}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">💬 Prompt sugerido:</h4>
                      <div className="bg-gray-100 p-3 rounded-lg">
                        <code className="text-sm text-gray-700">{useCase.prompt}</code>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">✅ Resultado:</h4>
                      <p className="text-sm text-gray-600">{useCase.result}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">¿Listo para probar el IA Assistant?</h2>
            <p className="text-lg mb-6 opacity-90">
              Descubre cómo puede ayudarte a encontrar las mejores oportunidades para tu negocio
            </p>
            <Link href="/ai-assistant">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Sparkles className="h-5 w-5 mr-2" />
                Ir al IA Assistant
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
