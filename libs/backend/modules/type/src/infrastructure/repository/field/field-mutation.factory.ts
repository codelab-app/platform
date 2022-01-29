import { DgraphEntityType } from '@codelab/backend/abstract/core'
import {
  BaseMutationFactory,
  NullablePredicates,
  randomBlankNode,
} from '@codelab/backend/infra'
import { IField } from '@codelab/shared/abstract/core'
import { WithOrder } from '@codelab/shared/abstract/types'
import { Mutation } from 'dgraph-js-http'

// we put the order as a dgraph attribute only (it's not in the domain schema).
// this is because dgraph doesn't keep arrays ordered, and we have to do it manually
export class FieldMutationFactory extends BaseMutationFactory<
  IField & WithOrder
> {
  static readonly FieldNullables: NullablePredicates<IField> = [
    'name',
    'description',
  ]

  constructor() {
    super(DgraphEntityType.Field, FieldMutationFactory.FieldNullables)
  }

  forCreate(entity: IField & WithOrder, uid?: string): Mutation {
    const { id, target, source, ...data } = entity
    uid = uid || randomBlankNode()

    return {
      setJson: {
        uid,
        'dgraph.type': DgraphEntityType.Field,
        type: { uid: target },
        ...data,
      },
    }
  }
}
