import { Cui } from '@codelab/frontend-application-shared-data'
import React from 'react'
import type { ToolbarProps } from '../../../abstract'
import { CuiTreeItemToolbarItem } from './CuiTreeItemToolbarItem'

export type CuiTreeItemToolbarProps = ToolbarProps

export const CuiTreeItemToolbar = ({ items }: CuiTreeItemToolbarProps) => {
  return (
    <div
      className="cui-tree-item-toolbar flex w-full justify-end"
      data-cy={Cui.cuiTreeItemToolbar().cyData}
    >
      <div className="flex flex-row items-start overflow-hidden">
        {items.map((item) => (
          <CuiTreeItemToolbarItem
            cuiKey={item.cuiKey}
            icon={item.icon}
            key={item.cuiKey}
            onClick={item.onClick}
            title={item.title}
          />
        ))}
      </div>
    </div>
  )
}
