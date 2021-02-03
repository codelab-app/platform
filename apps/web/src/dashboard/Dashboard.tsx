import { Layout } from 'antd'
import React, { PropsWithChildren } from 'react'
import { useRecoilState } from 'recoil'
import { DashboardDetails } from './details/Dashboard-details'
import { dashboardDetailsState } from './details/Dashboard-details--state'
import { DashboardDrawer } from './drawer/Dashboard-drawer'
import {
  DashboardNavigation,
  DashboardNavigationProps,
} from './navigation/Dashboard-navigation'
import { DashboardNavigationContainer } from './navigation/Dashboard-navigation--container'
import { DashboardMenuSidebar } from './sidebar/Dashboard-menu--sidebar'
import { PropsWithIds, contentStyle } from '@codelab/frontend'

const { Sider, Content } = Layout

export type DashboardLayoutProps = {
  sidebar?: DashboardSidebarProps
} & PropsWithIds<'appId'>

export type DashboardSidebarProps = {
  hide?: boolean
}

export const Dashboard = ({
  children,
  sidebar,
  appId,
}: PropsWithChildren<DashboardLayoutProps>) => {
  const [dashboardDetails, setDashboardDetails] = useRecoilState(
    dashboardDetailsState,
  )
  const { pageId } = dashboardDetails

  return (
    <Layout style={{ height: '100%' }}>
      {sidebar?.hide ? null : (
        <>
          <DashboardDrawer />
          <Sider theme="light" collapsed collapsedWidth={40}>
            <DashboardMenuSidebar />
          </Sider>
          <Sider theme="light" width={160}>
            <DashboardNavigationContainer>
              {({ pages }: DashboardNavigationProps) => (
                <DashboardNavigation appId={appId} pages={pages} />
              )}
            </DashboardNavigationContainer>
            {/* <DashboardTreeContainer>
              {({ data }: DashboardTreeProps) => <DashboardTree data={data} />}
            </DashboardTreeContainer> */}
          </Sider>
          {pageId ? (
            <Sider theme="light" width={320}>
              <DashboardDetails appId={appId} pageId={pageId} />
            </Sider>
          ) : null}
        </>
      )}
      <Layout>
        <Content style={contentStyle}>{children}</Content>
      </Layout>
    </Layout>
  )
}
