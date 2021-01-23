import { Layout } from 'antd'
import React from 'react'
import { DashboardMenuSidebar } from './Dashboard-menu--sidebar'
import { DashboardNavigation } from './Dashboard-navigation'
import { contentStyle } from '@codelab/frontend'

const { Sider, Content } = Layout

export interface DashboardLayoutProps {
  sidebar?: DashboardSidebarProps
}

export type DashboardSidebarProps = {
  hide?: boolean
}

export const DashboardLayout: React.FunctionComponent<DashboardLayoutProps> = ({
  children,
  sidebar,
}) => {
  return (
    <Layout style={{ height: '100%' }}>
      {sidebar?.hide ? null : (
        <>
          <Sider theme="light" collapsed>
            <DashboardMenuSidebar />,
          </Sider>
          <Sider theme="light">
            <DashboardNavigation />
          </Sider>
        </>
      )}
      <Layout>
        <Content style={contentStyle}>{children}</Content>
      </Layout>
    </Layout>
  )
}
