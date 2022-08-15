import { fieldRepository } from '@codelab/backend'
import { createSeedTypesData } from '@codelab/shared/data'
import fs from 'fs'
import { flow } from 'lodash'
import path from 'path'
import { builderComponentUsecaseTag } from '../../../data/tag'
import { importAtom } from '../../../use-cases/import/import-atom'
import { importTags } from '../../../use-cases/import/import-tags'
import { importType } from '../../../use-cases/import/import-type'
import { createAntDesignAtomsData } from '../../../use-cases/parser/ant-design'
import { ParserService } from '../../../use-cases/parser/parser.service'
import type { ExportedData } from '../../export/export.command'
import { addAntdUsecaseTags } from './add-antd-usecase-tags'

export const seedFilePath = path.resolve('data', 'seed-data.json')

export const importSeedData = async (selectedUser: string) => {
  if (!seedFilePath) {
    throw new Error('Seed file must be present')
  }

  const json = fs.readFileSync(path.resolve('data', seedFilePath), 'utf8')
  const { atoms, types } = JSON.parse(json) as Omit<ExportedData, 'app'>

  await importTags([builderComponentUsecaseTag], selectedUser)

  // Type must be seeded first, so atom can reference it
  // ID's must be in sync
  await importType(types, selectedUser)

  const atomFactory = flow(addAntdUsecaseTags)

  await importAtom(atomFactory(atoms), selectedUser)
}

/**
 * This is only used once to transform CSV file to our JSON format
 *
 * Once data is in JSON format, we use that to import
 */
export const __seedData = async (selectedUser: string) => {
  // Seed all primitive types second, in case they already exist, so our ID's don't get mixed up
  await importType(createSeedTypesData(), selectedUser)

  // Seed all atoms here second
  await importAtom(await createAntDesignAtomsData(), selectedUser)

  // Then seed all atom api's
  const parser = new ParserService(selectedUser)
  const parsedData = await parser.extractFields()

  for (const { atom, fields } of parsedData) {
    for (const field of fields) {
      if (!atom?.api?.id) {
        continue
      }

      await fieldRepository.upsertField({
        interfaceTypeId: atom?.api?.id,
        fieldTypeId: field.fieldType,
        field: {
          id: field.id,
          name: field.name,
          key: field.key,
          description: field.description,
        },
      })
    }
  }
}
