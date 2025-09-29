'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Sparkles, 
  BookOpen, 
  GraduationCap, 
  Users, 
  User, 
  ArrowRight, 
  CheckCircle,
  X,
  Home,
  Target,
  Lightbulb
} from 'lucide-react'
import Link from 'next/link'

interface OnboardingModalProps {
  isOpen: boolean
  onClose: () => void
  userName?: string
}

export function OnboardingModal({ isOpen, onClose, userName }: OnboardingModalProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      title: '¡Bienvenido a Copiloto Emprendedor!',
      subtitle: `Hola ${userName || 'Emprendedor'}, te guiaremos en tu primera experiencia`,
      content: (
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto">
            <Sparkles className="h-10 w-10 text-white" />
          </div>
          <p className="text-lg text-gray-600">
            Somos tu asistente inteligente especializado en emprendimiento, entrenado con recursos oficiales 
            de instituciones como el Ministerio de Industria, la UE y comunidades autónomas.
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-1 text-green-600" />
              <span>IA especializada</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-1 text-green-600" />
              <span>Recursos oficiales</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-1 text-green-600" />
              <span>Recomendaciones personalizadas</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Tu Dashboard Personalizado',
      subtitle: 'Aquí encontrarás todo lo que necesitas para tu emprendimiento',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold">Ayudas y Recursos</h3>
              <p className="text-sm text-gray-600">Subvenciones, ayudas y financiación</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <GraduationCap className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold">Cursos Especializados</h3>
              <p className="text-sm text-gray-600">Formación adaptada a tu sector</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold">Comunidad B2B</h3>
              <p className="text-sm text-gray-600">Conecta con otros emprendedores</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Sparkles className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <h3 className="font-semibold">IA Assistant</h3>
              <p className="text-sm text-gray-600">Tu experto en emprendimiento</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'IA Assistant: Tu Experto Personal',
      subtitle: 'La herramienta más poderosa de la plataforma',
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-3">¿Qué puede hacer por ti?</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span><strong>Resumir ayudas:</strong> Pega cualquier subvención y obtén un resumen estructurado</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span><strong>Analizar tu progreso:</strong> Revisa tu avance en cursos y recursos</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span><strong>Recomendaciones personalizadas:</strong> Sugerencias basadas en tu perfil</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span><strong>Asesoramiento experto:</strong> Respuestas a tus dudas empresariales</span>
              </li>
            </ul>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-3">Ejemplo de uso:</p>
            <div className="bg-gray-100 p-3 rounded-lg text-left">
              <code className="text-sm">"Resume esta subvención: [pega aquí el texto de cualquier ayuda]"</code>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Primeros Pasos Recomendados',
      subtitle: 'Te sugerimos empezar por estas acciones',
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center p-3 border rounded-lg hover:bg-gray-50">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-blue-600 font-semibold">1</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Completa tu perfil</h3>
                <p className="text-sm text-gray-600">Añade tu sector y etapa para recibir recomendaciones personalizadas</p>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400" />
            </div>
            
            <div className="flex items-center p-3 border rounded-lg hover:bg-gray-50">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-green-600 font-semibold">2</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Explora las ayudas disponibles</h3>
                <p className="text-sm text-gray-600">Descubre subvenciones y recursos para tu sector</p>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400" />
            </div>
            
            <div className="flex items-center p-3 border rounded-lg hover:bg-gray-50">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-purple-600 font-semibold">3</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Prueba el IA Assistant</h3>
                <p className="text-sm text-gray-600">Haz tu primera consulta y descubre su potencial</p>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      )
    }
  ]

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onClose()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const skipTutorial = () => {
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="pr-8">
            <CardTitle className="text-2xl">{steps[currentStep].title}</CardTitle>
            <CardDescription className="text-lg">{steps[currentStep].subtitle}</CardDescription>
          </div>
          
          {/* Progress bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Paso {currentStep + 1} de {steps.length}</span>
              <span>{Math.round(((currentStep + 1) / steps.length) * 100)}% completado</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {steps[currentStep].content}
          
          <div className="flex justify-between pt-4">
            <div>
              {currentStep > 0 && (
                <Button variant="outline" onClick={prevStep}>
                  Anterior
                </Button>
              )}
            </div>
            
            <div className="flex space-x-3">
              <Button variant="ghost" onClick={skipTutorial}>
                Saltar tutorial
              </Button>
              <Button onClick={nextStep}>
                {currentStep === steps.length - 1 ? '¡Comenzar!' : 'Siguiente'}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
