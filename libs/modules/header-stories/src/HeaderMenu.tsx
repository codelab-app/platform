import { HomeOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import Link from 'next/link'
import React from 'react'
import {
  RegisterUserButton,
  UserLoginButton,
  UserSignOutButton,
  useUserMachine,
} from '@codelab/modules/user-stories'

const disableMenuHoverEffects = {
  backgroundColor: 'initial',
  cursor: 'initial',
}

// TODO: disable hover effects for button
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
            <Link href="/">
              <HomeOutlined />
            </Link>
          }
        />
        <Menu.Item key="2">
          <Link href="/apps">
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
