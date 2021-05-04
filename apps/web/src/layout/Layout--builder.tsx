import { useBuilderSelection } from '@codelab/frontend/builder'
import { LibraryProvider } from '@codelab/frontend/shared'
import styled from '@emotion/styled'
import { Layout } from 'antd'
import React, { PropsWithChildren } from 'react'
import xw from 'xwind'
import { WithMainPane, WithMetaPane } from './Layout.d'
import { LayoutNavigations } from './Layout-navigations'

const { Sider, Content } = Layout

export const tabsWidth = 40
export const mainPaneWidth = 300

const MetaPaneSection = styled('div')`
  position: absolute;
  bottom: 0;
  width: 100%;
`

export const LayoutBuilder = ({
  children,
  MainPane,
  MetaPane = undefined,
}: PropsWithChildren<WithMainPane & WithMetaPane>) => {
  const { reset: resetSelection } = useBuilderSelection()

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
          {MetaPane ? (
            <MetaPaneSection>
              <MetaPane />
            </MetaPaneSection>
          ) : null}
        </Content>
      </Layout>
    </LibraryProvider>
  )
}
