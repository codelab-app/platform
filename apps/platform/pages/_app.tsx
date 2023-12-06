// import '../src/wdyr'
import '../styles/global.css'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import type { IAppProps, IPageProps } from '@codelab/frontend/abstract/domain'
import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { DynamicProvidersTree } from '@codelab/frontend/presentation/codelab-ui'
import { App as AntdApp } from 'antd'
import React from 'react'

const App = ({ Component, pageProps: { user } }: IAppProps<IPageProps>) => {
  const { Layout = ({ children }) => <>{children}</> } =
    Component as CodelabPage<object, object, object>

  return (
    <UserProvider>
      <DynamicProvidersTree user={user}>
        <Layout>
          {(props) => (
            <AntdApp className="h-full w-full">
              <Component {...props} />
            </AntdApp>
          )}
        </Layout>
      </DynamicProvidersTree>
    </UserProvider>
  )
}

export default App
