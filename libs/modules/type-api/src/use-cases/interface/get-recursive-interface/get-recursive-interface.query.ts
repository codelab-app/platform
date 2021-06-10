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
  DgraphUnitType,
} from '../../../models'

export class GetInterfaceQueryBuilder extends DgraphQueryBuilder {
  constructor() {
    super()

    this.withRecurse()
      .withBaseFields()
      .withModelFields(
        DgraphInterface,
        DgraphField,
        DgraphSimpleType,
        DgraphArrayType,
        DgraphEnumType,
        DgraphEnumTypeValue,
        DgraphUnitType,
        DgraphArrayLengthValidator,
        DgraphMinMaxValidator,
        DgraphRequiredValidator,
      )
  }
}

export type GetInterfaceQueryResult =
  | DgraphInterface
  | DgraphField
  | DgraphSimpleType
  | DgraphArrayType
  | DgraphEnumType
  | DgraphEnumTypeValue
  | DgraphUnitType
  | DgraphArrayLengthValidator
  | DgraphMinMaxValidator
  | DgraphRequiredValidator
