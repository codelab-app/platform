/* eslint-disable react/jsx-props-no-spreading */
// import '../src/wdyr'
import 'react-quill/dist/quill.snow.css'
// This stylesheet is used to override some of the default Quill editor's styles.
import '../src/styles/quill.snow.override.css'
import '../src/styles/antd.global.fix.css'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
// apply fix for common css problems:
// - remove default padding/margin from html and body
// - set 100% width and height for html and body
// - set box-sizing, remove outlines, etc
import 'antd/dist/reset.css'
// https://www.elvisduru.com/blog/how-to-customize-ant-design-theme-in-nextjs
import { UserProvider } from '@auth0/nextjs-auth0/client'
import type { IAppProps, IPageProps } from '@codelab/frontend/abstract/core'
import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { initializeStore } from '@codelab/frontend/presentation/client/mobx'
import { StoreProvider } from '@codelab/frontend/presentation/container'
import { css, Global } from '@emotion/react'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { Analytics } from '@vercel/analytics/react'
import { ConfigProvider } from 'antd'
import React, { useMemo } from 'react'
import { GlobalStyles } from 'twin.macro'
import { globalTailwindFix } from '../src/styles/GlobalTailwindFix'
import { slickCssFix } from '../src/styles/slick/Slick'

const App = ({ Component, pageProps }: IAppProps<IPageProps>) => {
  const store = useMemo(() => initializeStore(pageProps), [])

  const { Layout = ({ children }) => <>{children}</> } =
    Component as CodelabPage<object, object, object>

  return (
    <StoreProvider value={store}>
      <Analytics />
      <UserProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ConfigProvider
            theme={{
              components: {
                Layout: {
                  colorBgHeader: '#ffffff',
                },
              },
              token: {
                // fontFamily: `'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
                // 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji',
                // 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
              },
            }}
          >
            <GlobalStyles />
            <Global
              styles={[
                css({
                  '#__next': {
                    height: '100%',
                  },
                }),
                slickCssFix,
                ...globalTailwindFix,
              ]}
            />
            <Layout>
              {(props) => <Component {...pageProps} {...props} />}
            </Layout>
          </ConfigProvider>
        </LocalizationProvider>
      </UserProvider>
    </StoreProvider>
  )
}

App.displayName = 'App'

export default App
