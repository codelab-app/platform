'use client'

import {
  configPaneBreakpoints,
  CuiNavigationBar,
  CuiPanel,
  CuiPanelGroup,
  CuiResizablePanel,
  explorerPaneBreakpoints,
  PaneSection,
} from '@codelab/frontend/presentation/codelab-ui'
import Layout from 'antd/es/layout'
import Sider from 'antd/es/layout/Sider'
import { useMemo } from 'react'

import type { DashboardProps } from './dashboard.types'

import { ProgressBar } from '../../components/progressBar/ProgressBar'
import { sidebarWidth } from './constants'
import { defaultNavigationBarItems } from './NavigationBar'

/**
 * When passing ReactNode as props, React treats it as a new prop on every render of the parent component, even if the content hasn't changed.
 */
export const Dashboard = ({
  appId,
  children,
  componentId,
  configPane,
  contentStyles,
  header,
  modal,
  pageId,
  primarySidebar,
  primarySidebarKey,
  secondaryPopover,
}: React.PropsWithChildren<DashboardProps>) => {
  const navigationBarItems = useMemo(
    () =>
      defaultNavigationBarItems({
        appId,
        componentId,
        pageId,
      }),
    [appId, componentId, pageId],
  )

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

        <Layout style={contentStyles}>
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
