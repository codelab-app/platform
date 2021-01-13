import { HomeOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import Link from 'next/link'
import React from 'react'
import { APP_LIST_PAGE } from '../../../frontend/src/config/Router'
import { HOME_PAGE, disableMenuHoverEffects } from '@codelab/frontend'
import {
  RegisterUserButton,
  UserLoginButton,
  UserSignOutButton,
  useUserMachine,
} from '@codelab/modules/user-stories'

export const HeaderMenu = () => {
  const user = useUserMachine()

  const { userData } = user.state.context

  return (
    <>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
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
        {userData ? (
          <>
            <Menu.Item key="3" style={{ float: 'right' }}>
              <UserSignOutButton />
            </Menu.Item>
            <Menu.Item key="4" style={{ float: 'right' }}>
              Hello, {userData.email}
            </Menu.Item>
          </>
        ) : (
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
              icon={<UserLoginButton />}
            />
          </>
        )}
      </Menu>
    </>
  )
}
