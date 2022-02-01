import { DgraphEntityType } from '@codelab/backend/abstract/core'
import {
  BaseMutationFactory,
  NullablePredicates,
  randomBlankNode,
} from '@codelab/backend/infra'
import { IPropMapBinding } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { Mutation } from 'dgraph-js-http'

@Injectable()
export class PropMapBindingMutationFactory extends BaseMutationFactory<IPropMapBinding> {
  public readonly entityType = DgraphEntityType.PropMapBinding

  public readonly nullablePredicates: NullablePredicates<IPropMapBinding> = [
    'targetElementId',
    'targetElement',
  ]

  public forCreate(entity: IPropMapBinding, uid?: string): Mutation {
    return {
      setJson: {
        uid: uid || entity.id || randomBlankNode(),
        'dgraph.type': [DgraphEntityType.PropMapBinding],
        targetElement: entity.targetElementId
          ? { uid: entity.targetElementId }
          : null,
        targetKey: entity.targetKey,
        sourceKey: entity.sourceKey,
      },
    }
  }
}
