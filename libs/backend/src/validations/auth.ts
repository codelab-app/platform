import { IRole, JWT_CLAIMS } from '@codelab/shared/abstract/core'
import { AuthenticationError } from 'apollo-server-micro'
import { NextApiRequest } from '../types'

export const validateAuth = (req: NextApiRequest) => {
  if (!req.user) {
    throw new AuthenticationError('')
  }
}

export const isAdmin = (req: NextApiRequest) => {
  const roles = (req.user?.[JWT_CLAIMS].roles || []) as Array<string>

  return roles.includes(IRole.Admin)
}
