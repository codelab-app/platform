import { DgraphEntityType } from '@codelab/backend/infra'
import { typeDefinitionByTypeKind } from '../../../shared'
import { getTypeQuery } from '../get-type'
import { GetTypesInput, TypesByKindFilter } from './get-types.input'

export const getTypesQuery = ({ byIds, byKind, byName }: GetTypesInput) => {
  const nameFilter = byName ? `match(name, "${byName.name}", 6)` : undefined
  const qb = getTypeQuery(getTypeFilter(byKind), nameFilter)

  if (byIds) {
    qb.setUidsFunc(byIds.typeIds)
  } else {
    qb.setTypeFunc(getTypeFilter(byKind))
  }

  return qb
}

export const getTypeFilter = (filter?: TypesByKindFilter): DgraphEntityType => {
  if (!filter) {
    return DgraphEntityType.Type
  }

  const def = typeDefinitionByTypeKind(filter.kind)

  return def.dgraphType
}
