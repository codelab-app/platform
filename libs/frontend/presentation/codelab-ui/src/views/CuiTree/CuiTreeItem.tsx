import classNames from 'classnames'
import type { ReactNode } from 'react'
import React from 'react'
import type { Variant } from '../../abstract'
import { variantColors } from '../../abstract'

interface CuiTreeItemProps {
  icon?: ReactNode
  primaryTitle?: ReactNode | string
  secondaryTitle?: ReactNode | string
  tag?: ReactNode
  toolbar?: ReactNode
  variant?: Variant
  onClick?(): void
}

export const CuiTreeItem = ({
  icon,
  onClick,
  primaryTitle,
  secondaryTitle,
  tag,
  toolbar,
  variant,
}: CuiTreeItemProps) => {
  return (
    <div
      className={classNames(
        'codelabui-tree-item h-full flex flex-row justify-between overflow-hidden',
        variantColors[variant ?? 'primary'],
      )}
      data-cy={`
        codelabui-tree-item
        codelabui-tree-item-primary-title-${primaryTitle}
        codelabui-tree-item-secondary-title-${secondaryTitle}
      `}
      onClick={onClick}
    >
      <div className="flex h-full flex-row justify-start overflow-hidden">
        <div className="shrink-0">{icon}</div>
        <div className="flex h-full min-w-1/3 flex-row justify-start overflow-hidden pl-2">
          <p className="m-0 truncate">
            <span className="font-semibold">{primaryTitle}</span>
            <span className="pl-2 font-normal">{secondaryTitle}</span>
          </p>
        </div>
        <div className="shrink-0 pl-2">{tag}</div>
      </div>
      <div className="shrink-0 text-black">{toolbar}</div>
    </div>
  )
}
