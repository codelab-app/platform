// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { auth0Instance } from '@codelab/shared/adapter/auth0'
import type { NextApiHandler } from 'next'

/**
 * Used as endpoint for creating Cypress data
 */
const createApp: NextApiHandler = async (req, res) => {
  try {
    const session = await auth0Instance.getSession(req, res)

    if (!session?.user) {
      return res.status(403).send('Not Authenticated')
    }

    // const appRepository = new AppRe

    return res.end()
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).send(err.message)
    }
  }

  return res.status(500)
}

export default createApp
