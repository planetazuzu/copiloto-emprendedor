import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...')

  // Crear organización por defecto
  const organization = await prisma.organization.upsert({
    where: { id: 'default-org' },
    update: {},
    create: {
      id: 'default-org',
      name: 'Copiloto Emprendedor',
      description: 'Organización por defecto para usuarios individuales'
    }
  })

  // Crear usuario demo
  const user = await prisma.user.upsert({
    where: { email: 'demo@copiloto.com' },
    update: {},
    create: {
      email: 'demo@copiloto.com',
      name: 'Usuario Demo',
      sector: 'tecnologia',
      stage: 'En crecimiento',
      needs: 'Financiación y formación en marketing digital',
      organizationId: organization.id
    }
  })

  // Crear recursos de ejemplo
  const resources = await Promise.all([
    prisma.resource.upsert({
      where: { id: 'resource-1' },
      update: {},
      create: {
        id: 'resource-1',
        title: 'Subvención para digitalización PYME',
        description: 'Ayuda económica para la transformación digital de pequeñas y medianas empresas',
        category: 'Digitalización',
        sector: 'Tecnología',
        stage: 'Startup temprana',
        url: 'https://ejemplo.com/ayuda-digitalizacion',
        isActive: true
      }
    }),
    prisma.resource.upsert({
      where: { id: 'resource-2' },
      update: {},
      create: {
        id: 'resource-2',
        title: 'Programa de contratación de personal joven',
        description: 'Subvención para la contratación de jóvenes menores de 30 años',
        category: 'Empleo',
        sector: 'Todos',
        stage: 'En crecimiento',
        url: 'https://ejemplo.com/ayuda-empleo',
        isActive: true
      }
    }),
    prisma.resource.upsert({
      where: { id: 'resource-3' },
      update: {},
      create: {
        id: 'resource-3',
        title: 'Curso de mentoría empresarial',
        description: 'Programa gratuito de mentoría para emprendedores',
        category: 'Formación',
        sector: 'Todos',
        stage: 'Solo tengo una idea',
        url: 'https://ejemplo.com/mentoria',
        isActive: true
      }
    })
  ])

  // Crear cursos de ejemplo
  const courses = await Promise.all([
    prisma.course.upsert({
      where: { id: 'course-1' },
      update: {},
      create: {
        id: 'course-1',
        title: 'Finanzas para emprendedores',
        description: 'Aprende a gestionar las finanzas de tu empresa desde cero',
        category: 'Finanzas',
        level: 'Intermedio',
        duration: 150,
        isActive: true
      }
    }),
    prisma.course.upsert({
      where: { id: 'course-2' },
      update: {},
      create: {
        id: 'course-2',
        title: 'Marketing digital básico',
        description: 'Domina las herramientas esenciales del marketing online',
        category: 'Marketing',
        level: 'Principiante',
        duration: 120,
        isActive: true
      }
    }),
    prisma.course.upsert({
      where: { id: 'course-3' },
      update: {},
      create: {
        id: 'course-3',
        title: 'Gestión de equipos remotos',
        description: 'Lidera equipos distribuidos de manera efectiva',
        category: 'Gestión',
        level: 'Avanzado',
        duration: 180,
        isActive: true
      }
    })
  ])

  // Crear progreso de cursos para el usuario demo
  await Promise.all([
    prisma.courseProgress.upsert({
      where: { 
        userId_courseId: {
          userId: user.id,
          courseId: courses[0].id
        }
      },
      update: {},
      create: {
        userId: user.id,
        courseId: courses[0].id,
        progress: 75,
        completed: false
      }
    }),
    prisma.courseProgress.upsert({
      where: { 
        userId_courseId: {
          userId: user.id,
          courseId: courses[1].id
        }
      },
      update: {},
      create: {
        userId: user.id,
        courseId: courses[1].id,
        progress: 45,
        completed: false
      }
    }),
    prisma.courseProgress.upsert({
      where: { 
        userId_courseId: {
          userId: user.id,
          courseId: courses[2].id
        }
      },
      update: {},
      create: {
        userId: user.id,
        courseId: courses[2].id,
        progress: 0,
        completed: false
      }
    })
  ])

  // Crear algunos bookmarks para el usuario demo
  await Promise.all([
    prisma.bookmark.upsert({
      where: {
        userId_resourceId: {
          userId: user.id,
          resourceId: resources[0].id
        }
      },
      update: {},
      create: {
        userId: user.id,
        resourceId: resources[0].id
      }
    }),
    prisma.bookmark.upsert({
      where: {
        userId_resourceId: {
          userId: user.id,
          resourceId: resources[1].id
        }
      },
      update: {},
      create: {
        userId: user.id,
        resourceId: resources[1].id
      }
    })
  ])

  console.log('✅ Seed completado exitosamente!')
  console.log(`👤 Usuario creado: ${user.email}`)
  console.log(`🏢 Organización creada: ${organization.name}`)
  console.log(`📚 Recursos creados: ${resources.length}`)
  console.log(`🎓 Cursos creados: ${courses.length}`)
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
