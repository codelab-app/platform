import { CreateResponsePort } from '@codelab/backend/abstract/core'
import {
  DgraphEntityType,
  DgraphRepository,
  ITransaction,
} from '@codelab/backend/infra'
import { IPropMapBinding } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { IPropMapBindingsRepository } from './prop-map-bindings-repository.interface'

@Injectable()
export class PropMapBindingsRepository implements IPropMapBindingsRepository {
  constructor(protected dgraph: DgraphRepository) {}

  public static mutation(binding: IPropMapBinding) {
    const uid = binding.id ?? DgraphRepository.randomBlankNode()

    return {
      uid,
      'dgraph.type': [DgraphEntityType.PropMapBinding],
      targetElement: binding.targetElementId
        ? { uid: binding.targetElementId }
        : null,
      targetKey: binding.targetKey,
      sourceKey: binding.sourceKey,
    }
  }

  async save(
    binding: IPropMapBinding,
    transaction: ITransaction,
  ): Promise<CreateResponsePort> {
    const mutation = PropMapBindingsRepository.mutation(binding)
    const response = await transaction.mutate({ setJson: mutation })

    return {
      id: binding.id ?? this.dgraph.getUid(response, mutation.uid),
    }
  }
}
