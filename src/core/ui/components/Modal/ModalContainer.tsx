import { createPortal } from 'react-dom'

import { Modal } from './Modal'
import { useModalContext } from './ModalContext'

export function ModalContainer() {
  const { modals, close } = useModalContext()

  if (modals.length === 0) {
    return null
  }

  return createPortal(
    <>
      {modals.map((modal) => (
        <Modal key={modal.id} {...modal} onClose={() => close(modal.id)} />
      ))}
    </>,
    document.body
  )
}
