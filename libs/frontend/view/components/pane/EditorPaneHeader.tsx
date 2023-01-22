import type { PropsWithChildren, ReactNode } from 'react'
import React from 'react'
import tw from 'twin.macro'

type EditorPaneHeaderProps = PropsWithChildren<{
  extra?: ReactNode
}>

export const EditorPaneHeader = ({
  children,
  extra,
}: EditorPaneHeaderProps) => (
  <div css={tw`flex justify-between`}>
    <span css={tw`text-sm font-bold`}>{children}</span>
    <div>{extra}</div>
  </div>
)
