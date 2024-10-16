'use client'

import { Menu } from 'antd'
import classNames from 'classnames'
import { usePathname, useSearchParams } from 'next/navigation'

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
  const searchParams = useSearchParams()
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const primarySidebarKey = searchParams?.get('primarySidebarKey')
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const selectedKey = (primarySidebarKey || pathname) ?? ''

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
        selectedKeys={[selectedKey]}
      />
      <Menu
        defaultOpenKeys={[]}
        items={secondaryItems?.map(mapNavBarItemToMenuItem)}
        mode="inline"
        selectedKeys={[selectedKey]}
      />
    </div>
  )
}
