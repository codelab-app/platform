import { DownOutlined, RightOutlined } from '@ant-design/icons'
import { Typography } from 'antd'
import React, { useState } from 'react'
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
      className="flex max-h-20 cursor-pointer items-center justify-between border-0 border-b border-solid border-gray-500 px-1"
      data-cy={`codelabui-sidebar-view-header-${label}`}
      onClick={updateExpand}
    >
      <div className="flex min-w-1/3 flex-row items-center justify-start overflow-hidden">
        <div className="flex h-full flex-col justify-center px-1">
          {expanded ? (
            <DownOutlined style={{ fontSize: '12px' }} />
          ) : (
            <RightOutlined style={{ fontSize: '12px' }} />
          )}
        </div>
        <Typography className="min-w-1/4 truncate">{label}</Typography>
      </div>
      {toolbar && (
        <div
          className="max-w-lg"
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
