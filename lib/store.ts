import { create } from 'zustand'
import type { AppState, User, Organization } from '@/types'

export const useAppStore = create<AppState>((set, get) => ({
  user: null,
  organization: null,
  isLoading: false,
  favorites: [],
  setUser: (user) => set({ user }),
  setOrganization: (organization) => set({ organization }),
  setLoading: (isLoading) => set({ isLoading }),
  addToFavorites: (resourceId) => {
    const { favorites } = get()
    if (!favorites.includes(resourceId)) {
      set({ favorites: [...favorites, resourceId] })
      // Guardar en localStorage
      localStorage.setItem('favorites', JSON.stringify([...favorites, resourceId]))
      // Mostrar notificación
      if (typeof window !== 'undefined' && (window as any).toast) {
        ;(window as any).toast.success({
          title: 'Agregado a favoritos',
          description: 'El recurso se ha guardado en tus favoritos'
        })
      }
    }
  },
  removeFromFavorites: (resourceId) => {
    const { favorites } = get()
    const newFavorites = favorites.filter(id => id !== resourceId)
    set({ favorites: newFavorites })
    // Guardar en localStorage
    localStorage.setItem('favorites', JSON.stringify(newFavorites))
    // Mostrar notificación
    if (typeof window !== 'undefined' && (window as any).toast) {
      ;(window as any).toast.info({
        title: 'Eliminado de favoritos',
        description: 'El recurso se ha quitado de tus favoritos'
      })
    }
  },
  toggleFavorite: (resourceId) => {
    const { favorites } = get()
    if (favorites.includes(resourceId)) {
      get().removeFromFavorites(resourceId)
    } else {
      get().addToFavorites(resourceId)
    }
  },
  loadFavorites: () => {
    try {
      const savedFavorites = localStorage.getItem('favorites')
      if (savedFavorites) {
        set({ favorites: JSON.parse(savedFavorites) })
      }
    } catch (error) {
      console.error('Error loading favorites:', error)
    }
  }
}))
