import { contentStyle } from '@codelab/frontend/style'
import { Layout } from 'antd'
import React from 'react'
import { HomeMenuHeader } from './HomeMenuHeader'

const { Content, Header, Footer } = Layout

export type HomeTemplateProps = React.PropsWithChildren<never>

export const HomeTemplate = ({ children }: HomeTemplateProps) => {
  return (
    <Layout style={{ height: '100%' }}>
      <Header>
        <HomeMenuHeader />
      </Header>
      <Content style={contentStyle} className="container">
        {children}
      </Content>
      <Footer>
        <span>Codelab.ai ©2020</span>
      </Footer>
    </Layout>
  )
}
