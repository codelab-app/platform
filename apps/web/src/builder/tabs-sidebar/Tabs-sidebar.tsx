import {
  ApartmentOutlined,
  AppstoreOutlined,
  CopyOutlined,
  PlusSquareOutlined,
} from '@ant-design/icons'
import { Menu, Popover } from 'antd'
import Link from 'next/link'
import React from 'react'
import { useLayout } from '../useLayout'
import { Page } from '@codelab/frontend'
import { LayoutTab, useSetLayoutMutation } from '@codelab/generated'

interface MenuItemProps {
  setLayout: ReturnType<typeof useSetLayoutMutation>[0]
}

const MenuItemApps = ({ setLayout, ...props }: MenuItemProps) => {
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

const MenuItemPages = ({ setLayout, ...props }: MenuItemProps) => {
  return (
    <Menu.Item
      {...props}
      key="2"
      onClick={() =>
        setLayout({ variables: { input: { tab: LayoutTab.Page } } })
      }
      icon={<CopyOutlined />}
    >
      Pages
    </Menu.Item>
  )
}

const MenuItemComponents = ({ setLayout, ...props }: MenuItemProps) => {
  return (
    <Menu.Item
      {...props}
      key="3"
      onClick={() =>
        setLayout({ variables: { input: { tab: LayoutTab.Component } } })
      }
      icon={<PlusSquareOutlined />}
    >
      Components
    </Menu.Item>
  )
}

const MenuItemTree = ({ setLayout, ...props }: MenuItemProps) => {
  return (
    <Menu.Item
      {...props}
      key="4"
      onClick={() =>
        setLayout({ variables: { input: { tab: LayoutTab.Tree } } })
      }
      icon={<ApartmentOutlined />}
    >
      Tree
    </Menu.Item>
  )
}

export const BuilderTabSidebar = () => {
  const { setLayout } = useLayout()

  return (
    <Menu mode="inline" style={{ height: '100%', width: '100%' }}>
      <MenuItemApps setLayout={setLayout} />
      <MenuItemPages setLayout={setLayout} />
      <MenuItemComponents setLayout={setLayout} />
      <MenuItemTree setLayout={setLayout} />
    </Menu>
  )
}
