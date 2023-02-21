import '../src/styles/antd-theme.less'
import 'react-quill/dist/quill.snow.css'
// This stylesheet is used to override some of the default Quill editor's styles.
import '../src/styles/quill.snow.override.css'
import 'react-grid-layout/css/styles.css'
import type { IAppProps, IPageProps } from '@codelab/frontend/abstract/core'
import { initializeStore } from '@codelab/frontend/model/infra/mobx'
import { StoreProvider } from '@codelab/frontend/presenter/container'
import React, { useMemo } from 'react'
import { GlobalStyles } from 'twin.macro'

const App = ({ pageProps, Component }: IAppProps<IPageProps>) => {
  const store = useMemo(() => initializeStore(pageProps), [])

  return (
    <StoreProvider value={store}>
      <GlobalStyles />

      <Component
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...pageProps}
      />
    </StoreProvider>
  )
}

App.displayName = 'App'

export default App
