import 'react-quill/dist/quill.snow.css'
// This stylesheet is used to override some of the default Quill editor's styles.
import '../src/styles/quill.snow.override.css'
import 'react-grid-layout/css/styles.css'
// apply fix for common css problems:
// - remove default padding/margin from html and body
// - set 100% width and height for html and body
// - set box-sizing, remove outlines, etc
import 'antd/dist/reset.css'
import type {
  IAppProps,
  IPageProps,
} from '@codelab/frontend/abstract/application'
import { StoreProvider } from '@codelab/frontend/application/shared/store'
import { initializeStore } from '@codelab/frontend/infra/mobx'
import type { Auth0IdToken } from '@codelab/shared/abstract/core'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import { v4 } from 'uuid'

// because user is required we pass a guest user
export const user: Auth0IdToken = {
  email: '',
  /* eslint-disable @typescript-eslint/naming-convention */
  email_verified: false,
  family_name: '',
  given_name: '',
  'https://api.codelab.app/jwt/claims': { neo4j_user_id: v4(), roles: [] },
  locale: '',
  name: '',
  nickname: '',
  picture: '',
  sid: v4(),
  sub: v4(),
  updated_at: '',
  /* eslint-enable @typescript-eslint/naming-convention */
}

const App = ({ Component, pageProps }: IAppProps<IPageProps>) => {
  const router = useRouter()

  const store = useMemo(() => {
    return initializeStore({
      router: {
        path: router.asPath,
        pathname: router.pathname,
        query: router.query,
      },
      user,
    })
  }, [user])

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
