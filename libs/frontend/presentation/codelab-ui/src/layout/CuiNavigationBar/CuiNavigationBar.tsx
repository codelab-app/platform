import { Menu } from 'antd'
import classNames from 'classnames'
import type { LinkProps } from 'next/link'
import Link from 'next/link'
import { useRouter } from 'next/router'
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

const mapNavBarItemToMenuItem = (navBarItem: NavigationBarItem) => ({
  disabled: navBarItem.disabled,
  icon: <div data-cy={navBarItem.title}>{navBarItem.icon}</div>,
  key: navBarItem.key,
  // eslint-disable-next-line react/jsx-props-no-spreading
  label: navBarItem.link && <Link {...navBarItem.link} />,
  onClick: () => {
    navBarItem.onClick?.()
  },
  title: navBarItem.title,
})

export const CuiNavigationBar = ({
  primaryItems,
  secondaryItems,
}: CuiNavigationBarProps) => {
  const router = useRouter()
  const { primarySidebarKey } = router.query
  const selectedKey = (primarySidebarKey as string) || router.pathname

  return (
    <div className="box-border flex h-full w-10 flex-col justify-between border-r border-gray-200">
      <Menu
        className={classNames(styles.menu, 'h-full')}
        defaultOpenKeys={[]}
        items={primaryItems?.map(mapNavBarItemToMenuItem)}
        mode="inline"
        selectedKeys={[selectedKey]}
      />
      <Menu
        className={styles.menu}
        defaultOpenKeys={[]}
        items={secondaryItems?.map(mapNavBarItemToMenuItem)}
        mode="inline"
        selectedKeys={[selectedKey]}
      />
    </div>
  )
}
