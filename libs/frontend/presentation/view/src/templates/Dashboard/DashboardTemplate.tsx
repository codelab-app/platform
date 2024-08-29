'use client'

import {
  CuiNavigationBar,
  CuiResizablePanel,
} from '@codelab/frontend/presentation/codelab-ui'
import { useLoading } from '@codelab/frontend-application-shared-store/loading'
import { useUrl } from '@codelab/frontend-application-shared-store/router'
import { Layout } from 'antd'
import React, { useMemo } from 'react'
import { Panel, PanelGroup } from 'react-resizable-panels'
import { ProgressBar } from '../../components/progressBar/ProgressBar'
import { sidebarWidth } from './constants'
import { DashboardTemplateConfigPane } from './DashboardTemplateConfigPane'
import { defaultNavigationBarItems } from './NavigationBar'
import type { DashboardTemplateProps } from './Types'

const { Sider } = Layout

export const DashboardTemplate = ({
  appId,
  children,
  componentId,
  ConfigPane,
  contentStyles,
  Header,
  pageId,
  PrimarySidebar,
}: React.PropsWithChildren<DashboardTemplateProps>) => {
  const { primarySidebarKey } = useUrl()
  const { isLoading } = useLoading()

  const navigationBarItems = useMemo(
    () =>
      defaultNavigationBarItems({
        appId,
        componentId,
        pageId,
      }),
    [appId, pageId, componentId],
  )

  const activeSidebarKey = useMemo(
    () => (primarySidebarKey as React.Key) || PrimarySidebar?.default || null,
    [primarySidebarKey, PrimarySidebar?.default],
  )

  const ActivePrimarySidebar = useMemo(
    () =>
      PrimarySidebar?.items.find((item) => item.key === activeSidebarKey)
        ?.render,
    [PrimarySidebar?.items, activeSidebarKey],
  )

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
          <PanelGroup direction="horizontal">
            {ActivePrimarySidebar && (
              <CuiResizablePanel
                collapsible
                order={1}
                resizeDirection="right"
                showCollapseButton={false}
              >
                <div className="size-full" data-cy="temp-primary-panel-wrapper">
                  {ActivePrimarySidebar}
                </div>
              </CuiResizablePanel>
            )}

            <Panel defaultSize={60} order={2}>
              <ProgressBar isLoading={isLoading} />
              <main className="mt-3 size-full overflow-auto px-3 pb-6">
                {children}
              </main>
            </Panel>

            {ConfigPane && (
              <CuiResizablePanel collapsible order={3} resizeDirection="left">
                <DashboardTemplateConfigPane ConfigPane={ConfigPane} />
              </CuiResizablePanel>
            )}
          </PanelGroup>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default DashboardTemplate
