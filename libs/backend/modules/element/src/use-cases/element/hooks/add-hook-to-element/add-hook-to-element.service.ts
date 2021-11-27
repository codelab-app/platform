import { DgraphCreateUseCase } from '@codelab/backend/application'
import {
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

  public static createMutation(hook: Hook, elementId: string): Mutation {
    const setJson: DgraphUpdateMutationJson<any> = {
      uid: elementId,
      hooks: this.createHookMutation(hook, '_:hook'),
    }

    return { setJson }
  }

  public static createHookMutation(
    hook: Hook,
    uid: string | undefined,
  ): Record<string, any> {
    return {
      uid,
      'dgraph.type': [DgraphEntityType.Hook],
      hookType: hook.type,
      configJson: JSON.stringify(hook.config),
      tags: [],
    }
  }

  protected async validate({
    input: {
      elementId,
      queryHook,
      graphqlQueryHook,
      recoilStateHook,
      graphqlMutationHook,
      queryPageHook,
      queryPagesHook,
    },
    currentUser,
  }: AddHookToElementRequest) {
    if (
      [
        queryHook,
        graphqlQueryHook,
        recoilStateHook,
        graphqlMutationHook,
        queryPageHook,
        queryPagesHook,
      ].filter((f) => !!f).length !== 1
    ) {
      throw new Error('Provide exactly 1 config type to addHookToElement')
    }

    await this.elementValidator.existsAndIsOwnedBy(elementId, currentUser)
  }
}
