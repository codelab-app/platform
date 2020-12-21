import { Menu } from 'antd'
import Link from 'next/link'
import React, { ReactElement } from 'react'

export type AppHeaderMenuProps = {
  UserSignupButton: ReactElement
  UserLoginButton: ReactElement
}

// TODO: disable hover effects for button
export const HeaderMenu = (props: AppHeaderMenuProps) => {
  const { UserSignupButton, UserLoginButton } = props

  return (
    <>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1">
          <Link href="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link href="/apps">Apps</Link>
        </Menu.Item>
        <Menu.Item key="3" style={{ float: 'right' }}>
          {UserSignupButton}
        </Menu.Item>
        <Menu.Item key="4" style={{ float: 'right' }}>
          {UserLoginButton}
        </Menu.Item>
      </Menu>
    </>
  )
}
