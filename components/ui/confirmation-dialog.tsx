'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react'

export interface ConfirmationDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  type?: 'warning' | 'info' | 'success' | 'danger'
  isLoading?: boolean
}

const icons = {
  warning: AlertTriangle,
  info: Info,
  success: CheckCircle,
  danger: XCircle
}

const colors = {
  warning: 'text-yellow-600',
  info: 'text-blue-600',
  success: 'text-green-600',
  danger: 'text-red-600'
}

export function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  type = 'warning',
  isLoading = false
}: ConfirmationDialogProps) {
  const [isConfirming, setIsConfirming] = useState(false)

  const handleConfirm = async () => {
    setIsConfirming(true)
    try {
      await onConfirm()
      onClose()
    } catch (error) {
      console.error('Error in confirmation:', error)
    } finally {
      setIsConfirming(false)
    }
  }

  const Icon = icons[type]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-full bg-gray-100`}>
              <Icon className={`h-6 w-6 ${colors[type]}`} />
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
              <DialogDescription className="mt-1">
                {description}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <DialogFooter className="flex gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isConfirming || isLoading}
          >
            {cancelText}
          </Button>
          <Button
            variant={type === 'danger' ? 'destructive' : 'default'}
            onClick={handleConfirm}
            disabled={isConfirming || isLoading}
            className={type === 'danger' ? 'bg-red-600 hover:bg-red-700' : ''}
          >
            {isConfirming || isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Procesando...
              </>
            ) : (
              confirmText
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Hook para usar el diálogo de confirmación
export function useConfirmation() {
  const [dialog, setDialog] = useState<Partial<ConfirmationDialogProps> | null>(null)

  const confirm = (options: Omit<ConfirmationDialogProps, 'isOpen' | 'onClose'>) => {
    return new Promise<boolean>((resolve) => {
      setDialog({
        ...options,
        isOpen: true,
        onClose: () => {
          setDialog(null)
          resolve(false)
        },
        onConfirm: async () => {
          await options.onConfirm()
          resolve(true)
        }
      })
    })
  }

  const ConfirmationComponent = dialog ? (
    <ConfirmationDialog {...(dialog as ConfirmationDialogProps)} />
  ) : null

  return { confirm, ConfirmationComponent }
}
