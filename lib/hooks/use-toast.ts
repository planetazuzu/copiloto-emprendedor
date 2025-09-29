'use client'

import { useCallback } from 'react'

export interface ToastOptions {
  title: string
  description?: string
  duration?: number
}

export const useToast = () => {
  const toast = useCallback((options: ToastOptions & { type: 'success' | 'error' | 'warning' | 'info' }) => {
    if (typeof window !== 'undefined' && (window as any).toast) {
      ;(window as any).toast[options.type](options.title, options.description, options.duration)
    }
  }, [])

  return {
    success: (options: ToastOptions) => toast({ ...options, type: 'success' }),
    error: (options: ToastOptions) => toast({ ...options, type: 'error' }),
    warning: (options: ToastOptions) => toast({ ...options, type: 'warning' }),
    info: (options: ToastOptions) => toast({ ...options, type: 'info' })
  }
}
