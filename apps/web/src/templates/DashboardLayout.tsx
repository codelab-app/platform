import { PageType } from '@codelab/frontend/shared'
import styled from '@emotion/styled'
import { Layout } from 'antd'
import { LayoutProps } from 'antd/lib/layout'
import { NextRouter, useRouter } from 'next/router'
import React from 'react'
import tw from 'twin.macro'
import { LayoutComponent } from './Layout.d'

const { Sider, Content } = Layout

export const tabsWidth = 40
export const mainPaneWidth = 300

const MetaPaneSection = styled('div')`
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: white;
  ${tw`p-4`}
`

const isPageDetailRoute = (router: NextRouter) => {
  return router?.route === PageType.PageDetail
}

const StyledContent = styled(Content)(({ router }: { router: NextRouter }) => [
  tw`relative p-2`,
  isPageDetailRoute(router) ? tw`pt-16` : '',
  { minHeight: 'initial' },
])

export const DashboardLayout: LayoutComponent<
  'dashboard',
  { layoutProps?: LayoutProps }
> = ({ children, layoutProps, MainPane, MetaPane, SidebarNavigation }) => {
  const router = useRouter()
  const contentPadding = isPageDetailRoute(router) ? 'pt-12' : ''

  return (
    <Layout css={tw`h-full`} {...(layoutProps || {})}>
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
          <StyledContent router={router}>
            {children}
            {MetaPane ? (
              <MetaPaneSection>
                <MetaPane />
              </MetaPaneSection>
            ) : null}
          </StyledContent>
        </Layout>
      </Layout>
    </Layout>
  )
}
