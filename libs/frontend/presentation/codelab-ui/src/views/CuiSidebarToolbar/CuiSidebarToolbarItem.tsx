import { Tooltip } from 'antd'
import React from 'react'
import tw from 'twin.macro'
import type { ToolbarItem } from '../../abstract'

type CuiSidebarToolbarItemProps = Omit<ToolbarItem, 'label'>

export const CuiSidebarToolbarItem = ({
  icon,
  key,
  onClick,
  title,
}: CuiSidebarToolbarItemProps) => {
  return (
    <div css={tw`w-full h-full`} data-cy={`codelabui-toolbar-item-${title}`}>
      <Tooltip key={key} title={title}>
        <div css={tw`px-1 py-1 flex flex-col items-center`} onClick={onClick}>
          {icon}
        </div>
      </Tooltip>
    </div>
  )
}
