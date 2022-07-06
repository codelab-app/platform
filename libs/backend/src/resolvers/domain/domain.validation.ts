import { ForbiddenError, UserInputError } from 'apollo-server-micro'
import { AppOGM } from '../../infra'
import { NextApiRequest } from '../../types'
import { isAdmin, validateAuth } from '../../validations/auth'

export const validateDomainAuth = async (
  req: NextApiRequest,
  appId: string,
) => {
  validateAuth(req)

  if (isAdmin(req)) {
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
