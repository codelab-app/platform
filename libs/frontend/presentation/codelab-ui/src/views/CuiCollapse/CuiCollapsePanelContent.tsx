import React from 'react'
import tw from 'twin.macro'
import { SkeletonWrapper } from '../../components'

export interface CuiCollapsePanelContentProps {
  content: React.ReactNode
  isLoading?: boolean
  key: string
}

export const CuiCollapsePanelContent = ({
  content,
  isLoading = false,
  key,
}: CuiCollapsePanelContentProps) => {
  return (
    <div
      css={tw`
      h-full
      w-full
      flex
      flex-col
      overflow-auto
      min-h-1/3
    `}
      key={key}
    >
      <div css={tw`w-full flex-1 overflow-auto`}>
        <SkeletonWrapper isLoading={isLoading}>{content}</SkeletonWrapper>
      </div>
    </div>
  )
}
