import { AppProps } from 'next/app'
import { Overwrite } from 'utility-types'

/**
 * Used by `_app.tsx`
 */
export type IAppProps = Overwrite<
  AppProps<any>,
  {
    pageProps: IPageProps
  }
>

/**
 * The `props` used by each page component
 */
export interface IPageProps {
  snapshot?: any
  // user?: AccessTokenPayload
}
