import { fieldRepository } from '@codelab/backend/application'
import { IAtomExport } from '@codelab/shared/abstract/core'
import { createSeedTypesData } from '@codelab/shared/data'
import { importAtomsById } from '../../use-cases/import/import-atoms'
import { importTags } from '../../use-cases/import/import-tags'
import { importTypesById } from '../../use-cases/import/import-types'
import {
  createAntDesignAtomsData,
  createAntDesignTagsData,
} from '../../use-cases/parser/ant-design'
import { ParserService } from '../../use-cases/parser/parser.service'

/**
 * This is only used once to transform CSV file to our JSON format
 *
 * Once data is in JSON format, we use that to import
 */

export const parseTagData = async (selectedUser: string) => {
  const tags = await createAntDesignTagsData()
  await importTags(tags, selectedUser)
}

/**
 * This function generates new data, so we upsert by name instead of ID
 */
export const parseCsvData = async (
  selectedUser: string,
  atomsFactory: (atoms: Array<IAtomExport>) => Array<IAtomExport> = (atoms) =>
    atoms,
) => {
  // Seed all primitive types second, in case they already exist, so our ID's don't get mixed up
  await importTypesById(createSeedTypesData(), selectedUser)

  const atoms = await createAntDesignAtomsData()
  const transformedAtoms = atomsFactory(atoms)

  // Seed all atoms here second
  await importAtomsById(transformedAtoms, selectedUser)

  // Then seed all atom api's
  const parser = new ParserService(selectedUser)
  const parsedData = await parser.extractFields()

  for await (const { atom, fields } of parsedData) {
    for await (const field of fields) {
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
