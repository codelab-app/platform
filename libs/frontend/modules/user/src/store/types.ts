import { Session } from '@auth0/nextjs-auth0'
import { IUser } from '@codelab/shared/abstract/core'
import { Nullish } from '@codelab/shared/abstract/types'

export type SetAuthenticatedUserPayload = Nullish<Session['user']>
