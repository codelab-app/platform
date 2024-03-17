import React, { useRef } from 'react'
import type { ToolbarProps } from '../../abstract'
import { CuiPopoverToolbarItem } from './CuiPopoverToolbarItem'

export type CuiPopoverToolbarProps = ToolbarProps

export const CuiPopoverToolbar = ({ items }: CuiPopoverToolbarProps) => {
  const listRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className={`
      flex
      w-full
      justify-end
    `}
      data-cy="cui-toolbar"
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
          <CuiPopoverToolbarItem
            cuiKey={item.cuiKey}
            icon={item.icon}
            label={item.label}
            onClick={item.onClick}
            title={item.title}
          />
        ))}
      </div>
    </div>
  )
}
