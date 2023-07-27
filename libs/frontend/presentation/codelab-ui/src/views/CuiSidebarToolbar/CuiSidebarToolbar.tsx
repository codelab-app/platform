import React, { useRef } from 'react'
import type { ToolbarProps } from '../../abstract'
import { CuiSidebarToolbarItem } from './CuiSidebarToolbarItem'

export type CuiSidebarToolbarProps = ToolbarProps

export const CuiSidebarToolbar = ({ items }: CuiSidebarToolbarProps) => {
  const listRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className={`
      flex
      w-full
      justify-end
    `}
      data-cy="codelabui-header-toolbar"
    >
      <div
        className={`
          flex
          flex-row
          items-start
        `}
        ref={listRef}
      >
        {items.map((item) => (
          <CuiSidebarToolbarItem
            icon={item.icon}
            key={item.key}
            onClick={item.onClick}
            title={item.title}
          />
        ))}
      </div>
    </div>
  )
}
