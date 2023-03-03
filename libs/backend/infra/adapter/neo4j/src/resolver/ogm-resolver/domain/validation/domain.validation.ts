import type { NextApiRequest } from '@codelab/backend/abstract/types'
import {
  AuthenticationError,
  ForbiddenError,
  UserInputError,
} from 'apollo-server-micro'
import { Repository } from '../../../../infra'

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
    selectionSet: `{
      id
      owner {
        auth0Id
      }
     }`,
    where: { id: appId },
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
