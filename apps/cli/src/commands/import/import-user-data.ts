import 'isomorphic-fetch'
import fs from 'fs'
import path from 'path'
import { importApps } from '../../use-cases/import/import-apps'
import { importAtoms } from '../../use-cases/import/import-atoms'
import { importResources } from '../../use-cases/import/import-resources'
import { importTypes } from '../../use-cases/import/import-types'
import { ExportedData } from '../export/export.types'

export const importUserData = async (file: string, selectedUserId: string) => {
  const json = fs.readFileSync(path.resolve(process.cwd(), file), 'utf8')
  const { apps, atoms, types, resources } = JSON.parse(json) as ExportedData

  await importTypes(types, selectedUserId, (type) => ({ id: type.id }))

  await importAtoms({
    atoms,
    userId: selectedUserId,
    atomWhere: (atom) => ({ id: atom.id }),
    tagWhere: (tag) => ({ id: tag.id }),
  })

  await importResources(resources, selectedUserId)

  await importApps(apps, selectedUserId)
}
