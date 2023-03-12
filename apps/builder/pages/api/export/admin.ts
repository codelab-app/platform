/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { ExportAdminDataService } from '@codelab/backend/application/admin'
import { auth0Instance } from '@codelab/shared/adapter/auth0'
import type { NextApiHandler } from 'next'

const exportAdminData: NextApiHandler = async (req, res) => {
  try {
    const session = await auth0Instance.getSession(req, res)

    if (!session?.user) {
      return res.status(403).send('Not Authenticated')
    }

    // const { ids } = req.query
    // const atomIds = String(ids).split(',')

    // Export all atoms here
    await new ExportAdminDataService().execute()

    return res.end()
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).send(err.message)
    }
  }

  return res.status(500)
}

export default exportAdminData
