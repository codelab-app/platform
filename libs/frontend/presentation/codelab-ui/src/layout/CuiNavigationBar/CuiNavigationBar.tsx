'use client'

import { Cui } from '@codelab/frontend-application-shared-data'
import { useUrl } from '@codelab/frontend-application-shared-store/router'
import { Menu } from 'antd'
import classNames from 'classnames'
import type { LinkProps } from 'next/link'
import Link from 'next/link'
import type { ReactNode } from 'react'
import React from 'react'
import styles from './CuiNavigationBar.module.css'

export interface NavigationBarItem {
  disabled?: boolean
  icon: ReactNode
  key: React.Key
  link?: LinkProps
  title: string
  onClick?(): void
}

export interface CuiNavigationBarProps {
  // Default menu items
  primaryItems?: Array<NavigationBarItem>
  // Menu items at the bottom
  secondaryItems?: Array<NavigationBarItem>
}

export const mapNavBarItemToMenuItem = (navBarItem: NavigationBarItem) => ({
  disabled: navBarItem.disabled,
  icon: (
    <div data-cy={Cui.cuiNavigationBarItem(navBarItem.title).cyData}>
      {navBarItem.icon}
    </div>
  ),
  key: navBarItem.key,
  label: navBarItem.link && !navBarItem.disabled && (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Link {...navBarItem.link} />
  ),
  onClick: () => {
    navBarItem.onClick?.()
  },
  title: navBarItem.title,
})

export const CuiNavigationBar = ({
  primaryItems,
  secondaryItems,
}: CuiNavigationBarProps) => {
  const { pathname, primarySidebarKey } = useUrl()
  const selectedKey = primarySidebarKey || pathname

  return (
    <div
      className={classNames(
        styles.cuiNavigationBar,
        `
          box-border
          flex
          h-full
          w-10
          flex-col
          justify-between
          border-r
          border-gray-200
        `,
      )}
    >
      <Menu
        className="h-full"
        defaultOpenKeys={[]}
        items={primaryItems?.map(mapNavBarItemToMenuItem)}
        mode="inline"
        selectedKeys={selectedKey ? [selectedKey] : []}
      />
      <Menu
        defaultOpenKeys={[]}
        items={secondaryItems?.map(mapNavBarItemToMenuItem)}
        mode="inline"
        selectedKeys={selectedKey ? [selectedKey] : []}
      />
    </div>
  )
}
