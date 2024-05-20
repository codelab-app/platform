import 'server-only'
import { CY_DATA } from '@codelab/frontend/application/shared/data'
import { Menu } from 'antd'
import type { LinkProps } from 'next/link'
import Link from 'next/link'
import type { ReactNode } from 'react'
import React from 'react'

export interface NavigationBarItem {
  disabled?: boolean
  icon: ReactNode
  key: React.Key
  link?: LinkProps
  title: string
}

export interface CuiNavigationBarProps {
  // Default menu items
  primaryItems?: Array<NavigationBarItem>
  // Menu items at the bottom
  secondaryItems?: Array<NavigationBarItem>
}

const mapNavBarItemToMenuItem = (navBarItem: NavigationBarItem) => ({
  disabled: navBarItem.disabled,
  icon: (
    <div data-cy={CY_DATA.cuiNavigationBarItem(navBarItem.title).cyData}>
      {navBarItem.icon}
    </div>
  ),
  key: navBarItem.key,
  label: navBarItem.link && !navBarItem.disabled && (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Link {...navBarItem.link} />
  ),
  title: navBarItem.title,
})

export const CuiNavigationSidebar = ({
  primaryItems,
  secondaryItems,
}: CuiNavigationBarProps) => {
  return (
    <div>
      <Menu
        className="h-full"
        defaultOpenKeys={[]}
        items={primaryItems?.map(mapNavBarItemToMenuItem)}
        mode="vertical"
        selectedKeys={['apps']}
      />
      <Menu
        defaultOpenKeys={[]}
        items={secondaryItems?.map(mapNavBarItemToMenuItem)}
        mode="vertical"
        selectedKeys={['apps']}
      />
    </div>
  )
}
