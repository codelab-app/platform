import {
  DgraphEntityType,
  DgraphFilter,
  DgraphQueryBuilder,
  EqFilter,
} from '@codelab/backend/infra'

/** Base GetType query, without any func */
export const getTypeQuery = (
  specificType?: DgraphEntityType,
  andFilter?: DgraphFilter | string,
) => {
  const filter = EqFilter.dgraphType(DgraphEntityType.Type)

  if (specificType && specificType !== DgraphEntityType.Type) {
    filter.and(EqFilter.dgraphType(specificType))
  }

  if (andFilter) {
    filter.and(andFilter)
  }

  return baseTypeQuery().addFilterDirective(filter)
}

export const baseTypeQuery = () => {
  return new DgraphQueryBuilder().addRecurseDirective().addBaseFields()
    .addFields(`
      name
      primitiveKind
      itemType
      stringValue
      allowedValues
      typesOfUnionType
      tags
      fields
      type
      key
      description
      kind
    `)
}
