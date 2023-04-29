/* eslint-disable @nx/enforce-module-boundaries */
import type { IUserDataExport } from '@codelab/backend/abstract/core'
import { importUserData } from '@codelab/backend/application/user'
import { auth0Instance } from '@codelab/shared/infra/auth0'
import type { NextApiHandler } from 'next'

const importApp: NextApiHandler = async (req, res) => {
  try {
    const session = await auth0Instance.getSession(req, res)

    if (!session?.user) {
      return res.status(403).send('Not Authenticated')
    }

    const data = JSON.parse(req.body) as IUserDataExport
    const owner = { auth0Id: session.user.sub }

    await importUserData(data, owner)

    return res.status(200).send(true)
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).send(err.message)
    }

    return res.status(500)
  }
}

export default importApp
