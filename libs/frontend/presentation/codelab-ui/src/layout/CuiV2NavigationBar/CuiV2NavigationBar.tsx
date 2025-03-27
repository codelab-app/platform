'use client'

import { Menu } from 'antd'
import classNames from 'classnames'
import { usePathname } from 'next/navigation'

import {
  type CuiNavigationBarProps,
  mapNavBarItemToMenuItem,
} from '../CuiNavigationBar'
import styles from '../CuiNavigationBar/CuiNavigationBar.module.css'

export const CuiV2NavigationBar = ({
  primaryItems,
  secondaryItems,
}: CuiNavigationBarProps) => {
  const pathname = usePathname()
  const selectedKey = pathname

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
        defaultSelectedKeys={[selectedKey]}
        items={primaryItems?.map(mapNavBarItemToMenuItem)}
        mode="inline"
      />
      <Menu
        defaultOpenKeys={[]}
        defaultSelectedKeys={[selectedKey]}
        items={secondaryItems?.map(mapNavBarItemToMenuItem)}
        mode="inline"
      />
    </div>
  )
}
