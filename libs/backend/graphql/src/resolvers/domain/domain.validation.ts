import { AppOGM } from '@codelab/backend/adapter/neo4j'
import { NextApiRequest } from '@codelab/backend/application'
import { isAdminSession } from '@codelab/shared/abstract/core'
import {
  AuthenticationError,
  ForbiddenError,
  UserInputError,
} from 'apollo-server-micro'

export const validateDomainAuth = async (
  req: NextApiRequest,
  appId: string,
) => {
  if (!req.user) {
    throw new AuthenticationError('')
  }

  // admin can access all data
  if (isAdminSession(req.user)) {
    return
  }

  const appOgm = await AppOGM()

  const apps = await appOgm.find({
    where: { id: appId },
    selectionSet: `{
      owner {
        auth0Id
      }
      id
     }`,
  })

  const app = apps?.[0]

  if (!app) {
    throw new UserInputError(`App ${appId} not found`)
  }

  const auth0Id = req.user?.sub

  if (app.owner.auth0Id !== auth0Id) {
    throw new ForbiddenError('')
  }

  return app
}
