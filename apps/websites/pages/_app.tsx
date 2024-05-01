import 'react-quill/dist/quill.snow.css'
// This stylesheet is used to override some of the default Quill editor's styles.
import '../src/styles/quill.snow.override.css'
import 'react-grid-layout/css/styles.css'
// apply fix for common css problems:
// - remove default padding/margin from html and body
// - set 100% width and height for html and body
// - set box-sizing, remove outlines, etc
import 'antd/dist/reset.css'
import type { IAppProps } from '@codelab/frontend/abstract/application'
import { StoreProvider } from '@codelab/frontend/application/shared/store'
import { createRootStore } from '@codelab/frontend/infra/mobx'
import { guestUser } from '@codelab/shared/data/test'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const App = ({ Component, pageProps }: IAppProps) => {
  const router = useRouter()

  const [store] = useState(
    createRootStore(
      {
        path: router.asPath,
        pathname: router.pathname,
        query: router.query,
      },
      guestUser,
    ),
  )

  return (
    <StoreProvider value={store}>
      {/* <GlobalStyles /> */}
      <Component
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...pageProps}
      />
    </StoreProvider>
  )
}

App.displayName = 'App'

export default App
