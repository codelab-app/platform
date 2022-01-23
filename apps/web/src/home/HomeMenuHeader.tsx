import { HomeOutlined, UserOutlined } from '@ant-design/icons'
import { useUser } from '@auth0/nextjs-auth0'
import { PageType } from '@codelab/frontend/abstract/types'
import {
  LoginUserButton,
  RegisterUserButton,
  SignOutUserButton,
} from '@codelab/frontend/modules/user'
import { disableMenuHoverEffects } from '@codelab/frontend/view/style'
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
        icon={<SignOutUserButton />}
        key="3"
        style={{ order: 6, ...disableMenuHoverEffects }}
      />
      <Menu.SubMenu
        icon={<UserOutlined />}
        key="4"
        popupClassName="h-auto"
        style={{ order: 5 }}
      >
        <Menu.Item>Email {user?.email}</Menu.Item>
      </Menu.SubMenu>
      {/* <Menu.Item*/}
      {/*  key="5"*/}
      {/*  style={{*/}
      {/*    visibility: 'hidden',*/}
      {/*    flexGrow: 1,*/}
      {/*  }}*/}
      {/*/ >*/}
    </>
  )

  const guestUserMenu = (
    <>
      <Menu.Item
        icon={<RegisterUserButton />}
        key="3"
        style={{
          order: 6,
          ...disableMenuHoverEffects,
        }}
      />
      <Menu.Item
        icon={<LoginUserButton />}
        key="4"
        style={{
          order: 5,
          ...disableMenuHoverEffects,
        }}
      />
      {/* Empty filler */}
      {/* <Menu.Item*/}
      {/*  key="5"*/}
      {/*  style={{*/}
      {/*    visibility: 'hidden',*/}
      {/*    flexGrow: 1,*/}
      {/*  }}*/}
      {/*/ >*/}
    </>
  )

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
        {user ? authenticatedUserMenu : guestUserMenu}
      </Menu>
    </>
  )
}
