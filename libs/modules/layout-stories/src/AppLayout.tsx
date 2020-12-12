import { Layout } from 'antd'
import { SiderProps } from 'antd/lib/layout/Sider'
import React, { PropsWithChildren, ReactElement } from 'react'
import { AppHeaderMenuProps } from '../../app-stories/src/view/AppHeaderMenu'

const { Header, Footer, Sider, Content } = Layout

export type AppLayoutProps = {
  header: AppHeaderProps
  footer?: AppFooterProps
  sidebar: AppSidebarProps
}

export type AppSidebarProps = SiderProps & {
  Menu?: ReactElement
}

export type AppFooterProps = React.ReactNode

export type AppHeaderProps = {
  Menu: ReactElement<AppHeaderMenuProps>
}

export const AppLayout = (props: PropsWithChildren<AppLayoutProps>) => {
  const { header, children, footer, sidebar } = props
  const { Menu: SidebarMenu, ...sidebarProps } = sidebar
  const { Menu: HeaderMenu } = header

  return (
    <Layout style={{ height: '100%' }}>
      <Sider theme="light" collapsible {...sidebarProps}>
        {SidebarMenu}
      </Sider>
      <Layout>
        <Header>{HeaderMenu}</Header>
        <Content>{children}</Content>
        <Footer style={{ textAlign: 'center' }}>{footer}</Footer>
      </Layout>
    </Layout>
  )
}
