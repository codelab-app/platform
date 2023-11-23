import '../styles/global.css'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import type { IAppProps, IPageProps } from '@codelab/frontend/abstract/domain'
import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { StoreProvider } from '@codelab/frontend/application/shared/store'
import { initializeStore } from '@codelab/frontend/infra/mobx'
import { App as AntdApp } from 'antd'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'

const App = ({ Component, pageProps }: IAppProps<IPageProps>) => {
  const router = useRouter()
  const { user } = pageProps

  const store = useMemo(() => {
    if (!user) {
      return null
    }

    return initializeStore({ routerQuery: router.query, user })
  }, [user])

  const { Layout = ({ children }) => <>{children}</> } =
    Component as CodelabPage<object, object, object>

  return (
    <StoreProvider value={store}>
      <UserProvider>
        <Layout>
          {(props) => (
            <AntdApp>
              <Component {...props} />
            </AntdApp>
          )}
        </Layout>
      </UserProvider>
    </StoreProvider>
  )
}

export default App
