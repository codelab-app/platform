import { cn } from '@cui/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef } from 'react'

const alertVariants = cva(
  `
    relative w-full rounded-lg
    border px-4 py-3
    text-sm
    [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4
    [&>svg]:text-foreground
    [&>svg+div]:translate-y-[-3px]
    [&>svg~*]:pl-7
  `,
  {
    defaultVariants: {
      variant: 'default',
    },
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        destructive: `
          border-destructive/50 text-destructive
          [&>svg]:text-destructive
          dark:border-destructive
        `,
      },
    },
  },
)

const Alert = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    className={cn(alertVariants({ variant }), className)}
    ref={ref}
    role="alert"
    {...props}
  />
))

Alert.displayName = 'Alert'

const AlertTitle = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    className={cn('mb-1 font-medium leading-none tracking-tight', className)}
    ref={ref}
    {...props}
  />
))

AlertTitle.displayName = 'AlertTitle'

const AlertDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    className={cn('text-sm [&_p]:leading-relaxed', className)}
    ref={ref}
    {...props}
  />
))

AlertDescription.displayName = 'AlertDescription'

export { Alert, AlertDescription, AlertTitle }
