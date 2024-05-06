import 'server-only'
import { type Auth0IdToken } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import auth0Instance from '@codelab/shared/infra/auth0'

export const getUser = async (): Promise<Maybe<Auth0IdToken>> => {
  const session = await auth0Instance.getSession()

  return session?.user as Maybe<Auth0IdToken>
}
