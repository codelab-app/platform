import { PageType } from '@codelab/frontend/abstract/types'
import { Menu, MenuProps } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'
import { sidebarWidth } from '../Dashboard/constants'

export type SidebarContainerProps = MenuProps & {
  fullHeight?: boolean
}

export const SidebarContainer = ({
  items,
  fullHeight,
}: SidebarContainerProps) => {
  const router = useRouter()

  return (
    <Menu
      defaultOpenKeys={[]}
      defaultSelectedKeys={[PageType.AppList]}
      items={items}
      mode="inline"
      selectedKeys={[router.pathname]}
      style={{
        width: `${sidebarWidth}px`,
        height: fullHeight ? '100%' : undefined,
        maxHeight: '100vh',
      }}
    />
  )
}

SidebarContainer.displayName = 'SidebarContainer'
