import { Tooltip } from 'antd'
import type { ReactNode } from 'react'
import React from 'react'
import type { ToolbarItem } from '../../abstract'

type CuiPopoverToolbarItemProps = Omit<ToolbarItem, 'icon'> & {
  icon?: ReactNode
}

export const CuiPopoverToolbarItem = ({
  icon,
  key,
  label,
  onClick,
  title,
}: CuiPopoverToolbarItemProps) => {
  return (
    <div className="h-full w-full" data-cy={`codelabui-toolbar-item-${title}`}>
      <Tooltip key={key} title={title}>
        <div
          className={`
          flex
          h-full
          w-full
          cursor-pointer
          flex-col
          items-center
          justify-center
          px-1
        `}
          onClick={onClick}
        >
          <div
            className="
              group
              flex
              h-5/6
              flex-row
              items-center
              justify-center
              rounded-md
              bg-neutral-300
              text-neutral-900
              hover:bg-neutral-400
            "
          >
            {icon && <div className="box-border p-2">{icon}</div>}
            {label && <span className="box-border p-2">{label}</span>}
          </div>
        </div>
      </Tooltip>
    </div>
  )
}
