import { HomeOutlined, UserOutlined } from '@ant-design/icons'
import { useUser } from '@auth0/nextjs-auth0'
import { PageType } from '@codelab/frontend/model/state/router'
import {
  LoginUserButton,
  RegisterUserButton,
  SignOutUserButton,
} from '@codelab/frontend/modules/user'
import { disableMenuHoverEffects } from '@codelab/frontend/style'
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
        style={{ order: 6, ...disableMenuHoverEffects }}
        icon={<SignOutUserButton />}
      />
      <Menu.SubMenu
        popupClassName="h-auto"
        key="4"
        style={{ order: 5 }}
        icon={<UserOutlined />}
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
        key="3"
        style={{
          order: 6,
          ...disableMenuHoverEffects,
        }}
        icon={<RegisterUserButton />}
      />
      <Menu.Item
        key="4"
        style={{
          order: 5,
          ...disableMenuHoverEffects,
        }}
        icon={<LoginUserButton />}
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
      </Menu>
    </>
  )
}
