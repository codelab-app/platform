// import '../src/wdyr'
import '../src/styles/app.css'
import 'animate.css'
import '../src/styles/styles.chunk.css'
import { UserProvider } from '@auth0/nextjs-auth0'
import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { useApollo } from '@codelab/frontend/model/infra/apollo'
import { css, Global } from '@emotion/react'
import DateFnsAdapter from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { ConfigProvider } from 'antd'
import { AppProps } from 'next/app'
import React, { PropsWithChildren } from 'react'
import { QueryClient } from 'react-query'
import { GlobalStyles } from 'twin.macro'
import { reduxStoreWrapper } from '../src/store/reduxStoreWrapper'
import { globalTailwindFix } from '../src/styles/GlobalTailwindFix'
import { slickCssFix } from '../src/styles/slick/Slick'

const App = ({
  pageProps: getServerSideProps,
  Component,
}: AppProps<unknown>) => {
  // console.log(getServerSideProps)

  const {
    Layout = ({ children }: PropsWithChildren<unknown>) => <>{children}</>,
  } = Component as CodelabPage<unknown>

  return (
    <UserProvider>
      <LocalizationProvider dateAdapter={DateFnsAdapter}>
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
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <Component {...getServerSideProps} />
          </Layout>
        </ConfigProvider>
      </LocalizationProvider>
    </UserProvider>
  )
}

export default reduxStoreWrapper.withRedux(App)
