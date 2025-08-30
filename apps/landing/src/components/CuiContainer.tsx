import type { ReactNode } from 'react'

import { twMerge } from 'tailwind-merge'

interface CuiContainerProps {
  children: ReactNode
  className?: string
  size?: 'lg' | 'md' | 'xl'
}

export const CuiContainer = ({
  children,
  className,
  size = 'xl',
}: CuiContainerProps) => {
  const sizeClasses = {
    md: 'md:container',
    lg: 'lg:container',
    xl: 'xl:container',
  }

  return (
    <div
      className={twMerge(
        `
          m-auto w-11/12
          ${sizeClasses[size]}
        `,
        className,
      )}
    >
      {children}
    </div>
  )
}
