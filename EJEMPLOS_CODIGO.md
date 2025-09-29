# 💻 EJEMPLOS DE CÓDIGO - COPILOTO EMPRENDEDOR

## 🎯 **COMPONENTES REUTILIZABLES**

### **1. Modal Base con shadcn/ui**
```typescript
'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface BaseModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export function BaseModal({ 
  isOpen, 
  onClose, 
  title, 
  description, 
  children, 
  size = 'md' 
}: BaseModalProps) {
  const sizeClasses = {
    sm: 'sm:max-w-[425px]',
    md: 'sm:max-w-[600px]',
    lg: 'sm:max-w-[800px]',
    xl: 'sm:max-w-[1000px]'
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${sizeClasses[size]} max-h-[90vh] overflow-y-auto`}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && (
            <DialogDescription>{description}</DialogDescription>
          )}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}
```

### **2. Card con Acciones**
```typescript
'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface ActionCardProps {
  title: string
  description?: string
  badge?: string
  badgeColor?: string
  actions?: Array<{
    label: string
    onClick: () => void
    variant?: 'default' | 'outline' | 'destructive'
    icon?: React.ReactNode
  }>
  children?: React.ReactNode
}

export function ActionCard({ 
  title, 
  description, 
  badge, 
  badgeColor = 'bg-blue-100 text-blue-800',
  actions = [],
  children 
}: ActionCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            {description && (
              <p className="text-sm text-gray-600 mt-1">{description}</p>
            )}
          </div>
          {badge && (
            <Badge className={badgeColor}>{badge}</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {children}
        {actions.length > 0 && (
          <div className="flex gap-2 mt-4">
            {actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant || 'outline'}
                size="sm"
                onClick={action.onClick}
              >
                {action.icon && <span className="mr-2">{action.icon}</span>}
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
```

### **3. Filtros Avanzados**
```typescript
'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Filter, X } from 'lucide-react'

interface AdvancedFiltersProps {
  onSearch: (term: string) => void
  onFilter: (filters: Record<string, string>) => void
  filters: Array<{
    key: string
    label: string
    options: Array<{ value: string; label: string }>
  }>
}

export function AdvancedFilters({ onSearch, onFilter, filters }: AdvancedFiltersProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({})

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    onSearch(value)
  }

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...activeFilters, [key]: value }
    setActiveFilters(newFilters)
    onFilter(newFilters)
  }

  const clearFilters = () => {
    setActiveFilters({})
    setSearchTerm('')
    onSearch('')
    onFilter({})
  }

  const hasActiveFilters = Object.values(activeFilters).some(value => value !== '')

  return (
    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        {hasActiveFilters && (
          <Button variant="outline" onClick={clearFilters}>
            <X className="h-4 w-4 mr-2" />
            Limpiar
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filters.map((filter) => (
          <div key={filter.key}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {filter.label}
            </label>
            <select
              value={activeFilters[filter.key] || ''}
              onChange={(e) => handleFilterChange(filter.key, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos</option>
              {filter.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}
```

---

## 🔧 **HOOKS PERSONALIZADOS**

### **1. Hook para API con Manejo de Errores**
```typescript
import { useState, useCallback } from 'react'
import { useToast } from '@/lib/hooks/use-toast'

interface UseApiOptions {
  showToast?: boolean
  customErrorMessage?: string
}

export function useApi() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const toast = useToast()

  const execute = useCallback(async <T>(
    operation: () => Promise<T>,
    options: UseApiOptions = {}
  ): Promise<T | null> => {
    const { showToast = true, customErrorMessage } = options

    try {
      setIsLoading(true)
      setError(null)

      const result = await operation()
      return result
    } catch (err) {
      const errorMessage = customErrorMessage || (err instanceof Error ? err.message : 'Error desconocido')
      setError(errorMessage)

      if (showToast) {
        toast.error({
          title: 'Error',
          description: errorMessage
        })
      }

      return null
    } finally {
      setIsLoading(false)
    }
  }, [toast])

  return {
    execute,
    isLoading,
    error,
    clearError: () => setError(null)
  }
}
```

### **2. Hook para Formularios con Validación**
```typescript
import { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useToast } from '@/lib/hooks/use-toast'

export function useFormWithValidation<T extends z.ZodType>(
  schema: T,
  defaultValues?: Partial<z.infer<T>>
) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const toast = useToast()

  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as z.infer<T>
  })

  const handleSubmit = useCallback(async (
    onSubmit: (data: z.infer<T>) => Promise<void>
  ) => {
    try {
      setIsSubmitting(true)
      const data = form.getValues()
      await onSubmit(data)
    } catch (error) {
      toast.error({
        title: 'Error',
        description: 'Hubo un problema al procesar el formulario'
      })
    } finally {
      setIsSubmitting(false)
    }
  }, [form, toast])

  return {
    ...form,
    handleSubmit,
    isSubmitting
  }
}
```

### **3. Hook para Local Storage**
```typescript
import { useState, useEffect, useCallback } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }

    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }, [key, storedValue])

  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue)
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key)
      }
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error)
    }
  }, [key, initialValue])

  return [storedValue, setValue, removeValue] as const
}
```

---

## 📊 **COMPONENTES DE DATOS**

### **1. Tabla con Paginación**
```typescript
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginatedTableProps<T> {
  data: T[]
  columns: Array<{
    key: keyof T
    label: string
    render?: (value: any, item: T) => React.ReactNode
  }>
  pageSize?: number
  onRowClick?: (item: T) => void
}

export function PaginatedTable<T extends Record<string, any>>({
  data,
  columns,
  pageSize = 10,
  onRowClick
}: PaginatedTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(data.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const currentData = data.slice(startIndex, endIndex)

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              {columns.map((column) => (
                <th key={String(column.key)} className="text-left p-3 font-medium">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr
                key={index}
                className={`border-b hover:bg-gray-50 ${onRowClick ? 'cursor-pointer' : ''}`}
                onClick={() => onRowClick?.(item)}
              >
                {columns.map((column) => (
                  <td key={String(column.key)} className="p-3">
                    {column.render
                      ? column.render(item[column.key], item)
                      : item[column.key]
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Mostrando {startIndex + 1} a {Math.min(endIndex, data.length)} de {data.length} resultados
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="px-3 py-1 text-sm">
              {currentPage} de {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
```

### **2. Gráfico de Barras Simple**
```typescript
'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface BarChartData {
  label: string
  value: number
  color?: string
}

interface SimpleBarChartProps {
  data: BarChartData[]
  title: string
  description?: string
}

export function SimpleBarChart({ data, title, description }: SimpleBarChartProps) {
  const maxValue = Math.max(...data.map(d => d.value))

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && (
          <p className="text-sm text-gray-600">{description}</p>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{item.label}</span>
                <span className="text-sm text-gray-600">{item.value}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    item.color || 'bg-blue-500'
                  }`}
                  style={{ width: `${(item.value / maxValue) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
```

---

## 🔄 **UTILIDADES**

### **1. Funciones de Formateo**
```typescript
// Formatear fechas
export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions) {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }
  
  return new Intl.DateTimeFormat('es-ES', { ...defaultOptions, ...options }).format(
    new Date(date)
  )
}

// Formatear moneda
export function formatCurrency(amount: number, currency = 'EUR') {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency
  }).format(amount)
}

// Formatear números
export function formatNumber(num: number) {
  return new Intl.NumberFormat('es-ES').format(num)
}

// Formatear porcentajes
export function formatPercentage(value: number, decimals = 1) {
  return `${value.toFixed(decimals)}%`
}
```

### **2. Funciones de Validación**
```typescript
import { z } from 'zod'

// Validación de email
export const emailSchema = z.string().email('Email inválido')

// Validación de teléfono
export const phoneSchema = z.string().regex(
  /^[+]?[\d\s\-\(\)]{10,}$/,
  'Número de teléfono inválido'
)

// Validación de URL
export const urlSchema = z.string().url('URL inválida')

// Validación de contraseña
export const passwordSchema = z.string()
  .min(8, 'La contraseña debe tener al menos 8 caracteres')
  .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
  .regex(/[a-z]/, 'Debe contener al menos una minúscula')
  .regex(/[0-9]/, 'Debe contener al menos un número')
```

### **3. Funciones de API**
```typescript
// Cliente API base
export class ApiClient {
  private baseUrl: string

  constructor(baseUrl = '/api') {
    this.baseUrl = baseUrl
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response.json()
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response.json()
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response.json()
  }

  async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response.json()
  }
}

// Instancia global
export const apiClient = new ApiClient()
```

---

## 🎨 **ESTILOS Y TEMAS**

### **1. Clases de Utilidad Personalizadas**
```css
/* app/globals.css */

@layer utilities {
  .text-gradient {
    @apply bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent;
  }
  
  .glass {
    @apply bg-white/80 backdrop-blur-sm border border-white/20;
  }
  
  .shadow-glow {
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
  }
  
  .animate-fade-in {
    animation: fadeIn 0.5s ease-in-out;
  }
  
  .animate-slide-up {
    animation: slideUp 0.3s ease-out;
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { 
    opacity: 0;
    transform: translateY(20px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}
```

### **2. Componente de Loading**
```typescript
'use client'

import { Loader2 } from 'lucide-react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
}

export function LoadingSpinner({ size = 'md', text }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  }

  return (
    <div className="flex items-center justify-center space-x-2">
      <Loader2 className={`${sizeClasses[size]} animate-spin`} />
      {text && <span className="text-sm text-gray-600">{text}</span>}
    </div>
  )
}
```

---

## 🔐 **SEGURIDAD**

### **1. Sanitización de Inputs**
```typescript
import DOMPurify from 'dompurify'

export function sanitizeInput(input: string): string {
  return DOMPurify.sanitize(input)
}

export function validateAndSanitize(input: string, maxLength = 1000): string {
  const sanitized = sanitizeInput(input)
  return sanitized.length > maxLength 
    ? sanitized.substring(0, maxLength) 
    : sanitized
}
```

### **2. Middleware de Autenticación**
```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('next-auth.session-token')
  
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/crm/:path*', '/profile/:path*']
}
```

---

## 📱 **RESPONSIVE UTILITIES**

### **1. Hook para Breakpoints**
```typescript
import { useState, useEffect } from 'react'

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<'sm' | 'md' | 'lg' | 'xl'>('lg')

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth
      if (width < 640) setBreakpoint('sm')
      else if (width < 768) setBreakpoint('md')
      else if (width < 1024) setBreakpoint('lg')
      else setBreakpoint('xl')
    }

    updateBreakpoint()
    window.addEventListener('resize', updateBreakpoint)
    return () => window.removeEventListener('resize', updateBreakpoint)
  }, [])

  return breakpoint
}
```

### **2. Componente Responsive**
```typescript
'use client'

import { useBreakpoint } from '@/lib/hooks/use-breakpoint'

interface ResponsiveComponentProps {
  children: React.ReactNode
  mobile?: React.ReactNode
  tablet?: React.ReactNode
  desktop?: React.ReactNode
}

export function ResponsiveComponent({ 
  children, 
  mobile, 
  tablet, 
  desktop 
}: ResponsiveComponentProps) {
  const breakpoint = useBreakpoint()

  if (breakpoint === 'sm' && mobile) return <>{mobile}</>
  if (breakpoint === 'md' && tablet) return <>{tablet}</>
  if (breakpoint === 'lg' && desktop) return <>{desktop}</>
  
  return <>{children}</>
}
```

---

**¡Estos ejemplos de código te proporcionan una base sólida para desarrollar funcionalidades similares!** 🚀
