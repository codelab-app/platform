import type { Auth0IdToken } from '@codelab/shared/abstract/core'
import type { AppProps } from 'next/app'
import type { NextRouter } from 'next/dist/client/router'
import type { NextPage } from 'next/types'
import type { ParsedUrlQuery } from 'querystring'
import type { ReactElement, ReactNode } from 'react'
import type { Overwrite } from 'utility-types'
import type { IRouterProps } from './router.service.interface'
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
  router: IRouterProps
  // Could be undefined during production build steps
  user: Auth0IdToken
}

// export type NextPageWithLayout<P extends object, IP = P> = NextPage<P, IP> & {
//   Layout?(page: ReactElement): ReactNode
// }

// export type AppPropsWithLayout<P extends object, IP = P> = AppProps<P> & {
//   Component: NextPageWithLayout<P, IP>
// }
