import { NavigationBar } from '@codelab/frontend/presentation//codelab-ui'
import {
  useCurrentAppId,
  useCurrentPageId,
} from '@codelab/frontend/presentation/container'
import { Layout } from 'antd'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import { Panel, PanelGroup } from 'react-resizable-panels'
import tw from 'twin.macro'
import { sidebarWidth } from './constants'
import { DashboardTemplateConfigPane } from './DashboardTemplateConfigPane'
import { DashboardTemplateExplorerPane } from './DashboardTemplateExplorerPane'
import { defaultNavigationBarItems } from './NavigationBar'
import ResizeHandle from './ResizeHandle'
import type { DashboardTemplateProps } from './Types'

const { Sider } = Layout

export const DashboardTemplateSSR = observer(
  ({
    children,
    ConfigPane,
    contentStyles,
    ExplorerPane,
    Header,
  }: React.PropsWithChildren<DashboardTemplateProps>) => {
    const { explorerPaneKey } = useRouter().query
    const appId = useCurrentAppId()
    const pageId = useCurrentPageId()

    const navigationBarItems = useMemo(
      () => defaultNavigationBarItems({ appId, pageId }),
      [appId, pageId],
    )

    const activeTabKey =
      (explorerPaneKey as React.Key) || ExplorerPane?.default || null

    const activeExplorerPane = ExplorerPane?.items.find(
      (item) => item.key === activeTabKey,
    )?.render

    return (
      <Layout css={tw`max-h-full min-h-full`}>
        {Header && <Header />}
        <Layout>
          <Sider collapsed collapsedWidth={sidebarWidth} theme="light">
            <NavigationBar
              primaryItems={navigationBarItems.primaryItems}
              secondaryItems={navigationBarItems.secondaryItems}
            />
          </Sider>
          <Layout style={contentStyles}>
            <PanelGroup direction="horizontal">
              {activeExplorerPane && (
                <>
                  <Panel defaultSize={20} order={1}>
                    <DashboardTemplateExplorerPane
                      ExplorerPane={activeExplorerPane}
                    />
                  </Panel>
                  <ResizeHandle />
                </>
              )}

              <Panel defaultSize={60} order={2}>
                <main css={tw`w-full h-full mt-3 px-3 pb-6`}>{children}</main>
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

export default DashboardTemplateSSR
