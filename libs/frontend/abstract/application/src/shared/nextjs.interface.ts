import type { Auth0IdToken } from '@codelab/shared/abstract/core'
import type { AppProps } from 'next/app'

/**
 * Used by `_app.tsx`
 */
export type IAppProps = AppProps<{
  user?: Auth0IdToken
}>
