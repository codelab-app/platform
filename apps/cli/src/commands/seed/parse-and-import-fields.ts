import { fieldRepository } from '@codelab/backend/application'
import { logger } from '@codelab/shared/adapter/logging'
import { logSection } from '../../shared/utils/log-task'
import { createExistingData } from '../../use-cases/seed/data/ant-design.data'
import { ParserService } from '../../use-cases/seed/parser.service'

/**
 * This function generates new data, so we upsert by name instead of ID
 */
export const parseAndImportFields = async (selectedUser: string) => {
  logSection('Parse Interface')

  // Then seed all atom api's
  const parser = new ParserService(selectedUser, await createExistingData())
  const parsedData = await parser.extractMappedFields()

  logSection('Import Interface')

  for await (const { atom, fields } of parsedData) {
    logger.info('Import Field', { atom, fields })

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
