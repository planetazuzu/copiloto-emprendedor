'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  AlertTriangle, 
  RefreshCw, 
  Wifi, 
  Database, 
  FileX, 
  Users,
  Search,
  Loader2
} from 'lucide-react'

interface ErrorFallbackProps {
  type?: 'network' | 'server' | 'not-found' | 'unauthorized' | 'generic'
  title?: string
  description?: string
  onRetry?: () => void
  showRetry?: boolean
  retryText?: string
  className?: string
}

export function ErrorFallback({
  type = 'generic',
  title,
  description,
  onRetry,
  showRetry = true,
  retryText = 'Intentar de nuevo',
  className = ''
}: ErrorFallbackProps) {
  const getErrorConfig = () => {
    switch (type) {
      case 'network':
        return {
          icon: <Wifi className="h-8 w-8 text-orange-600" />,
          title: title || 'Error de conexión',
          description: description || 'No se pudo conectar al servidor. Verifica tu conexión a internet.',
          bgColor: 'bg-orange-100'
        }
      case 'server':
        return {
          icon: <Database className="h-8 w-8 text-red-600" />,
          title: title || 'Error del servidor',
          description: description || 'El servidor está experimentando problemas. Intenta de nuevo más tarde.',
          bgColor: 'bg-red-100'
        }
      case 'not-found':
        return {
          icon: <FileX className="h-8 w-8 text-gray-600" />,
          title: title || 'No encontrado',
          description: description || 'El recurso que buscas no existe o ha sido eliminado.',
          bgColor: 'bg-gray-100'
        }
      case 'unauthorized':
        return {
          icon: <Users className="h-8 w-8 text-yellow-600" />,
          title: title || 'No autorizado',
          description: description || 'No tienes permisos para acceder a este recurso.',
          bgColor: 'bg-yellow-100'
        }
      default:
        return {
          icon: <AlertTriangle className="h-8 w-8 text-red-600" />,
          title: title || 'Error inesperado',
          description: description || 'Ha ocurrido un error inesperado. Por favor, intenta de nuevo.',
          bgColor: 'bg-red-100'
        }
    }
  }

  const config = getErrorConfig()

  return (
    <Card className={`w-full max-w-md mx-auto ${className}`}>
      <CardContent className="p-6 text-center">
        <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${config.bgColor}`}>
          {config.icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {config.title}
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          {config.description}
        </p>
        {showRetry && onRetry && (
          <Button onClick={onRetry} className="w-full">
            <RefreshCw className="h-4 w-4 mr-2" />
            {retryText}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

// Componente para errores de carga
export function LoadingErrorFallback({
  onRetry,
  isLoading = false
}: {
  onRetry?: () => void
  isLoading?: boolean
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      {isLoading ? (
        <>
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-4" />
          <p className="text-gray-600">Cargando...</p>
        </>
      ) : (
        <>
          <AlertTriangle className="h-8 w-8 text-red-600 mb-4" />
          <p className="text-gray-600 mb-4">Error al cargar los datos</p>
          {onRetry && (
            <Button onClick={onRetry} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Intentar de nuevo
            </Button>
          )}
        </>
      )}
    </div>
  )
}

// Componente para errores de búsqueda
export function SearchErrorFallback({
  searchTerm,
  onRetry,
  onClearSearch
}: {
  searchTerm?: string
  onRetry?: () => void
  onClearSearch?: () => void
}) {
  return (
    <div className="text-center py-12">
      <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        No se encontraron resultados
      </h3>
      <p className="text-gray-600 mb-4">
        {searchTerm 
          ? `No se encontraron resultados para "${searchTerm}"`
          : 'No hay datos disponibles'
        }
      </p>
      <div className="flex gap-2 justify-center">
        {onRetry && (
          <Button onClick={onRetry} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Intentar de nuevo
          </Button>
        )}
        {onClearSearch && searchTerm && (
          <Button onClick={onClearSearch} variant="outline">
            Limpiar búsqueda
          </Button>
        )}
      </div>
    </div>
  )
}

// Componente para errores de formulario
export function FormErrorFallback({
  errors,
  onRetry
}: {
  errors: Record<string, string | null>
  onRetry?: () => void
}) {
  const validErrors = Object.entries(errors).filter(([_, value]) => value !== null) as [string, string][]
  const errorCount = validErrors.length

  return (
    <Card className="border-red-200 bg-red-50">
      <CardContent className="p-4">
        <div className="flex items-start">
          <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
          <div className="flex-1">
            <h4 className="text-sm font-medium text-red-800 mb-2">
              {errorCount === 1 ? 'Hay un error' : `Hay ${errorCount} errores`} en el formulario
            </h4>
            <ul className="text-sm text-red-700 space-y-1">
              {validErrors.map(([field, message]) => (
                <li key={field}>
                  <strong>{field}:</strong> {message}
                </li>
              ))}
            </ul>
            {onRetry && (
              <Button 
                onClick={onRetry} 
                variant="outline" 
                size="sm" 
                className="mt-3"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Reintentar
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Hook para manejar estados de error
export function useErrorState() {
  const [error, setError] = React.useState<string | null>(null)
  const [isRetrying, setIsRetrying] = React.useState(false)

  const setErrorState = React.useCallback((message: string | null) => {
    setError(message)
    if (message) {
      setIsRetrying(false)
    }
  }, [])

  const retry = React.useCallback(async (retryFn: () => Promise<void>) => {
    setIsRetrying(true)
    setError(null)
    
    try {
      await retryFn()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setIsRetrying(false)
    }
  }, [])

  const clearError = React.useCallback(() => {
    setError(null)
    setIsRetrying(false)
  }, [])

  return {
    error,
    isRetrying,
    setErrorState,
    retry,
    clearError
  }
}
