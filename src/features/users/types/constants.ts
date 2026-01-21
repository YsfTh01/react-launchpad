import type { UserRole, UserStatus } from './index'

export const USER_ROLES: { value: UserRole; labelKey: string }[] = [
  { value: 'admin', labelKey: 'roles.admin' },
  { value: 'moderator', labelKey: 'roles.moderator' },
  { value: 'user', labelKey: 'roles.user' },
]

export const USER_STATUSES: { value: UserStatus; labelKey: string }[] = [
  { value: 'active', labelKey: 'statuses.active' },
  { value: 'inactive', labelKey: 'statuses.inactive' },
  { value: 'pending', labelKey: 'statuses.pending' },
]

export const ROLE_BADGE_STYLES: Record<UserRole, string> = {
  admin:
    'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  moderator: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  user: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
}

export const STATUS_BADGE_STYLES: Record<UserStatus, string> = {
  active:
    'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  inactive: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
  pending:
    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
}
