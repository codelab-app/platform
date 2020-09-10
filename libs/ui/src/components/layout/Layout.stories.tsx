import React from 'react'
import { Menu } from 'antd'
import { UserOutlined, VideoCameraOutlined } from '@ant-design/icons'
import { layoutData } from './data/Layout-1--default.data'
import { propLayoutData } from './data/Layout-2--prop.data'
import { TreeDom } from '../../renderer/TreeDom'

export default {
  title: 'Layout',
}

export const Default = () => {
  const Layout = TreeDom.render(layoutData)

  return <Layout />
}

export const PropLayout = () => {
  const Sidebar = () => (
    <>
      <div className="logo" />
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1">
          <UserOutlined />
          <span>Option 1</span>
        </Menu.Item>
        <Menu.Item key="2">
          <VideoCameraOutlined />
          <span>Option 2</span>
        </Menu.Item>
        <Menu.Item key="2">
          <VideoCameraOutlined />
          <span>Option 3</span>
        </Menu.Item>
      </Menu>
    </>
  )

  const Header = () => (
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
      <Menu.Item key="1">nav 1</Menu.Item>
      <Menu.Item key="2">nav 2</Menu.Item>
      <Menu.Item key="3">nav 3</Menu.Item>
    </Menu>
  )

  const Footer = () => <h1>Footer</h1>

  const Content = () => (
    <>
      <h1>Content</h1>
      <p>This is paragraph</p>
    </>
  )

  const Layout = TreeDom.render(propLayoutData)

  return (
    <Layout
      Header={<Header />}
      Content={<Content />}
      Footer={<Footer />}
      Sidebar={<Sidebar />}
    />
  )
}
