import { contentStyle } from '@codelab/frontend/view/style'
import { Layout } from 'antd'
import React from 'react'
import { HomeMenuHeader } from './HomeMenuHeader'

const { Content, Header, Footer } = Layout

export type HomeTemplateProps = React.PropsWithChildren<unknown>

export const HomeTemplate = ({ children }: HomeTemplateProps) => {
  return (
    <Layout style={{ height: '100%' }}>
      <Header>
        <HomeMenuHeader />
      </Header>
      <Content className="container" style={contentStyle}>
        {children}
      </Content>
      <Footer>
        <span>Codelab.ai ©2020</span>
      </Footer>
    </Layout>
  )
}
