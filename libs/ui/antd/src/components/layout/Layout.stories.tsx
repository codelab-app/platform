import { UserOutlined, VideoCameraOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import React from 'react'
import { layoutData, propLayoutData } from './data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'Layout',
}

export const Default = () => {
  const Layout = Renderer.components(layoutData)

  return <Layout />
}

export const Layout = () => {
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

  type LayoutProps = {
    header: React.ReactNode
    content: React.ReactNode
    footer: React.ReactNode
    sidebar: React.ReactNode
  }

  const LayoutComp = Renderer.components<LayoutProps>(propLayoutData)

  return (
    <LayoutComp
      header={<Header />}
      content={<Content />}
      footer={<Footer />}
      sidebar={<Sidebar />}
    />
  )
}
