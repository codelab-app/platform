'use client'

import EllipsisOutlined from '@ant-design/icons/EllipsisOutlined'
import { Button, Dropdown } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import type { ToolbarItem, ToolbarProps } from '../../abstract'
import { CuiHeaderToolbarItem } from './CuiHeaderToolbarItem'

type CuiHeaderToolbarProps = ToolbarProps

export const CuiHeaderToolbar = ({ items }: CuiHeaderToolbarProps) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const [overflowItems, setOverflowItems] = useState<Array<ToolbarItem>>([])
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleResize = () => {
      if (!listRef.current) {
        return
      }

      const containerWidth = listRef.current.offsetWidth
      const listWidth = listRef.current.scrollWidth
      const allItems = [...items]

      if (listWidth > containerWidth) {
        // Adjust the item width based on your needs
        const visibleItemsCount = Math.floor(containerWidth / 100)
        const overflowCount = allItems.length - visibleItemsCount

        setOverflowItems(allItems.splice(visibleItemsCount, overflowCount))
        setShowDropdown(true)
      } else {
        setShowDropdown(false)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [items])

  const menuItems = overflowItems.map((item, index) => ({
    'aria-label': item.ariaLabel,
    icon: item.icon,
    key: index,
    label: item.title,
    title: item.title,
  }))

  return (
    <div className="flex w-full justify-end" data-cy="cui-toolbar">
      <div
        className="flex flex-row items-start gap-2 overflow-hidden"
        ref={listRef}
      >
        {items.map((item) => (
          <CuiHeaderToolbarItem
            cuiKey={item.cuiKey}
            icon={item.icon}
            key={item.cuiKey}
            label={item.label}
            onClick={item.onClick}
            title={item.title}
          />
        ))}
      </div>
      {showDropdown && (
        <Dropdown menu={{ items: menuItems }} trigger={['click']}>
          <Button className="px-2 py-1">
            <EllipsisOutlined />
          </Button>
        </Dropdown>
      )}
    </div>
  )
}
