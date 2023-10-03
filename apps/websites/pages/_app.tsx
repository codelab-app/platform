import 'react-quill/dist/quill.snow.css'
// This stylesheet is used to override some of the default Quill editor's styles.
import '../src/styles/quill.snow.override.css'
import 'react-grid-layout/css/styles.css'
// apply fix for common css problems:
// - remove default padding/margin from html and body
// - set 100% width and height for html and body
// - set box-sizing, remove outlines, etc
import 'antd/dist/reset.css'
import type { IAppProps, IPageProps } from '@codelab/frontend/abstract/domain'
import { StoreProvider } from '@codelab/frontend/application/shared/store'
import { initializeStore } from '@codelab/frontend/infra/mobx'
import { Analytics } from '@vercel/analytics/react'
import React, { useMemo } from 'react'

const App = ({ Component, pageProps }: IAppProps<IPageProps>) => {
  const { user } = pageProps

  const store = useMemo(() => {
    if (!user) {
      return null
    }

    return initializeStore({ user })
  }, [user])

  return (
    <StoreProvider value={store}>
      {/* <GlobalStyles /> */}
      <Component
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...pageProps}
      />
      <Analytics />
    </StoreProvider>
  )
}

App.displayName = 'App'

export default App
