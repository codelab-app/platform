import React from 'react'
import { Renderer } from '@codelab/core/renderer'
import { propLayoutData } from '@codelab/ui/antd'

export const Layout = () => {
  const Sidebar = () => <></>

  const Header = () => <></>

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
