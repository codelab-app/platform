import { CuiNavigationBar } from '@codelab/frontend/presentation//codelab-ui'
import {
  useCurrentApp,
  useCurrentPage,
} from '@codelab/frontend/presentation/container'
import { Layout } from 'antd'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import { Panel, PanelGroup } from 'react-resizable-panels'
import tw from 'twin.macro'
import { sidebarWidth } from './constants'
import { DashboardTemplateConfigPane } from './DashboardTemplateConfigPane'
import { defaultNavigationBarItems } from './NavigationBar'
import ResizeHandle from './ResizeHandle'
import type { DashboardTemplateProps } from './Types'

const { Sider } = Layout

export const DashboardTemplateSSR = observer(
  ({
    children,
    ConfigPane,
    contentStyles,
    Header,
    PrimarySidebar,
  }: React.PropsWithChildren<DashboardTemplateProps>) => {
    const { primarySidebarKey } = useRouter().query
    const { appSlug, userName } = useCurrentApp()
    const { pageSlug } = useCurrentPage()

    const navigationBarItems = useMemo(
      () => defaultNavigationBarItems({ appSlug, pageSlug, userName }),
      [appSlug, pageSlug],
    )

    const activeSidebarKey =
      (primarySidebarKey as React.Key) || PrimarySidebar?.default || null

    const ActivePrimarySidebar = PrimarySidebar?.items.find(
      (item) => item.key === activeSidebarKey,
    )?.render

    return (
      <Layout css={tw`max-h-full min-h-full`}>
        {Header && <Header />}
        <Layout>
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
                      css={tw`w-full h-full overflow-auto`}
                      data-cy="temp-primary-panel-wrapper"
                    >
                      <ActivePrimarySidebar />
                    </div>
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
