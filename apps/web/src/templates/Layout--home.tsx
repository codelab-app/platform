import { contentStyle } from '@codelab/frontend/style'
import { Layout } from 'antd'
import React, { PropsWithChildren } from 'react'
import { HomeMenuHeader } from '../pages/home/Home-menu--header'

const { Content, Header, Footer } = Layout

export const LayoutHome = ({
  children,
}: PropsWithChildren<Record<string, any>>) => {
  return (
    <Layout style={{ height: '100%' }}>
      <Layout>
        <Header>
          <HomeMenuHeader />
        </Header>
        <Content style={contentStyle}>{children}</Content>
        <Footer>
          <span>Codelab.ai ©2020</span>
        </Footer>
      </Layout>
    </Layout>
  )
}
