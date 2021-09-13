import { DgraphCreateUseCase } from '@codelab/backend/application'
import {
  DgraphElement,
  DgraphEntityType,
  DgraphRepository,
  DgraphUpdateMutationJson,
} from '@codelab/backend/infra'
import { Hook } from '@codelab/backend/modules/hook'
import { Injectable } from '@nestjs/common'
import { Mutation, Txn } from 'dgraph-js-http'
import { ElementValidator } from '../../../../application/element.validator'
import { AddHookToElementRequest } from './add-hook-to-element.request'
import { hookFactory } from './hook.factory'

@Injectable()
export class AddHookToElementService extends DgraphCreateUseCase<AddHookToElementRequest> {
  constructor(
    dgraph: DgraphRepository,
    private readonly elementValidator: ElementValidator,
  ) {
    super(dgraph)
  }

  protected async executeTransaction(
    request: AddHookToElementRequest,
    txn: Txn,
  ) {
    await this.validate(request)

    const hook = hookFactory(request.input)

    return await this.dgraph.create(
      txn,
      AddHookToElementService.createMutation(hook, request.input.elementId),
      'hook',
    )
  }

  private static createMutation(hook: Hook, elementId: string): Mutation {
    const setJson: DgraphUpdateMutationJson<DgraphElement> = {
      uid: elementId,
      hooks: {
        uid: '_:hook',
        'dgraph.type': [DgraphEntityType.Hook],
        hookType: hook.type,
        configJson: JSON.stringify(hook.config),
        tags: [],
      },
    }

    return { setJson }
  }

  protected async validate({
    input: { elementId, queryHook, graphqlQueryHook },
    currentUser,
  }: AddHookToElementRequest) {
    if ([queryHook, graphqlQueryHook].filter((f) => !!f).length !== 1) {
      throw new Error('Provide exactly 1 config type to addHookToElement')
    }

    await this.elementValidator.existsAndIsOwnedBy(elementId, currentUser)
  }
}
