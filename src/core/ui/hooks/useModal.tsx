import { useCallback, useRef } from 'react'
import type { ReactNode } from 'react'

import { useModalContext } from '../components/Modal'

import type { ModalConfig } from '../components/Modal'

type OpenModalConfig = Omit<ModalConfig, 'id' | 'content'> & {
  id?: string
}

export function useModal() {
  const { open, close, closeAll, modals } = useModalContext()

  const openModal = useCallback(
    (content: ReactNode, config?: OpenModalConfig) => {
      return open({ ...config, content })
    },
    [open]
  )

  const openConfirm = useCallback(
    (options: {
      title: string
      description?: string
      confirmText?: string
      cancelText?: string
      onConfirm: () => void | Promise<void>
      onCancel?: () => void
      variant?: 'danger' | 'warning' | 'default'
    }) => {
      const {
        title,
        description,
        confirmText = 'Confirm',
        cancelText = 'Cancel',
        onConfirm,
        onCancel,
        variant = 'default',
      } = options

      const id = open({
        title,
        description,
        size: 'sm',
        content: (
          <div className="flex justify-end gap-2 pt-4">
            <button
              onClick={() => {
                onCancel?.()
                close(id)
              }}
              className="rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-text-primary hover:bg-background-secondary"
            >
              {cancelText}
            </button>
            <button
              onClick={async () => {
                await onConfirm()
                close(id)
              }}
              className={`rounded-md px-4 py-2 text-sm font-medium text-white ${
                variant === 'danger'
                  ? 'bg-red-500 hover:bg-red-600'
                  : variant === 'warning'
                    ? 'bg-yellow-500 hover:bg-yellow-600'
                    : 'bg-primary hover:bg-primary/90'
              }`}
            >
              {confirmText}
            </button>
          </div>
        ),
      })

      return id
    },
    [open, close]
  )

  return {
    open: openModal,
    close,
    closeAll,
    openConfirm,
    modals,
    isOpen: modals.length > 0,
  }
}

export function useModalRef() {
  const modalIdRef = useRef<string | null>(null)
  const { open, close } = useModal()

  const openModal = useCallback(
    (content: ReactNode, config?: OpenModalConfig) => {
      if (modalIdRef.current) {
        close(modalIdRef.current)
      }
      modalIdRef.current = open(content, config)
      return modalIdRef.current
    },
    [open, close]
  )

  const closeModal = useCallback(() => {
    if (modalIdRef.current) {
      close(modalIdRef.current)
      modalIdRef.current = null
    }
  }, [close])

  const getModalId = useCallback(() => modalIdRef.current, [])

  return {
    open: openModal,
    close: closeModal,
    getModalId,
  }
}
