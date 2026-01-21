export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  avatar?: string
  role: UserRole
  status: UserStatus
  createdAt: string
  updatedAt: string
}

export type UserRole = 'admin' | 'user' | 'moderator'
export type UserStatus = 'active' | 'inactive' | 'pending'

export {
  USER_ROLES,
  USER_STATUSES,
  ROLE_BADGE_STYLES,
  STATUS_BADGE_STYLES,
} from './constants'

export interface CreateUserDTO {
  email: string
  firstName: string
  lastName: string
  role: UserRole
  password: string
}

export interface UpdateUserDTO {
  firstName?: string
  lastName?: string
  avatar?: string
  role?: UserRole
  status?: UserStatus
}

export interface UsersFilters {
  search?: string
  role?: UserRole
  status?: UserStatus
  page?: number
  limit?: number
}

export interface UsersResponse {
  data: User[]
  total: number
  page: number
  limit: number
  totalPages: number
}
