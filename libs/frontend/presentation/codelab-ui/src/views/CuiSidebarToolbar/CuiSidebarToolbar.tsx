'use client'

import { CuiTestId } from '@codelab/frontend-application-shared-data'
import { useRef } from 'react'

import type { ToolbarProps } from '../../abstract'

import { CuiSidebarToolbarItem } from './CuiSidebarToolbarItem'

export type CuiSidebarToolbarProps = ToolbarProps

export const CuiSidebarToolbar = ({ items }: CuiSidebarToolbarProps) => {
  const listRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className="flex grow flex-row items-start justify-end"
      data-testid={CuiTestId.cuiToolbar()}
      ref={listRef}
    >
      {items.map((item) => (
        <CuiSidebarToolbarItem
          cuiKey={item.cuiKey}
          icon={item.icon}
          key={item.cuiKey}
          onClick={item.onClick}
          title={item.title}
        />
      ))}
    </div>
  )
}
