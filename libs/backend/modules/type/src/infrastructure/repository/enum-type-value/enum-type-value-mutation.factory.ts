import { DgraphEntityType } from '@codelab/backend/abstract/core'
import {
  BaseMutationFactory,
  NullablePredicates,
  randomBlankNode,
} from '@codelab/backend/infra'
import { IEnumTypeValue } from '@codelab/shared/abstract/core'
import { WithOrder } from '@codelab/shared/abstract/types'
import { Mutation } from 'dgraph-js-http'

// we put the order as a dgraph attribute only (it's not in the domain schema).
// this is because dgraph doesn't keep arrays ordered, and we have to do it manually
export class EnumTypeValueMutationFactory extends BaseMutationFactory<
  IEnumTypeValue & WithOrder
> {
  static readonly ETVNullables: NullablePredicates<IEnumTypeValue> = ['name']

  constructor() {
    super(
      DgraphEntityType.EnumTypeValue,
      EnumTypeValueMutationFactory.ETVNullables,
    )
  }

  forCreate(entity: IEnumTypeValue & WithOrder, uid?: string): Mutation {
    const { id, value, ...data } = entity
    uid = uid || randomBlankNode()

    return {
      setJson: {
        uid,
        'dgraph.type': [DgraphEntityType.EnumTypeValue],
        stringValue: value,
        ...data,
      },
    }
  }
}
