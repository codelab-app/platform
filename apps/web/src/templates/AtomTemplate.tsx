import { AppProvider } from '@codelab/frontend/presenter/container'
import { Layout } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'
import tw from 'twin.macro'
import { BuilderSidebarNavigation } from './builder'
import { LayoutComponent } from './Layout.interface'

const { Sider, Content, Header } = Layout

export const AtomTemplate: LayoutComponent = ({ children }) => {
  const router = useRouter()

  return (
    <AppProvider appId={router.query.appId as string}>
      <Layout css={tw`h-full`}>
        <Sider
          theme="dark"
          style={{ height: '100%' }}
          collapsed
          collapsedWidth={40}
        >
          <BuilderSidebarNavigation />
        </Sider>
        <Layout css={tw`bg-white`}>
          <Content>{children}</Content>
        </Layout>
      </Layout>
    </AppProvider>
  )
}
