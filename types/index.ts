// Tipos compartidos para la aplicación

export interface User {
  id: string;
  email: string;
  name?: string;
  image?: string;
  sector?: string;
  stage?: string;
  needs?: string;
  organizationId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Organization {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  sector?: string;
  stage?: string;
  url?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseProgress {
  id: string;
  userId: string;
  courseId: string;
  progress: number;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Bookmark {
  id: string;
  userId: string;
  resourceId: string;
  createdAt: Date;
}

// Tipos para formularios
export interface UserProfileForm {
  name: string;
  sector: string;
  stage: string;
  needs: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Tipos para el dashboard
export interface DashboardStats {
  recommendedResources: number;
  suggestedCourses: number;
  upcomingTasks: number;
}

// Tipos para filtros
export interface ResourceFilters {
  category?: string;
  sector?: string;
  stage?: string;
  search?: string;
}

export interface CourseFilters {
  category?: string;
  level?: string;
  search?: string;
}

// Tipos para la comunidad B2B
export interface Channel {
  id: string;
  name: string;
  description: string;
  messageCount: number;
  lastMessage?: string;
}

export interface Message {
  id: string;
  content: string;
  author: string;
  timestamp: Date;
  channelId: string;
}

// Tipos para planes de billing
export interface Plan {
  id: string;
  name: string;
  price: number;
  features: string[];
  isPopular?: boolean;
}

// Tipos para respuestas de API
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Tipos para el estado global (Zustand)
export interface AppState {
  user: User | null;
  organization: Organization | null;
  isLoading: boolean;
  favorites: string[];
  setUser: (user: User | null) => void;
  setOrganization: (organization: Organization | null) => void;
  setLoading: (loading: boolean) => void;
  addToFavorites: (resourceId: string) => void;
  removeFromFavorites: (resourceId: string) => void;
  toggleFavorite: (resourceId: string) => void;
  loadFavorites: () => void;
}
