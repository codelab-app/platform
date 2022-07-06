import { Claims } from '@auth0/nextjs-auth0'
import { NextApiRequest as OriginalNextApiRequest } from 'next'

export interface GraphQLRequestContext {
  user?: Claims
  req: NextApiRequest
}

interface NextApiRequest extends OriginalNextApiRequest {
  user?: Claims
}

export type { NextApiRequest }
