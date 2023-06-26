import { Skeleton } from 'antd'
import React from 'react'
import tw from 'twin.macro'

interface CuiSkeletonWrapperProps {
  children?: React.ReactNode
  isLoading: boolean
}

export const CuiSkeletonWrapper = ({
  children,
  isLoading,
}: CuiSkeletonWrapperProps) => (
  <div css={tw`w-full h-full`}>
    <div
      css={[tw`w-full h-full`, isLoading ? tw`block` : tw`hidden`]}
      data-cy="codelabui-skeleton"
    >
      <Skeleton active loading style={{ padding: 5 }} />
    </div>
    <div css={[tw`w-full h-full`, isLoading ? tw`hidden` : tw`block`]}>
      {children}
    </div>
  </div>
)
