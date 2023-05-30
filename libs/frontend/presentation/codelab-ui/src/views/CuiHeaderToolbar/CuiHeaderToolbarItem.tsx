import { Button, Space, Tooltip } from 'antd'
import React from 'react'
import tw from 'twin.macro'
import type { ToolbarItem } from '../../abstract'

type CuiHeaderToolbarItemProps = ToolbarItem

export const CuiHeaderToolbarItem = ({
  icon,
  key,
  label,
  onClick,
  title,
}: CuiHeaderToolbarItemProps) => {
  return (
    <div css={tw`w-full h-full`} data-cy={`codelabui-toolbar-item-${title}`}>
      <Tooltip key={key} title={title}>
        <Button css={tw`px-2 py-1 h-8`} onClick={onClick}>
          <Space>
            {icon}
            {label}
          </Space>
        </Button>
      </Tooltip>
    </div>
  )
}
