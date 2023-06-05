import React from 'react'
import tw from 'twin.macro'
import type { ToolbarProps } from '../../../abstract'
import { CuiTreeItemToolbarItem } from './CuiTreeItemToolbarItem'

export type CuiTreeItemToolbarProps = ToolbarProps

export const CuiTreeItemToolbar = ({ items }: CuiTreeItemToolbarProps) => {
  return (
    <div
      className="codelabui-tree-item-toolbar"
      css={tw`
      w-full
      flex
      justify-end
    `}
      data-cy="codelabui-tree-item-toolbar"
    >
      <div
        css={tw`
          flex
          items-start
          flex-row
          overflow-hidden
        `}
      >
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
