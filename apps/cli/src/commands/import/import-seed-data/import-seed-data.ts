import { fieldRepository } from '@codelab/backend'
import { createSeedTypesData } from '@codelab/shared/data'
import fs from 'fs'
import { flow } from 'lodash'
import { importAtom } from '../../../use-cases/import/import-atom'
import { importTags } from '../../../use-cases/import/import-tags'
import { importType } from '../../../use-cases/import/import-type'
import {
  createAntDesignAtomsData,
  createAntDesignTagsData,
} from '../../../use-cases/parser/ant-design'
import { ParserService } from '../../../use-cases/parser/parser.service'
import type { ExportedData } from '../../export/export.command'
import { addAntdAtomIcons } from './add-antd-atoms-icons'
import { addAntdTags } from './add-antd-tags'

export const importSeedData = async (
  selectedUser: string,
  seedFilePath: string,
) => {
  const json = fs.readFileSync(seedFilePath, 'utf8')
  const { atoms, types, tags } = JSON.parse(json) as Omit<ExportedData, 'app'>

  await importTags(tags, selectedUser)

  // Type must be seeded first, so atom can reference it
  // ID's must be in sync
  await importType(types, selectedUser)

  await importAtom(atoms, selectedUser)
}

/**
 * This is only used once to transform CSV file to our JSON format
 *
 * Once data is in JSON format, we use that to import
 */
export const __seedData = async (selectedUser: string) => {
  const tags = await createAntDesignTagsData()
  await importTags(tags, selectedUser)
  // Seed all primitive types second, in case they already exist, so our ID's don't get mixed up
  await importType(createSeedTypesData(), selectedUser)

  const atoms = await createAntDesignAtomsData()
  const transformedAtoms = flow(addAntdTags, addAntdAtomIcons)(atoms)

  // Seed all atoms here second
  await importAtom(transformedAtoms, selectedUser)

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
