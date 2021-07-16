import {
  DgraphEntityType,
  DgraphQueryBuilder,
  EqFilter,
} from '@codelab/backend'

/** Base GetType query, without any func */
export const getTypeQuery = (specificType?: DgraphEntityType) => {
  const filter = EqFilter.dgraphType(DgraphEntityType.Type)

  if (specificType && specificType !== DgraphEntityType.Type) {
    filter.and(EqFilter.dgraphType(specificType))
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
    `)
}
