import { DgraphCreateUseCase } from '@codelab/backend/application'
import {
  DgraphEntityType,
  DgraphRepository,
  DgraphUpdateMutationJson,
} from '@codelab/backend/infra'
import { Maybe } from '@codelab/shared/abstract/types'
import { Injectable } from '@nestjs/common'
import { Mutation, Txn } from 'dgraph-js-http'
import { ElementValidator } from '../../../../application/element.validator'
import { CreatePropMapBindingInput } from './create-prop-map-binding.input'
import { CreatePropMapBindingRequest } from './create-prop-map-binding.request'

@Injectable()
export class CreatePropMapBindingService extends DgraphCreateUseCase<CreatePropMapBindingRequest> {
  constructor(
    dgraph: DgraphRepository,
    private readonly elementValidator: ElementValidator,
  ) {
    super(dgraph)
  }

  protected async executeTransaction(
    request: CreatePropMapBindingRequest,
    txn: Txn,
  ) {
    await this.validate(request)

    return this.dgraph.create(
      txn,
      CreatePropMapBindingService.createMutation(request.input),
      'binding',
    )
  }

  public static createMutation({
    elementId,
    ...input
  }: CreatePropMapBindingInput): Mutation {
    const setJson: DgraphUpdateMutationJson<any> = {
      uid: elementId,
      propMapBindings: CreatePropMapBindingService.createPropMapBindingMutation(
        input,
        '_:binding',
      ),
    }

    return { setJson }
  }

  public static createPropMapBindingMutation(
    {
      targetElementId,
      targetKey,
      sourceKey,
    }: Omit<CreatePropMapBindingInput, 'elementId'>,
    uid: Maybe<string>,
  ) {
    return {
      uid,
      targetElement: targetElementId
        ? {
            uid: targetElementId,
          }
        : null,
      targetKey,
      sourceKey,
      'dgraph.type': [DgraphEntityType.PropMapBinding],
    }
  }

  protected async validate({
    input: { elementId, targetElementId },
    currentUser,
  }: CreatePropMapBindingRequest) {
    await this.elementValidator.existsAndIsOwnedBy(elementId, currentUser)

    if (targetElementId) {
      await this.elementValidator.existsAndIsOwnedBy(
        targetElementId,
        currentUser,
      )
    }
  }
}
