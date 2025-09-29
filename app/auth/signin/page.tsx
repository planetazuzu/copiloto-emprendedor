'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAppStore } from '@/lib/store'

// Cuentas de prueba
const testAccounts = [
  {
    id: 1,
    name: 'Elena Vargas',
    email: 'elena@test.com',
    password: 'password123',
    role: 'Administrador General',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
    sector: 'Tecnología',
    stage: 'Empresa establecida'
  },
  {
    id: 2,
    name: 'Carlos Ruiz',
    email: 'carlos@test.com',
    password: 'password123',
    role: 'Emprendedor',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    sector: 'Servicios',
    stage: 'Startup temprana'
  },
  {
    id: 3,
    name: 'Ana Gómez',
    email: 'ana@test.com',
    password: 'password123',
    role: 'Emprendedora',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    sector: 'Retail',
    stage: 'En crecimiento'
  },
  {
    id: 4,
    name: 'Dr. Alejandro Torres',
    email: 'alejandro@test.com',
    password: 'password123',
    role: 'Mentor',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    sector: 'Educación',
    stage: 'Empresa establecida'
  },
  {
    id: 5,
    name: 'Lucía Fernández',
    email: 'lucia@test.com',
    password: 'password123',
    role: 'Consultora',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
    sector: 'Consultoría',
    stage: 'En crecimiento'
  },
  {
    id: 6,
    name: 'Marcos Solís',
    email: 'marcos@test.com',
    password: 'password123',
    role: 'Inversor',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
    sector: 'Finanzas',
    stage: 'Empresa establecida'
  }
]

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { setUser } = useAppStore()

  const handleTestAccountClick = (account: typeof testAccounts[0]) => {
    setEmail(account.email)
    setPassword(account.password)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Buscar la cuenta de prueba
    const testAccount = testAccounts.find(acc => acc.email === email && acc.password === password)
    
    // Simular login - en un proyecto real usarías NextAuth
    setTimeout(() => {
      setUser({
        id: testAccount?.id.toString() || '1',
        email: email,
        name: testAccount?.name || 'Usuario Demo',
        sector: testAccount?.sector,
        stage: testAccount?.stage,
        organizationId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      setIsLoading(false)
      window.location.href = '/dashboard'
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        {/* Logo y título */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Copiloto Emprendedor</h1>
          </div>
          <p className="text-gray-600">La plataforma de recursos impulsada por IA para emprendedores</p>
        </div>

        {/* Formulario de login */}
        <Card>
          <CardHeader>
            <CardTitle>Iniciar Sesión</CardTitle>
            <CardDescription>
              Introduce tus credenciales para acceder a tu cuenta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="nombre@empresa.com"
                />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Contraseña</Label>
                  <button 
                    onClick={() => alert('En un proyecto real, aquí se enviaría un email para restablecer la contraseña.')}
                    className="text-sm text-blue-600 hover:text-blue-500"
                  >
                    ¿Has olvidado tu contraseña?
                  </button>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Button>
            </form>
            
            <div className="mt-4 text-center">
              <span className="text-sm text-gray-600">¿No tienes cuenta? </span>
              <Link href="/auth/signup" className="text-sm text-blue-600 hover:text-blue-500 font-medium">
                Regístrate
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Cuentas de prueba */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Cuentas de Prueba</CardTitle>
            <CardDescription>
              Haz clic en un usuario para rellenar automáticamente sus credenciales
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {testAccounts.map((account) => (
                <button
                  key={account.id}
                  onClick={() => handleTestAccountClick(account)}
                  className="flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={account.avatar} />
                    <AvatarFallback>{account.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{account.name}</p>
                    <p className="text-xs text-gray-500 truncate">{account.role}</p>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Proveedores externos */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-blue-50 text-gray-500">O INICIA SESIÓN CON UN PROVEEDOR</span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => alert('En un proyecto real, aquí se abriría el flujo de autenticación de Google.')}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => alert('En un proyecto real, aquí se abriría el flujo de autenticación de Microsoft.')}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.955 13.587c-.044 4.3-3.2 7.74-7.4 7.74-4.2 0-7.6-3.4-7.6-7.6s3.4-7.6 7.6-7.6c2.1 0 4 .9 5.3 2.3l-2.1 2.1c-.6-.6-1.5-1-2.2-1-1.8 0-3.3 1.5-3.3 3.3s1.5 3.3 3.3 3.3c1.1 0 2.1-.5 2.8-1.3h-2.8v-2.7h7.1c.1.6.1 1.2.1 1.8z"/>
                </svg>
                Microsoft
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
