import {
  BaseMutationFactory,
  DgraphEntityType,
  DgraphRepository,
} from '@codelab/backend/infra'
import { IPropMapBinding } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { Mutation } from 'dgraph-js-http'

@Injectable()
export class PropMapBindingMutationFactory extends BaseMutationFactory<IPropMapBinding> {
  constructor() {
    super(DgraphEntityType.PropMapBinding, [
      ['targetElementId', 'targetElement'],
    ])
  }

  public forCreate(entity: IPropMapBinding, uid?: string): Mutation {
    return {
      setJson: {
        uid: uid || entity.id || DgraphRepository.randomBlankNode(),
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
