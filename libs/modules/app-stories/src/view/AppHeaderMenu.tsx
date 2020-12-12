import { Menu } from 'antd'
import React, { ReactElement } from 'react'

export type AppHeaderMenuProps = {
  UserSignupButton: ReactElement
}

// TODO: disable hover effects for button
export const AppHeaderMenu = (props: AppHeaderMenuProps) => {
  const { UserSignupButton } = props

  return (
    <>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3" style={{ float: 'right' }}>
          {UserSignupButton}
        </Menu.Item>
      </Menu>
    </>
  )
}
