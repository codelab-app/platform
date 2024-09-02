'use server'

import {
  CuiNavigationBar,
  CuiPanel,
  CuiPanelGroup,
  CuiResizablePanel,
} from '@codelab/frontend/presentation/codelab-ui'
import Layout from 'antd/es/layout'
import Sider from 'antd/es/layout/Sider'
import React from 'react'
import { ProgressBar } from '../../components/progressBar/ProgressBar'
import { sidebarWidth } from './constants'
import { defaultNavigationBarItems } from './NavigationBar'
import type { DashboardProps } from './Types'

/**
 * When passing ReactNode as props, React treats it as a new prop on every render of the parent component, even if the content hasn't changed.
 */
export const Dashboard = async ({
  appId,
  children,
  componentId,
  ConfigPane,
  contentStyles,
  Header,
  pageId,
  PrimarySidebar,
  primarySidebarKey,
}: React.PropsWithChildren<DashboardProps>) => {
  const navigationBarItems = defaultNavigationBarItems({
    appId,
    componentId,
    pageId,
  })

  // const activeSidebarKey =
  //   (primarySidebarKey as React.Key) || PrimarySidebar?.default || null

  // const ActivePrimarySidebar = PrimarySidebar?.items.find(
  //   (item) => item.key === activeSidebarKey,
  // )?.render

  return (
    <Layout className="h-full">
      {Header}
      {/*
          Need explicitly set `hasSider` prop to avoid flickering
          see AntD documentation or https://github.com/ant-design/ant-design/issues/8937
        */}
      <Layout hasSider>
        <Sider collapsed collapsedWidth={sidebarWidth} theme="light">
          <CuiNavigationBar
            primaryItems={navigationBarItems.primaryItems}
            secondaryItems={navigationBarItems.secondaryItems}
          />
        </Sider>

        <Layout style={contentStyles}>
          <CuiPanelGroup direction="horizontal">
            {PrimarySidebar && (
              <CuiResizablePanel
                collapsible
                order={1}
                resizeDirection="right"
                showCollapseButton={false}
              >
                <div className="size-full" data-cy="temp-primary-panel-wrapper">
                  {PrimarySidebar}
                </div>
              </CuiResizablePanel>
            )}

            <CuiPanel defaultSize={60} order={2}>
              <ProgressBar />
              <main className="mt-3 size-full overflow-auto px-3 pb-6">
                {children}
              </main>
            </CuiPanel>

            {ConfigPane && (
              <CuiResizablePanel collapsible order={3} resizeDirection="left">
                <div className="size-full overflow-y-auto bg-white">
                  {ConfigPane}
                </div>
              </CuiResizablePanel>
            )}
          </CuiPanelGroup>
        </Layout>
      </Layout>
    </Layout>
  )
}
