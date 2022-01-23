import { PageType } from '@codelab/frontend/abstract/types'
import { Menu, MenuProps } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'

export type SidebarNavigationContainerProps = MenuProps & {
  fullHeight?: boolean
}

export const sidebarNavContainerStyle = ({
  fullHeight,
}: SidebarNavigationContainerProps) => ({
  width: '40px',
  height: fullHeight ? '100%' : undefined,
  maxHeight: '100vh',
})

export const SidebarNavigationContainer = (
  props: React.PropsWithChildren<SidebarNavigationContainerProps>,
) => {
  const router = useRouter()
  const { children, fullHeight = true, ...rest } = props

  return (
    <Menu
      defaultOpenKeys={[]}
      defaultSelectedKeys={[PageType.AppList]}
      mode="inline"
      selectedKeys={[router.pathname]}
      style={{
        ...sidebarNavContainerStyle(props),
        ...(props.style ?? {}),
      }}
      {...rest}
    >
      {children}
    </Menu>
  )
}

SidebarNavigationContainer.displayName = 'SidebarNavigationContainer'
