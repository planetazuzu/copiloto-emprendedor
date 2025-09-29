import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { text, type = 'general', context } = await request.json()

    if (!text) {
      return NextResponse.json(
        { error: 'El texto es requerido' },
        { status: 400 }
      )
    }

    // Simular procesamiento de IA (en un proyecto real usarías OpenAI, Claude, etc.)
    const response = await generateAIResponse(text, type, context)

    return NextResponse.json({
      success: true,
      data: {
        originalText: text,
        response: response.content,
        type: type,
        confidence: response.confidence,
        suggestions: response.suggestions,
        processingTime: Math.random() * 1000 + 500 // 500-1500ms
      }
    })
  } catch (error) {
    console.error('Error en endpoint de IA:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

async function generateAIResponse(text: string, type: string, context?: any) {
  // Simular diferentes tipos de respuestas según el contexto
  const lowerText = text.toLowerCase()
  
  if (type === 'summary' || lowerText.includes('resumir') || lowerText.includes('resumen')) {
    return {
      content: generateSummary(text),
      confidence: 0.9,
      suggestions: ['Ver requisitos detallados', 'Proceso de solicitud', 'Documentación necesaria']
    }
  }
  
  if (type === 'analysis' || lowerText.includes('analizar') || lowerText.includes('análisis')) {
    return {
      content: generateAnalysis(text, context),
      confidence: 0.85,
      suggestions: ['Ver recomendaciones', 'Próximos pasos', 'Recursos relacionados']
    }
  }
  
  if (type === 'recommendation' || lowerText.includes('recomendar') || lowerText.includes('recomendación')) {
    return {
      content: generateRecommendations(text, context),
      confidence: 0.8,
      suggestions: ['Ver recursos sugeridos', 'Aplicar recomendaciones', 'Hacer seguimiento']
    }
  }
  
  // Respuesta general
  return {
    content: generateGeneralResponse(text),
    confidence: 0.75,
    suggestions: ['Hacer pregunta específica', 'Ver ejemplos', 'Obtener más información']
  }
}

function generateSummary(text: string): string {
  return `**📋 Resumen Ejecutivo:**

**🎯 Objetivo Principal:**
${extractObjective(text)}

**💰 Beneficios:**
• ${getRandomBenefit()}
• ${getRandomBenefit()}
• ${getRandomBenefit()}

**📅 Información Clave:**
• **Plazo:** ${getRandomDeadline()}
• **Importe:** ${getRandomAmount()}
• **Sector:** ${getRandomSector()}

**📋 Requisitos Principales:**
${getRandomRequirements()}

**💡 Recomendaciones:**
1. ${getRandomRecommendation()}
2. ${getRandomRecommendation()}
3. ${getRandomRecommendation()}

¿Te gustaría que profundice en algún aspecto específico?`
}

function generateAnalysis(text: string, context?: any): string {
  return `**📊 Análisis Detallado:**

**🔍 Puntos Clave Identificados:**
• ${getRandomAnalysisPoint()}
• ${getRandomAnalysisPoint()}
• ${getRandomAnalysisPoint()}

**📈 Oportunidades:**
${getRandomOpportunity()}

**⚠️ Consideraciones Importantes:**
${getRandomConsideration()}

**🎯 Próximos Pasos Sugeridos:**
1. ${getRandomNextStep()}
2. ${getRandomNextStep()}
3. ${getRandomNextStep()}

**📊 Nivel de Relevancia:** ${getRandomRelevance()}%`
}

function generateRecommendations(text: string, context?: any): string {
  return `**🎯 Recomendaciones Personalizadas:**

**📚 Recursos Prioritarios:**
1. **${getRandomResource()}"** - ${getRandomResourceDescription()}
2. **${getRandomResource()}"** - ${getRandomResourceDescription()}
3. **${getRandomResource()}"** - ${getRandomResourceDescription()}

**📈 Acciones Inmediatas:**
• ${getRandomAction()}
• ${getRandomAction()}
• ${getRandomAction()}

**⏰ Cronograma Sugerido:**
• **Esta semana:** ${getRandomWeeklyAction()}
• **Este mes:** ${getRandomMonthlyAction()}
• **Próximos 3 meses:** ${getRandomQuarterlyAction()}

**💡 Consejos Adicionales:**
${getRandomTip()}

¿Quieres que profundice en alguna de estas recomendaciones?`
}

function generateGeneralResponse(text: string): string {
  return `He analizado tu consulta sobre "${text}". Como asistente de IA especializado en emprendimiento, puedo ayudarte con:

**🔍 Análisis y Resúmenes:**
• Resumir ayudas y recursos
• Analizar documentos empresariales
• Extraer información clave

**📊 Progreso y Recomendaciones:**
• Revisar tu avance en cursos
• Sugerir próximos pasos
• Personalizar recomendaciones

**💡 Asesoramiento:**
• Responder dudas sobre emprendimiento
• Ayudar con planificación
• Sugerir estrategias

¿Podrías ser más específico sobre lo que necesitas? Por ejemplo:
• "Resume esta ayuda: [texto]"
• "Analiza mi progreso en cursos"
• "¿Cómo puedo mejorar mi plan de negocio?"`
}

function extractObjective(text: string): string {
  const objectives = [
    'Apoyar la digitalización de pequeñas y medianas empresas',
    'Fomentar la innovación tecnológica en el sector empresarial',
    'Facilitar el acceso a financiación para emprendedores',
    'Promover la internacionalización de empresas',
    'Impulsar la creación de empleo joven'
  ]
  return objectives[Math.floor(Math.random() * objectives.length)]
}

function getRandomBenefit(): string {
  const benefits = [
    'Financiación directa para tu proyecto',
    'Reducción de costes operativos',
    'Acceso a redes de contactos profesionales',
    'Formación especializada incluida',
    'Asesoramiento técnico gratuito'
  ]
  return benefits[Math.floor(Math.random() * benefits.length)]
}

function getRandomRecommendation(): string {
  const recommendations = [
    'Prepara toda la documentación con antelación',
    'Contacta con un asesor especializado',
    'Revisa los criterios de elegibilidad detalladamente',
    'Presenta la solicitud lo antes posible',
    'Considera alternativas complementarias'
  ]
  return recommendations[Math.floor(Math.random() * recommendations.length)]
}

function getRandomAnalysisPoint(): string {
  const points = [
    'Alto potencial de impacto en tu sector',
    'Requisitos accesibles para tu perfil empresarial',
    'Plazo de solicitud favorable',
    'Importe significativo para tu proyecto',
    'Proceso de evaluación transparente'
  ]
  return points[Math.floor(Math.random() * points.length)]
}

function getRandomOpportunity(): string {
  const opportunities = [
    'Posibilidad de obtener financiación adicional',
    'Acceso a programas de seguimiento',
    'Networking con otros beneficiarios',
    'Visibilidad en el ecosistema emprendedor',
    'Oportunidad de escalar tu negocio'
  ]
  return opportunities[Math.floor(Math.random() * opportunities.length)]
}

function getRandomConsideration(): string {
  const considerations = [
    'Competencia alta por el número limitado de plazas',
    'Documentación compleja que requiere tiempo de preparación',
    'Criterios de evaluación muy específicos',
    'Plazos de resolución pueden ser largos',
    'Necesidad de justificar el impacto del proyecto'
  ]
  return considerations[Math.floor(Math.random() * considerations.length)]
}

function getRandomNextStep(): string {
  const steps = [
    'Revisar todos los requisitos detalladamente',
    'Preparar la documentación necesaria',
    'Contactar con el organismo gestor',
    'Definir el cronograma de ejecución',
    'Buscar asesoramiento especializado'
  ]
  return steps[Math.floor(Math.random() * steps.length)]
}

function getRandomRelevance(): number {
  return Math.floor(Math.random() * 30) + 70 // 70-100%
}

function getRandomResource(): string {
  const resources = [
    'Curso de Finanzas Empresariales',
    'Subvención para Digitalización',
    'Programa de Mentoría',
    'Ayuda para Exportación',
    'Fondo de Innovación'
  ]
  return resources[Math.floor(Math.random() * resources.length)]
}

function getRandomResourceDescription(): string {
  const descriptions = [
    'Perfecto para tu nivel y sector',
    'Alta compatibilidad con tu perfil',
    'Recomendado por expertos del sector',
    'Ideal para tu etapa empresarial',
    'Muy valorado por otros emprendedores'
  ]
  return descriptions[Math.floor(Math.random() * descriptions.length)]
}

function getRandomAction(): string {
  const actions = [
    'Solicitar información adicional',
    'Preparar documentación básica',
    'Contactar con otros beneficiarios',
    'Definir objetivos específicos',
    'Crear un plan de seguimiento'
  ]
  return actions[Math.floor(Math.random() * actions.length)]
}

function getRandomWeeklyAction(): string {
  const weekly = [
    'Reunir documentación inicial',
    'Contactar con asesores',
    'Definir objetivos del proyecto',
    'Investigar casos de éxito',
    'Preparar presentación inicial'
  ]
  return weekly[Math.floor(Math.random() * weekly.length)]
}

function getRandomMonthlyAction(): string {
  const monthly = [
    'Completar solicitud formal',
    'Implementar mejoras sugeridas',
    'Establecer métricas de seguimiento',
    'Crear red de contactos',
    'Desarrollar plan de ejecución'
  ]
  return monthly[Math.floor(Math.random() * monthly.length)]
}

function getRandomQuarterlyAction(): string {
  const quarterly = [
    'Evaluar resultados obtenidos',
    'Planificar siguiente fase',
    'Expandir a nuevos mercados',
    'Optimizar procesos implementados',
    'Buscar nuevas oportunidades'
  ]
  return quarterly[Math.floor(Math.random() * quarterly.length)]
}

function getRandomTip(): string {
  const tips = [
    'Mantén un registro detallado de todos los procesos',
    'No subestimes el tiempo de preparación de documentación',
    'Considera el valor a largo plazo, no solo el beneficio inmediato',
    'Aprovecha las oportunidades de networking que ofrecen estos programas',
    'Sé específico y cuantificable en tus objetivos'
  ]
  return tips[Math.floor(Math.random() * tips.length)]
}

function getRandomAmount(): string {
  const amounts = ['2.000', '5.000', '10.000', '15.000', '25.000']
  return amounts[Math.floor(Math.random() * amounts.length)]
}

function getRandomSector(): string {
  const sectors = ['tecnología', 'retail', 'servicios', 'manufactura', 'salud']
  return sectors[Math.floor(Math.random() * sectors.length)]
}

function getRandomDeadline(): string {
  const deadlines = ['hasta el 15 de marzo', 'hasta el 30 de abril', 'hasta el 1 de junio', 'hasta final de año']
  return deadlines[Math.floor(Math.random() * deadlines.length)]
}

function getRandomStage(): string {
  const stages = ['startup temprana', 'crecimiento', 'consolidación', 'expansión']
  return stages[Math.floor(Math.random() * stages.length)]
}

function getRandomRequirements(): string {
  const requirements = [
    'ser PYME constituida, tener menos de 50 empleados',
    'facturación anual inferior a 10M€, estar al corriente de pagos',
    'proyecto innovador, plan de negocio detallado',
    'certificado de antigüedad, memoria técnica'
  ]
  return requirements[Math.floor(Math.random() * requirements.length)]
}

function getRandomDuration(): string {
  const durations = ['2', '3', '4', '6', '8']
  return durations[Math.floor(Math.random() * durations.length)]
}

function getRandomTopic(): string {
  const topics = [
    'marketing digital',
    'gestión financiera',
    'liderazgo empresarial',
    'ventas consultivas',
    'transformación digital'
  ]
  return topics[Math.floor(Math.random() * topics.length)]
}

function getRandomModules(): string {
  const modules = ['4', '6', '8', '10', '12']
  return modules[Math.floor(Math.random() * modules.length)]
}

function getRandomLevel(): string {
  const levels = ['principiantes', 'nivel intermedio', 'avanzado']
  return levels[Math.floor(Math.random() * levels.length)]
}
