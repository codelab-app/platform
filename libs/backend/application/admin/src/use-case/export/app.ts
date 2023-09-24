// eslint-disable-next-line @nx/enforce-module-boundaries
import { getSession } from '@auth0/nextjs-auth0'
import type { NextApiHandler } from 'next'

const exportApp: NextApiHandler = async (req, res) => {
  try {
    const session = await getSession(req, res)

    if (!session?.user) {
      return res.status(403).send('Not Authenticated')
    }

    const { id } = req.query
    const owner = { auth0Id: session.user.sub }
    const exportedApp = await exportUserData({ id: String(id) }, owner)
    const appName = exportedApp.apps[0]?.name
    const userName = session.user.name
    const filename = `${userName}-${appName}.json`

    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`)
    res.write(JSON.stringify(exportedApp), 'utf-8')

    return res.end()
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).send(err.message)
    }
  }

  return res.status(500)
}

export default exportApp
