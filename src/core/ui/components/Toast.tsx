import { Toaster as SonnerToaster } from 'sonner'

export function Toaster() {
  return (
    <SonnerToaster
      position="top-right"
      expand={false}
      richColors
      closeButton
      toastOptions={{
        classNames: {
          toast:
            'group toast bg-background border-border text-text-primary shadow-lg',
          title: 'text-text-primary font-medium',
          description: 'text-text-secondary text-sm',
          actionButton: 'bg-primary text-white',
          cancelButton: 'bg-background-secondary text-text-primary',
          closeButton: 'bg-background border-border',
          success: 'border-green-500/50 bg-green-50 dark:bg-green-950/20',
          error: 'border-red-500/50 bg-red-50 dark:bg-red-950/20',
          warning: 'border-yellow-500/50 bg-yellow-50 dark:bg-yellow-950/20',
          info: 'border-blue-500/50 bg-blue-50 dark:bg-blue-950/20',
        },
      }}
    />
  )
}

export { toast } from 'sonner'
