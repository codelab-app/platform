import { DownOutlined, RightOutlined } from '@ant-design/icons'
import { Typography } from 'antd'
import React, { useState } from 'react'
import tw from 'twin.macro'
import type { CuiSidebarToolbarProps } from '../CuiSidebarToolbar'
import { CuiSidebarToolbar } from '../CuiSidebarToolbar'

export interface CuiCollapsePanelHeaderProps {
  defaultExpand?: boolean
  label: string
  toolbar?: CuiSidebarToolbarProps
  onExpand(isExpanded: boolean): void
}

export const CuiCollapsePanelHeader = ({
  defaultExpand,
  label,
  onExpand,
  toolbar,
}: CuiCollapsePanelHeaderProps) => {
  const [expanded, setExpanded] = useState(defaultExpand)

  const updateExpand = () => {
    setExpanded(!expanded)
    onExpand(!expanded)
  }

  return (
    <div
      css={tw`
        cursor-pointer
        flex
        items-center
        justify-between
        max-h-20
        border-0
        border-solid
        border-b
        border-gray-500
        px-1
      `}
      data-cy={`codelabui-sidebar-view-header-${label}`}
      onClick={updateExpand}
    >
      <div
        css={tw`
          flex
          flex-row
          justify-start
          items-center
          overflow-hidden
          min-w-1/3
        `}
      >
        <div
          css={tw`
          h-full
          px-1
          flex
          flex-col
          justify-center
        `}
        >
          {expanded ? (
            <DownOutlined style={{ fontSize: '12px' }} />
          ) : (
            <RightOutlined style={{ fontSize: '12px' }} />
          )}
        </div>
        <Typography css={tw`truncate min-w-1/4`}>{label}</Typography>
      </div>
      {toolbar && (
        <div
          css={tw`max-w-lg`}
          onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            event.stopPropagation()
            console.log('Child clicked')
          }}
        >
          {
            // eslint-disable-next-line react/jsx-props-no-spreading
            <CuiSidebarToolbar {...toolbar} />
          }
        </div>
      )}
    </div>
  )
}
