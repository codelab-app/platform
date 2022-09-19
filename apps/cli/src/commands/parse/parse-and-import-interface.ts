import { fieldRepository } from '@codelab/backend/application'
import { ParserService } from '../../use-cases/parser/parser.service'

/**
 * This function generates new data, so we upsert by name instead of ID
 */
export const parseAndImportInterface = async (selectedUser: string) => {
  console.log('---------PARSE AND IMPORT--------------------')

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
