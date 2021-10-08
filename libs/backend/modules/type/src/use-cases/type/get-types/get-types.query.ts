import { DgraphEntityType } from '@codelab/backend/infra'
import { GetTypesInput } from './get-types.input'

/**
 * Based on current user role, we fetch differently.
 *
 * If current user role is admin -> get only types without any owner
 *
 * If current user role is user -> get types without any owner + types from current user
 */
export const getUserTypesQuery = (
  input: GetTypesInput | undefined = {},
  userId: string,
  queryName = 'query',
) => {
  const { byIds, byKind, byName } = input
  const ownerFilter = `((NOT has(owner)) OR uid_in(owner, ${userId}))`
  const nameFilter = byName ? `match(name, "${byName.name}", 6)` : undefined
  const byIdsFilter = byIds ? `uid(${byIds.typeIds.join(',')})` : undefined
  const byKindFilter = byKind ? `eq(typeKind, "${byKind.kind}")` : undefined

  const filters = [nameFilter, byIdsFilter, byKindFilter, ownerFilter]
    .filter((f) => !!f)
    .join(' AND ')

  return `{
        ${queryName}(func: type(${DgraphEntityType.Type})) @filter(${filters}) @recurse {
          id: uid
            expand(Type, Field)
            value: stringValue
        }
      }`
}

export const getAdminTypesQuery = (
  input: GetTypesInput | undefined = {},
  queryName = 'query',
) => {
  const { byIds, byKind, byName } = input
  const doesntHaveOwnerFilter = `NOT has(owner)`
  const nameFilter = byName ? `match(name, "${byName.name}", 6)` : undefined
  const byIdsFilter = byIds ? `uid(${byIds.typeIds.join(',')})` : undefined
  const byKindFilter = byKind ? `eq(typeKind, "${byKind.kind}")` : undefined

  const filters = [nameFilter, byIdsFilter, byKindFilter, doesntHaveOwnerFilter]
    .filter((f) => !!f)
    .join(' AND ')

  return `{
        ${queryName}(func: type(${DgraphEntityType.Type})) @filter(${filters}) @recurse {
          id: uid
          expand(Type, Field)
          value: stringValue
        }
      }`
}
