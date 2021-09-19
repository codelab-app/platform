import { DgraphEntityType } from '@codelab/backend/infra'
import { typeDefinitionByTypeKind } from '../../../domain/type-definition-by-type-kind'
import { getTypeQuery } from '../get-type'
import { GetTypesInput, TypesByKindFilter } from './get-types.input'

/**
 * Based on current user role, we fetch differently.
 *
 * If current user role is admin -> get only types without any owner
 *
 * If current user role is user -> get types without any owner + types from current user
 */
export const getTypesQuery = (input: GetTypesInput, userId: string | null) => {
  const { byIds, byKind, byName } = input

  const nameFilter = byName
    ? `match(name, "${byName.name}", 6) AND eq(owner, ${userId})`
    : `eq(owner, ${userId})`

  const qb = getTypeQuery(getType(byKind), nameFilter)

  if (byIds) {
    qb.setUidsFunc(byIds.typeIds)
  } else {
    qb.setTypeFunc(getType(byKind))
  }

  return qb
}

export const getType = (filter?: TypesByKindFilter): DgraphEntityType => {
  if (!filter) {
    return DgraphEntityType.Type
  }

  const def = typeDefinitionByTypeKind(filter.kind)

  return def.dgraphType
}
