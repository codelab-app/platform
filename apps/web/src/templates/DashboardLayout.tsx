import { useBuilderSelection } from '@codelab/frontend/builder'
import styled from '@emotion/styled'
import { Layout } from 'antd'
import React, { PropsWithChildren } from 'react'
import tw from 'twin.macro'
import { DashboardLayoutProps } from './Layout.d'

const { Sider, Content } = Layout

export const tabsWidth = 40
export const mainPaneWidth = 300

const MetaPaneSection = styled('div')`
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: white;
`

export const DashboardLayout = ({
  children,
  MainPane,
  MetaPane,
  SidebarNavigation,
}: PropsWithChildren<DashboardLayoutProps>) => {
  const { reset: resetSelection } = useBuilderSelection()

  return (
    <Layout css={tw`h-full`}>
      <Sider
        theme="light"
        style={{ height: '100%' }}
        collapsed
        collapsedWidth={40}
      >
        <div data-testid="pane-main" css={tw`h-full`}>
          {SidebarNavigation ? <SidebarNavigation /> : null}
        </div>
      </Sider>
      <Layout>
        <Layout>
          {MainPane ? (
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
          ) : null}
          <Content
            css={tw`relative p-2`}
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
      </Layout>
    </Layout>
  )
}
