import { Layout } from 'antd'
import React from 'react'
import { DashboardDrawer } from './drawer/Dashboard-drawer'
import {
  DashboardNavigation,
  DashboardNavigationProps,
} from './navigation/Dashboard-navigation'
import { DashboardNavigationContainer } from './navigation/Dashboard-navigation--container'
import { DashboardTree, DashboardTreeProps } from './navigation/Dashboard-tree'
import { DashboardTreeContainer } from './navigation/Dashboard-tree--container'
import { DashboardMenuSidebar } from './sidebar/Dashboard-menu--sidebar'
import { contentStyle } from '@codelab/frontend'

const { Sider, Content } = Layout

export interface DashboardLayoutProps {
  sidebar?: DashboardSidebarProps
}

export type DashboardSidebarProps = {
  hide?: boolean
}

export const Dashboard: React.FunctionComponent<DashboardLayoutProps> = ({
  children,
  sidebar,
}) => {
  // const cy = CytoscapeService.fromGraph(graph)

  // const treeData = CytoscapeService.antdTree(cy.elements().roots().first())

  return (
    <Layout style={{ height: '100%' }}>
      {sidebar?.hide ? null : (
        <>
          <DashboardDrawer />
          <Sider theme="light" collapsed>
            <DashboardMenuSidebar />
          </Sider>
          <Sider theme="light">
            <DashboardNavigationContainer>
              {({ appId, pages }: DashboardNavigationProps) => (
                <DashboardNavigation appId={appId} pages={pages} />
              )}
            </DashboardNavigationContainer>
            <DashboardTreeContainer>
              {({ data }: DashboardTreeProps) => <DashboardTree data={data} />}
            </DashboardTreeContainer>
          </Sider>
        </>
      )}
      <Layout>
        <Content style={contentStyle}>{children}</Content>
      </Layout>
    </Layout>
  )
}
