import { useBuilderSelectionState } from '@codelab/frontend/builder'
import { Layout } from 'antd'
import React, { PropsWithChildren } from 'react'
import { LayoutNavigations } from './Layout-navigations'
import { WithMainPane, WithMetaPane } from './Layout.d'
import { LibraryProvider } from '@codelab/frontend/shared'
import styled from '@emotion/styled'
import xw from 'xwind'

const { Sider, Content } = Layout

export const tabsWidth = 40
export const mainPaneWidth = 280

const MetaPaneSection = styled('div')`
  position: absolute;
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
      <Layout css={xw`h-full`}>
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
          width={mainPaneWidth}
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
          css={xw`relative`}
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
