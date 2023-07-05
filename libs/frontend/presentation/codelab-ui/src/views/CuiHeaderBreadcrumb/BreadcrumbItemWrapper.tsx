import type { PropsWithChildren } from 'react'
import React from 'react'

interface BreadcrumbItemWrapperProps {
  onClick?(): void
}

export const BreadcrumbItemWrapper = ({
  children,
  onClick,
}: PropsWithChildren<BreadcrumbItemWrapperProps>) => {
  return (
    <div className="text-xs font-bold">
      {onClick ? (
        <div className="cursor-pointer" onClick={onClick}>
          {children}
        </div>
      ) : (
        <span>{children}</span>
      )}
    </div>
  )
}
