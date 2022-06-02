import { HomeOutlined } from '@ant-design/icons'
import { useUser } from '@auth0/nextjs-auth0'
import { PageType } from '@codelab/frontend/abstract/types'
import { Menu } from 'antd'
import Link from 'next/link'
import React from 'react'
import { authenticatedUserMenuItems, guestUserMenu } from './menuItems'

/**
 * We always show `Login` `Register` even if user is login. We simply redirect them to `/apps` page if they're already logged in.
 */
export const HomeMenuHeader = () => {
  const { user } = useUser()

  return (
    <>
      <div className="logo" />
      <Menu
        mode="horizontal"
        theme="dark"
        // defaultSelectedKeys={['2']}
        triggerSubMenuAction="click"
      >
        <Menu.Item
          icon={
            <Link href={PageType.Home}>
              <HomeOutlined />
            </Link>
          }
          key="1"
        />
        <Menu.Item key="2">
          <Link href={PageType.AppList}>
            <a>Apps</a>
          </Link>
        </Menu.Item>
        {user ? (
          <Menu items={authenticatedUserMenuItems({ user })} />
        ) : (
          <Menu items={guestUserMenu} />
        )}
      </Menu>
    </>
  )
}
