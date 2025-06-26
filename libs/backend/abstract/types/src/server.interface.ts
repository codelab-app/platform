import type { Auth0IdToken } from '@codelab/shared-abstract-core'
import type { IncomingMessage } from 'http'
import type { NextApiRequest as OriginalNextApiRequest } from 'next'
import type { IDataLoaders } from '@codelab/backend-infra-adapter-graphql'

export interface GraphQLRequestContext {
  req: NextApiRequest
  user?: Auth0IdToken
}

export interface GqlContext {
  req?: IncomingMessage
  res: Response
  token?: string
  loaders: IDataLoaders
}

interface NextApiRequest extends OriginalNextApiRequest {
  user?: Auth0IdToken
}

export type { NextApiRequest }
