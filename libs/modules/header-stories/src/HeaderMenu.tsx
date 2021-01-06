import { Menu } from 'antd'
import React from 'react'
import {
  RegisterUserButton,
  UserLoginButton,
  UserSignOutButton,
  useUserMachine,
} from '@codelab/modules/user-stories'

// TODO: disable hover effects for button
export const HeaderMenu = () => {
  const user = useUserMachine()

  const { userData } = user.state.context

  return (
    <>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        {userData ? (
          <>
            <Menu.Item key="3" style={{ float: 'right' }}>
              <UserSignOutButton />
            </Menu.Item>
            <Menu.Item key="4" style={{ float: 'right' }}>
              Hello, {userData.username}
            </Menu.Item>
          </>
        ) : (
          <>
            <Menu.Item key="3" style={{ float: 'right' }}>
              <RegisterUserButton />
            </Menu.Item>
            <Menu.Item key="4" style={{ float: 'right' }}>
              <UserLoginButton />
            </Menu.Item>
          </>
        )}
      </Menu>
    </>
  )
}
