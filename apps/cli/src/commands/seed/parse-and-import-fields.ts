import type { ExistingData } from '@codelab/backend/abstract/core'
import { logSection } from '../../shared/utils/log-task'
import { ParserService } from '../../use-cases/seed/parser.service'

/**
 * Return data that has upsert ID ready
 */
export const parseFields = async (
  userId: string,
  existingData: ExistingData,
) => {
  logSection('Parse Interface')

  const parser = new ParserService(userId, existingData)

  return parser.extractFieldData()
}
