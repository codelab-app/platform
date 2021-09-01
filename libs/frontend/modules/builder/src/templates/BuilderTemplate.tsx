import { TemplateProps } from '@codelab/frontend/abstract/props'
import { AppProvider } from '@codelab/frontend/modules/app'
import styled from '@emotion/styled'
import { Layout } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'
import tw from 'twin.macro'
import { BuilderSidebarNavigation } from './BuilderSidebarNavigation'

const { Sider, Content } = Layout

export const tabsWidth = 40
export const mainPaneWidth = 300

const MetaPaneSection = styled('div')`
  position: absolute;
  bottom: 0;
  width: 100%;
`

export const BuilderTemplate = ({
  children,
  MainPane,
  MetaPane,
}: TemplateProps) => {
  const router = useRouter()

  return (
    <AppProvider appId={router.query.appId as string}>
      <Layout css={tw`h-full`}>
        <Sider
          theme="light"
          style={{ height: '100%' }}
          collapsed
          collapsedWidth={40}
        >
          <BuilderSidebarNavigation />
        </Sider>

        <Layout>
          <Layout>
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
              {MainPane ? <MainPane /> : null}
            </Sider>
            <Content
              css={tw`relative`}
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
    </AppProvider>
  )
}
