'use client'

import type {
  DashboardProps,
  DashboardSlots,
  UrlParams,
} from '@codelab/frontend/abstract/types'
import type { ReactNode } from 'react'

import {
  configPaneBreakpoints,
  CuiNavigationBar,
  CuiPanel,
  CuiPanelGroup,
  CuiResizablePanel,
  explorerPaneBreakpoints,
  PaneSection,
} from '@codelab/frontend/presentation/codelab-ui'
import { useIsMounted } from '@codelab/frontend/shared/utils'
import Layout from 'antd/es/layout'
import Sider from 'antd/es/layout/Sider'
import { useMemo } from 'react'

import { ProgressBar } from '../../components/progressBar/ProgressBar'
import { sidebarWidth } from './constants'
import { defaultNavigationBarItems } from './NavigationBar'

/**
 * When passing ReactNode as props, React treats it as a new prop on every render of the parent component, even if the content hasn't changed.
 */
export const Dashboard = ({
  children,
  configPane,
  header,
  modal,
  params = {},
  primarySidebar,
  secondaryPopover,
}: DashboardProps) => {
  const { appId, componentId, pageId } = params

  const navigationBarItems = useMemo(
    () =>
      defaultNavigationBarItems({
        appId,
        componentId,
        pageId,
      }),
    [appId, componentId, pageId],
  )

  const isMounted = useIsMounted()

  if (!isMounted) {
    return null
  }

  return (
    <Layout className="h-full">
      {modal}
      {header}
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

        <Layout style={{ paddingTop: '0rem' }}>
          <CuiPanelGroup direction="horizontal">
            {primarySidebar && (
              <CuiResizablePanel
                breakpoints={explorerPaneBreakpoints}
                // Close the pane if main area is too crammed
                collapsible
                id={PaneSection.Explorer}
                // maxSize={400}
                // minSize={280}
                order={1}
                resizeDirection="right"
                showCollapseButton={true}
              >
                <div
                  className="relative size-full"
                  data-testid="temp-primary-panel-wrapper"
                >
                  {primarySidebar}
                </div>
              </CuiResizablePanel>
            )}

            <CuiPanel
              className="relative"
              // defaultSize={60}
              // defaultSize={
              //   60 + (primarySidebar ? 0 : 20) + (configPane ? 0 : 20)
              // }
              id={PaneSection.Builder}
              order={3}
            >
              <ProgressBar />
              {/* We want the popover to overlay on top of the main, so we put it inside here */}
              {secondaryPopover}
              <div className="size-full p-3">{children}</div>
            </CuiPanel>

            {configPane && (
              <CuiResizablePanel
                breakpoints={configPaneBreakpoints}
                // Close the pane if main area is too crammed
                collapsible
                id={PaneSection.Config}
                order={4}
                resizeDirection="left"
                showCollapseButton={true}
              >
                <div className="relative size-full overflow-y-auto bg-white">
                  {configPane}
                </div>
              </CuiResizablePanel>
            )}
          </CuiPanelGroup>
        </Layout>
      </Layout>
    </Layout>
  )
}

Dashboard.displayName = 'Dashboard'
