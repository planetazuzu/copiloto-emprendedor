interface ErrorLog {
  id: string
  timestamp: Date
  level: 'error' | 'warning' | 'info'
  message: string
  stack?: string
  context?: Record<string, any>
  userId?: string
  url?: string
  userAgent?: string
}

class ErrorLogger {
  private logs: ErrorLog[] = []
  private maxLogs = 100 // Mantener solo los últimos 100 logs

  log(error: Error, context?: Record<string, any>, level: 'error' | 'warning' | 'info' = 'error') {
    const errorLog: ErrorLog = {
      id: this.generateId(),
      timestamp: new Date(),
      level,
      message: error.message,
      stack: error.stack,
      context: {
        ...context,
        name: error.name
      },
      userId: this.getCurrentUserId(),
      url: typeof window !== 'undefined' ? window.location.href : undefined,
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined
    }

    this.logs.unshift(errorLog)
    
    // Mantener solo los últimos maxLogs
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(0, this.maxLogs)
    }

    // En desarrollo, mostrar en consola
    if (process.env.NODE_ENV === 'development') {
      console.group(`🚨 ${level.toUpperCase()}: ${error.message}`)
      console.error('Error:', error)
      console.log('Context:', context)
      console.log('Stack:', error.stack)
      console.groupEnd()
    }

    // En producción, enviar a servicio de monitoreo
    if (process.env.NODE_ENV === 'production') {
      this.sendToMonitoringService(errorLog)
    }

    return errorLog.id
  }

  logMessage(message: string, context?: Record<string, any>, level: 'error' | 'warning' | 'info' = 'info') {
    const errorLog: ErrorLog = {
      id: this.generateId(),
      timestamp: new Date(),
      level,
      message,
      context,
      userId: this.getCurrentUserId(),
      url: typeof window !== 'undefined' ? window.location.href : undefined,
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined
    }

    this.logs.unshift(errorLog)
    
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(0, this.maxLogs)
    }

    if (process.env.NODE_ENV === 'development') {
      console.log(`📝 ${level.toUpperCase()}: ${message}`, context)
    }

    if (process.env.NODE_ENV === 'production') {
      this.sendToMonitoringService(errorLog)
    }

    return errorLog.id
  }

  getLogs(): ErrorLog[] {
    return [...this.logs]
  }

  getLogsByLevel(level: 'error' | 'warning' | 'info'): ErrorLog[] {
    return this.logs.filter(log => log.level === level)
  }

  clearLogs() {
    this.logs = []
  }

  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2)
  }

  private generateId(): string {
    return `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private getCurrentUserId(): string | undefined {
    // En un proyecto real, obtendrías esto del store de autenticación
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user')
      if (user) {
        try {
          const parsedUser = JSON.parse(user)
          return parsedUser.id
        } catch {
          return undefined
        }
      }
    }
    return undefined
  }

  private async sendToMonitoringService(errorLog: ErrorLog) {
    try {
      // En un proyecto real, aquí enviarías a Sentry, LogRocket, etc.
      // Ejemplo con Sentry:
      // Sentry.captureException(new Error(errorLog.message), {
      //   extra: errorLog.context,
      //   tags: {
      //     level: errorLog.level,
      //     userId: errorLog.userId
      //   }
      // })

      // Por ahora, solo simulamos el envío
      console.log('Sending to monitoring service:', errorLog)
    } catch (error) {
      console.error('Failed to send error to monitoring service:', error)
    }
  }
}

// Instancia singleton
export const errorLogger = new ErrorLogger()

// Funciones de conveniencia
export const logError = (error: Error, context?: Record<string, any>) => {
  return errorLogger.log(error, context, 'error')
}

export const logWarning = (message: string, context?: Record<string, any>) => {
  return errorLogger.logMessage(message, context, 'warning')
}

export const logInfo = (message: string, context?: Record<string, any>) => {
  return errorLogger.logMessage(message, context, 'info')
}

// Hook para usar en componentes React
export function useErrorLogger() {
  return {
    logError: (error: Error, context?: Record<string, any>) => logError(error, context),
    logWarning: (message: string, context?: Record<string, any>) => logWarning(message, context),
    logInfo: (message: string, context?: Record<string, any>) => logInfo(message, context),
    getLogs: () => errorLogger.getLogs(),
    clearLogs: () => errorLogger.clearLogs()
  }
}
