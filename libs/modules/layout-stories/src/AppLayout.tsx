import { Layout } from 'antd'
import { SiderProps } from 'antd/lib/layout/Sider'
import React, { PropsWithChildren, ReactElement } from 'react'
import { contentStyle } from '@codelab/frontend'

const { Header, Footer, Sider, Content } = Layout

export interface AppLayoutProps {
  header?: AppHeaderProps
  footer?: AppFooterProps
  sidebar?: AppSidebarProps
}

export type AppSidebarProps = SiderProps & {
  Menu: ReactElement
}

export type AppFooterProps = React.ReactNode

export type AppHeaderProps = {
  Menu: React.ReactNode
}

export const AppLayout = (props: PropsWithChildren<AppLayoutProps>) => {
  const { header, children, footer, sidebar } = props

  return (
    <Layout style={{ height: '100%' }}>
      {sidebar ? (
        <Sider theme="light" collapsible={false} {...sidebar}>
          {sidebar.Menu}
        </Sider>
      ) : null}
      <Layout>
        {header ? <Header>{header.Menu}</Header> : null}
        <Content style={contentStyle}>{children}</Content>
        <Footer style={{ textAlign: 'center' }}>{footer}</Footer>
      </Layout>
    </Layout>
  )
}
