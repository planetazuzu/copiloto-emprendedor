'use client'

import { useEffect } from 'react'

export function SuppressHydrationWarnings() {
  useEffect(() => {
    // Suprimir warnings de hidratación para atributos de extensiones del navegador
    const originalError = console.error
    console.error = (...args) => {
      if (
        typeof args[0] === 'string' &&
        args[0].includes('Extra attributes from the server') &&
        args[0].includes('cz-shortcut-listen')
      ) {
        return
      }
      originalError.apply(console, args)
    }

    return () => {
      console.error = originalError
    }
  }, [])

  return null
}
