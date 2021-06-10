import {
  BaseDgraphFields,
  DgraphQueryBuilder,
  DgraphQueryField,
} from '@codelab/backend'
import {
  ArrayTypeDgraphFields,
  DgraphArrayType,
  DgraphEnumType,
  DgraphEnumTypeValue,
  DgraphInterface,
  DgraphSimpleType,
  DgraphUnitType,
  EnumTypeDgraphFields,
} from '../../../models'

export class GetTypeQueryBuilder extends DgraphQueryBuilder {
  constructor() {
    super()

    this.withBaseFields()
      .withModelFields(DgraphSimpleType, DgraphUnitType)
      .withFields(
        new DgraphQueryField(ArrayTypeDgraphFields.Type).withBaseInnerFields(),
        new DgraphQueryField(EnumTypeDgraphFields.AllowedValues)
          .withBaseInnerFields()
          .withInnerFields(...DgraphEnumTypeValue.Metadata.queryFields()),
      )
  }
}

export type GetTypeQueryResult =
  | DgraphSimpleType
  | DgraphUnitType
  | Pick<DgraphArrayType, BaseDgraphFields.uid>
  | DgraphEnumType
  | Pick<DgraphInterface, BaseDgraphFields.uid>
