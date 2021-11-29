import { PageType } from '@codelab/frontend/model/state/router'
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
})

export const SidebarNavigationContainer = (
  props: React.PropsWithChildren<SidebarNavigationContainerProps>,
) => {
  const router = useRouter()
  const { children, fullHeight = true, ...rest } = props

  return (
    <Menu
      defaultSelectedKeys={[PageType.AppList]}
      selectedKeys={[router.pathname]}
      defaultOpenKeys={[]}
      style={{
        ...sidebarNavContainerStyle(props),
        ...(props.style ?? {}),
      }}
      mode="inline"
      {...rest}
    >
      {children}
    </Menu>
  )
}

SidebarNavigationContainer.displayName = 'SidebarNavigationContainer'
