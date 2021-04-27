import { useBuilderSelectionState } from '@codelab/frontend/builder'
import { Layout } from 'antd'
import React, { PropsWithChildren } from 'react'
import { contentStyle } from '@codelab/frontend/style'
import { PaneMain } from './pane-main'
import { PaneConfig } from './pane-config'

const { Sider, Content } = Layout

const tabsWidth = 40
const paneConfigWidth = 320
const defaultPaneMainWidth = 480

export const Builder = ({
  children,
}: PropsWithChildren<Record<string, unknown>>) => {
  const { reset: resetSelection } = useBuilderSelectionState()

  return (
    <Layout style={{ height: '100%' }}>
      <div>
        <Sider
          theme="light"
          style={{ height: '100%' }}
          width={defaultPaneMainWidth}
        >
          <PaneMain />
        </Sider>
      </div>
      <Layout>
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
  )
}
