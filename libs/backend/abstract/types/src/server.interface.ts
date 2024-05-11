import type { Auth0IdToken } from '@codelab/shared/abstract/core'
import type { IncomingMessage } from 'http'
import type { NextApiRequest as OriginalNextApiRequest } from 'next'

export interface GraphQLRequestContext {
  req: NextApiRequest
  user?: Auth0IdToken
}

export interface GqlContext {
  req: IncomingMessage
  res: Response
}

interface NextApiRequest extends OriginalNextApiRequest {
  user?: Auth0IdToken
}

export type { NextApiRequest }
