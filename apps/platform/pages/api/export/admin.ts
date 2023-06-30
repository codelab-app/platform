/* eslint-disable canonical/sort-keys */
/* eslint-disable @nx/enforce-module-boundaries */
import { ExportAdminDataService } from '@codelab/backend/application/admin'
import { auth0Instance } from '@codelab/shared/infra/auth0'
import AdmZip from 'adm-zip'
import type { NextApiHandler } from 'next'
import path from 'path'

const exportAdminData: NextApiHandler = async (req, res) => {
  try {
    const session = await auth0Instance().getSession(req, res)

    if (!session?.user) {
      return res.status(403).send('Not Authenticated')
    }

    const baseExportPath = path.resolve('./tmp/data/export')

    ;(await new ExportAdminDataService(baseExportPath).execute()).saveAsFiles()

    // Create zip
    const zip = new AdmZip()
    const filename = `admin-export-data-${Date.now()}.tgz`
    zip.addLocalFolder(baseExportPath)

    res.setHeader('Content-Type', 'application/zip')
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`)

    return res.send(zip.toBuffer())
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).send(err.message)
    }
  }

  return res.status(500)
}

export default exportAdminData
