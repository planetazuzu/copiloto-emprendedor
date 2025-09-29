# 🚀 Copiloto Emprendedor

Una plataforma SaaS multi-tenant diseñada para emprendedores que combina gestión de clientes (CRM), recursos educativos, cursos y herramientas de productividad en una sola aplicación.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3-38B2AC?style=for-the-badge&logo=tailwind-css)
![Prisma](https://img.shields.io/badge/Prisma-5.0-2D3748?style=for-the-badge&logo=prisma)

## 🎯 Características Principales

### 📊 **CRM Completo**
- **Gestión de Clientes**: Lista completa con filtros avanzados
- **Pipeline de Ventas**: Drag & drop entre etapas (Leads → Calificados → Propuesta → Negociación → Ganados/Perdidos)
- **Sistema de Notas**: Seguimiento detallado de interacciones
- **Tareas y Recordatorios**: Gestión de actividades por cliente
- **Historial de Comunicaciones**: Registro completo con integraciones
- **Sistema de Etiquetas**: Categorización y organización avanzada
- **Reportes y Analytics**: Métricas y gráficos en tiempo real

### 🔗 **Integraciones Externas**
- **WhatsApp**: Comunicación directa con `https://wa.me/[número]`
- **Email**: Cliente nativo con `mailto:`
- **Llamadas**: Botón directo con `tel:`
- **Portapapeles**: Copia de información de contacto

### 📚 **Recursos y Formación**
- **Catálogo de Ayudas**: Subvenciones y recursos gubernamentales
- **Cursos**: Formación con progreso de usuario
- **Sistema de Favoritos**: Bookmarks persistentes
- **Filtros Avanzados**: Por categoría, sector, etapa

### 🎨 **Gestión de Proyectos**
- **Kanban Board**: Gestión visual de tareas
- **Asignación de Responsables**: Equipos y roles
- **Filtros y Búsqueda**: Organización eficiente

## 🏗️ Stack Tecnológico

- **Frontend**: Next.js 14 (App Router) + TypeScript
- **Styling**: TailwindCSS + shadcn/ui
- **Estado**: Zustand + React Query
- **Formularios**: React Hook Form + Zod
- **Base de Datos**: Prisma ORM + SQLite
- **Autenticación**: NextAuth.js
- **Iconos**: Lucide React

## 🚀 Instalación Rápida

### Prerrequisitos
- Node.js 18.0.0 o superior
- npm 8.0.0 o superior

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/planetazuzu/copiloto-emprendedor.git
cd copiloto-emprendedor
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env.local
# Editar .env.local con tus valores
```

4. **Configurar base de datos**
```bash
npm run db:generate
npm run db:push
npm run db:seed
```

5. **Ejecutar en desarrollo**
```bash
npm run dev
```

La aplicación estará disponible en: `http://localhost:3000`

## 👥 Usuarios de Prueba

| Usuario | Email | Contraseña | Rol | Sector |
|---------|-------|------------|-----|--------|
| Elena Vargas | elena@test.com | password123 | Administrador General | Tecnología |
| Carlos Ruiz | carlos@test.com | password123 | Emprendedor | Servicios |
| Ana Gómez | ana@test.com | password123 | Emprendedora | Retail |
| Dr. Alejandro Torres | alejandro@test.com | password123 | Mentor | Educación |
| Lucía Fernández | lucia@test.com | password123 | Consultora | Consultoría |
| Marcos Solís | marcos@test.com | password123 | Inversor | Finanzas |

## 📱 Funcionalidades por Módulo

### 🏠 Dashboard
- Estadísticas en tiempo real
- Acciones rápidas personalizadas
- Recursos recientes
- Progreso de cursos
- Onboarding para nuevos usuarios

### 👥 CRM
- **Clientes**: Gestión completa con filtros
- **Pipeline**: Visualización drag & drop
- **Notas**: Sistema de seguimiento detallado
- **Tareas**: Recordatorios y actividades
- **Comunicaciones**: Historial con integraciones
- **Etiquetas**: Categorización avanzada
- **Reportes**: Analytics y métricas

### 📚 Recursos
- Catálogo de ayudas y subvenciones
- Filtros por categoría, sector, etapa
- Sistema de favoritos
- Búsqueda avanzada
- Enlaces externos verificados

### 🎓 Cursos
- Catálogo de formación
- Progreso de usuario
- Filtros por nivel y categoría
- Sistema de bookmarking
- Certificaciones

### 📋 Proyectos
- Kanban board interactivo
- Gestión de tareas
- Asignación de responsables
- Filtros y búsqueda
- Métricas de productividad

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Linter

# Base de datos
npm run db:generate  # Generar cliente Prisma
npm run db:push      # Sincronizar esquema
npm run db:migrate   # Crear migración
npm run db:seed      # Poblar datos de prueba
```

## 📊 Métricas del Sistema

- **Clientes Totales**: 47
- **Valor del Pipeline**: €1,250,000
- **Tasa de Conversión**: 23.4%
- **Velocidad de Ventas**: 45 días
- **Tareas Completadas**: 98/156
- **Salud del Pipeline**: 78%

## 🎨 Diseño y UX

- **Responsive Design**: Optimizado para móvil, tablet y desktop
- **Tema Consistente**: Paleta de colores profesional
- **Componentes Reutilizables**: shadcn/ui + componentes personalizados
- **Accesibilidad**: Navegación por teclado y contraste adecuado
- **Loading States**: Feedback visual en todas las operaciones
- **Toast Notifications**: Confirmaciones y errores

## 🔒 Seguridad

- **Autenticación**: NextAuth.js con JWT
- **Validación**: Zod schemas + TypeScript
- **Sanitización**: Inputs protegidos contra XSS
- **Headers de Seguridad**: Configuración completa
- **RLS**: Row Level Security en base de datos

## 📈 Roadmap

### ✅ Fase 1: MVP (Completado)
- [x] Autenticación básica
- [x] CRM básico
- [x] Gestión de clientes
- [x] Comunicaciones básicas

### 🔄 Fase 2: Funcionalidades Avanzadas (En Progreso)
- [x] Sistema de etiquetas
- [x] Importar/Exportar datos
- [x] Reportes avanzados
- [x] Integraciones externas

### 📋 Fase 3: Inteligencia Artificial (Próximo)
- [ ] Chat con IA
- [ ] Análisis predictivo
- [ ] Recomendaciones automáticas
- [ ] Automatización de tareas

### 🚀 Fase 4: Escalabilidad (Futuro)
- [ ] Multi-tenant avanzado
- [ ] API pública
- [ ] Mobile app
- [ ] Marketplace de integraciones

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 📞 Soporte

- **Documentación**: Ver archivos en `/docs`
- **Issues**: [GitHub Issues](https://github.com/planetazuzu/copiloto-emprendedor/issues)
- **Discusiones**: [GitHub Discussions](https://github.com/planetazuzu/copiloto-emprendedor/discussions)

## 🙏 Agradecimientos

- [Next.js](https://nextjs.org/) - Framework React
- [TailwindCSS](https://tailwindcss.com/) - Framework CSS
- [shadcn/ui](https://ui.shadcn.com/) - Componentes UI
- [Prisma](https://prisma.io/) - ORM para TypeScript
- [Lucide](https://lucide.dev/) - Iconos

---

**¡Desarrollado con ❤️ para emprendedores que buscan crecer!** 🚀