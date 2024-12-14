'use client'

import {
  CuiNavigationBar,
  CuiPanel,
  CuiPanelGroup,
  CuiResizablePanel,
  panelBreakpoints,
  PaneSection,
} from '@codelab/frontend/presentation/codelab-ui'
import Layout from 'antd/es/layout'
import Sider from 'antd/es/layout/Sider'
import { useMemo } from 'react'

import type { DashboardProps } from './Types'

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
  ConfigPane,
  contentStyles,
  Header,
  pageId,
  PrimarySidebar,
  primarySidebarKey,
  SecondaryPopover,
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
                breakpoints={panelBreakpoints}
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
                  {PrimarySidebar}
                </div>
              </CuiResizablePanel>
            )}

            <CuiPanel
              className="relative"
              defaultSize={
                60 + (PrimarySidebar ? 0 : 20) + (ConfigPane ? 0 : 20)
              }
              id={PaneSection.Builder}
              // defaultSize={mainWidthPercent}
              order={3}
            >
              <ProgressBar />
              {/* We want the popover to overlay on top of the main, so we put it inside here */}
              {SecondaryPopover}
              <div className="size-full p-3">{children}</div>
            </CuiPanel>

            {ConfigPane && (
              <CuiResizablePanel
                breakpoints={panelBreakpoints}
                // Close the pane if main area is too crammed
                collapsible
                id={PaneSection.Config}
                order={4}
                resizeDirection="left"
                showCollapseButton={true}
              >
                <div className="relative size-full overflow-y-auto bg-white">
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
