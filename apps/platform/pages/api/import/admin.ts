/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import type { IAdminDataExport } from '@codelab/backend/abstract/core'
import { auth0Instance } from '@codelab/shared/infra/auth0'
import type { NextApiHandler } from 'next'

const importApp: NextApiHandler = async (req, res) => {
  try {
    const session = await auth0Instance.getSession(req, res)

    if (!session?.user) {
      return res.status(403).send('Not Authenticated')
    }

    const data = JSON.parse(req.body) as IAdminDataExport

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
