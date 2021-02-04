import {
  ApartmentOutlined,
  AppstoreOutlined,
  CopyOutlined,
  PlusSquareOutlined,
} from '@ant-design/icons'
import { Menu, Popover } from 'antd'
import Link from 'next/link'
import React from 'react'
import { useBuilderLayout } from '../Builder-pane--state'
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
      onClick={() => layout.setTab('page')}
      icon={<CopyOutlined />}
    >
      Pages
    </Menu.Item>
  )
}

const MenuItemComponents = (props: any) => {
  const layout = useBuilderLayout()

  return (
    <Menu.Item
      {...props}
      key="3"
      onClick={() => layout.setTab('component')}
      icon={<PlusSquareOutlined />}
    >
      Components
    </Menu.Item>
  )
}

const MenuItemTree = (props: any) => {
  const layout = useBuilderLayout()

  return (
    <Menu.Item
      {...props}
      key="4"
      onClick={() => layout.setTab('tree')}
      icon={<ApartmentOutlined />}
    >
      Tree
    </Menu.Item>
  )
}

export const BuilderTabSidebar = () => {
  return (
    <Menu mode="inline" style={{ height: '100%', width: '100%' }}>
      <MenuItemApps />
      <MenuItemPages />
      <MenuItemComponents />
      <MenuItemTree />
    </Menu>
  )
}
