# 🚀 GUÍA DE INSTALACIÓN - COPILOTO EMPRENDEDOR

## 📋 **REQUISITOS PREVIOS**

### **Software Necesario**
- **Node.js**: v18.0.0 o superior
- **npm**: v8.0.0 o superior (o yarn/pnpm)
- **Git**: Para clonar el repositorio
- **Editor de código**: VS Code recomendado

### **Extensiones VS Code Recomendadas**
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- Prisma
- TypeScript Importer
- Auto Rename Tag

---

## 🛠️ **INSTALACIÓN PASO A PASO**

### **1. Clonar el Repositorio**
```bash
git clone https://github.com/tu-usuario/copiloto-emprendedor.git
cd copiloto-emprendedor
```

### **2. Instalar Dependencias**
```bash
npm install
# o
yarn install
# o
pnpm install
```

### **3. Configurar Variables de Entorno**
Crear archivo `.env.local`:
```env
# Base de datos
DATABASE_URL="file:./dev.db"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="tu-secret-key-aqui"

# Google OAuth (opcional)
GOOGLE_CLIENT_ID="tu-google-client-id"
GOOGLE_CLIENT_SECRET="tu-google-client-secret"
```

### **4. Configurar Base de Datos**
```bash
# Generar cliente Prisma
npm run db:generate

# Crear base de datos
npm run db:push

# Poblar con datos de prueba
npm run db:seed
```

### **5. Ejecutar en Desarrollo**
```bash
npm run dev
```

La aplicación estará disponible en: `http://localhost:3000`

---

## 🔧 **CONFIGURACIÓN DETALLADA**

### **Base de Datos SQLite**
```bash
# Ver la base de datos
npx prisma studio

# Resetear base de datos
npx prisma migrate reset

# Crear nueva migración
npx prisma migrate dev --name nombre-migracion
```

### **Google OAuth (Opcional)**
1. Ir a [Google Cloud Console](https://console.cloud.google.com/)
2. Crear nuevo proyecto o seleccionar existente
3. Habilitar Google+ API
4. Crear credenciales OAuth 2.0
5. Agregar `http://localhost:3000/api/auth/callback/google` como URI de redirección
6. Copiar Client ID y Client Secret al archivo `.env.local`

### **Configuración de TailwindCSS**
El archivo `tailwind.config.js` ya está configurado con:
- Colores personalizados
- Fuentes del sistema
- Breakpoints responsive
- Plugins de shadcn/ui

---

## 📦 **ESTRUCTURA DE DEPENDENCIAS**

### **Dependencias Principales**
```json
{
  "next": "14.0.0",
  "react": "18.0.0",
  "typescript": "5.0.0",
  "tailwindcss": "3.3.0",
  "@prisma/client": "5.0.0",
  "next-auth": "4.24.0",
  "zustand": "4.4.0",
  "@tanstack/react-query": "5.0.0",
  "react-hook-form": "7.47.0",
  "zod": "3.22.0"
}
```

### **Dependencias de Desarrollo**
```json
{
  "prisma": "5.0.0",
  "@types/node": "20.0.0",
  "@types/react": "18.0.0",
  "@types/react-dom": "18.0.0",
  "eslint": "8.0.0",
  "eslint-config-next": "14.0.0"
}
```

---

## 🎨 **CONFIGURACIÓN DE COMPONENTES UI**

### **shadcn/ui Setup**
```bash
# Instalar shadcn/ui
npx shadcn-ui@latest init

# Agregar componentes específicos
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add select
npx shadcn-ui@latest add textarea
npx shadcn-ui@latest add checkbox
npx shadcn-ui@latest add toast
```

### **Componentes Personalizados**
Los componentes están en `components/ui/` y siguen el patrón de shadcn/ui:
- Configuración en `components.json`
- Estilos en `app/globals.css`
- Utilidades en `lib/utils.ts`

---

## 🔐 **CONFIGURACIÓN DE AUTENTICACIÓN**

### **NextAuth.js Setup**
El archivo `lib/auth.ts` contiene la configuración completa:
- Prisma Adapter para persistencia
- Google Provider para OAuth
- Credentials Provider para login local
- Callbacks para JWT y sesiones

### **Tipos de NextAuth**
El archivo `types/next-auth.d.ts` extiende los tipos:
```typescript
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }
}
```

---

## 📊 **CONFIGURACIÓN DE ESTADO**

### **Zustand Store**
El archivo `lib/store.ts` contiene:
- Estado global de la aplicación
- Funciones para gestión de favoritos
- Persistencia en localStorage
- Integración con toast notifications

### **React Query**
El archivo `components/providers.tsx` configura:
- QueryClient con opciones por defecto
- DevTools para desarrollo
- Error boundaries

---

## 🧪 **DATOS DE PRUEBA**

### **Usuarios de Prueba**
```typescript
const testAccounts = [
  {
    email: 'elena@test.com',
    password: 'password123',
    role: 'Administrador General',
    sector: 'Tecnología'
  },
  // ... más usuarios
]
```

### **Seed de Base de Datos**
El archivo `prisma/seed.ts` crea:
- Organización por defecto
- Usuario demo
- Recursos de ejemplo
- Cursos con diferentes niveles
- Progreso de cursos
- Bookmarks de recursos

---

## 🚀 **SCRIPTS DISPONIBLES**

### **Desarrollo**
```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Linter
```

### **Base de Datos**
```bash
npm run db:generate  # Generar cliente Prisma
npm run db:push      # Sincronizar esquema
npm run db:migrate   # Crear migración
npm run db:seed      # Poblar datos de prueba
```

### **Utilidades**
```bash
npx prisma studio    # Interfaz visual de BD
npx prisma format    # Formatear schema
npx prisma validate  # Validar schema
```

---

## 🔧 **CONFIGURACIÓN DE DESARROLLO**

### **VS Code Settings**
Crear `.vscode/settings.json`:
```json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "tailwindCSS.includeLanguages": {
    "typescript": "typescript",
    "typescriptreact": "typescriptreact"
  },
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

### **ESLint Configuration**
El archivo `.eslintrc.json` está configurado con:
- Reglas de Next.js
- Reglas de TypeScript
- Reglas de React
- Reglas de accesibilidad

---

## 📱 **CONFIGURACIÓN RESPONSIVE**

### **Breakpoints TailwindCSS**
```javascript
module.exports = {
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    }
  }
}
```

### **Componentes Responsive**
- Grid layouts adaptativos
- Sidebar colapsable
- Modales fullscreen en móvil
- Botones optimizados para touch

---

## 🔒 **CONFIGURACIÓN DE SEGURIDAD**

### **Headers de Seguridad**
En `next.config.js`:
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

### **Validación de Datos**
- Zod schemas para validación
- TypeScript para type safety
- React Hook Form para formularios
- Sanitización de inputs

---

## 🚀 **DEPLOYMENT**

### **Vercel (Recomendado)**
1. Conectar repositorio a Vercel
2. Configurar variables de entorno
3. Deploy automático en cada push

### **Docker**
```bash
# Build de imagen
docker build -t copiloto-emprendedor .

# Ejecutar contenedor
docker run -p 3000:3000 copiloto-emprendedor
```

### **Netlify**
1. Conectar repositorio
2. Configurar build command: `npm run build`
3. Configurar publish directory: `.next`
4. Configurar variables de entorno

---

## 🐛 **SOLUCIÓN DE PROBLEMAS**

### **Errores Comunes**

#### **Error de Prisma**
```bash
# Regenerar cliente
npx prisma generate

# Resetear base de datos
npx prisma migrate reset
```

#### **Error de NextAuth**
```bash
# Verificar variables de entorno
echo $NEXTAUTH_SECRET

# Regenerar secret
openssl rand -base64 32
```

#### **Error de Build**
```bash
# Limpiar cache
rm -rf .next
npm run build
```

### **Logs de Desarrollo**
```bash
# Ver logs detallados
DEBUG=* npm run dev

# Solo logs de Prisma
DEBUG=prisma:* npm run dev
```

---

## 📚 **RECURSOS ADICIONALES**

### **Documentación Oficial**
- [Next.js 14 Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [NextAuth.js Docs](https://next-auth.js.org/)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Docs](https://ui.shadcn.com/)

### **Tutoriales Recomendados**
- Next.js App Router
- Prisma con SQLite
- NextAuth.js setup
- TailwindCSS + shadcn/ui
- TypeScript con React

---

## 🎯 **PRÓXIMOS PASOS**

### **Después de la Instalación**
1. ✅ Verificar que la aplicación funciona
2. ✅ Probar login con usuarios de prueba
3. ✅ Explorar todas las funcionalidades
4. ✅ Personalizar según necesidades
5. ✅ Configurar dominio personalizado

### **Personalización**
- Modificar colores en `tailwind.config.js`
- Agregar nuevos componentes en `components/ui/`
- Extender esquema de BD en `prisma/schema.prisma`
- Agregar nuevas rutas en `app/`

---

**¡Con esta guía deberías poder instalar y configurar Copiloto Emprendedor sin problemas!** 🚀
