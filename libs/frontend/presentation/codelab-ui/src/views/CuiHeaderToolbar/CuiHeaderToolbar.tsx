'use client'

import EllipsisOutlined from '@ant-design/icons/EllipsisOutlined'
import { Button, Dropdown } from 'antd'

import type { ToolbarProps } from '../../abstract'

import { CuiHeaderToolbarItem } from './CuiHeaderToolbarItem'

type CuiHeaderToolbarProps = ToolbarProps

export const CuiHeaderToolbar = ({ items }: CuiHeaderToolbarProps) => {
  const dropdownMenuItems = items.map((item, index) => ({
    'aria-label': item.ariaLabel,
    icon: item.icon,
    key: index,
    label: item.title,
    onClick: item.onClick,
    title: item.title,
  }))

  return (
    <div className="flex w-full justify-end" data-testid="cui-toolbar">
      <div
        className={`
          hidden flex-row
          items-start gap-2 overflow-hidden md:flex
        `}
      >
        {items.map((item) => (
          <CuiHeaderToolbarItem
            ariaLabel={item.ariaLabel}
            cuiKey={item.cuiKey}
            icon={item.icon}
            key={item.cuiKey}
            label={item.label}
            onClick={item.onClick}
            title={item.title}
          />
        ))}
      </div>
      <div className="md:hidden">
        <Dropdown menu={{ items: dropdownMenuItems }} trigger={['click']}>
          <Button className="px-2 py-1">
            <EllipsisOutlined />
          </Button>
        </Dropdown>
      </div>
    </div>
  )
}
