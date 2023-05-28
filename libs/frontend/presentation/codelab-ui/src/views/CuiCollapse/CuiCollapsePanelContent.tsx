import React from 'react'
import tw from 'twin.macro'

export interface CuiCollapsePanelContentProps {
  content: React.ReactNode
  key: string
}

export const CuiCollapsePanelContent = ({
  content,
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
      <div css={tw`w-full flex-1 overflow-auto`}>{content}</div>
    </div>
  )
}
