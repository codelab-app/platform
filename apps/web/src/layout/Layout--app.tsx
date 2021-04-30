import { contentStyle } from '@codelab/frontend/style'
import { Layout } from 'antd'
import React, { PropsWithChildren } from 'react'

const { Sider, Content } = Layout

export const LayoutApp = ({
  children,
}: PropsWithChildren<Record<string, unknown>>) => {
  return (
    <Layout style={{ height: '100%' }}>
      <Content style={contentStyle}>{children}</Content>
    </Layout>
  )
}
