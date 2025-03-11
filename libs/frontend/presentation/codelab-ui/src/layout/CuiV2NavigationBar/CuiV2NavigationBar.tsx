'use client'

import { useSearchParamsProps } from '@codelab/frontend-application-shared-store/router'
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
  const searchParams = useSearchParamsProps()
  const { primarySidebarKey } = searchParams
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
