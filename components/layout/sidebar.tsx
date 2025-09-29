'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  Home,
  BookOpen,
  GraduationCap,
  Users,
  User,
  CreditCard,
  LogOut,
  Sparkles,
  Heart,
  Library,
  Bookmark,
  BarChart3,
  Kanban
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/lib/store'

const navigation = [
  { name: 'IA Assistant', href: '/ai-assistant', icon: Sparkles },
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Productividad', href: '/productivity', icon: BarChart3 },
  { name: 'CRM', href: '/crm', icon: Users },
  { name: 'Proyectos', href: '/projects', icon: Kanban },
  { name: 'Ayudas', href: '/resources', icon: BookOpen },
  { name: 'Biblioteca', href: '/library', icon: Library },
  { name: 'Marcadores', href: '/bookmarks', icon: Bookmark },
  { name: 'Favoritos', href: '/favorites', icon: Heart },
  { name: 'Cursos', href: '/courses', icon: GraduationCap },
  { name: 'Comunidad', href: '/community', icon: Users },
  { name: 'Perfil', href: '/profile', icon: User },
  // { name: 'Planes', href: '/billing', icon: CreditCard }, // Oculto para MVP
]

export function Sidebar() {
  const pathname = usePathname()
  const { user, setUser } = useAppStore()

  const handleSignOut = () => {
    setUser(null)
    // Redirigir a la página de inicio
    window.location.href = '/'
  }

  return (
    <div className="flex h-full w-64 flex-col bg-gray-900">
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center px-6">
        <h1 className="text-xl font-bold text-white">Copiloto Emprendedor</h1>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col px-3 py-4">
        <ul role="list" className="flex flex-1 flex-col gap-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    'group flex gap-x-3 rounded-md p-3 text-sm font-semibold leading-6 transition-colors',
                    isActive
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  )}
                >
                  <item.icon
                    className="h-6 w-6 shrink-0"
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* User section */}
        <div className="mt-auto border-t border-gray-700 pt-4">
          <div className="flex items-center gap-x-3 px-3 py-2">
            <div className="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center">
              <span className="text-sm font-medium text-white">
                {user?.name?.charAt(0) || 'U'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user?.name || 'Usuario'}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {user?.email}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSignOut}
            className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Cerrar sesión
          </Button>
        </div>
      </nav>
    </div>
  )
}
