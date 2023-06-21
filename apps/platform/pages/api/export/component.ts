/* eslint-disable @nx/enforce-module-boundaries */
import { ExportAdminDataService } from '@codelab/backend/application/admin'
import { auth0Instance } from '@codelab/shared/infra/auth0'
import type { NextApiHandler } from 'next'

const exportComponent: NextApiHandler = async (req, res) => {
  try {
    const session = await auth0Instance().getSession(req, res)

    if (!session?.user) {
      return res.status(403).send('Not Authenticated')
    }

    const { id } = req.query

    await new ExportAdminDataService().exportComponent(String(id))

    return res.end()
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).send(error.message)
    }

    return res.status(500)
  }
}

export default exportComponent
