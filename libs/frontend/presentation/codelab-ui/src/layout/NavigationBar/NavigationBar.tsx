import { Menu } from 'antd'
import type { LinkProps } from 'next/link'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { ReactNode } from 'react'
import React from 'react'
import tw from 'twin.macro'

export interface NavigationBarItem {
  disabled?: boolean
  icon: ReactNode
  key: React.Key
  link?: LinkProps
  title: string
  onClick?(): void
}

export interface NavigationBarProps {
  // Default menu items
  primaryItems?: Array<NavigationBarItem>
  // Menu items at the bottom
  secondaryItems?: Array<NavigationBarItem>
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

        .anticon {
          display: flex;
        }
    `,
  tw`border-none box-border`,
]

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
        items={primaryItems?.map(mapNavBarItemToMenuItem)}
        mode="inline"
        selectedKeys={[selectedKey]}
      />
      <Menu
        css={NavigationMenuStyles}
        defaultOpenKeys={[]}
        items={secondaryItems?.map(mapNavBarItemToMenuItem)}
        mode="inline"
        selectedKeys={[selectedKey]}
      />
    </div>
  )
}
