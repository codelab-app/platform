import { Layout } from 'antd'
import { SiderProps } from 'antd/lib/layout/Sider'
import { useRouter } from 'next/router'
import React, { PropsWithChildren, ReactElement } from 'react'
import { APP_LIST_PAGE, HOME_PAGE } from '../../../frontend/src/config/Router'
import { contentStyle } from '@codelab/frontend'

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
  Menu: ReactElement
}

export const AppLayout = (props: PropsWithChildren<AppLayoutProps>) => {
  const router = useRouter()
  const { header, children, footer, sidebar } = props
  const { Menu: SidebarMenu, ...sidebarProps } = sidebar
  const { Menu: HeaderMenu } = header

  const showHeader = router.pathname === HOME_PAGE.url
  const hideSidebar = router.pathname === APP_LIST_PAGE.url

  return (
    <Layout style={{ height: '100%' }}>
      {hideSidebar ? null : (
        <Sider theme="light" collapsible={false} {...sidebarProps}>
          {SidebarMenu}
        </Sider>
      )}
      <Layout>
        {showHeader ? <Header>{HeaderMenu}</Header> : null}
        <Content style={contentStyle}>{children}</Content>
        <Footer style={{ textAlign: 'center' }}>{footer}</Footer>
      </Layout>
    </Layout>
  )
}
