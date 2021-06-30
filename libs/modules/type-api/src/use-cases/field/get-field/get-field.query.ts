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
  DgraphTypeFields,
  InterfaceDgraphFields,
} from '../../../models'

export class GetFieldQueryBuilder extends DgraphQueryBuilder {
  constructor(key?: string, otherFieldFilters: Array<IDgraphQueryFilter> = []) {
    super()

    this.withBaseFields()
      .withRecurse()
      .withModelsFields(
        DgraphField,
        ...allDgraphDecorators,
        DgraphEnumTypeValue,
      )

    // Add all the type fields, but omit the name, because we will get duplicate field error
    allDgraphTypes.forEach((dgraphType) => {
      if (dgraphType === DgraphInterface) {
        // Customize the DgraphInterface field if we have a filter
        if (key || otherFieldFilters) {
          this.withModelFields(DgraphInterface, {
            omit: [InterfaceDgraphFields.Fields, DgraphTypeFields.name],
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
          this.withModelFields(DgraphInterface, {
            omit: [DgraphTypeFields.name],
          })
        }
      } else {
        this.withModelFields(dgraphType, { omit: [DgraphTypeFields.name] })
      }
    })

    this.withFields(DgraphTypeFields.name)
  }
}

export type GetFieldQueryResult =
  | DgraphField
  | DgraphInterface
  | DgraphType
  | DgraphDecorator
  | DgraphEnumType
