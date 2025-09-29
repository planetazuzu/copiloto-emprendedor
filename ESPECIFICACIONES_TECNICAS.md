# 📋 ESPECIFICACIONES TÉCNICAS - COPILOTO EMPRENDEDOR

## 🎯 **RESUMEN EJECUTIVO**

**Copiloto Emprendedor** es una plataforma SaaS multi-tenant diseñada para emprendedores, que combina gestión de clientes (CRM), recursos educativos, cursos, y herramientas de productividad en una sola aplicación.

---

## 🏗️ **ARQUITECTURA TÉCNICA**

### **Stack Principal**
- **Frontend**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Styling**: TailwindCSS
- **UI Components**: shadcn/ui + Radix UI
- **Iconos**: Lucide React
- **Estado Global**: Zustand
- **Data Fetching**: React Query (TanStack Query)
- **Formularios**: React Hook Form + Zod
- **Autenticación**: NextAuth.js
- **Base de Datos**: Prisma ORM + SQLite
- **Deployment**: Vercel/Netlify/Docker

### **Estructura de Carpetas**
```
├── app/                    # Next.js App Router
│   ├── (auth)/            # Rutas de autenticación
│   ├── api/               # API Routes
│   ├── crm/               # Módulo CRM
│   ├── dashboard/         # Dashboard principal
│   ├── resources/         # Recursos y ayudas
│   ├── courses/           # Cursos
│   ├── projects/          # Gestión de proyectos
│   └── layout.tsx         # Layout principal
├── components/            # Componentes reutilizables
│   ├── ui/               # Componentes base (shadcn/ui)
│   ├── layout/           # Layout components
│   ├── crm/              # Componentes específicos CRM
│   └── providers.tsx     # Providers globales
├── lib/                  # Utilidades y configuración
│   ├── auth.ts           # Configuración NextAuth
│   ├── db.ts             # Cliente Prisma
│   ├── store.ts          # Store Zustand
│   └── hooks/            # Custom hooks
├── prisma/               # Base de datos
│   ├── schema.prisma     # Esquema de datos
│   └── seed.ts           # Datos de prueba
└── types/                # Tipos TypeScript
```

---

## 🗄️ **MODELO DE DATOS**

### **Esquema Prisma**
```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  image     String?
  sector    String?    // Tecnología, Servicios, Retail, etc.
  stage     String?    // Startup temprana, En crecimiento, etc.
  needs     String?    // Necesidades específicas
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  organizationId String
  organization   Organization @relation(fields: [organizationId], references: [id])
  courseProgress CourseProgress[]
  bookmarks      Bookmark[]
}

model Organization {
  id          String   @id @default(cuid())
  name        String
  description String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  users User[]
}

model Resource {
  id          String   @id @default(cuid())
  title       String
  description String
  category    String
  sector      String?
  stage       String?
  url         String?
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  bookmarks Bookmark[]
}

model Course {
  id          String   @id @default(cuid())
  title       String
  description String
  category    String
  duration    Int      // en minutos
  level       String   // beginner, intermediate, advanced
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  progress CourseProgress[]
}

model CourseProgress {
  id        String   @id @default(cuid())
  userId    String
  courseId  String
  progress  Int      @default(0) // 0-100
  completed Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  user   User   @relation(fields: [userId], references: [id])
  course Course @relation(fields: [courseId], references: [id])
  
  @@unique([userId, courseId])
}

model Bookmark {
  id         String   @id @default(cuid())
  userId     String
  resourceId String
  createdAt  DateTime @default(now())
  
  user     User     @relation(fields: [userId], references: [id])
  resource Resource @relation(fields: [resourceId], references: [id])
  
  @@unique([userId, resourceId])
}
```

---

## 🎨 **SISTEMA DE DISEÑO**

### **Paleta de Colores**
```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96%;
  --secondary-foreground: 222.2 84% 4.9%;
  --muted: 210 40% 96%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96%;
  --accent-foreground: 222.2 84% 4.9%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 221.2 83.2% 53.3%;
  --radius: 0.5rem;
}
```

### **Componentes UI (shadcn/ui)**
- Button, Card, Input, Label, Avatar, Badge
- Dialog, Select, Textarea, Checkbox
- Toast, Progress, Loading Spinner
- Confirmation Dialog, Error Boundary

### **Iconos (Lucide React)**
- Users, Search, Filter, Plus, Edit, Trash2
- Mail, Phone, Calendar, FileText, CheckSquare
- BarChart3, TrendingUp, Target, Clock
- MessageSquare, Tag, Star, Building2

---

## 🔐 **SISTEMA DE AUTENTICACIÓN**

### **NextAuth.js Configuration**
```typescript
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // Lógica de autenticación
      }
    })
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
      }
      return session
    }
  }
}
```

### **Usuarios de Prueba**
```typescript
const testAccounts = [
  {
    id: 1,
    name: 'Elena Vargas',
    email: 'elena@test.com',
    password: 'password123',
    role: 'Administrador General',
    sector: 'Tecnología',
    stage: 'Empresa establecida'
  },
  // ... más usuarios
]
```

---

## 📊 **MÓDULOS PRINCIPALES**

### **1. Dashboard Principal**
- **URL**: `/dashboard`
- **Funcionalidades**:
  - Estadísticas en tiempo real
  - Acciones rápidas
  - Recursos recientes
  - Progreso de cursos
  - Onboarding para nuevos usuarios

### **2. CRM Completo**
- **URL**: `/crm`
- **Funcionalidades**:
  - Gestión de clientes
  - Pipeline de ventas (drag & drop)
  - Sistema de notas y seguimiento
  - Tareas y recordatorios
  - Historial de comunicaciones
  - Sistema de etiquetas
  - Reportes y analytics

### **3. Recursos y Ayudas**
- **URL**: `/resources`
- **Funcionalidades**:
  - Catálogo de ayudas y subvenciones
  - Filtros por categoría, sector, etapa
  - Sistema de favoritos
  - Búsqueda avanzada
  - Enlaces externos

### **4. Cursos**
- **URL**: `/courses`
- **Funcionalidades**:
  - Catálogo de cursos
  - Progreso de usuario
  - Filtros por nivel y categoría
  - Sistema de bookmarking

### **5. Gestión de Proyectos**
- **URL**: `/projects`
- **Funcionalidades**:
  - Kanban board
  - Gestión de tareas
  - Asignación de responsables
  - Filtros y búsqueda

### **6. Productividad**
- **URL**: `/productivity`
- **Funcionalidades**:
  - Dashboard de métricas
  - Resumen de CRM
  - Resumen de proyectos
  - Actividad reciente

---

## 🔧 **FUNCIONALIDADES AVANZADAS**

### **Sistema de Estado Global (Zustand)**
```typescript
export interface AppState {
  user: User | null;
  organization: Organization | null;
  isLoading: boolean;
  favorites: string[];
  setUser: (user: User | null) => void;
  addToFavorites: (resourceId: string) => void;
  removeFromFavorites: (resourceId: string) => void;
  toggleFavorite: (resourceId: string) => void;
  loadFavorites: () => void;
}
```

### **Custom Hooks**
- `useApiError`: Manejo de errores de API
- `useFormValidation`: Validación de formularios
- `useToast`: Notificaciones toast

### **Sistema de Comunicaciones**
- **WhatsApp**: Integración directa con `https://wa.me/[número]`
- **Email**: Cliente nativo con `mailto:`
- **Llamadas**: Botón directo con `tel:`
- **Portapapeles**: Copia de información de contacto

### **Sistema de Etiquetas**
- Categorías: Tipo de Cliente, Industria, Prioridad, Fuente, Estado, Personalizada
- 10 colores predefinidos
- Gestión completa (crear, editar, eliminar)
- Contador de uso

---

## 📱 **RESPONSIVE DESIGN**

### **Breakpoints**
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### **Componentes Responsive**
- Grid layouts adaptativos
- Sidebar colapsable en móvil
- Modales fullscreen en móvil
- Botones de acción optimizados para touch

---

## 🚀 **DEPLOYMENT**

### **Vercel (Recomendado)**
```bash
# Variables de entorno requeridas
NEXTAUTH_URL=https://tu-dominio.vercel.app
NEXTAUTH_SECRET=tu-secret-key
DATABASE_URL=file:./dev.db
GOOGLE_CLIENT_ID=tu-google-client-id
GOOGLE_CLIENT_SECRET=tu-google-client-secret
```

### **Docker**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### **Netlify**
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## 🧪 **TESTING Y DESARROLLO**

### **Scripts Disponibles**
```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "db:generate": "prisma generate",
  "db:push": "prisma db push",
  "db:migrate": "prisma migrate dev",
  "db:seed": "prisma db seed"
}
```

### **Datos de Prueba**
- **6 usuarios** con diferentes roles
- **Recursos mock** con categorías variadas
- **Cursos** con diferentes niveles
- **Datos CRM** realistas
- **Comunicaciones** de ejemplo

---

## 🔒 **SEGURIDAD**

### **Autenticación**
- NextAuth.js con JWT
- Soporte para Google OAuth
- Credentials provider
- Session management

### **Validación**
- Zod schemas para validación
- TypeScript para type safety
- Form validation con React Hook Form

### **Headers de Seguridad**
```javascript
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-XSS-Protection', value: '1; mode=block' }
      ]
    }
  ]
}
```

---

## 📈 **MÉTRICAS Y ANALYTICS**

### **Métricas Implementadas**
- Clientes Totales: 47
- Valor del Pipeline: €1,250,000
- Tasa de Conversión: 23.4%
- Velocidad de Ventas: 45 días
- Tareas Completadas: 98/156
- Salud del Pipeline: 78%

### **Reportes Disponibles**
- Distribución por estado
- Fuentes principales
- Tendencias mensuales
- Resumen de actividad
- Exportación PDF/Excel/CSV

---

## 🎯 **CASOS DE USO**

### **Emprendedores**
- Gestión de clientes y leads
- Seguimiento de oportunidades
- Acceso a recursos y ayudas
- Formación continua

### **Mentores**
- Seguimiento de mentoreados
- Gestión de comunicaciones
- Análisis de progreso

### **Consultores**
- Gestión de proyectos
- Seguimiento de clientes
- Reportes de actividad

### **Inversores**
- Análisis de oportunidades
- Métricas financieras
- Seguimiento de portafolio

---

## 🔄 **INTEGRACIONES**

### **APIs Externas**
- **WhatsApp**: `https://wa.me/[número]`
- **Email**: `mailto:` protocol
- **Llamadas**: `tel:` protocol
- **Google OAuth**: Autenticación social

### **APIs Internas**
- `/api/resources` - Gestión de recursos
- `/api/courses` - Gestión de cursos
- `/api/ai/summary` - Resúmenes con IA
- `/api/bookmarks` - Sistema de favoritos

---

## 📚 **DOCUMENTACIÓN ADICIONAL**

### **Archivos de Configuración**
- `next.config.js` - Configuración Next.js
- `tailwind.config.js` - Configuración TailwindCSS
- `tsconfig.json` - Configuración TypeScript
- `package.json` - Dependencias y scripts

### **Variables de Entorno**
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="tu-secret-key"
GOOGLE_CLIENT_ID="tu-google-client-id"
GOOGLE_CLIENT_SECRET="tu-google-client-secret"
```

---

## 🎨 **CARACTERÍSTICAS DE UX/UI**

### **Onboarding**
- Modal de bienvenida para nuevos usuarios
- Guía paso a paso
- Configuración inicial de perfil

### **Navegación**
- Sidebar fijo con navegación principal
- Breadcrumbs implícitos
- Botones de acción contextuales

### **Feedback Visual**
- Loading states en todas las operaciones
- Toast notifications para acciones
- Confirmación de eliminación
- Estados de error con fallbacks

### **Accesibilidad**
- Navegación por teclado
- Contraste de colores adecuado
- Labels descriptivos
- ARIA attributes

---

## 🚀 **PRÓXIMAS FUNCIONALIDADES**

### **En Desarrollo**
- [ ] Sistema de etiquetas completo
- [ ] Importar/Exportar datos
- [ ] Chat en tiempo real
- [ ] Integración con IA real (OpenAI/Claude)

### **Futuras Mejoras**
- [ ] Notificaciones push
- [ ] Calendario integrado
- [ ] Documentos compartidos
- [ ] API pública
- [ ] Mobile app (React Native)

---

## 📞 **SOPORTE Y RECURSOS**

### **Documentación**
- README.md completo
- Comentarios en código
- Tipos TypeScript documentados

### **Recursos de Desarrollo**
- shadcn/ui documentation
- Next.js 14 App Router docs
- Prisma documentation
- TailwindCSS docs

---

**¡Esta especificación técnica proporciona toda la información necesaria para desarrollar un proyecto similar o usar como referencia!** 🚀
