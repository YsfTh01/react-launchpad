import { toast } from 'sonner'

import type { ExternalToast } from 'sonner'

type ToastType = 'success' | 'error' | 'warning' | 'info' | 'loading'

interface ToastOptions extends ExternalToast {
  type?: ToastType
}

export function useToast() {
  const showToast = (message: string, options?: ToastOptions) => {
    const { type = 'info', ...rest } = options || {}

    switch (type) {
      case 'success':
        return toast.success(message, rest)
      case 'error':
        return toast.error(message, rest)
      case 'warning':
        return toast.warning(message, rest)
      case 'loading':
        return toast.loading(message, rest)
      case 'info':
      default:
        return toast.info(message, rest)
    }
  }

  const success = (message: string, options?: ExternalToast) =>
    toast.success(message, options)

  const error = (message: string, options?: ExternalToast) =>
    toast.error(message, options)

  const warning = (message: string, options?: ExternalToast) =>
    toast.warning(message, options)

  const info = (message: string, options?: ExternalToast) =>
    toast.info(message, options)

  const loading = (message: string, options?: ExternalToast) =>
    toast.loading(message, options)

  const dismiss = (toastId?: string | number) => toast.dismiss(toastId)

  const promise = <T>(
    promiseFn: Promise<T>,
    messages: {
      loading: string
      success: string | ((data: T) => string)
      error: string | ((error: unknown) => string)
    }
  ) => toast.promise(promiseFn, messages)

  return {
    toast: showToast,
    success,
    error,
    warning,
    info,
    loading,
    dismiss,
    promise,
  }
}
