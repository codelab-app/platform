// import '../src/wdyr'
import '../styles/app.css'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import type { IAppProps } from '@codelab/frontend/abstract/domain'
import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { App as AntdApp, ConfigProvider } from 'antd'
import React from 'react'
import { RecoilRoot } from 'recoil'
import { GoogleAnalytics } from '../src/home/GoogleAnalytics'
import { Intercom } from '../src/home/Intercom'
import { useHotjar } from '../src/hooks/useHotjar.hook'
// import { slickCssFix } from '../src/styles/slick/Slick'

const App = ({ Component, pageProps }: IAppProps) => {
  const { Layout = ({ children }) => <>{children}</> } =
    Component as CodelabPage

  useHotjar()

  return (
    <>
      <GoogleAnalytics />
      <Intercom />
      <RecoilRoot>
        <UserProvider>
          <ConfigProvider
            theme={{
              token: {
                fontFamily: 'Nunito',
                fontFamilyCode: 'Nunito',
              },
            }}
          >
            <Layout>
              {() => (
                <AntdApp>
                  <Component
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...pageProps}
                  />
                </AntdApp>
              )}
            </Layout>
          </ConfigProvider>
        </UserProvider>
      </RecoilRoot>
    </>
  )
}

App.displayName = 'App'

export default App
