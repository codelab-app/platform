import { useBuilderSelectionState } from '@codelab/frontend/builder'
import { Layout } from 'antd'
import React, { PropsWithChildren } from 'react'
import { LayoutNavigations } from './Layout-navigations'
import { WithMainPane, WithMetaPane } from './Layout.d'
import { LibraryProvider } from '@codelab/frontend/shared'
import styled from '@emotion/styled'

const { Sider, Content } = Layout

export const tabsWidth = 40
export const paneConfigWidth = 320
export const defaultPaneMainWidth = 480

const MetaPaneSection = styled('div')`
  position: fixed;
  bottom: 0;
  width: 100%;
`

export const LayoutBuilder = ({
  children,
  MainPane,
  MetaPane = () => <></>,
}: PropsWithChildren<WithMainPane & WithMetaPane>) => {
  const { reset: resetSelection } = useBuilderSelectionState()

  return (
    <LibraryProvider>
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
          }}
        >
          {children}
          <MetaPaneSection>
            <MetaPane />
          </MetaPaneSection>
        </Content>
      </Layout>
    </LibraryProvider>
  )
}
