import { DownOutlined, UserOutlined } from '@ant-design/icons'
import { useBuilderSelection } from '@codelab/frontend/builder'
import {
  AppProvider,
  LibraryProvider,
  PageType,
} from '@codelab/frontend/shared'
import { useGetFirstAppQuery } from '@codelab/hasura'
import styled from '@emotion/styled'
import { Dropdown, Layout, Menu } from 'antd'
import { useRouter } from 'next/router'
import React, { PropsWithChildren, useEffect } from 'react'
import xw from 'xwind'
import { WithMainPane, WithMetaPane } from './Layout.d'
import { LayoutNavigations } from './Layout-navigations'

const { Sider, Content, Header } = Layout

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
  const { data, loading } = useGetFirstAppQuery()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !data?.app.length) {
      router.push(PageType.AppList)
    }

    // if (!data?.app[0].pages.length) {
    //   throw new Error('App is missing a page')
    // }
  }, [loading])

  if (!data?.app.length || !data?.app?.[0].pages.length) {
    return null
  }

  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<UserOutlined />}>
        1st menu item
      </Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined />}>
        2nd menu item
      </Menu.Item>
      <Menu.Item key="3" icon={<UserOutlined />}>
        3rd menu item
      </Menu.Item>
    </Menu>
  )

  return (
    <AppProvider appId={data?.app[0].id} pageId={data?.app[0].pages[0].id}>
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
          <Layout>
            <Header>
              <Menu theme="light" mode="horizontal" defaultSelectedKeys={['2']}>
                <Menu.Item key="1">
                  <Dropdown overlay={menu} trigger={['click']}>
                    <a
                      className="ant-dropdown-link"
                      onClick={(e) => e.preventDefault()}
                    >
                      Page: Home <DownOutlined />
                    </a>
                  </Dropdown>
                </Menu.Item>
              </Menu>
            </Header>
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
          </Layout>
        </Layout>
      </LibraryProvider>
    </AppProvider>
  )
}
