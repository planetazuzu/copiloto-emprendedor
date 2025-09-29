import { useState, useCallback } from 'react'
import { useToast } from './use-toast'

export interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: any) => string | null
  message?: string
}

export interface ValidationRules {
  [key: string]: ValidationRule
}

export interface FormErrors {
  [key: string]: string | null
}

export interface UseFormValidationReturn {
  errors: FormErrors
  isValid: boolean
  validateField: (name: string, value: any) => string | null
  validateForm: (data: any) => boolean
  setError: (name: string, message: string | null) => void
  clearErrors: () => void
  clearFieldError: (name: string) => void
}

export function useFormValidation(rules: ValidationRules): UseFormValidationReturn {
  const [errors, setErrors] = useState<FormErrors>({})
  const toast = useToast()

  const validateField = useCallback((name: string, value: any): string | null => {
    const rule = rules[name]
    if (!rule) return null

    // Required validation
    if (rule.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
      return rule.message || `${name} es requerido`
    }

    // Skip other validations if value is empty and not required
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return null
    }

    // Min length validation
    if (rule.minLength && typeof value === 'string' && value.length < rule.minLength) {
      return rule.message || `${name} debe tener al menos ${rule.minLength} caracteres`
    }

    // Max length validation
    if (rule.maxLength && typeof value === 'string' && value.length > rule.maxLength) {
      return rule.message || `${name} no puede tener más de ${rule.maxLength} caracteres`
    }

    // Pattern validation
    if (rule.pattern && typeof value === 'string' && !rule.pattern.test(value)) {
      return rule.message || `${name} tiene un formato inválido`
    }

    // Custom validation
    if (rule.custom) {
      return rule.custom(value)
    }

    return null
  }, [rules])

  const validateForm = useCallback((data: any): boolean => {
    const newErrors: FormErrors = {}
    let hasErrors = false

    Object.keys(rules).forEach(fieldName => {
      const error = validateField(fieldName, data[fieldName])
      if (error) {
        newErrors[fieldName] = error
        hasErrors = true
      }
    })

    setErrors(newErrors)

    if (hasErrors) {
      const firstError = Object.values(newErrors).find(error => error !== null)
      if (firstError) {
        toast.error({
          title: 'Error de validación',
          description: firstError
        })
      }
    }

    return !hasErrors
  }, [rules, validateField, toast])

  const setError = useCallback((name: string, message: string | null) => {
    setErrors(prev => ({
      ...prev,
      [name]: message
    }))
  }, [])

  const clearErrors = useCallback(() => {
    setErrors({})
  }, [])

  const clearFieldError = useCallback((name: string) => {
    setErrors(prev => ({
      ...prev,
      [name]: null
    }))
  }, [])

  const isValid = Object.values(errors).every(error => error === null)

  return {
    errors,
    isValid,
    validateField,
    validateForm,
    setError,
    clearErrors,
    clearFieldError
  }
}

// Reglas de validación comunes
export const commonValidationRules = {
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Ingresa un email válido'
  },
  password: {
    required: true,
    minLength: 8,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    message: 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número'
  },
  phone: {
    pattern: /^[\+]?[1-9][\d]{0,15}$/,
    message: 'Ingresa un número de teléfono válido'
  },
  required: {
    required: true,
    message: 'Este campo es requerido'
  },
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
    message: 'El nombre debe tener entre 2 y 50 caracteres y solo letras'
  },
  company: {
    minLength: 2,
    maxLength: 100,
    message: 'El nombre de la empresa debe tener entre 2 y 100 caracteres'
  },
  description: {
    maxLength: 500,
    message: 'La descripción no puede tener más de 500 caracteres'
  }
}

// Hook para validación en tiempo real
export function useRealTimeValidation(rules: ValidationRules) {
  const { validateField, setError, clearFieldError } = useFormValidation(rules)

  const handleFieldChange = useCallback((name: string, value: any) => {
    const error = validateField(name, value)
    if (error) {
      setError(name, error)
    } else {
      clearFieldError(name)
    }
  }, [validateField, setError, clearFieldError])

  return { handleFieldChange }
}
