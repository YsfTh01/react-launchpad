import { forwardRef, useId } from 'react'

import { clsx } from 'clsx'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps extends Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  'size'
> {
  label?: string
  error?: string
  hint?: string
  options: SelectOption[]
  placeholder?: string
  size?: 'sm' | 'md' | 'lg'
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      hint,
      options,
      placeholder,
      size = 'md',
      className,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = useId()
    const inputId = id || `select-${generatedId}`

    const sizeClasses = {
      sm: 'px-2.5 py-1.5 text-sm',
      md: 'px-3 py-2 text-sm',
      lg: 'px-4 py-2.5 text-base',
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
        <select
          ref={ref}
          id={inputId}
          disabled={disabled}
          className={clsx(
            'w-full rounded-md border bg-background text-text-primary',
            'transition-colors duration-200',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary',
            'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-background-secondary',
            error
              ? 'border-error focus:ring-error focus:border-error'
              : 'border-border hover:border-border-hover',
            sizeClasses[size],
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
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

Select.displayName = 'Select'
