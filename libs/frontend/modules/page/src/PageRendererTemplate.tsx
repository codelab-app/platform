import { LayoutComponent } from '@codelab/frontend/abstract/props'
import { Layout } from 'antd'
import React from 'react'

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
