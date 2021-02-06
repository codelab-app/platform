import { Layout } from 'antd'
import React, { PropsWithChildren, useContext } from 'react'
import { LayoutProvider } from '../layout/LayoutProvider'
import { AppContext, AppProvider } from '../useCases/apps/AppProvider'
import { BuilderPaneController } from './Builder-pane-controller'
import { BuilderDetails } from './pane-details/Pane-details'
import { PaneMain } from './pane-main/Pane-main'
import { BuilderTabSidebar } from './tabs-sidebar/Tabs-sidebar'
import { contentStyle } from '@codelab/frontend'
import { LayoutPaneVisibility } from '@codelab/generated'

const { Sider, Content } = Layout

const tabsWidth = 40

const paneMainWidth = 240

export const Builder = ({ children }: PropsWithChildren<{}>) => {
  const { appId, pageId } = useContext(AppContext)

  return (
    <AppProvider appId={appId} pageId={pageId}>
      <LayoutProvider>
        <Layout style={{ height: '100%' }}>
          {/* <PaneConfig /> */}
          <Sider theme="light" collapsed collapsedWidth={tabsWidth}>
            <BuilderTabSidebar />
          </Sider>
          <BuilderPaneController
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
              <BuilderDetails />
            </Sider>
          </BuilderPaneController>
          <Layout>
            <Content style={contentStyle}>{children}</Content>
          </Layout>
        </Layout>
      </LayoutProvider>
    </AppProvider>
  )
}
;(Builder as any).whyDidYouRender = true
