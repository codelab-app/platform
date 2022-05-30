import fs from 'fs'
import path from 'path'
import { importApp } from '../../use-cases/import/import-app'
import { importAtom } from '../../use-cases/import/import-atom'
import { importResource } from '../../use-cases/import/import-resource'
import { importType } from '../../use-cases/import/import-type'
import { ExportedData } from '../export/export.command'

export const importUserData = async (file: string, selectedUser: string) => {
  const json = fs.readFileSync(path.resolve('data', file), 'utf8')
  const { app, atoms, types, resources } = JSON.parse(json) as ExportedData

  await importType(types, selectedUser)

  await importAtom(atoms, selectedUser)

  await importResource(resources, selectedUser)

  await importApp(app ? [app] : [], selectedUser)
}
