/* eslint-disable @nx/enforce-module-boundaries */
import { ImportAdminDataService } from '@codelab/backend/application/admin'
import { auth0Instance } from '@codelab/shared/infra/auth0'
import type { NextApiHandler } from 'next'
import path from 'path'

/**
 * Used as endpoint for creating Cypress data
 */
const importAdminData: NextApiHandler = async (req, res) => {
  try {
    const session = await auth0Instance().getSession(req, res)

    const importAdminDataService = new ImportAdminDataService(
      path.resolve('../../data/export'),
    )

    if (!session?.user) {
      return res.status(403).send('Not Authenticated')
    }

    const owner = { auth0Id: session.user.sub }

    await importAdminDataService.execute(owner)

    return res.end()
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).send(err.message)
    }
  }

  return res.status(500)
}

export default importAdminData
