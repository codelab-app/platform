import type { Auth0IdToken } from '@codelab/shared-abstract-core'
import type { IncomingMessage } from 'http'
import type { NextApiRequest as OriginalNextApiRequest } from 'next'

import type { IDataLoaders } from './dataloader.interface'

export interface GraphQLRequestContext {
  req: NextApiRequest
  user?: Auth0IdToken
}

export interface GqlContext {
  loaders: IDataLoaders
  req?: IncomingMessage
  res: Response
  token?: string
}

interface NextApiRequest extends OriginalNextApiRequest {
  user?: Auth0IdToken
}

export type { NextApiRequest }
