/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { exportAtoms, exportSystemTypes } from '@codelab/backend/data'
import { saveFormattedFile } from '@codelab/backend/shared/util'
import { auth0Instance } from '@codelab/shared/adapter/auth0'
import { writeFileSync } from 'fs'
import type { NextApiHandler } from 'next'
import path from 'path'

const exportAtom: NextApiHandler = async (req, res) => {
  try {
    const session = await auth0Instance.getSession(req, res)

    if (!session?.user) {
      return res.status(403).send('Not Authenticated')
    }

    /**
     * We need to export system type data first, so other types can reference it
     */
    const systemTypes = await exportSystemTypes()

    const systemTypesOutputPath = path.resolve(
      './data/export/system/types/system-types.json',
    )

    saveFormattedFile(systemTypesOutputPath, systemTypes)

    /**
     * Now we can export atom & associated data such as types/tags
     */

    const { ids } = req.query
    const atomIds = String(ids).split(',')

    const exportedAtoms = await exportAtoms({
      where: {
        id_IN: atomIds,
      },
    })

    exportedAtoms.forEach((atom) => {
      const atomName = atom.name

      const atomsOutputPath = path.resolve(
        `./data/export/admin/atoms/${atomName}.json`,
      )

      saveFormattedFile(atomsOutputPath, atom)
      // res.setHeader('Content-Type', 'application/json')
      // res.setHeader('Content-Disposition', `attachment; filename=${fileName}`)
      // res.write(JSON.stringify(atom), 'utf-8')
    })

    // const appName = exportedApp.apps[0]?.name
    // const userName = session.user.name
    // const fileName = `${userName}-${appName}.json`

    // res.setHeader('Content-Type', 'application/json')
    // res.setHeader('Content-Disposition', `attachment; filename=${fileName}`)
    // res.write(JSON.stringify(exportedApp), 'utf-8')

    return res.end()
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).send(err.message)
    }
  }

  return res.status(500)
}

export default exportAtom
