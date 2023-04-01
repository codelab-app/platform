/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { User, UserRepository } from '@codelab/backend/domain/user'
import type { Auth0SessionUser } from '@codelab/shared/abstract/core'
import { auth0Instance } from '@codelab/shared/adapter/auth0'
import { EnvBuilder } from '@codelab/shared/env'
import type { NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
  /**
   * Requires `headers.cookie` to be set by client
   */
  const session = await auth0Instance.getSession(req, res)

  Object.assign(req, { user: session?.user })

  const accessToken = (
    await auth0Instance.getAccessToken(req, res, {
      scopes: EnvBuilder().auth0.scopes,
    })
  ).accessToken

  /**
   * Instead of appending headers to the frontend GraphQL client, we could access session here in serverless then append at the middleware level
   */
  if (accessToken) {
    req.headers.authorization = `Bearer ${accessToken}`
  }

  if (session?.user) {
    const userSession = session.user as Auth0SessionUser
    const userRepository = new UserRepository()
    const user = User.fromSession(userSession)

    console.log('Upsert user', user)

    await userRepository.save(user, { auth0Id: user.auth0Id })
  }

  res.status(200).json({ status: 'ok' })
}

export default handler
