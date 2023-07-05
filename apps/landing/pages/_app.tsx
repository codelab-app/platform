// import '../src/wdyr'
import 'reflect-metadata'
import '../styles/app.css'
// apply fix for common css problems:
// - remove default padding/margin from html and body
// - set 100% width and height for html and body
// - set box-sizing, remove outlines, etc
import 'antd/dist/reset.css'
// https://www.elvisduru.com/blog/how-to-customize-ant-design-theme-in-nextjs
import { UserProvider } from '@auth0/nextjs-auth0/client'
import type { IAppProps } from '@codelab/frontend/abstract/core'
import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { ConfigProvider } from 'antd'
import React from 'react'
import { RecoilRoot } from 'recoil'
import { GoogleAnalytics } from '../home/GoogleAnalytics'
import { Intercom } from '../home/Intercom'
import { useHotjar } from '../hooks/useHotjar.hook'
// import { slickCssFix } from '../src/styles/slick/Slick'

/**
 * Pass { snapshot: getSnapshot(store) } as props from any getServerSideProps to pre-populate the store
 */

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
          <ConfigProvider>
            {/* <GlobalStyles /> */}
            <Global
              styles={[
                css({
                  '#__next': {
                    height: '100%',
                  },
                }),
                css`
                  img,
                  svg,
                  video,
                  canvas,
                  audio,
                  iframe,
                  embed,
                  object {
                    display: inline;
                  }
                `,
              ]}
            />
            <Layout>
              {() => (
                <Component
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...pageProps}
                />
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
