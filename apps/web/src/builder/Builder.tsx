import { Layout } from 'antd'
import React, { PropsWithChildren } from 'react'
import { BuilderPaneController } from './Builder-pane-controller'
import { PaneConfig } from './pane-config/Pane-config'
import { BuilderDetails } from './pane-details/Pane-details'
import { PaneMain } from './pane-main/Pane-main'
import { BuilderTabSidebar } from './tabs-sidebar/Tabs-sidebar'
import { RouterGuard, contentStyle } from '@codelab/frontend'
import {
  LayoutPane,
  LayoutPaneVisibility,
  useGetLayoutQuery,
} from '@codelab/generated'

const { Sider, Content } = Layout

const tabsWidth = 40

const paneMainWidth = 240

export const Builder = ({ children }: PropsWithChildren<{}>) => {
  const { data } = useGetLayoutQuery()

  if (!data) {
    return null
  }

  const layout = data.getLayout

  console.log('Builder')
  console.log(layout)

  return (
    <Layout style={{ height: '100%' }}>
      <PaneConfig />
      <Sider theme="light" collapsed collapsedWidth={tabsWidth}>
        <BuilderTabSidebar />
      </Sider>
      <BuilderPaneController
        layout={layout}
        isRendered={({ pane }) =>
          pane === LayoutPane.Main || pane === LayoutPane.Both
        }
        isVisible={({ paneVisibility }) =>
          paneVisibility === LayoutPaneVisibility.Main ||
          paneVisibility === LayoutPaneVisibility.Both
        }
      >
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
          <PaneMain />
        </Sider>
      </BuilderPaneController>
      <BuilderPaneController
        layout={layout}
        isRendered={({ pane }) =>
          pane === LayoutPane.Detail || pane === LayoutPane.Both
        }
        isVisible={({ paneVisibility }) =>
          paneVisibility === LayoutPaneVisibility.Detail ||
          paneVisibility === LayoutPaneVisibility.Both
        }
      >
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
          <RouterGuard<'appId'> guards={['appId']}>
            {({ appId }) => <BuilderDetails appId={appId} />}
          </RouterGuard>
        </Sider>
      </BuilderPaneController>
      <Layout>
        <Content style={contentStyle}>{children}</Content>
      </Layout>
    </Layout>
  )
}
