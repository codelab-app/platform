import { TemplateProps } from '@codelab/frontend/abstract/props'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Layout } from 'antd'
import { Resizable } from 're-resizable'
import React from 'react'
import tw from 'twin.macro'
import { MetaPaneToggleButton } from './MetaPaneToggleButton'
import { useDashboardLayout } from './state/useDashboardLayout'

const { Sider, Content, Header: AntDesignHeader } = Layout

export const tabsWidth = 40
export const mainPaneWidth = 300

const MetaPaneSection = styled('div')(
  ({ metaPaneIsOpen }: { metaPaneIsOpen: boolean }) => [
    ` position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: white;
      z-index: 100;
      min-height: 0.75rem;
      height: ${metaPaneIsOpen ? 'auto' : '0.75rem'};
      `,
    tw`border-t border-gray-200`,
  ],
)

export const DashboardTemplate = ({
  children,
  layoutProps = {},
  Header,
  MainPane,
  MetaPane,
  SidebarNavigation,
}: TemplateProps) => {
  const { metaPaneIsOpen } = useDashboardLayout()

  return (
    <Layout
      css={css`
        min-height: 100% !important;
      `}
      {...layoutProps}
    >
      {SidebarNavigation ? (
        <Sider
          theme="light"
          collapsed
          collapsedWidth={40}
          style={{ maxHeight: '100vh' }}
        >
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
            <Sider
              theme="light"
              width="auto"
              css={tw`border-r border-gray-200 max-h-full h-full top-0 overflow-x-hidden overflow-y-auto  top-0 left-0 bottom-0`}
            >
              <Resizable
                enable={{ right: true }}
                maxWidth={mainPaneWidth * 2}
                minWidth={mainPaneWidth}
                maxHeight={'100%'}
                defaultSize={{
                  height: '100%',
                  width: mainPaneWidth,
                }}
                css={css`
                  position: relative;
                `}
              >
                <div css={tw`absolute inset-0 h-full w-full`}>
                  <MainPane />
                </div>
              </Resizable>
            </Sider>
          ) : null}
          <Content css={tw`relative p-2`}>
            {children}

            {MetaPane ? (
              <MetaPaneSection metaPaneIsOpen={metaPaneIsOpen}>
                <MetaPaneToggleButton
                  style={{ position: 'absolute' }}
                  css={tw`right-4 -top-3 z-10`}
                />
                <div style={{ overflow: 'hidden', maxHeight: '100%' }}>
                  <MetaPane />
                </div>
              </MetaPaneSection>
            ) : null}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}
