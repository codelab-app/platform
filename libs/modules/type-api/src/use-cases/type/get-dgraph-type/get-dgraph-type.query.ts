import { DgraphQueryBuilder } from '@codelab/backend'
import {
  DgraphArrayType,
  DgraphEnumType,
  DgraphEnumTypeValue,
  DgraphField,
  DgraphInterface,
  DgraphPrimitiveType,
  DgraphTypeFields,
} from '../../../models'

export class GetDgraphTypeQueryBuilder extends DgraphQueryBuilder {
  constructor() {
    super()

    this.withRecurse()
      .withBaseFields()
      .withFields('Atom.label')
      .withModelsFields(DgraphInterface, DgraphField, DgraphEnumTypeValue)
      .withModelFields(DgraphPrimitiveType, { omit: [DgraphTypeFields.name] })
      .withModelFields(DgraphArrayType, { omit: [DgraphTypeFields.name] })
      .withModelFields(DgraphEnumType, { omit: [DgraphTypeFields.name] })
  }
}

export type GetDgraphTypeQueryResult =
  | DgraphInterface
  | DgraphField
  | DgraphPrimitiveType
  | DgraphArrayType
  | DgraphEnumType
  | DgraphEnumTypeValue
