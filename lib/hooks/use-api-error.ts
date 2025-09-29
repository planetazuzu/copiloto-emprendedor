import { useState, useCallback } from 'react'
import { useToast } from './use-toast'

export interface ApiError {
  message: string
  code?: string
  status?: number
  details?: any
}

export interface UseApiErrorReturn {
  error: ApiError | null
  isLoading: boolean
  setError: (error: ApiError | null) => void
  setLoading: (loading: boolean) => void
  handleError: (error: any) => void
  clearError: () => void
  executeWithErrorHandling: <T>(
    operation: () => Promise<T>,
    options?: {
      showToast?: boolean
      customErrorMessage?: string
      onError?: (error: ApiError) => void
    }
  ) => Promise<T | null>
}

export function useApiError(): UseApiErrorReturn {
  const [error, setError] = useState<ApiError | null>(null)
  const [isLoading, setLoading] = useState(false)
  const toast = useToast()

  const handleError = useCallback((error: any) => {
    console.error('API Error:', error)
    
    let apiError: ApiError

    if (error.response) {
      // Error de respuesta HTTP
      apiError = {
        message: error.response.data?.message || 'Error del servidor',
        code: error.response.data?.code,
        status: error.response.status,
        details: error.response.data
      }
    } else if (error.request) {
      // Error de red
      apiError = {
        message: 'Error de conexión. Verifica tu conexión a internet.',
        code: 'NETWORK_ERROR',
        status: 0
      }
    } else {
      // Error desconocido
      apiError = {
        message: error.message || 'Error desconocido',
        code: 'UNKNOWN_ERROR'
      }
    }

    setError(apiError)
    return apiError
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const executeWithErrorHandling = useCallback(async <T>(
    operation: () => Promise<T>,
    options: {
      showToast?: boolean
      customErrorMessage?: string
      onError?: (error: ApiError) => void
    } = {}
  ): Promise<T | null> => {
    const { showToast = true, customErrorMessage, onError } = options
    
    try {
      setLoading(true)
      clearError()
      
      const result = await operation()
      return result
    } catch (error) {
      const apiError = handleError(error)
      
      if (onError) {
        onError(apiError)
      }
      
      if (showToast) {
        const message = customErrorMessage || apiError.message
        toast.error({
          title: 'Error',
          description: message
        })
      }
      
      return null
    } finally {
      setLoading(false)
    }
  }, [handleError, clearError, toast])

  return {
    error,
    isLoading,
    setError,
    setLoading,
    handleError,
    clearError,
    executeWithErrorHandling
  }
}

// Utilidades para manejo de errores específicos
export const getErrorMessage = (error: any): string => {
  if (typeof error === 'string') return error
  if (error?.message) return error.message
  if (error?.response?.data?.message) return error.response.data.message
  return 'Error desconocido'
}

export const isNetworkError = (error: any): boolean => {
  return !error.response && error.request
}

export const isServerError = (error: any): boolean => {
  return error.response?.status >= 500
}

export const isClientError = (error: any): boolean => {
  return error.response?.status >= 400 && error.response?.status < 500
}

export const isValidationError = (error: any): boolean => {
  return error.response?.status === 422 || error.response?.status === 400
}
