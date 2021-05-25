import { HomeOutlined, UserOutlined } from '@ant-design/icons'
import { useUser } from '@auth0/nextjs-auth0'
import { PageType } from '@codelab/frontend/shared'
import { disableMenuHoverEffects } from '@codelab/frontend/style'
import {
  LoginUserButton,
  RegisterUserButton,
  SignOutUserButton,
} from '@codelab/modules/user'
import { Menu } from 'antd'
import Link from 'next/link'
import React from 'react'

/**
 * We always show `Login` `Register` even if user is login. We simply redirect them to `/apps` page if they're already logged in.
 */
export const HomeMenuHeader = () => {
  const { user } = useUser()

  const authenticatedUserMenu = (
    <>
      <Menu.Item
        key="3"
        style={{ float: 'right', ...disableMenuHoverEffects }}
        icon={<SignOutUserButton />}
      />
      <Menu.SubMenu
        popupClassName="h-auto"
        key="4"
        style={{ float: 'right' }}
        icon={<UserOutlined />}
      >
        <Menu.Item>Email {user?.email}</Menu.Item>
      </Menu.SubMenu>
    </>
  )

  const guestUserMenu = (
    <>
      <Menu.Item
        key="3"
        style={{
          float: 'right',
          ...disableMenuHoverEffects,
        }}
        icon={<RegisterUserButton />}
      />
      <Menu.Item
        key="4"
        style={{ float: 'right', ...disableMenuHoverEffects }}
        icon={<LoginUserButton />}
      />
    </>
  )

  return (
    <>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        // defaultSelectedKeys={['2']}
        triggerSubMenuAction="click"
      >
        <Menu.Item
          key="1"
          icon={
            <Link href={PageType.Home}>
              <HomeOutlined />
            </Link>
          }
        />
        <Menu.Item key="2">
          <Link href={PageType.AppList}>
            <a>Apps</a>
          </Link>
        </Menu.Item>
        {user ? authenticatedUserMenu : guestUserMenu}
        {/*{user ? authenticatedUserMenu : guestUserMenu}*/}
      </Menu>
    </>
  )
}
