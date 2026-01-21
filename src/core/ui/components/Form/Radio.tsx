import { forwardRef, useId } from 'react'

import { clsx } from 'clsx'

export interface RadioOption {
  value: string
  label: string
  description?: string
  disabled?: boolean
}

export interface RadioGroupProps {
  name: string
  options: RadioOption[]
  value?: string
  onChange?: (value: string) => void
  label?: string
  error?: string
  orientation?: 'horizontal' | 'vertical'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  disabled?: boolean
}

export interface RadioProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'size'
> {
  label?: string
  description?: string
  size?: 'sm' | 'md' | 'lg'
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    { label, description, size = 'md', className, id, disabled, ...props },
    ref
  ) => {
    const generatedId = useId()
    const inputId = id || `radio-${generatedId}`

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
            type="radio"
            disabled={disabled}
            className={clsx(
              'border-border bg-background text-primary',
              'transition-colors duration-200',
              'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
              'disabled:cursor-not-allowed disabled:opacity-50',
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
          </div>
        )}
      </div>
    )
  }
)

Radio.displayName = 'Radio'

export function RadioGroup({
  name,
  options,
  value,
  onChange,
  label,
  error,
  orientation = 'vertical',
  size = 'md',
  className,
  disabled,
}: RadioGroupProps) {
  return (
    <fieldset className={className}>
      {label && (
        <legend className="mb-2 text-sm font-medium text-text-primary">
          {label}
        </legend>
      )}
      <div
        className={clsx(
          'flex',
          orientation === 'vertical'
            ? 'flex-col gap-3'
            : 'flex-row flex-wrap gap-4'
        )}
      >
        {options.map((option) => (
          <Radio
            key={option.value}
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange?.(option.value)}
            label={option.label}
            description={option.description}
            size={size}
            disabled={disabled || option.disabled}
          />
        ))}
      </div>
      {error && <p className="mt-2 text-sm text-error">{error}</p>}
    </fieldset>
  )
}
