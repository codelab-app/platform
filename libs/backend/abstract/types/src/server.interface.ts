import type { Auth0SessionUser } from '@codelab/shared/abstract/core'
import type { NextApiRequest as OriginalNextApiRequest } from 'next'

export interface GraphQLRequestContext {
  req: NextApiRequest
  user?: Auth0SessionUser
}

interface NextApiRequest extends OriginalNextApiRequest {
  user?: Auth0SessionUser
}

export type { NextApiRequest }
