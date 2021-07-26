import { contentStyle } from '@codelab/frontend/style'
import { Layout } from 'antd'
import React from 'react'
import { HomeMenuHeader } from '../sections/home/Home-menu--header'
import { LayoutComponent } from './Layout.d'

const { Content, Header, Footer } = Layout

export const HomeTemplate: LayoutComponent = ({ children }) => {
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
