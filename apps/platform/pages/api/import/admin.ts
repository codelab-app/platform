/* eslint-disable @nx/enforce-module-boundaries */
import { auth0Instance } from '@codelab/shared/infra/auth0'
import type { NextApiHandler } from 'next'

const importAdminData: NextApiHandler = async (req, res) => {
  try {
    const session = await auth0Instance.getSession(req, res)

    if (!session?.user) {
      return res.status(403).send('Not Authenticated')
    }

    const owner = { auth0Id: session.user.sub }
    // const data = JSON.parse(req.body) as IAdminDataExport

    // await new ImportAdminDataService().execute(owner)

    return res.status(200).send(true)
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).send(err.message)
    }

    return res.status(500)
  }
}

export default importAdminData
