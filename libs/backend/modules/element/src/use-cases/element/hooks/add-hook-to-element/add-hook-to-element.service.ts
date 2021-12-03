import { DgraphCreateUseCase } from '@codelab/backend/application'
import {
  DgraphEntityType,
  DgraphRepository,
  DgraphUpdateMutationJson,
} from '@codelab/backend/infra'
import { CreatePropService } from '@codelab/backend/modules/prop'
import { Injectable } from '@nestjs/common'
import { Mutation, Txn } from 'dgraph-js-http'
import { ElementValidator } from '../../../../application/element.validator'
import { HookRef } from '../../create-element'
import { AddHookToElementInput } from './add-hook-to-element.input'
import { AddHookToElementRequest } from './add-hook-to-element.request'

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

    const { input } = request

    return await this.dgraph.create(
      txn,
      AddHookToElementService.createMutation(input),
      'hook',
    )
  }

  public static createMutation(input: AddHookToElementInput): Mutation {
    const setJson: DgraphUpdateMutationJson<any> = {
      uid: input.elementId,
      hooks: this.createHookMutation(input, '_:hook'),
    }

    return { setJson }
  }

  public static createHookMutation(
    input: HookRef,
    uid: string | undefined,
  ): Record<string, any> {
    const { config } = input

    const propsMutation = CreatePropService.createPropsMutation(
      config,
      undefined,
    )

    return {
      uid,
      'dgraph.type': [DgraphEntityType.Hook],
      hookType: input.type,
      hookConfig: propsMutation,
      tags: [],
    }
  }

  protected async validate({ input, currentUser }: AddHookToElementRequest) {
    const { elementId } = input
    await this.elementValidator.existsAndIsOwnedBy(elementId, currentUser)
  }
}
