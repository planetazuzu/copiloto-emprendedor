import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { ToastContainer } from '@/components/ui/toast'
import { SuppressHydrationWarnings } from '@/components/suppress-hydration-warnings'
import { ErrorBoundary } from '@/components/error-boundary'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Copiloto Emprendedor',
  description: 'Tu asistente inteligente para el emprendimiento',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <SuppressHydrationWarnings />
        <ErrorBoundary>
          <Providers>
            {children}
            <ToastContainer />
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  )
}
