import { Auth0SessionUser } from '@codelab/frontend/abstract/core'
import { NextApiRequest as OriginalNextApiRequest } from 'next'

export interface GraphQLRequestContext {
  user?: Auth0SessionUser
  req: NextApiRequest
}

interface NextApiRequest extends OriginalNextApiRequest {
  user?: Auth0SessionUser
}

export type { NextApiRequest }
