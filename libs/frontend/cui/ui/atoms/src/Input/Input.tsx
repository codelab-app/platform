import { cn } from '@cui/utils'
import { forwardRef } from 'react'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        className={cn(
          `
            flex h-9 w-full
            rounded-md border border-input
            bg-transparent px-3 py-1
            text-sm shadow-sm transition-colors
            disabled:cursor-not-allowed disabled:opacity-50
            file:border-0 file:bg-transparent file:text-sm
            file:font-medium
            focus-visible:outline-none focus-visible:ring-1
            focus-visible:ring-ring
            placeholder:text-muted-foreground
          `,
          className,
        )}
        ref={ref}
        type={type}
        {...props}
      />
    )
  },
)

Input.displayName = 'Input'

export { Input }
