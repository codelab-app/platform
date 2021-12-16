import { CreateResponsePort } from '@codelab/backend/abstract/core'
import {
  DgraphEntityType,
  DgraphRepository,
  ITransaction,
} from '@codelab/backend/infra'
import { IHook } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { IHooksRepository } from './hooks-repository.interface'
import { PropsRepository } from './props.repository'

@Injectable()
export class HooksRepository implements IHooksRepository {
  constructor(protected dgraph: DgraphRepository) {}

  public static mutation(hook: IHook) {
    const uid = hook.id ?? DgraphRepository.randomBlankNode()

    return {
      uid,
      'dgraph.type': [DgraphEntityType.Hook],
      hookType: hook.type,
      hookConfig: PropsRepository.mutation(hook.config),
      tags: [],
    }
  }

  async save(
    hook: IHook,
    transaction: ITransaction,
  ): Promise<CreateResponsePort> {
    const mutation = HooksRepository.mutation(hook)
    const response = await transaction.mutate({ setJson: mutation })

    return {
      id: hook.id ?? this.dgraph.getUid(response, mutation.uid),
    }
  }
}
