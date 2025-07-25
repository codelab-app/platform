'use client'

import { cn } from '@cui/utils'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { forwardRef } from 'react'

const Slider = forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    className={cn(
      'relative flex w-full touch-none select-none items-center',
      className,
    )}
    ref={ref}
    {...props}
  >
    <SliderPrimitive.Track
      className={`
        relative h-1.5 w-full
        grow overflow-hidden rounded-full
        bg-primary/20
      `}
    >
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className={`
        block size-4 rounded-full
        border border-primary/50 bg-background
        shadow transition-colors
        focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
        disabled:pointer-events-none disabled:opacity-50
      `}
    />
  </SliderPrimitive.Root>
))

Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
