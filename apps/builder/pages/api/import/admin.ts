/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import type { ExportedAdminData } from '@codelab/backend/abstract/core'
import { importUserData } from '@codelab/backend/application/user'
import { auth0Instance } from '@codelab/shared/adapter/auth0'
import type { NextApiHandler } from 'next'

const importApp: NextApiHandler = async (req, res) => {
  try {
    const session = await auth0Instance.getSession(req, res)

    if (!session?.user) {
      return res.status(403).send('Not Authenticated')
    }

    const data = JSON.parse(req.body) as ExportedAdminData

    // await importUserData(data, session.user.sub)

    return res.status(200).send(true)
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).send(err.message)
    }

    return res.status(500)
  }
}

export default importApp
