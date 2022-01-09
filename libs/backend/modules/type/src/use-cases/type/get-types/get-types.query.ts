import { DgraphEntityType } from '@codelab/backend/infra'
import { IType, TypeKind } from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import { GetTypesInput } from './get-types.input'

/**
 * Based on current user role, we fetch differently.
 *
 * If current user role is admin -> get only types without any owner
 *
 * If current user role is user -> get types without any owner + types from current user
 */
export const getUserTypesQuery = (
  input: Maybe<GetTypesInput> = {},
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
  input: Maybe<GetTypesInput> = {},
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

export const mapType = (
  dgraphType: IType & { typesOfUnionType?: Array<{ id: string }> },
): IType => {
  if (dgraphType.typeKind !== TypeKind.UnionType) {
    return dgraphType
  }

  return {
    ...dgraphType,
    typeIdsOfUnionType:
      dgraphType.typesOfUnionType?.map(({ id }: { id: string }) => id) ?? [],
  }
}
