import { HomeOutlined, UserOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import Link from 'next/link'
import React from 'react'
import {
  APP_LIST_PAGE,
  HOME_PAGE,
  disableMenuHoverEffects,
} from '@codelab/frontend'
import {
  LoginUserButton,
  RegisterUserButton,
  SignOutUserButton,
  useUserMachine,
} from '@codelab/modules/user-stories'

/**
 * We always show `Login` `Register` even if user is login. We simply redirect them to `/apps` page if they're already logged in.
 */
export const HomeMenuHeader = () => {
  const user = useUserMachine()

  const { userData } = user.state.context
  const isCheckingAuth = user.state.value === 'initialCheck'

  const authenticatedUserMenu = (data: any) => (
    <>
      <Menu.Item key="3" style={{ float: 'right' }}>
        <SignOutUserButton />
      </Menu.Item>
      <Menu.SubMenu key="4" style={{ float: 'right' }} icon={<UserOutlined />}>
        <Menu.Item>{data.email}</Menu.Item>
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
        defaultSelectedKeys={['2']}
        triggerSubMenuAction="click"
      >
        <Menu.Item
          key="1"
          icon={
            <Link href={HOME_PAGE.url}>
              <HomeOutlined />
            </Link>
          }
        />
        <Menu.Item key="2">
          <Link href={APP_LIST_PAGE.url}>
            <a>Apps</a>
          </Link>
        </Menu.Item>
        {/* {guestUserMenu} */}
        {isCheckingAuth || (!isCheckingAuth && !userData)
          ? guestUserMenu
          : authenticatedUserMenu(userData)}
      </Menu>
    </>
  )
}
