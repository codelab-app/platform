/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { exportAtoms } from '@codelab/backend/application/atom'
import { exportTags } from '@codelab/backend/application/tag'
import {
  exportAdminInterfaceTypes,
  exportAdminTypes,
  exportSystemTypes,
} from '@codelab/backend/application/type'
import { saveFormattedFile } from '@codelab/backend/shared/util'
import { auth0Instance } from '@codelab/shared/adapter/auth0'
import find from 'lodash/find'
import type { NextApiHandler } from 'next'
import path from 'path'

const exportAdminData: NextApiHandler = async (req, res) => {
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

    const { ids } = req.query
    const atomIds = String(ids).split(',')

    /**
     * Atoms
     */
    const atoms = await exportAtoms({
      where: {
        id_IN: atomIds,
      },
    })

    const api = await exportAdminInterfaceTypes()

    await Promise.all(
      atoms.map(async (atom) => {
        const atomName = atom.name

        const atomsOutputPath = path.resolve(
          `./data/export/admin/atoms/${atomName}.json`,
        )

        /**
         * Get the interface by id
         */
        const type = find(api, { id: atom.api.id })
        const types = await exportAdminTypes({ apiId: atom.api.id })

        saveFormattedFile(atomsOutputPath, {
          atom,
          api: type,
          types,
        })
      }),
    )

    /**
     * Tags
     */
    const tags = await exportTags()
    const tagsOutputPath = path.resolve('./data/export/admin/tags/tags.json')

    saveFormattedFile(tagsOutputPath, { tags })

    return res.end()
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).send(err.message)
    }
  }

  return res.status(500)
}

export default exportAdminData
