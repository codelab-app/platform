import { DownOutlined, UserOutlined } from '@ant-design/icons'
import { Dropdown, Menu } from 'antd'
import React from 'react'

export const PageDropdown = () => {
  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<UserOutlined />}>
        1st menu item
      </Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined />}>
        2nd menu item
      </Menu.Item>
      <Menu.Item key="3" icon={<UserOutlined />}>
        3rd menu item
      </Menu.Item>
    </Menu>
  )

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        Page: Home <DownOutlined />
      </a>
    </Dropdown>
  )
}
