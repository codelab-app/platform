import { DgraphQueryBuilder } from '@codelab/backend'
import { DgraphEnumTypeValue, DgraphField } from '@codelab/modules/type-api'
import {
  DgraphArrayValue,
  DgraphBooleanValue,
  DgraphFloatValue,
  DgraphInterfaceValue,
  DgraphIntValue,
  DgraphProp,
  DgraphStringValue,
} from '../../models'

export class GetPropsQueryBuilder extends DgraphQueryBuilder {
  constructor() {
    super()
    this.withBaseFields()
      .withRecurse()
      .withModelsFields(
        DgraphProp,
        DgraphField,
        DgraphStringValue,
        DgraphIntValue,
        DgraphFloatValue,
        DgraphBooleanValue,
        DgraphArrayValue,
        DgraphInterfaceValue,
        DgraphEnumTypeValue,
      )
  }
}

export type GetPropsQueryResult = DgraphProp &
  DgraphField &
  DgraphStringValue &
  DgraphIntValue &
  DgraphFloatValue &
  DgraphBooleanValue &
  DgraphArrayValue &
  DgraphInterfaceValue &
  DgraphEnumTypeValue
