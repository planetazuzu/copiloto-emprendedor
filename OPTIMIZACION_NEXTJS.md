# 🚀 GUÍA DE OPTIMIZACIÓN DE RENDIMIENTO - NEXT.JS

## 📋 **RESUMEN EJECUTIVO**

Esta guía cubre las mejores prácticas para optimizar el rendimiento de aplicaciones Next.js, desde optimizaciones básicas hasta técnicas avanzadas para aplicaciones de producción.

---

## 🎯 **OPTIMIZACIONES FUNDAMENTALES**

### **1. Optimización de Imágenes**
```typescript
// ❌ Evitar
import Image from 'next/image'
<img src="/image.jpg" alt="Imagen" />

// ✅ Recomendado
import Image from 'next/image'
<Image
  src="/image.jpg"
  alt="Imagen"
  width={500}
  height={300}
  priority={true} // Para imágenes above-the-fold
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

**Beneficios:**
- Compresión automática
- Lazy loading nativo
- Formatos modernos (WebP, AVIF)
- Responsive images

### **2. Code Splitting y Lazy Loading**
```typescript
// ❌ Import estático
import HeavyComponent from '@/components/HeavyComponent'

// ✅ Lazy loading
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('@/components/HeavyComponent'), {
  loading: () => <p>Cargando...</p>,
  ssr: false // Si no necesita SSR
})

// ✅ Lazy loading con suspense
const LazyComponent = dynamic(() => import('@/components/LazyComponent'), {
  suspense: true
})

// Uso con Suspense
<Suspense fallback={<Loading />}>
  <LazyComponent />
</Suspense>
```

### **3. Optimización de Bundle**
```javascript
// next.config.js
module.exports = {
  // Análisis de bundle
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': path.resolve(__dirname, './src'),
      }
    }
    return config
  },
  
  // Compresión
  compress: true,
  
  // Optimizaciones experimentales
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons']
  }
}
```

---

## ⚡ **OPTIMIZACIONES DE RENDIMIENTO**

### **4. React.memo y useMemo**
```typescript
// ✅ Componente optimizado
import React, { memo, useMemo, useCallback } from 'react'

interface ClientCardProps {
  client: Client
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

const ClientCard = memo(({ client, onEdit, onDelete }: ClientCardProps) => {
  // Memoizar cálculos costosos
  const clientSummary = useMemo(() => {
    return generateAISummary(client)
  }, [client.potential, client.status])

  // Memoizar funciones
  const handleEdit = useCallback(() => {
    onEdit(client.id)
  }, [client.id, onEdit])

  const handleDelete = useCallback(() => {
    onDelete(client.id)
  }, [client.id, onDelete])

  return (
    <Card>
      <CardContent>
        <p>{clientSummary}</p>
        <Button onClick={handleEdit}>Editar</Button>
        <Button onClick={handleDelete}>Eliminar</Button>
      </CardContent>
    </Card>
  )
})

ClientCard.displayName = 'ClientCard'
```

### **5. Virtualización para Listas Grandes**
```typescript
// Para listas con muchos elementos
import { FixedSizeList as List } from 'react-window'

const VirtualizedClientList = ({ clients }: { clients: Client[] }) => {
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div style={style}>
      <ClientCard client={clients[index]} />
    </div>
  )

  return (
    <List
      height={600}
      itemCount={clients.length}
      itemSize={120}
      width="100%"
    >
      {Row}
    </List>
  )
}
```

### **6. Optimización de Estado**
```typescript
// ✅ Zustand optimizado
import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

interface AppState {
  clients: Client[]
  filters: FilterState
  ui: UIState
  
  // Acciones memoizadas
  addClient: (client: Client) => void
  updateClient: (id: string, updates: Partial<Client>) => void
  setFilters: (filters: FilterState) => void
}

export const useAppStore = create<AppState>()(
  subscribeWithSelector((set, get) => ({
    clients: [],
    filters: { status: '', search: '' },
    ui: { loading: false },
    
    addClient: (client) => set((state) => ({
      clients: [...state.clients, client]
    })),
    
    updateClient: (id, updates) => set((state) => ({
      clients: state.clients.map(c => 
        c.id === id ? { ...c, ...updates } : c
      )
    })),
    
    setFilters: (filters) => set({ filters })
  }))
)

// Selector optimizado
export const useFilteredClients = () => {
  return useAppStore(
    (state) => {
      const { clients, filters } = state
      return clients.filter(client => {
        const matchesSearch = client.name.toLowerCase().includes(filters.search.toLowerCase())
        const matchesStatus = !filters.status || client.status === filters.status
        return matchesSearch && matchesStatus
      })
    },
    (a, b) => a.length === b.length && a.every((client, i) => client.id === b[i].id)
  )
}
```

---

## 🔄 **OPTIMIZACIONES DE DATOS**

### **7. React Query / TanStack Query**
```typescript
// ✅ Data fetching optimizado
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// Query con cache y optimizaciones
export const useClients = (filters: FilterState) => {
  return useQuery({
    queryKey: ['clients', filters],
    queryFn: () => fetchClients(filters),
    staleTime: 5 * 60 * 1000, // 5 minutos
    cacheTime: 10 * 60 * 1000, // 10 minutos
    refetchOnWindowFocus: false,
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000)
  })
}

// Mutación optimista
export const useUpdateClient = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: updateClient,
    onMutate: async (newClient) => {
      // Cancelar queries en curso
      await queryClient.cancelQueries({ queryKey: ['clients'] })
      
      // Snapshot del estado anterior
      const previousClients = queryClient.getQueryData(['clients'])
      
      // Actualización optimista
      queryClient.setQueryData(['clients'], (old: Client[]) =>
        old.map(client => client.id === newClient.id ? newClient : client)
      )
      
      return { previousClients }
    },
    onError: (err, newClient, context) => {
      // Rollback en caso de error
      queryClient.setQueryData(['clients'], context?.previousClients)
    },
    onSettled: () => {
      // Refetch después de la mutación
      queryClient.invalidateQueries({ queryKey: ['clients'] })
    }
  })
}
```

### **8. Server-Side Rendering Optimizado**
```typescript
// ✅ getServerSideProps optimizado
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context
  
  // Fetch paralelo de datos
  const [clients, stats, user] = await Promise.all([
    fetchClients(query),
    fetchStats(),
    getUser(context.req)
  ])
  
  return {
    props: {
      clients,
      stats,
      user,
      // Meta tags para SEO
      meta: {
        title: 'CRM - Gestión de Clientes',
        description: 'Gestiona tus clientes eficientemente'
      }
    },
    // Cache por 60 segundos
    revalidate: 60
  }
}

// ✅ getStaticProps con ISR
export async function getStaticProps() {
  const clients = await fetchClients()
  
  return {
    props: { clients },
    revalidate: 3600 // Regenerar cada hora
  }
}
```

---

## 🎨 **OPTIMIZACIONES DE UI/UX**

### **9. Skeleton Loading**
```typescript
// ✅ Componente de skeleton
const ClientCardSkeleton = () => (
  <Card className="animate-pulse">
    <CardHeader>
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        <div className="h-3 bg-gray-200 rounded"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
      </div>
    </CardContent>
  </Card>
)

// Uso en componente
const ClientList = () => {
  const { data: clients, isLoading } = useClients()
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <ClientCardSkeleton key={i} />
        ))}
      </div>
    )
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {clients.map(client => (
        <ClientCard key={client.id} client={client} />
      ))}
    </div>
  )
}
```

### **10. Debouncing y Throttling**
```typescript
// ✅ Hook de debounce personalizado
import { useState, useEffect } from 'react'

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

// Uso en búsqueda
const SearchClients = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  
  const { data: clients } = useClients({ search: debouncedSearchTerm })
  
  return (
    <Input
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Buscar clientes..."
    />
  )
}
```

---

## 🔧 **CONFIGURACIÓN AVANZADA**

### **11. Next.js Config Optimizado**
```javascript
// next.config.js
const nextConfig = {
  // Compresión
  compress: true,
  
  // Headers de seguridad y performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
  
  // Optimizaciones experimentales
  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-icons',
      'date-fns'
    ],
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  
  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Optimizaciones de producción
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            enforce: true,
          },
        },
      }
    }
    
    return config
  },
  
  // Bundle analyzer (solo en desarrollo)
  ...(process.env.ANALYZE === 'true' && {
    webpack: (config) => {
      config.plugins.push(
        new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)({
          analyzerMode: 'server',
          openAnalyzer: true,
        })
      )
      return config
    },
  }),
}

module.exports = nextConfig
```

### **12. Middleware Optimizado**
```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  // Headers de cache
  if (request.nextUrl.pathname.startsWith('/_next/static/')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  }
  
  // Headers de seguridad
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  
  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
```

---

## 📊 **MONITOREO Y ANÁLISIS**

### **13. Web Vitals y Analytics**
```typescript
// lib/analytics.ts
export function reportWebVitals(metric: any) {
  // Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      value: Math.round(metric.value),
      event_label: metric.id,
      non_interaction: true,
    })
  }
  
  // Console en desarrollo
  if (process.env.NODE_ENV === 'development') {
    console.log(metric)
  }
}

// pages/_app.tsx
export function reportWebVitals(metric: any) {
  reportWebVitals(metric)
}
```

### **14. Bundle Analyzer**
```bash
# Instalar bundle analyzer
npm install --save-dev @next/bundle-analyzer

# Script en package.json
{
  "scripts": {
    "analyze": "ANALYZE=true npm run build",
    "analyze:server": "BUNDLE_ANALYZE=server npm run build",
    "analyze:browser": "BUNDLE_ANALYZE=browser npm run build"
  }
}
```

---

## 🚀 **OPTIMIZACIONES ESPECÍFICAS PARA TU APP**

### **15. Optimizaciones para Copiloto Emprendedor**

```typescript
// ✅ Componente CRM optimizado
import { memo, useMemo, useCallback } from 'react'
import { Client } from '@/types'

const ClientCard = memo(({ client, onEdit, onDelete }: ClientCardProps) => {
  // Memoizar resumen IA
  const aiSummary = useMemo(() => {
    return generateAISummary(client)
  }, [client.potential, client.status])

  // Memoizar handlers
  const handleEdit = useCallback(() => onEdit(client.id), [client.id, onEdit])
  const handleDelete = useCallback(() => onDelete(client.id), [client.id, onDelete])

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            {getStatusBadge(client.status)}
            {getPotentialBadge(client.potential)}
          </div>
          
          <div className="text-sm">
            <p className="font-medium text-gray-900 mb-1">Notas:</p>
            <p className="text-gray-600 overflow-hidden text-ellipsis" 
               style={{ 
                 display: '-webkit-box', 
                 WebkitLineClamp: 2, 
                 WebkitBoxOrient: 'vertical' 
               }}>
              {client.notes}
            </p>
          </div>

          <div className="p-2 bg-gray-50 rounded text-xs">
            <p className="font-medium text-gray-700">Resumen IA:</p>
            <p className="text-gray-600">{aiSummary}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
})

// ✅ Hook optimizado para filtros
export const useFilteredClients = (clients: Client[], filters: FilterState) => {
  return useMemo(() => {
    return clients.filter(client => {
      const matchesSearch = client.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                           client.company?.toLowerCase().includes(filters.search.toLowerCase()) ||
                           client.email.toLowerCase().includes(filters.search.toLowerCase())
      
      const matchesStatus = !filters.status || client.status === filters.status
      const matchesPotential = !filters.potential || client.potential === filters.potential
      
      return matchesSearch && matchesStatus && matchesPotential
    })
  }, [clients, filters])
}
```

---

## 📈 **MÉTRICAS DE RENDIMIENTO**

### **Core Web Vitals Objetivos:**
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### **Herramientas de Medición:**
- **Lighthouse**: Auditoría completa
- **WebPageTest**: Análisis detallado
- **Chrome DevTools**: Performance tab
- **Next.js Analytics**: Métricas reales

---

## 🎯 **CHECKLIST DE OPTIMIZACIÓN**

### **✅ Optimizaciones Básicas**
- [ ] Imágenes optimizadas con `next/image`
- [ ] Lazy loading implementado
- [ ] Code splitting configurado
- [ ] Bundle size optimizado
- [ ] Imports tree-shaking

### **✅ Optimizaciones Avanzadas**
- [ ] React.memo en componentes pesados
- [ ] useMemo para cálculos costosos
- [ ] useCallback para funciones
- [ ] Virtualización para listas grandes
- [ ] Debouncing en búsquedas

### **✅ Optimizaciones de Datos**
- [ ] React Query implementado
- [ ] Cache estratégico
- [ ] Optimistic updates
- [ ] Error boundaries
- [ ] Loading states

### **✅ Optimizaciones de Producción**
- [ ] Headers de cache configurados
- [ ] Compresión habilitada
- [ ] CDN configurado
- [ ] Monitoring implementado
- [ ] Error tracking activo

---

**¡Con estas optimizaciones tu aplicación Next.js tendrá un rendimiento excepcional!** 🚀
