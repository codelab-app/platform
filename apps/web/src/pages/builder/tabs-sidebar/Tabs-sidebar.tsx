import {
  ApartmentOutlined,
  AppstoreOutlined,
  CopyOutlined,
  FunctionOutlined,
  PlusSquareOutlined,
} from '@ant-design/icons'
import { Menu, Popover } from 'antd'
import Link from 'next/link'
import React from 'react'
import { LayoutTab, useLayout } from '../../../templates/layout-state'
import { Page } from '@codelab/frontend'

type MenuItemProps = {
  toggleTab: (tab: LayoutTab) => any
}

const MenuItemApps = ({ toggleTab, ...props }: MenuItemProps) => {
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

const MenuItemPages = ({ toggleTab, ...props }: MenuItemProps) => {
  return (
    <Menu.Item
      {...props}
      key="2"
      onClick={() => toggleTab(LayoutTab.Page)}
      icon={<CopyOutlined />}
    >
      Pages
    </Menu.Item>
  )
}

const MenuItemComponents = ({ toggleTab, ...props }: MenuItemProps) => {
  return (
    <Menu.Item
      {...props}
      key="3"
      onClick={() => toggleTab(LayoutTab.Component)}
      icon={<PlusSquareOutlined />}
    >
      Components
    </Menu.Item>
  )
}

const MenuItemTree = ({ toggleTab, ...props }: MenuItemProps) => {
  return (
    <Menu.Item
      {...props}
      key="4"
      onClick={() => toggleTab(LayoutTab.Tree)}
      icon={<ApartmentOutlined />}
    >
      Tree
    </Menu.Item>
  )
}

const MenuItemFunction = ({ toggleTab, ...props }: MenuItemProps) => {
  return (
    <Menu.Item
      {...props}
      key="4"
      onClick={() => toggleTab(LayoutTab.Function)}
      icon={<FunctionOutlined />}
    >
      Function
    </Menu.Item>
  )
}

export const BuilderTabSidebar = () => {
  const { toggleTab } = useLayout()

  return (
    <Menu mode="inline" style={{ height: '100%', width: '100%' }}>
      <MenuItemApps toggleTab={toggleTab} />
      <MenuItemPages toggleTab={toggleTab} />
      <MenuItemComponents toggleTab={toggleTab} />
      <MenuItemTree toggleTab={toggleTab} />
      <MenuItemFunction toggleTab={toggleTab} />
    </Menu>
  )
}
