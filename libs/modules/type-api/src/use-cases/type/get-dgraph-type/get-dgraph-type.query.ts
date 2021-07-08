import { DgraphQueryBuilder } from '@codelab/backend'
import {
  DgraphArrayType,
  DgraphEnumType,
  DgraphEnumTypeValue,
  DgraphField,
  DgraphInterface,
  DgraphSimpleType,
  DgraphTypeFields,
} from '../../../models'

export class GetDgraphTypeQueryBuilder extends DgraphQueryBuilder {
  constructor() {
    super()

    this.withRecurse()
      .withBaseFields()
      .withFields('Atom.label')
      .withModelsFields(DgraphInterface, DgraphField, DgraphEnumTypeValue)
      .withModelFields(DgraphSimpleType, { omit: [DgraphTypeFields.name] })
      .withModelFields(DgraphArrayType, { omit: [DgraphTypeFields.name] })
      .withModelFields(DgraphEnumType, { omit: [DgraphTypeFields.name] })
  }
}

export type GetDgraphTypeQueryResult =
  | DgraphInterface
  | DgraphField
  | DgraphSimpleType
  | DgraphArrayType
  | DgraphEnumType
  | DgraphEnumTypeValue
