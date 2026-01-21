import { forwardRef, useId } from 'react'

import { clsx } from 'clsx'

export interface CheckboxProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'size'
> {
  label?: string
  description?: string
  error?: string
  size?: 'sm' | 'md' | 'lg'
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      description,
      error,
      size = 'md',
      className,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = useId()
    const inputId = id || `checkbox-${generatedId}`

    const sizeClasses = {
      sm: 'h-3.5 w-3.5',
      md: 'h-4 w-4',
      lg: 'h-5 w-5',
    }

    const labelSizeClasses = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    }

    return (
      <div className="flex items-start">
        <div className="flex h-5 items-center">
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            disabled={disabled}
            className={clsx(
              'rounded border-border bg-background text-primary',
              'transition-colors duration-200',
              'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
              'disabled:cursor-not-allowed disabled:opacity-50',
              error && 'border-error',
              sizeClasses[size],
              className
            )}
            {...props}
          />
        </div>
        {(label || description) && (
          <div className="ml-3">
            {label && (
              <label
                htmlFor={inputId}
                className={clsx(
                  'font-medium text-text-primary',
                  disabled && 'cursor-not-allowed opacity-50',
                  labelSizeClasses[size]
                )}
              >
                {label}
              </label>
            )}
            {description && (
              <p
                className={clsx('text-text-secondary', labelSizeClasses[size])}
              >
                {description}
              </p>
            )}
            {error && <p className="mt-1 text-sm text-error">{error}</p>}
          </div>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'
