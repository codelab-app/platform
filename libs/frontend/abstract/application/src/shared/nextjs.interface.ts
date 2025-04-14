import type { Auth0IdToken } from '@codelab/shared/abstract/core'
import type { AppProps } from 'next/app'

/**
 * Used by `_app.tsx`
 */
export type IAppProps = AppProps<{
  user?: Auth0IdToken
}>

/**
 * This is the server page props for app router
 *
 * https://nextjs.org/docs/app/api-reference/file-conventions/page#handling-filtering-with-searchparams
 */
export interface NextjsSearchParamsProps {
  [key: string]: string | Array<string> | undefined
}
