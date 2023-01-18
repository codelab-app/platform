// import '../src/wdyr'
import 'reflect-metadata'
import '../src/styles/antd-theme.less'
import 'react-quill/dist/quill.snow.css'
// This stylesheet is used to override some of the default Quill editor's styles.
import '../src/styles/quill.snow.override.css'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
// https://www.elvisduru.com/blog/how-to-customize-ant-design-theme-in-nextjs
import { UserProvider } from '@auth0/nextjs-auth0'
import type { IAppProps, IPageProps } from '@codelab/frontend/abstract/core'
import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { initializeStore } from '@codelab/frontend/model/infra/mobx'
import { StoreProvider } from '@codelab/frontend/presenter/container'
import { css, Global } from '@emotion/react'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { ConfigProvider } from 'antd'
import type { PropsWithChildren } from 'react'
import React, { useMemo } from 'react'
import { RecoilRoot } from 'recoil'
import { GlobalStyles } from 'twin.macro'
import { globalTailwindFix } from '../src/styles/GlobalTailwindFix'
import { slickCssFix } from '../src/styles/slick/Slick'

const App = ({ pageProps, Component }: IAppProps<IPageProps>) => {
  const store = useMemo(() => initializeStore(pageProps), [])

  const { Layout = ({ children }: PropsWithChildren) => <>{children}</> } =
    Component as CodelabPage<unknown>

  return (
    <StoreProvider value={store}>
      <RecoilRoot>
        <UserProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <ConfigProvider>
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
                <Component
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...pageProps}
                />
              </Layout>
            </ConfigProvider>
          </LocalizationProvider>
        </UserProvider>
      </RecoilRoot>
    </StoreProvider>
  )
}

App.displayName = 'App'

export default App
