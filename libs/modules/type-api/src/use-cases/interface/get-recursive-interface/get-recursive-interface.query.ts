import { DgraphQueryBuilder } from '@codelab/backend'
import {
  DgraphArrayLengthValidator,
  DgraphArrayType,
  DgraphEnumType,
  DgraphEnumTypeValue,
  DgraphField,
  DgraphInterface,
  DgraphMinMaxValidator,
  DgraphRequiredValidator,
  DgraphSimpleType,
  DgraphTypeFields,
} from '../../../models'

export class GetInterfaceQueryBuilder extends DgraphQueryBuilder {
  constructor() {
    super()

    this.withRecurse()
      .withBaseFields()
      .withModelsFields(
        DgraphInterface,
        DgraphField,

        DgraphEnumTypeValue,
        DgraphArrayLengthValidator,
        DgraphMinMaxValidator,
        DgraphRequiredValidator,
      )
      .withModelFields(DgraphSimpleType, { omit: [DgraphTypeFields.name] })
      .withModelFields(DgraphArrayType, { omit: [DgraphTypeFields.name] })
      .withModelFields(DgraphEnumType, { omit: [DgraphTypeFields.name] })
  }
}

export type GetInterfaceQueryResult =
  | DgraphInterface
  | DgraphField
  | DgraphSimpleType
  | DgraphArrayType
  | DgraphEnumType
  | DgraphEnumTypeValue
  | DgraphArrayLengthValidator
  | DgraphMinMaxValidator
  | DgraphRequiredValidator
