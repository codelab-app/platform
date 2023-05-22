import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'
import tw from 'twin.macro'

export interface NavigationBarProps {
  // Default menu items
  primaryItems?: MenuProps['items']
  // Menu items at the bottom
  secondaryItems?: MenuProps['items']
}

const NavigationMenuStyles = [
  `
        .ant-menu-item-selected {
            background-color: #D9D9D9;
        }
        
        .ant-menu-item-active {
            background-color: #D9D9D9;
        }

        .ant-menu-item {
            width: 100%;
            border-radius: 0;
            margin-top: 0;
            margin-bottom: 0;
            margin-left: 0;
            display: flex;
            justify-content: center;
        }

        .ant-menu-title-content {
            margin: 0;
            margin-inline-start: 0 !important;
            width: 0;
        }

        .ant-menu-item-icon {
            svg {
                fill: #000;
            }
        }

        .ant-menu-item-disabled {
            .ant-menu-item-icon {
                svg {
                    fill: #ccc;
                }
            }
        }
    `,
  tw`border-none box-border`,
]

export const NavigationBar = ({
  primaryItems,
  secondaryItems,
}: NavigationBarProps) => {
  const router = useRouter()
  const { explorerPaneKey } = router.query
  const selectedKey = (explorerPaneKey as string) || router.pathname

  return (
    <div
      css={tw`
        flex
        flex-col
        justify-between
        h-full
        w-10
        border-gray-200
        border-r
        box-border
    `}
    >
      <Menu
        css={[...NavigationMenuStyles, tw`h-full`]}
        defaultOpenKeys={[]}
        items={primaryItems}
        mode="inline"
        selectedKeys={[selectedKey]}
      />
      <Menu
        css={NavigationMenuStyles}
        defaultOpenKeys={[]}
        items={secondaryItems}
        mode="inline"
        selectedKeys={[selectedKey]}
      />
    </div>
  )
}
