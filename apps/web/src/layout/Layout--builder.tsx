import { useBuilderSelectionState } from '@codelab/frontend/builder'
import { Layout } from 'antd'
import React, { PropsWithChildren } from 'react'
import { contentStyle } from '@codelab/frontend/style'
import { LayoutNavigations } from './Layout-navigations'

const { Sider, Content } = Layout

const tabsWidth = 40
const paneConfigWidth = 320
const defaultPaneMainWidth = 480

export type WithMainPane = {
  MainPane: () => JSX.Element
}

export const LayoutBuilder = ({
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
          ...contentStyle,
          paddingLeft: tabsWidth,
          paddingRight: paneConfigWidth,
        }}
      >
        {children}
      </Content>
    </Layout>
  )
}
