import { Layout } from 'antd'
import React, { PropsWithChildren } from 'react'

const { Header, Footer, Sider, Content } = Layout

type AppLayoutProps = {
  header?: React.ReactNode
  footer?: React.ReactNode
  sidebar?: React.ReactNode
}

export const AppLayout = (props: PropsWithChildren<AppLayoutProps>) => {
  const { header, children, footer, sidebar } = props

  return (
    <Layout style={{ height: '100%' }}>
      <Sider theme="light" collapsible collapsed={false}>
        {sidebar}
      </Sider>
      <Layout>
        <Header>{header}</Header>
        <Content>{children}</Content>
        <Footer style={{ textAlign: 'center' }}>Codelab.ai ©2020</Footer>
      </Layout>
    </Layout>
  )
}
