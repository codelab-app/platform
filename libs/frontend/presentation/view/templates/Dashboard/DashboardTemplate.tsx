import { Layout } from 'antd'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import React from 'react'
import { Panel, PanelGroup } from 'react-resizable-panels'
import tw from 'twin.macro'
import { SidebarNavigation } from '../SidebarNavigation'
import { sidebarWidth } from './constants'
import { DashboardTemplateConfigPane } from './DashboardTemplate-ConfigPane'
import { DashboardTemplateExplorerPane } from './DashboardTemplate-ExplorerPane'
import ResizeHandle from './ResizeHandle'
import type { DashboardTemplateProps } from './types'

const { Header: AntDesignHeader, Sider } = Layout

export const DashboardTemplateSSR = observer(
  ({
    children,
    ConfigPane,
    contentStyles,
    ExplorerPane,
    Header,
    sidebarNavigation,
  }: React.PropsWithChildren<DashboardTemplateProps>) => {
    const { explorerPaneKey } = useRouter().query

    const activeTabKey =
      (explorerPaneKey as React.Key) || ExplorerPane?.default || null

    const activeExplorerPane = ExplorerPane?.items.find(
      (item) => item.key === activeTabKey,
    )?.render

    return (
      <Layout css={tw`max-h-full min-h-full`}>
        <Sider collapsed collapsedWidth={sidebarWidth} theme="light">
          {sidebarNavigation && (
            <SidebarNavigation
              primaryItems={sidebarNavigation.primaryItems}
              secondaryItems={sidebarNavigation.secondaryItems}
            />
          )}
        </Sider>

        <Layout>
          {Header && (
            <AntDesignHeader>
              <Header />
            </AntDesignHeader>
          )}

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
                <main css={tw`w-full h-full mt-5 px-3 pb-8`}>{children}</main>
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
