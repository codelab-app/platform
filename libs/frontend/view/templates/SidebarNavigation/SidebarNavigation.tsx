import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'
import tw from 'twin.macro'
import { sidebarWidth } from '../Dashboard'

interface SidebarNavigationProps {
  // Default menu items
  primaryItems?: MenuProps['items']
  // Menu items at the bottom
  secondaryItems?: MenuProps['items']
}

export const transformSelectedKeys = (keys: Array<string>) => {
  const allKeys: Array<string> = []

  keys.forEach((key) => {
    allKeys.push(key)
  })

  return allKeys
}

export const SidebarNavigation = ({
  primaryItems,
  secondaryItems,
}: SidebarNavigationProps) => {
  const router = useRouter()

  return (
    <div
      css={tw`flex flex-col justify-between h-full border-solid border-gray-200 border-r box-border`}
      // Set the width on the outermost container
      style={{
        width: `${sidebarWidth}px`,
      }}
    >
      <div css={tw`box-border`}>
        <Menu
          css={tw`border-none box-border`}
          defaultOpenKeys={[]}
          // defaultSelectedKeys={[PageType.AppList]}
          items={primaryItems}
          mode="inline"
          selectedKeys={transformSelectedKeys([router.pathname])}
          style={
            {
              // width: `${sidebarWidth}px`,
              // height: fullHeight ? '100%' : undefined,
              // maxHeight: '100vh',
            }
          }
        />
      </div>
      <Menu
        defaultOpenKeys={[]}
        // defaultSelectedKeys={[PageType.AppList]}
        items={secondaryItems}
        mode="inline"
        selectedKeys={transformSelectedKeys([router.pathname])}
        style={{
          width: `${sidebarWidth}px`,
          // height: fullHeight ? '100%' : undefined,
          // maxHeight: '100vh',
        }}
      />
    </div>
  )
}
