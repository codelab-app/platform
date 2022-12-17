import type { Session } from '@auth0/nextjs-auth0'
import type { Nullish } from '@codelab/shared/abstract/types'

export type SetAuthenticatedUserPayload = Nullish<Session['user']>
