import { useBuilderSelectionState } from '@codelab/frontend/builder'
import { Layout, Tabs } from 'antd'
import React, { PropsWithChildren } from 'react'
import { LayoutNavigations } from './Layout-navigations'
import { WithMainPane } from './Layout.d'
import { paneConfigWidth } from './Layout--builder'
import { Resizable } from 're-resizable'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

const { Sider, Content } = Layout

const MetaPane = styled('div')`
  position: fixed;
  bottom: 0;
  width: 100%;
`

export const LayoutComponent = ({
  children,
  MainPane,
}: PropsWithChildren<WithMainPane>) => {
  const { reset: resetSelection } = useBuilderSelectionState()

  return (
    <Layout style={{ height: '100%' }}>
      <Sider
        theme="light"
        style={{ height: '100%' }}
        collapsed
        collapsedWidth={40}
      >
        <LayoutNavigations />
      </Sider>
      <Sider
        theme="light"
        width={paneConfigWidth}
        style={{
          overflowY: 'scroll',
          // position: 'fixed',
          height: '100%',
          top: 0,
          // right: 0,
        }}
      >
        <MainPane />
      </Sider>
      <Content
        onClick={() => {
          resetSelection()
        }}
        style={{
          minHeight: 'initial',
          // paddingLeft: tabsWidth,
          // paddingRight: paneConfigWidth,
        }}
      >
        {children}
        <MetaPane>
          <Resizable
            enable={{ top: true }}
            css={css`
              position: fixed;
              bottom: 0;
              background: white;
              height: 80%;
            `}
            maxHeight={400}
            defaultSize={{
              width: '100%',
              height: 200,
            }}
          >
            <Tabs defaultActiveKey="1">
              <Tabs.TabPane tab="Tab 1" key="1">
                Content of Tab Pane 1
              </Tabs.TabPane>
              <Tabs.TabPane tab="Tab 2" key="2">
                Content of Tab Pane 2
              </Tabs.TabPane>
            </Tabs>
          </Resizable>
        </MetaPane>
      </Content>
    </Layout>
  )
}
