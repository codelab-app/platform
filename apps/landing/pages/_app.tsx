import type { IAppProps } from '@codelab/frontend-abstract-application'
import type { NextPage } from 'next'
import type { FunctionComponent, PropsWithChildren } from 'react'

import { Auth0Provider } from '@auth0/nextjs-auth0'
import { App as AntdApp, ConfigProvider } from 'antd'
import { RecoilRoot } from 'recoil'

import { GoogleAnalytics } from '../src/home/GoogleAnalytics'
import { Intercom } from '../src/home/Intercom'
import { useHotjar } from '../src/hooks/useHotjar.hook'
import '../styles/app.css'
// import { slickCssFix } from '../src/styles/slick/Slick'

type CodelabPage<P = unknown, IP = P> = NextPage<P, IP> & {
  Layout?: FunctionComponent<PropsWithChildren<P>>
}

const App = ({ Component, pageProps }: IAppProps) => {
  const { Layout = ({ children }) => <>{children}</> } =
    Component as CodelabPage

  useHotjar()

  return (
    <>
      <GoogleAnalytics />
      <Intercom />
      <RecoilRoot>
        <Auth0Provider>
          <ConfigProvider
            theme={{
              token: {
                fontFamily: 'Nunito',
                fontFamilyCode: 'Nunito',
              },
            }}
          >
            <Layout>
              <AntdApp>
                <Component
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...pageProps}
                />
              </AntdApp>
            </Layout>
          </ConfigProvider>
        </Auth0Provider>
      </RecoilRoot>
    </>
  )
}

App.displayName = 'App'

export default App
