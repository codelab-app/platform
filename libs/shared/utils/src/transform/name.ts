import { uuidRegex } from '../regex'

/**
 * To reverse what createUniqueName did.
 */
export const extractName = (uniqueName: string) =>
  uniqueName.replace(uuidRegex, '').substring(1)
