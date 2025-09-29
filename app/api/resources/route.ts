import { NextRequest, NextResponse } from 'next/server'

// Datos mock de recursos
const mockResources = [
  {
    id: 1,
    title: 'Subvención para digitalización PYME',
    description: 'Ayuda económica para la transformación digital de pequeñas y medianas empresas',
    category: 'Digitalización',
    amount: '5.000€',
    deadline: '2024-02-15',
    sector: 'Tecnología',
    stage: 'Startup temprana',
    url: 'https://ejemplo.com/ayuda-digitalizacion',
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 2,
    title: 'Programa de contratación de personal joven',
    description: 'Subvención para la contratación de jóvenes menores de 30 años',
    category: 'Empleo',
    amount: '3.000€',
    deadline: '2024-02-20',
    sector: 'Todos',
    stage: 'En crecimiento',
    url: 'https://ejemplo.com/ayuda-empleo',
    isActive: true,
    createdAt: '2024-01-10T14:30:00Z'
  },
  {
    id: 3,
    title: 'Curso de mentoría empresarial',
    description: 'Programa gratuito de mentoría para emprendedores',
    category: 'Formación',
    amount: 'Gratuito',
    deadline: '2024-02-10',
    sector: 'Todos',
    stage: 'Solo tengo una idea',
    url: 'https://ejemplo.com/mentoria',
    isActive: true,
    createdAt: '2024-01-05T09:15:00Z'
  },
  {
    id: 4,
    title: 'Ayuda para internacionalización',
    description: 'Subvención para empresas que quieren expandirse internacionalmente',
    category: 'Internacionalización',
    amount: '10.000€',
    deadline: '2024-03-01',
    sector: 'Manufactura',
    stage: 'Empresa establecida',
    url: 'https://ejemplo.com/internacionalizacion',
    isActive: true,
    createdAt: '2024-01-20T16:45:00Z'
  },
  {
    id: 5,
    title: 'Fondo de innovación tecnológica',
    description: 'Financiación para proyectos de I+D+i',
    category: 'Innovación',
    amount: '25.000€',
    deadline: '2024-03-15',
    sector: 'Tecnología',
    stage: 'En crecimiento',
    url: 'https://ejemplo.com/innovacion',
    isActive: true,
    createdAt: '2024-01-25T11:20:00Z'
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const sector = searchParams.get('sector')
    const stage = searchParams.get('stage')
    const search = searchParams.get('search')

    let filteredResources = mockResources

    // Aplicar filtros
    if (category && category !== 'Todas') {
      filteredResources = filteredResources.filter(r => r.category === category)
    }

    if (sector && sector !== 'Todos') {
      filteredResources = filteredResources.filter(r => r.sector === sector || r.sector === 'Todos')
    }

    if (stage) {
      filteredResources = filteredResources.filter(r => r.stage === stage)
    }

    if (search) {
      const searchLower = search.toLowerCase()
      filteredResources = filteredResources.filter(r => 
        r.title.toLowerCase().includes(searchLower) ||
        r.description.toLowerCase().includes(searchLower)
      )
    }

    return NextResponse.json({
      success: true,
      data: filteredResources,
      total: filteredResources.length
    })
  } catch (error) {
    console.error('Error en API de recursos:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Simular creación de recurso
    const newResource = {
      id: mockResources.length + 1,
      ...body,
      createdAt: new Date().toISOString(),
      isActive: true
    }

    mockResources.push(newResource)

    return NextResponse.json({
      success: true,
      data: newResource
    }, { status: 201 })
  } catch (error) {
    console.error('Error creando recurso:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
