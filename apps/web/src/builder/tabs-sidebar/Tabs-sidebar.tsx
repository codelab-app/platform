import {
  ApartmentOutlined,
  AppstoreOutlined,
  CopyOutlined,
  PlusSquareOutlined,
} from '@ant-design/icons'
import { Menu, Popover } from 'antd'
import Link from 'next/link'
import React, { useContext } from 'react'
import { LayoutContext } from '../../layout/LayoutProvider'
import { UseLayoutMutation, useLayoutMutation } from '../useLayoutMutation'
import { Page } from '@codelab/frontend'
import { LayoutTab } from '@codelab/generated'

type MenuItemProps = Pick<ReturnType<UseLayoutMutation>, 'toggleTab'>

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

export const BuilderTabSidebar = () => {
  const layout = useContext(LayoutContext)
  const { toggleTab } = useLayoutMutation(layout)

  return (
    <Menu mode="inline" style={{ height: '100%', width: '100%' }}>
      <MenuItemApps toggleTab={toggleTab} />
      <MenuItemPages toggleTab={toggleTab} />
      <MenuItemComponents toggleTab={toggleTab} />
      <MenuItemTree toggleTab={toggleTab} />
    </Menu>
  )
}
