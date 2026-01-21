import type { ReactNode } from 'react'

export interface ModalConfig {
  id: string
  title?: string
  description?: string
  content: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  closeOnOverlayClick?: boolean
  closeOnEscape?: boolean
  showCloseButton?: boolean
  onClose?: () => void
}

export interface ModalContextValue {
  modals: ModalConfig[]
  open: (config: Omit<ModalConfig, 'id'> & { id?: string }) => string
  close: (id: string) => void
  closeAll: () => void
}
