import { AppstoreOutlined, CopyOutlined } from '@ant-design/icons'
import { Menu, Popover } from 'antd'
import Link from 'next/link'
import React from 'react'
import { useBuilderLayout } from '../builderPanelState'
import { Page } from '@codelab/frontend'

const MenuItemApps = (props: any) => {
  const content = <Link href={Page.APP_LIST.url}>Apps</Link>

  return (
    <Menu.Item
      {...props}
      key="1"
      icon={
        <Popover content={content} trigger="click" placement="right">
          <AppstoreOutlined />
        </Popover>
      }
    >
      {/* Apps */}
    </Menu.Item>
  )
}

const MenuItemPages = (props: any) => {
  const layout = useBuilderLayout()

  return (
    <Menu.Item
      {...props}
      key="2"
      onClick={() => layout.navigation.toggle()}
      icon={<CopyOutlined />}
    >
      Pages
    </Menu.Item>
  )
}

export const BuilderMenuSidebar = () => {
  return (
    <Menu mode="inline" style={{ height: '100%', width: '100%' }}>
      <MenuItemApps />
      <MenuItemPages />
    </Menu>
  )
}
