import { EllipsisOutlined } from '@ant-design/icons'
import { Button, Dropdown, Menu } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import tw from 'twin.macro'
import type { ToolbarItem, ToolbarProps } from '../../abstract'
import { CuiSidebarToolbarItem } from './CuiSidebarToolbarItem'

export type CuiSidebarToolbarProps = ToolbarProps

export const CuiSidebarToolbar = ({ items }: CuiSidebarToolbarProps) => {
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

  const menu = (
    <Menu>
      {overflowItems.map((item, index) => (
        <Menu.Item icon={item.icon} key={index} title={item.title}>
          {item.title}
        </Menu.Item>
      ))}
    </Menu>
  )

  return (
    <div
      css={tw`
      w-full
      flex
      justify-end
    `}
      data-cy="codelabui-header-toolbar"
    >
      <div
        css={tw`
          flex
          items-start
          flex-row
          overflow-hidden
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
      {showDropdown && (
        <Dropdown overlay={menu} trigger={['click']}>
          <Button css={tw`px-2 py-1`}>
            <EllipsisOutlined />
          </Button>
        </Dropdown>
      )}
    </div>
  )
}
