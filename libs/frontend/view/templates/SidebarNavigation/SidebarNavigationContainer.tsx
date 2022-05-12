import { PageType } from '@codelab/frontend/abstract/types'
import { css } from '@emotion/react'
import { Menu, MenuProps } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'
import tw from 'twin.macro'
import { sidebarNavigationWidth } from '../Dashboard/constants'

export type SidebarNavigationContainerProps = Pick<
  MenuProps,
  'defaultSelectedKeys' | 'selectedKeys' | 'style'
> & {
  fullHeight?: boolean
}

export const sidebarNavContainerStyle = ({
  fullHeight,
}: SidebarNavigationContainerProps) => ({
  width: `${sidebarNavigationWidth}px`,
  height: fullHeight ? '100%' : undefined,
  maxHeight: '100vh',
})

export const SidebarNavigationContainer = (
  props: React.PropsWithChildren<SidebarNavigationContainerProps>,
) => {
  const router = useRouter()
  const { children, fullHeight = true } = props

  return (
    <Menu
      css={css`
        li.ant-menu-item {
          // ${tw`!my-2`}
        }
      `}
      defaultOpenKeys={[]}
      defaultSelectedKeys={[PageType.AppList]}
      mode="inline"
      selectedKeys={[router.pathname]}
      style={{
        ...sidebarNavContainerStyle({ fullHeight }),
      }}
    >
      {children}
    </Menu>
  )
}

SidebarNavigationContainer.displayName = 'SidebarNavigationContainer'
