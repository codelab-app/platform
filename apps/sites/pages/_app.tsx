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
import { createCoreStore } from '@codelab/frontend/infra/mobx'
import { StoreProvider } from '@codelab/frontend-application-shared-store/provider'
import { useUrl } from '@codelab/frontend-application-shared-store/router'
import { guestUser } from '@codelab/shared/data/test'
import { registerRootStore } from 'mobx-keystone'
import React, { useEffect, useState } from 'react'

const App = ({ Component, pageProps }: IAppProps) => {
  const {
    appSlug,
    componentSlug,
    pageSlug,
    params,
    primarySidebarKey,
    query,
    userSlug,
  } = useUrl()

  const [store] = useState(() => {
    const coreStore = createCoreStore(
      {
        params: params,
        query,
      },
      guestUser,
    )

    registerRootStore(coreStore)

    return coreStore
  })

  useEffect(() => {
    store.routerService.update({
      params: params,
      query,
    })
  }, [params, query])

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
