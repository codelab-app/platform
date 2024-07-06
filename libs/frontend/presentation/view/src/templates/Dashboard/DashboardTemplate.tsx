'use client'

import { CuiNavigationBar } from '@codelab/frontend/presentation/codelab-ui'
import { useUrl } from '@codelab/frontend-application-shared-store/router'
import { Layout } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useMemo } from 'react'
import { Panel, PanelGroup } from 'react-resizable-panels'
import { sidebarWidth } from './constants'
import { DashboardTemplateConfigPane } from './DashboardTemplateConfigPane'
import { defaultNavigationBarItems } from './NavigationBar'
import ResizeHandle from './ResizeHandle'
import type { DashboardTemplateProps } from './Types'

const { Sider } = Layout

export const DashboardTemplate = observer(
  ({
    appSlug,
    children,
    componentSlug,
    ConfigPane,
    contentStyles,
    Header,
    pageSlug,
    PrimarySidebar,
    userSlug,
  }: React.PropsWithChildren<DashboardTemplateProps>) => {
    const { primarySidebarKey } = useUrl()

    const navigationBarItems = useMemo(
      () =>
        defaultNavigationBarItems({
          appSlug,
          componentSlug,
          pageSlug,
          userSlug,
        }),
      [appSlug, pageSlug, componentSlug, userSlug],
    )

    const activeSidebarKey =
      (primarySidebarKey as React.Key) || PrimarySidebar?.default || null

    const ActivePrimarySidebar = PrimarySidebar?.items.find(
      (item) => item.key === activeSidebarKey,
    )?.render

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
                <>
                  <Panel defaultSize={20} order={1}>
                    <div
                      className="size-full"
                      data-cy="temp-primary-panel-wrapper"
                    >
                      <ActivePrimarySidebar />
                    </div>
                  </Panel>
                  <ResizeHandle />
                </>
              )}

              <Panel defaultSize={60} order={2}>
                <main className="mt-3 size-full overflow-auto px-3 pb-6">
                  {children}
                </main>
              </Panel>

              {ConfigPane && (
                <>
                  <ResizeHandle />
                  <Panel defaultSize={20} order={3}>
                    <DashboardTemplateConfigPane ConfigPane={ConfigPane} />
                  </Panel>
                </>
              )}
            </PanelGroup>
          </Layout>
        </Layout>
      </Layout>
    )
  },
)

export default DashboardTemplate
