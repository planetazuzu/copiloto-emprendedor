import { NextRequest, NextResponse } from 'next/server'

// Datos mock de cursos
const mockCourses = [
  {
    id: 1,
    title: 'Finanzas para emprendedores',
    description: 'Aprende a gestionar las finanzas de tu empresa desde cero',
    category: 'Finanzas',
    level: 'Intermedio',
    duration: 150,
    rating: 4.8,
    students: 1250,
    instructor: 'María González',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400',
    modules: [
      'Introducción a las finanzas empresariales',
      'Presupuestos y flujo de caja',
      'Análisis financiero básico',
      'Financiación y inversión'
    ],
    isActive: true,
    createdAt: '2024-01-10T10:00:00Z'
  },
  {
    id: 2,
    title: 'Marketing digital básico',
    description: 'Domina las herramientas esenciales del marketing online',
    category: 'Marketing',
    level: 'Principiante',
    duration: 120,
    rating: 4.6,
    students: 2100,
    instructor: 'Carlos Ruiz',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
    modules: [
      'Fundamentos del marketing digital',
      'Redes sociales para empresas',
      'Email marketing',
      'SEO básico'
    ],
    isActive: true,
    createdAt: '2024-01-15T14:30:00Z'
  },
  {
    id: 3,
    title: 'Gestión de equipos remotos',
    description: 'Lidera equipos distribuidos de manera efectiva',
    category: 'Gestión',
    level: 'Avanzado',
    duration: 180,
    rating: 4.9,
    students: 890,
    instructor: 'Ana Martín',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400',
    modules: [
      'Fundamentos del trabajo remoto',
      'Herramientas de colaboración',
      'Comunicación efectiva',
      'Gestión del rendimiento'
    ],
    isActive: true,
    createdAt: '2024-01-20T09:15:00Z'
  },
  {
    id: 4,
    title: 'Ventas consultivas',
    description: 'Técnicas avanzadas para vender productos y servicios',
    category: 'Ventas',
    level: 'Intermedio',
    duration: 135,
    rating: 4.7,
    students: 1680,
    instructor: 'Roberto Silva',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400',
    modules: [
      'Proceso de ventas consultivas',
      'Identificación de necesidades',
      'Presentación de soluciones',
      'Cierre de ventas'
    ],
    isActive: true,
    createdAt: '2024-01-25T16:45:00Z'
  },
  {
    id: 5,
    title: 'Liderazgo empresarial',
    description: 'Desarrolla habilidades de liderazgo para dirigir tu empresa',
    category: 'Liderazgo',
    level: 'Intermedio',
    duration: 165,
    rating: 4.8,
    students: 1450,
    instructor: 'Laura Fernández',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    modules: [
      'Estilos de liderazgo',
      'Motivación de equipos',
      'Toma de decisiones',
      'Gestión del cambio'
    ],
    isActive: true,
    createdAt: '2024-01-30T11:20:00Z'
  },
  {
    id: 6,
    title: 'Transformación digital',
    description: 'Guía completa para digitalizar tu negocio',
    category: 'Tecnología',
    level: 'Principiante',
    duration: 200,
    rating: 4.5,
    students: 980,
    instructor: 'David López',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400',
    modules: [
      'Estrategia digital',
      'Herramientas digitales',
      'Automatización de procesos',
      'Medición y análisis'
    ],
    isActive: true,
    createdAt: '2024-02-01T13:10:00Z'
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const level = searchParams.get('level')
    const search = searchParams.get('search')

    let filteredCourses = mockCourses

    // Aplicar filtros
    if (category && category !== 'Todas') {
      filteredCourses = filteredCourses.filter(c => c.category === category)
    }

    if (level && level !== 'Todas') {
      filteredCourses = filteredCourses.filter(c => c.level === level)
    }

    if (search) {
      const searchLower = search.toLowerCase()
      filteredCourses = filteredCourses.filter(c => 
        c.title.toLowerCase().includes(searchLower) ||
        c.description.toLowerCase().includes(searchLower) ||
        c.instructor.toLowerCase().includes(searchLower)
      )
    }

    return NextResponse.json({
      success: true,
      data: filteredCourses,
      total: filteredCourses.length
    })
  } catch (error) {
    console.error('Error en API de cursos:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Simular creación de curso
    const newCourse = {
      id: mockCourses.length + 1,
      ...body,
      createdAt: new Date().toISOString(),
      isActive: true
    }

    mockCourses.push(newCourse)

    return NextResponse.json({
      success: true,
      data: newCourse
    }, { status: 201 })
  } catch (error) {
    console.error('Error creando curso:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
