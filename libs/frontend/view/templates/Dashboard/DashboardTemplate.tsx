import { Layout } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Panel, PanelGroup } from 'react-resizable-panels'
import tw from 'twin.macro'
import { SidebarNavigation } from '../SidebarNavigation'
import { sidebarWidth } from './constants'
import { DashboardTemplateConfigPane } from './DashboardTemplate-ConfigPane'
import { DashboardTemplateExplorerPane } from './DashboardTemplate-ExplorerPane'
import ResizeHandle from './ResizeHandle'
import type { DashboardTemplateProps } from './types'

const { Sider, Header: AntDesignHeader } = Layout

const DashboardTemplate = observer(
  ({
    children,
    Header,
    ExplorerPane,
    sidebarNavigation,
    ConfigPane,
    contentStyles,
  }: React.PropsWithChildren<DashboardTemplateProps>) => {
    return (
      <Layout css={tw`max-h-full min-h-full`}>
        {sidebarNavigation && (
          <Sider collapsed collapsedWidth={sidebarWidth} theme="light">
            <SidebarNavigation
              primaryItems={sidebarNavigation.primaryItems}
              secondaryItems={sidebarNavigation.secondaryItems}
            />
          </Sider>
        )}

        <Layout>
          {Header && (
            <AntDesignHeader>
              <Header />
            </AntDesignHeader>
          )}

          <Layout style={contentStyles}>
            <PanelGroup direction="horizontal">
              {ExplorerPane && (
                <>
                  <Panel defaultSize={20} order={1}>
                    <DashboardTemplateExplorerPane
                      ExplorerPane={ExplorerPane}
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

DashboardTemplate.displayName = 'DashboardTemplate'

export default DashboardTemplate
