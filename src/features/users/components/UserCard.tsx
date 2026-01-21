import { clsx } from 'clsx'

import { Card, CardContent } from '@/core/ui'

import type { User } from '../types'

interface UserCardProps {
  user: User
  onClick?: () => void
}

const statusColors = {
  active:
    'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  inactive: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
  pending:
    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
}

const roleColors = {
  admin:
    'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  moderator: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  user: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
}

export function UserCard({ user, onClick }: UserCardProps) {
  return (
    <Card
      className={clsx(
        'transition-shadow',
        onClick && 'cursor-pointer hover:shadow-md'
      )}
      onClick={onClick}
    >
      <CardContent className="flex items-center gap-4 p-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={`${user.firstName} ${user.lastName}`}
              className="h-12 w-12 rounded-full object-cover"
            />
          ) : (
            <span className="text-lg font-medium">
              {user.firstName[0]}
              {user.lastName[0]}
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-text-primary truncate">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-sm text-text-secondary truncate">{user.email}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span
            className={clsx(
              'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
              roleColors[user.role]
            )}
          >
            {user.role}
          </span>
          <span
            className={clsx(
              'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
              statusColors[user.status]
            )}
          >
            {user.status}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
