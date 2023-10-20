import type { Auth0IdToken } from '@codelab/shared/abstract/core'
import type { AppProps } from 'next/app'
import type { Overwrite } from 'utility-types'

/**
 * Used by `_app.tsx`
 */
export type IAppProps<T = object> = Overwrite<
  AppProps<T>,
  {
    pageProps: Partial<T>
  }
>

/**
 * The `props` used by each page component
 */
export interface IPageProps {
  // Could be undefined during production build steps
  user: Auth0IdToken
}
