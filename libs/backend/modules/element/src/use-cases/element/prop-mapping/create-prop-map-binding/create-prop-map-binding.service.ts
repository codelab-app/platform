import { DgraphCreateUseCase } from '@codelab/backend/application'
import {
  DgraphElement,
  DgraphEntityType,
  DgraphRepository,
  DgraphUpdateMutationJson,
} from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Mutation, Txn } from 'dgraph-js-http'
import { ElementValidator } from '../../../../application/element.validator'
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
      CreatePropMapBindingService.createMutation(request),
      'binding',
    )
  }

  private static createMutation({
    input: { elementId, targetElementId, targetKey, sourceKey },
  }: CreatePropMapBindingRequest): Mutation {
    const setJson: DgraphUpdateMutationJson<DgraphElement> = {
      uid: elementId,
      propMapBindings: {
        uid: '_:binding',
        targetElement: targetElementId
          ? {
              uid: targetElementId,
            }
          : null,
        targetKey,
        sourceKey,
        'dgraph.type': [DgraphEntityType.PropMapBinding],
      },
    }

    return { setJson }
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
