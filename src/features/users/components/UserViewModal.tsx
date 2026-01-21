import { useTranslation } from 'react-i18next'

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Badge,
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/core/ui'

import { ROLE_BADGE_STYLES, STATUS_BADGE_STYLES } from '../types'

import type { User } from '../types'

interface UserViewModalProps {
  user: User
  onClose: () => void
  onEdit?: () => void
  open: boolean
}

export function UserViewModal({
  user,
  onClose,
  onEdit,
  open,
}: UserViewModalProps) {
  const { t } = useTranslation('users')

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-150">
        <DialogHeader>
          <DialogTitle>{t('viewUser.title', 'User Details')}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* User Avatar & Basic Info */}
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src={user.avatar}
                alt={`${user.firstName} ${user.lastName}`}
              />
              <AvatarFallback className="text-xl">
                {user.firstName[0]}
                {user.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>

          {/* User Details */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {t('details.role', 'Role')}
                </label>
                <div className="mt-1">
                  <Badge
                    variant="outline"
                    className={ROLE_BADGE_STYLES[user.role]}
                  >
                    {t(`roles.${user.role}`, user.role)}
                  </Badge>
                </div>
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {t('details.status', 'Status')}
                </label>
                <div className="mt-1">
                  <Badge
                    variant="outline"
                    className={STATUS_BADGE_STYLES[user.status]}
                  >
                    {t(`statuses.${user.status}`, user.status)}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {t('details.createdAt', 'Created At')}
                </label>
                <p className="mt-1 text-sm">{formatDate(user.createdAt)}</p>
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {t('details.updatedAt', 'Last Updated')}
                </label>
                <p className="mt-1 text-sm">{formatDate(user.updatedAt)}</p>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {t('details.userId', 'User ID')}
              </label>
              <p className="mt-1 font-mono text-sm text-muted-foreground">
                {user.id}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 border-t pt-4">
            <Button variant="outline" onClick={onClose}>
              {t('details.close', 'Close')}
            </Button>
            {onEdit && (
              <Button onClick={onEdit}>{t('details.edit', 'Edit User')}</Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
