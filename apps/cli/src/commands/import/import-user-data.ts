import 'isomorphic-fetch'
import type { ExportedData } from '@codelab/backend/abstract/core'
import fs from 'fs'
import path from 'path'
import { importApps } from '../../use-cases/import/import-apps'
import { importResources } from '../../use-cases/import/import-resources'
import { importTypes } from '../../use-cases/import/import-types'

export const importUserData = async (file: string, userId: string) => {
  const json = fs.readFileSync(path.resolve(process.cwd(), file), 'utf8')
  const { apps, atoms, types, resources } = JSON.parse(json) as ExportedData

  await importTypes(types, userId, (type) => ({ id: type.id }))

  // await importAtoms({
  //   atoms,
  //   userId: selectedUserId,
  //   atomWhere: (atom) => ({ id: atom.id }),
  //   tagWhere: (tag) => ({ id: tag.id }),
  // })

  await importResources(resources, userId)

  await importApps(apps, userId)
}
