import { Layout } from 'antd'
import React, { PropsWithChildren, useContext } from 'react'
import { LayoutProvider } from '../layout/LayoutProvider'
import { AppContext, AppProvider } from '../useCases/apps/AppProvider'
import { BuilderPaneController } from './Builder-pane-controller'
import { PaneConfig } from './pane-config/Pane-config'
import { BuilderDetails } from './pane-details/Pane-details'
import { PaneMain } from './pane-main/Pane-main'
import { BuilderTabSidebar } from './tabs-sidebar/Tabs-sidebar'
import { useLayoutMutation } from './useLayoutMutation'
import { contentStyle } from '@codelab/frontend'
import { LayoutPaneVisibility } from '@codelab/generated'

const { Sider, Content } = Layout

const tabsWidth = 40
const paneConfigWidth = 320
const paneMainWidth = 240

export const Builder = ({ children }: PropsWithChildren<{}>) => {
  const { appId, pageId } = useContext(AppContext)
  const { setPaneVisibility } = useLayoutMutation()

  return (
    <AppProvider appId={appId} pageId={pageId}>
      <LayoutProvider>
        <Layout>
          <Sider
            theme="light"
            collapsed
            collapsedWidth={tabsWidth}
            style={{ position: 'fixed', height: '100%', zIndex: 1 }}
          >
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
                position: 'fixed',
                top: 0,
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
                height: '100%',
                position: 'fixed',
                left: tabsWidth + paneMainWidth + 1,
                zIndex: 1,
              }}
            >
              <BuilderDetails />
            </Sider>
          </BuilderPaneController>
          <Layout
            onMouseDown={() => setPaneVisibility(LayoutPaneVisibility.None)}
          >
            <Content
              style={{
                ...contentStyle,
                paddingLeft: tabsWidth,
                paddingRight: paneConfigWidth,
              }}
            >
              {children}
            </Content>
          </Layout>
          <Sider
            theme="light"
            width={paneConfigWidth}
            style={{
              overflowY: 'scroll',
              position: 'fixed',
              height: '100%',
              top: 0,
              right: 0,
            }}
          >
            <PaneConfig />
          </Sider>
        </Layout>
      </LayoutProvider>
    </AppProvider>
  )
}
;(Builder as any).whyDidYouRender = true
