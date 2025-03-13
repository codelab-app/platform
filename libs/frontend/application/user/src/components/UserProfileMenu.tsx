'use client'

import LogoutOutlined from '@ant-design/icons/LogoutOutlined'
import { Avatar, Divider, Menu, Popover, Space } from 'antd'

import { useUser } from '../services'

export const UserProfileMenu = () => {
  const user = useUser()

  const items = [
    {
      icon: <LogoutOutlined />,
      key: 'logout',
      label: 'Logout',
      onClick: () => (window.location.href = '/auth/logout'),
      title: 'Sign Out',
    },
  ]

  const content = (
    <Space direction="vertical" split={<Divider style={{ margin: 0 }} />}>
      <Space>
        <Avatar shape="square" size="large" src={user.picture} />
        <Space direction="vertical" size={0}>
          <b>{user.name}</b>
          <p>{user.email}</p>
        </Space>
      </Space>
      <Menu items={items} style={{ border: 0 }} />
    </Space>
  )

  return (
    <Popover content={content} placement="bottomRight" trigger="click">
      <Avatar className="cursor-pointer" size={34} src={user.picture} />
    </Popover>
  )
}
