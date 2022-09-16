import 'isomorphic-fetch'
import fs from 'fs'
import path from 'path'
import { importApps } from '../../use-cases/import/import-apps'
import { importAtomsById } from '../../use-cases/import/import-atoms'
import { importResources } from '../../use-cases/import/import-resources'
import { importTypesById } from '../../use-cases/import/import-types'
import { ExportedData } from '../export/export.types'

export const importUserData = async (file: string, selectedUser: string) => {
  const json = fs.readFileSync(path.resolve(process.cwd(), file), 'utf8')
  const { apps, atoms, types, resources } = JSON.parse(json) as ExportedData

  await importTypesById(types, selectedUser)

  await importAtomsById(atoms, selectedUser)

  await importResources(resources, selectedUser)

  await importApps(apps, selectedUser)
}
