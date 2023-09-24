/* eslint-disable @nx/enforce-module-boundaries */
import { getSession } from '@auth0/nextjs-auth0'
import type { IUserOutputDto } from '@codelab/backend/abstract/core'
import { importUserData } from '@codelab/backend/application/user'
import type { NextApiHandler } from 'next'

const importApp: NextApiHandler = async (req, res) => {
  try {
    const session = await getSession(req, res)

    if (!session?.user) {
      return res.status(403).send('Not Authenticated')
    }

    const data = JSON.parse(req.body) as IUserOutputDto
    const owner = { auth0Id: session.user.sub }

    await importUserData(data, owner)

    return res.status(200).send(data)
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).send(err.message)
    }

    return res.status(500)
  }
}

export default importApp
