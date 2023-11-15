import '../styles/global.css'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import type { IAppProps, IPageProps } from '@codelab/frontend/abstract/domain'
import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { App as AntdApp } from 'antd'
import React from 'react'

const App = ({ Component }: IAppProps<IPageProps>) => {
  const { Layout = ({ children }) => <>{children}</> } =
    Component as CodelabPage<object, object, object>

  return (
    <UserProvider>
      <Layout>
        {(props) => (
          <AntdApp>
            <Component {...props} />
          </AntdApp>
        )}
      </Layout>
    </UserProvider>
  )
}

export default App
