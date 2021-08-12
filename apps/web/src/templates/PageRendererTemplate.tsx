import { Layout } from 'antd'
import React from 'react'
import { LayoutComponent } from './Layout.interface'

const { Sider, Content, Header: AntDesignHeader } = Layout

export const PageRendererTemplate: LayoutComponent<'builder'> = (props) => {
  const { children, Header } = props

  return (
    <Layout>
      {Header ? (
        <AntDesignHeader>
          <Header />
        </AntDesignHeader>
      ) : null}
      {children}
    </Layout>
  )
}
