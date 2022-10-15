import { NextApiRequest } from '@codelab/backend/abstract/types'
import { Repository } from '@codelab/backend/infra/adapter/neo4j'
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

  // // admin can access all data
  // if (isAdminSession(req.user)) {
  //   return
  // }

  const App = await Repository.instance.App

  const apps = await App.find({
    where: { id: appId },
    selectionSet: `{
      owner {
        auth0Id
      }
      id
     }`,
  })

  const app = apps[0]

  if (!app) {
    throw new UserInputError(`App ${appId} not found`)
  }

  const auth0Id = req.user.sub

  if (app.owner.auth0Id !== auth0Id) {
    throw new ForbiddenError('')
  }

  return app
}
