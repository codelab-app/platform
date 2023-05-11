import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'
import tw from 'twin.macro'
import { sidebarWidth } from '../Dashboard'

export interface SidebarNavigationProps {
  // Home icon
  // homeItem: MenuProps['items']
  // Default menu items
  onClick?: Parameters<typeof Menu>[0]['onClick']
  primaryItems?: MenuProps['items']
  // Menu items at the bottom
  secondaryItems?: MenuProps['items']
}

export const SidebarNavigation = ({
  onClick,
  primaryItems,
  secondaryItems,
}: SidebarNavigationProps) => {
  const router = useRouter()
  const { explorerPaneKey } = router.query
  const selectedKey = (explorerPaneKey as string) || router.pathname

  return (
    <div
      css={tw`flex flex-col justify-between h-full border-gray-200 border-r box-border`}
      // Set the width on the outermost container
      style={{
        width: `${sidebarWidth}px`,
      }}
    >
      <Menu
        css={tw`border-none box-border h-full`}
        defaultOpenKeys={[]}
        items={primaryItems}
        mode="inline"
        selectedKeys={[selectedKey]}
      />
      <Menu
        css={tw`border-none box-border`}
        defaultOpenKeys={[]}
        items={secondaryItems}
        mode="inline"
        selectedKeys={[selectedKey]}
      />
    </div>
  )
}
