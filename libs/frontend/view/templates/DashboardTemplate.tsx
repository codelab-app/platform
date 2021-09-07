import { TemplateProps } from '@codelab/frontend/abstract/props'
import { PageType } from '@codelab/frontend/model/state/router'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Layout } from 'antd'
import { NextRouter, useRouter } from 'next/router'
import { Resizable } from 're-resizable'
import React from 'react'
import tw from 'twin.macro'

const { Sider, Content, Header: AntDesignHeader } = Layout

export const tabsWidth = 40
export const mainPaneWidth = 300

const MetaPaneSection = styled('div')`
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: white;
  z-index: 100;
  ${tw`p-4`}
`

const isPageBuilderRoute = (router: NextRouter) => {
  return router?.route === PageType.PageBuilder
}

const StyledContent = styled(Content)(({ router }: { router: NextRouter }) => [
  tw`relative p-2`,
  isPageBuilderRoute(router) ? tw`pt-16` : '',
])

export const DashboardTemplate = ({
  children,
  layoutProps = {},
  Header,
  MainPane,
  MetaPane,
  SidebarNavigation,
}: TemplateProps) => {
  const router = useRouter()
  // const contentPadding = isPageDetailRoute(router) ? 'pt-12' : ''

  return (
    <Layout
      css={css`
        min-height: 100% !important;
      `}
      {...layoutProps}
    >
      {SidebarNavigation ? (
        <Sider theme="light" collapsed collapsedWidth={40}>
          <div data-testid="pane-main" css={tw`h-full`}>
            <SidebarNavigation />
          </div>
        </Sider>
      ) : null}
      <Layout>
        {Header ? (
          <AntDesignHeader>
            <Header />
          </AntDesignHeader>
        ) : null}
        <Layout>
          {MainPane ? (
            <Resizable
              enable={{ right: true }}
              maxWidth={mainPaneWidth * 2}
              minWidth={mainPaneWidth}
              defaultSize={{
                height: '100%',
                width: mainPaneWidth,
              }}
            >
              <Sider
                theme="light"
                width={'100%'}
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
            </Resizable>
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
