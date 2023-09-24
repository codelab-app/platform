/* eslint-disable @nx/enforce-module-boundaries */
import { getSession } from '@auth0/nextjs-auth0'
import { ExportAdminDataService } from '@codelab/backend/application/admin'
import type { NextApiHandler } from 'next'

const exportComponent: NextApiHandler = async (req, res) => {
  try {
    const session = await getSession(req, res)

    if (!session?.user) {
      return res.status(403).send('Not Authenticated')
    }

    const { id } = req.query

    const componentData = await new ExportAdminDataService().exportComponent(
      String(id),
    )

    const componentName = componentData.component.name
    const filename = `${componentName}.json`

    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`)
    res.write(JSON.stringify(componentData), 'utf-8')

    return res.end()
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).send(error.message)
    }

    return res.status(500)
  }
}

export default exportComponent
