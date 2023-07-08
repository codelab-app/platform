import React from 'react'
import type { ToolbarProps } from '../../../abstract'
import { CuiTreeItemToolbarItem } from './CuiTreeItemToolbarItem'

export type CuiTreeItemToolbarProps = ToolbarProps

export const CuiTreeItemToolbar = ({ items }: CuiTreeItemToolbarProps) => {
  return (
    <div
      className="codelabui-tree-item-toolbar flex w-full justify-end"
      data-cy="codelabui-tree-item-toolbar"
    >
      <div className="flex flex-row items-start overflow-hidden">
        {items.map((item) => (
          <CuiTreeItemToolbarItem
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
