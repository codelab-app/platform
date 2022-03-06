import { Session } from '@auth0/nextjs-auth0'
import { Nullish } from '@codelab/shared/abstract/types'

export type SetAuthenticatedUserPayload = Nullish<Session['user']>
