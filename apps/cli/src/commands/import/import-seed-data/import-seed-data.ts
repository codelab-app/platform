import { fieldRepository } from '@codelab/backend/application'
import { IAtomExport } from '@codelab/shared/abstract/core'
import { createSeedTypesData } from '@codelab/shared/data'
import fs from 'fs'
import { importAtoms } from '../../../use-cases/import/import-atoms'
import { importTags } from '../../../use-cases/import/import-tags'
import { importTypes } from '../../../use-cases/import/import-types'
import {
  createAntDesignAtomsData,
  createAntDesignTagsData,
} from '../../../use-cases/parser/ant-design'
import { ParserService } from '../../../use-cases/parser/parser.service'
import { ExportedData } from '../../export/export.types'

export const importSeedData = async (
  selectedUser: string,
  seedFilePath: string,
) => {
  const json = fs.readFileSync(seedFilePath, 'utf8')
  const { atoms, types, tags } = JSON.parse(json) as Omit<ExportedData, 'app'>

  await importTags(tags, selectedUser)

  // Type must be seeded first, so atom can reference it
  // ID's must be in sync
  await importTypes(types, selectedUser)

  await importAtoms(atoms, selectedUser)
}

/**
 * This is only used once to transform CSV file to our JSON format
 *
 * Once data is in JSON format, we use that to import
 */

export const __seedTagData = async (selectedUser: string) => {
  const tags = await createAntDesignTagsData()
  await importTags(tags, selectedUser)
}

export const __seedAtomData = async (
  selectedUser: string,
  atomsFactory: (atoms: Array<IAtomExport>) => Array<IAtomExport> = (atoms) =>
    atoms,
) => {
  // Seed all primitive types second, in case they already exist, so our ID's don't get mixed up
  await importTypes(createSeedTypesData(), selectedUser)

  const atoms = await createAntDesignAtomsData()
  const transformedAtoms = atomsFactory(atoms)

  // Seed all atoms here second
  await importAtoms(transformedAtoms, selectedUser)

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
