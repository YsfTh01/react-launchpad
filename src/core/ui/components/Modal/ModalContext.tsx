import { createContext, useCallback, useContext, useState } from 'react'
import type { ReactNode } from 'react'

import type { ModalConfig, ModalContextValue } from './types'

const ModalContext = createContext<ModalContextValue | null>(null)

interface ModalProviderProps {
  children: ReactNode
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [modals, setModals] = useState<ModalConfig[]>([])

  const open = useCallback(
    (config: Omit<ModalConfig, 'id'> & { id?: string }) => {
      const id =
        config.id ||
        `modal-${Date.now()}-${Math.random().toString(36).slice(2)}`
      const modalConfig: ModalConfig = {
        id,
        size: 'md',
        closeOnOverlayClick: true,
        closeOnEscape: true,
        showCloseButton: true,
        ...config,
      }
      setModals((prev) => [...prev, modalConfig])
      return id
    },
    []
  )

  const close = useCallback((id: string) => {
    setModals((prev) => {
      const modal = prev.find((m) => m.id === id)
      if (modal?.onClose) {
        modal.onClose()
      }
      return prev.filter((m) => m.id !== id)
    })
  }, [])

  const closeAll = useCallback(() => {
    setModals((prev) => {
      prev.forEach((modal) => modal.onClose?.())
      return []
    })
  }, [])

  return (
    <ModalContext.Provider value={{ modals, open, close, closeAll }}>
      {children}
    </ModalContext.Provider>
  )
}

export function useModalContext() {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider')
  }
  return context
}
