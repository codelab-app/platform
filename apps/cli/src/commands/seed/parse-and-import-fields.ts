import { fieldRepository } from '@codelab/backend/application'
import { ExistingData } from '@codelab/shared/abstract/core'
import { logger } from '@codelab/shared/adapter/logging'
import { logSection } from '../../shared/utils/log-task'
import { ParserService } from '../../use-cases/seed/parser.service'

/**
 * This function generates new data, so we upsert by name instead of ID
 */
export const parseAndImportFields = async (
  userId: string,
  existingData: ExistingData,
) => {
  logSection('Parse Interface')

  // Then seed all atom api's
  const parser = new ParserService(userId, existingData)
  const fieldDataByApiName = await parser.extractFieldDataByApiName()

  logSection('Import Interface')

  for await (const [atom, fields] of fieldDataByApiName.entries()) {
    for await (const field of fields) {
      logger.info('Upsert Field', { field })

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
