import { DgraphUseCase } from '@codelab/backend/application'
import {
  DgraphEntityType,
  DgraphRepository,
  DgraphUpdateMutationJson,
} from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Mutation, Txn } from 'dgraph-js-http'
import { ElementValidator } from '../../../../application/element.validator'
import { UpdatePropMapBindingRequest } from './update-prop-map-binding.request'

@Injectable()
export class UpdatePropMapBindingService extends DgraphUseCase<UpdatePropMapBindingRequest> {
  constructor(
    dgraph: DgraphRepository,
    private readonly elementValidator: ElementValidator,
  ) {
    super(dgraph)
  }

  protected async executeTransaction(
    request: UpdatePropMapBindingRequest,
    txn: Txn,
  ) {
    await this.validate(request)

    await this.dgraph.executeMutation(
      txn,
      UpdatePropMapBindingService.createMutation(request),
    )
  }

  private static createMutation({
    input: {
      propMapBindingId,
      data: { targetElementId, targetKey, sourceKey },
    },
  }: UpdatePropMapBindingRequest): Mutation {
    const setJson: DgraphUpdateMutationJson<any> = {
      uid: propMapBindingId,
      targetElement: targetElementId
        ? {
            uid: targetElementId,
          }
        : null,
      targetKey,
      sourceKey,
    }

    return { setJson }
  }

  protected async validate({
    input: {
      propMapBindingId,
      data: { targetElementId },
    },
    currentUser,
  }: UpdatePropMapBindingRequest) {
    const binding = await this.dgraph.transactionWrapper((txn) =>
      this.dgraph.getOneOrThrowNamed<
        any & { '~propMapBindings': [{ uid: string }] }
      >(
        txn,
        `
          {
            query(func: uid(${propMapBindingId})) @filter(eq(dgraph.type, "${DgraphEntityType.PropMapBinding}")) {
              uid
              dgraph.type
              targetElement {
                uid
              }
              sourceKey
              targetKey
              ~propMapBindings {
                uid
              }
            }
          }
    `,
        'query',
        () => new Error("Prop map binding doesn't exist"),
      ),
    )

    await this.elementValidator.existsAndIsOwnedBy(
      binding['~propMapBindings'][0].uid,
      currentUser,
    )

    if (targetElementId && targetElementId !== binding.targetElement?.uid) {
      await this.elementValidator.existsAndIsOwnedBy(
        targetElementId,
        currentUser,
      )
    }
  }
}
