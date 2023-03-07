import { uuidRegex } from '../regex'

/**
 * Names should only be unique under the parent; however, neo4j @unique
 * constraint makes them unique globally. hence we need to append the
 * parent id to allow same name under different parents.
 */
export const createUniqueName = (name: string, prefix: string) =>
  `${prefix}-${name}`

/**
 * To reverse what createUniqueName did.
 */
export const extractName = (uniqueName: string) =>
  uniqueName.replace(uuidRegex, '').substring(1)
