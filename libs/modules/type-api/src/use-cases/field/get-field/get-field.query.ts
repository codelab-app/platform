import {
  DgraphQueryBuilder,
  DgraphQueryField,
  EqFilter,
  IDgraphQueryFilter,
} from '@codelab/backend'
import {
  allDgraphDecorators,
  allDgraphTypes,
  DgraphDecorator,
  DgraphEnumType,
  DgraphEnumTypeValue,
  DgraphField,
  DgraphInterface,
  DgraphType,
  InterfaceDgraphFields,
} from '../../../models'

export class GetFieldQueryBuilder extends DgraphQueryBuilder {
  constructor(key?: string, otherFieldFilters: Array<IDgraphQueryFilter> = []) {
    super()

    this.withBaseFields()
      .withRecurse()
      .withModelsFields(
        DgraphField,
        ...allDgraphTypes.filter((t) => t !== DgraphInterface),
        ...allDgraphDecorators,
        DgraphEnumTypeValue,
      )

    if (key || otherFieldFilters) {
      this.withModelFields(DgraphInterface, {
        omit: [InterfaceDgraphFields.Fields],
      })

      const fieldsField = new DgraphQueryField(InterfaceDgraphFields.Fields)

      if (key) {
        fieldsField.withFilters(new EqFilter(DgraphField.Fields.Key, key))
      }

      if (otherFieldFilters) {
        fieldsField.withFilters(...otherFieldFilters)
      }

      this.withFields(fieldsField)
    } else {
      this.withModelFields(DgraphInterface)
    }
  }
}

export type GetFieldQueryResult =
  | DgraphField
  | DgraphInterface
  | DgraphType
  | DgraphDecorator
  | DgraphEnumType
