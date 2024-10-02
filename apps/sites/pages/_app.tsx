import type { IAppProps } from '@codelab/frontend/abstract/application'

import 'react-quill/dist/quill.snow.css'
import 'react-grid-layout/css/styles.css'

// This stylesheet is used to override some of the default Quill editor's styles.
import '../src/styles/quill.snow.override.css'

// apply fix for common css problems:
// - remove default padding/margin from html and body
// - set 100% width and height for html and body
// - set box-sizing, remove outlines, etc
import 'antd/dist/reset.css'

const App = ({ Component, pageProps }: IAppProps) => {
  // const {
  //   appSlug,
  //   componentSlug,
  //   pageSlug,
  //   params,
  //   primarySidebarKey,
  //   query,
  //   userSlug,
  // } = useUrl()

  // const [store] = useState(() => {
  //   const coreStore = createCoreStore(
  //     {
  //       params: params,
  //       query,
  //     },
  //     guestUser,
  //   )

  //   registerRootStore(coreStore)

  //   return coreStore
  // })

  // useEffect(() => {
  //   store.routerService.update({
  //     params: params,
  //     query,
  //   })
  // }, [params, query])
  return (
    // <StoreProvider value={store}>
    // <GlobalStyles />
    <Component
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...pageProps}
    />
    // </StoreProvider>
  )
}

App.displayName = 'App'

export default App
