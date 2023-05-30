import type { PropsWithChildren } from 'react'
import React from 'react'
import tw from 'twin.macro'

interface BreadcrumbItemWrapperProps {
  onClick?(): void
}

export const BreadcrumbItemWrapper = ({
  children,
  onClick,
}: PropsWithChildren<BreadcrumbItemWrapperProps>) => {
  return (
    <div css={tw`font-bold text-xs`}>
      {onClick ? (
        <div css={tw`cursor-pointer`} onClick={onClick}>
          {children}
        </div>
      ) : (
        <span>{children}</span>
      )}
    </div>
  )
}
