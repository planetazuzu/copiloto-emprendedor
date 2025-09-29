'use client'

import { useState } from 'react'
import { AppLayout } from '@/components/layout/app-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, X, Star, CreditCard, Zap, Users, BookOpen, GraduationCap } from 'lucide-react'

export default function BillingPage() {
  const [selectedPlan, setSelectedPlan] = useState('free')
  const [isLoading, setIsLoading] = useState(false)

  const plans = [
    {
      id: 'free',
      name: 'Gratuito',
      price: 0,
      period: 'para siempre',
      description: 'Perfecto para empezar tu viaje emprendedor',
      features: [
        'Acceso a 10 ayudas por mes',
        '2 cursos básicos',
        'Comunidad B2B limitada',
        'Soporte por email',
        'Dashboard básico'
      ],
      limitations: [
        'Sin resúmenes de IA',
        'Sin recomendaciones personalizadas',
        'Sin acceso a cursos premium'
      ],
      isPopular: false,
      buttonText: 'Plan actual',
      buttonVariant: 'outline' as const,
      isCurrent: true
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 29,
      period: 'por mes',
      description: 'Para emprendedores serios que quieren crecer',
      features: [
        'Acceso ilimitado a todas las ayudas',
        'Catálogo completo de cursos',
        'Comunidad B2B completa',
        'Resúmenes de IA personalizados',
        'Recomendaciones inteligentes',
        'Soporte prioritario',
        'Dashboard avanzado',
        'Análisis de progreso',
        'Certificados de cursos',
        'Acceso a webinars exclusivos'
      ],
      limitations: [],
      isPopular: true,
      buttonText: 'Actualizar a Premium',
      buttonVariant: 'default' as const,
      isCurrent: false
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 99,
      period: 'por mes',
      description: 'Para equipos y organizaciones',
      features: [
        'Todo lo de Premium',
        'Gestión de equipos',
        'Analytics avanzados',
        'API personalizada',
        'Soporte dedicado',
        'Integraciones personalizadas',
        'Capacitación en vivo',
        'SLA garantizado'
      ],
      limitations: [],
      isPopular: false,
      buttonText: 'Contactar ventas',
      buttonVariant: 'outline' as const,
      isCurrent: false
    }
  ]

  const currentPlan = plans.find(plan => plan.isCurrent)

  const handleUpgrade = async (planId: string) => {
    setIsLoading(true)
    
    // Simular proceso de actualización
    setTimeout(() => {
      alert(`¡Perfecto! Has actualizado al plan ${plans.find(p => p.id === planId)?.name}. En un proyecto real, aquí se procesaría el pago con Stripe.`)
      setIsLoading(false)
    }, 2000)
  }

  const handleContactSales = () => {
    alert('Redirigiendo al formulario de contacto... En un proyecto real, aquí se abriría un formulario o se redirigiría a una página de contacto.')
  }

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Planes y Precios</h1>
          <p className="mt-2 text-gray-600">
            Elige el plan que mejor se adapte a tus necesidades emprendedoras
          </p>
        </div>

        {/* Current Plan Status */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Plan actual</h2>
                <p className="text-gray-600">Estás usando el plan Gratuito</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">€0</div>
                <div className="text-sm text-gray-600">por mes</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative ${plan.isPopular ? 'ring-2 ring-blue-600 shadow-lg' : ''}`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white px-4 py-1">
                    <Star className="h-3 w-3 mr-1" />
                    Más popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">€{plan.price}</span>
                  <span className="text-gray-600">/{plan.period}</span>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  {/* Features */}
                  <div className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <Check className="h-4 w-4 text-green-600 mr-3 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Limitations */}
                  {plan.limitations.length > 0 && (
                    <div className="space-y-3 pt-4 border-t">
                      {plan.limitations.map((limitation, index) => (
                        <div key={index} className="flex items-center">
                          <X className="h-4 w-4 text-red-500 mr-3 flex-shrink-0" />
                          <span className="text-sm text-gray-500">{limitation}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Button */}
                  <Button
                    className={`w-full mt-6 ${
                      plan.id === 'free' ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    variant={plan.buttonVariant}
                    disabled={plan.id === 'free'}
                    onClick={() => handleUpgrade(plan.id)}
                  >
                    {plan.buttonText}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feature Comparison */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Comparación de características</CardTitle>
            <CardDescription>
              Ve todas las diferencias entre nuestros planes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Característica</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-900">Gratuito</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-900">Premium</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-900">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="py-3 px-4 font-medium text-gray-900">Ayudas disponibles</td>
                    <td className="py-3 px-4 text-center">10/mes</td>
                    <td className="py-3 px-4 text-center">Ilimitadas</td>
                    <td className="py-3 px-4 text-center">Ilimitadas</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-gray-900">Cursos</td>
                    <td className="py-3 px-4 text-center">2 básicos</td>
                    <td className="py-3 px-4 text-center">Todos</td>
                    <td className="py-3 px-4 text-center">Todos + exclusivos</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-gray-900">IA Assistant</td>
                    <td className="py-3 px-4 text-center">
                      <X className="h-4 w-4 text-red-500 mx-auto" />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Check className="h-4 w-4 text-green-600 mx-auto" />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Check className="h-4 w-4 text-green-600 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-gray-900">Comunidad B2B</td>
                    <td className="py-3 px-4 text-center">Limitada</td>
                    <td className="py-3 px-4 text-center">Completa</td>
                    <td className="py-3 px-4 text-center">Completa + privada</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-gray-900">Soporte</td>
                    <td className="py-3 px-4 text-center">Email</td>
                    <td className="py-3 px-4 text-center">Prioritario</td>
                    <td className="py-3 px-4 text-center">Dedicado</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card>
          <CardHeader>
            <CardTitle>Preguntas frecuentes</CardTitle>
            <CardDescription>
              Resolvemos las dudas más comunes sobre nuestros planes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">
                  ¿Puedo cambiar de plan en cualquier momento?
                </h3>
                <p className="text-gray-600">
                  Sí, puedes actualizar o degradar tu plan en cualquier momento. Los cambios se aplicarán en tu próximo ciclo de facturación.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">
                  ¿Hay período de prueba gratuito?
                </h3>
                <p className="text-gray-600">
                  Ofrecemos 14 días de prueba gratuita para el plan Premium. No se requiere tarjeta de crédito.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">
                  ¿Qué métodos de pago aceptan?
                </h3>
                <p className="text-gray-600">
                  Aceptamos todas las tarjetas de crédito principales, PayPal y transferencias bancarias para planes Enterprise.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
