import { Layout } from 'antd'
import { SiderProps } from 'antd/lib/layout/Sider'
import { omit } from 'lodash'
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

  const SidebarMenu = sidebar?.Menu
  const HeaderMenu = header?.Menu

  return (
    <Layout style={{ height: '100%' }}>
      {SidebarMenu ? (
        <Sider theme="light" {...omit(sidebar, 'Menu')}>
          {SidebarMenu}
        </Sider>
      ) : null}
      <Layout>
        {HeaderMenu ? <Header>{HeaderMenu}</Header> : null}
        <Content style={contentStyle}>{children}</Content>
        {footer ? (
          <Footer style={{ textAlign: 'center' }}>{footer}</Footer>
        ) : null}
      </Layout>
    </Layout>
  )
}
