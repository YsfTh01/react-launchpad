import { forwardRef, useId } from 'react'

import { clsx } from 'clsx'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      hint,
      resize = 'vertical',
      className,
      id,
      disabled,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const generatedId = useId()
    const inputId = id || `textarea-${generatedId}`

    const resizeClasses = {
      none: 'resize-none',
      vertical: 'resize-y',
      horizontal: 'resize-x',
      both: 'resize',
    }

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1.5 block text-sm font-medium text-text-primary"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          rows={rows}
          disabled={disabled}
          className={clsx(
            'w-full rounded-md border bg-background px-3 py-2 text-sm text-text-primary',
            'transition-colors duration-200',
            'placeholder:text-text-muted',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary',
            'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-background-secondary',
            error
              ? 'border-error focus:ring-error focus:border-error'
              : 'border-border hover:border-border-hover',
            resizeClasses[resize],
            className
          )}
          {...props}
        />
        {(error || hint) && (
          <p
            className={clsx(
              'mt-1.5 text-sm',
              error ? 'text-error' : 'text-text-secondary'
            )}
          >
            {error || hint}
          </p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
