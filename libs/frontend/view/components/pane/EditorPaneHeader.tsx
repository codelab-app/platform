import { Row } from 'antd'
import React, { PropsWithChildren, ReactNode } from 'react'
import tw from 'twin.macro'

type EditorPaneHeaderProps = PropsWithChildren<{
  extra?: ReactNode
}>

export const EditorPaneHeader = ({
  children,
  extra,
}: EditorPaneHeaderProps) => (
  <Row
    css={tw`px-2 pt-2 border-solid border-0 border-b border-b-gray-300`}
    justify="space-between"
  >
    <h3>{children}</h3>
    <div>{extra}</div>
  </Row>
)
