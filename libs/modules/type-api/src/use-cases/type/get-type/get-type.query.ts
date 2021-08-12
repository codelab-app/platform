import {
  DgraphEntityType,
  DgraphFilter,
  DgraphQueryBuilder,
  EqFilter,
} from '@codelab/backend'

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

  return new DgraphQueryBuilder()
    .addFilterDirective(filter)
    .addRecurseDirective()
    .addBaseFields().addFields(`
      name
      primitiveKind
      itemType
      stringValue
      allowedValues
      fields
      type
      key
      description
      kind
    `)
}
