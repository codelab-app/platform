import { Layout } from 'antd'
import { useRouter } from 'next/router'
import React, { PropsWithChildren } from 'react'
import { useBuilderLayout } from './Builder-pane--state'
import { PaneConfig } from './pane-config/Pane-config'
import { BuilderDetails } from './pane-details/Pane-details'
import { PaneMain } from './pane-main/Pane-main'
import { BuilderTabSidebar } from './tabs-sidebar/Tabs-sidebar'
import { PropsWithIds, RouterGuard, contentStyle } from '@codelab/frontend'

const { Sider, Content } = Layout

const tabsWidth = 40

const paneMainWidth = 240

export const Builder = ({
  children,
}: PropsWithChildren<PropsWithIds<'appId'>>) => {
  const layout = useBuilderLayout()
  const { query } = useRouter()
  const appId = `${query.appId}`

  return (
    <Layout style={{ height: '100%' }}>
      <PaneConfig />
      <Sider theme="light" collapsed collapsedWidth={tabsWidth}>
        <BuilderTabSidebar />
      </Sider>
      {layout.pane === 'none' ? null : (
        <>
          {layout.pane === 'main' || layout.pane === 'both' ? (
            <Sider
              theme="light"
              width={paneMainWidth}
              style={{
                position: 'absolute',
                left: tabsWidth,
                height: '100%',
                zIndex: 1,
              }}
            >
              <RouterGuard guards={['appId']}>
                <PaneMain />
              </RouterGuard>
              {/* <DashboardTreeContainer>
              {({ data }: DashboardTreeProps) => <DashboardTree data={data} />}
            </DashboardTreeContainer> */}
            </Sider>
          ) : null}
          {layout.pane === 'detail' || layout.pane === 'both' ? (
            <Sider
              theme="light"
              width={320}
              style={{
                position: 'absolute',
                left: tabsWidth + paneMainWidth + 1,
                height: '100%',
                zIndex: 1,
              }}
            >
              <BuilderDetails appId={appId} />
            </Sider>
          ) : null}
        </>
      )}
      <Layout>
        <Content style={contentStyle}>{children}</Content>
      </Layout>
    </Layout>
  )
}
