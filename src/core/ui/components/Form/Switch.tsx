import { forwardRef, useId } from 'react'

import { clsx } from 'clsx'

export interface SwitchProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'size'
> {
  label?: string
  description?: string
  size?: 'sm' | 'md' | 'lg'
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      label,
      description,
      size = 'md',
      className,
      id,
      disabled,
      checked,
      ...props
    },
    ref
  ) => {
    const generatedId = useId()
    const inputId = id || `switch-${generatedId}`

    const trackSizeClasses = {
      sm: 'h-5 w-9',
      md: 'h-6 w-11',
      lg: 'h-7 w-14',
    }

    const thumbSizeClasses = {
      sm: 'h-3.5 w-3.5',
      md: 'h-4 w-4',
      lg: 'h-5 w-5',
    }

    const thumbTranslateClasses = {
      sm: 'translate-x-4',
      md: 'translate-x-5',
      lg: 'translate-x-7',
    }

    const labelSizeClasses = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    }

    return (
      <div className="flex items-start">
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          disabled={disabled}
          onClick={() => {
            const input = document.getElementById(inputId) as HTMLInputElement
            if (input && !disabled) {
              input.click()
            }
          }}
          className={clsx(
            'relative inline-flex shrink-0 cursor-pointer rounded-full border-2 border-transparent',
            'transition-colors duration-200 ease-in-out',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            checked ? 'bg-primary' : 'bg-background-tertiary',
            trackSizeClasses[size],
            className
          )}
        >
          <span
            className={clsx(
              'pointer-events-none inline-block rounded-full bg-white shadow-lg',
              'transform transition duration-200 ease-in-out',
              checked ? thumbTranslateClasses[size] : 'translate-x-0.5',
              thumbSizeClasses[size]
            )}
          />
        </button>
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          className="sr-only"
          {...props}
        />
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
          </div>
        )}
      </div>
    )
  }
)

Switch.displayName = 'Switch'
