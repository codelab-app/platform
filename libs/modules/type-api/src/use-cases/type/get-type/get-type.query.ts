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
  DgraphTypeFields,
  EnumTypeDgraphFields,
} from '../../../models'

export class GetTypeQueryBuilder extends DgraphQueryBuilder {
  constructor() {
    super()

    this.withBaseFields()
      .withModelsFields(DgraphSimpleType)
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
  | Pick<DgraphArrayType, BaseDgraphFields.uid>
  | DgraphEnumType
  | Pick<DgraphInterface, BaseDgraphFields.uid | DgraphTypeFields.name>
