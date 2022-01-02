import { DgraphUseCase } from '@codelab/backend/application'
import { DgraphEntityType, DgraphRepository } from '@codelab/backend/infra'
import { DgraphEntity } from '@codelab/shared/abstract/types'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { ElementValidator } from '../../../../application/element.validator'
import { DeletePropMapBindingRequest } from './delete-prop-map-binding.request'

@Injectable()
export class DeletePropMapBindingService extends DgraphUseCase<DeletePropMapBindingRequest> {
  constructor(
    dgraph: DgraphRepository,
    private readonly elementValidator: ElementValidator,
  ) {
    super(dgraph)
  }

  protected async executeTransaction(
    request: DeletePropMapBindingRequest,
    txn: Txn,
  ) {
    const mappings = await this.validate(request)

    const deleteElementEdges = mappings
      .map(
        (mapping) =>
          ` <${mapping['~propMapBindings'][0].uid}> <propMapBindings> <${mapping.uid}> . `,
      )
      .join('\n')

    await this.dgraph.deleteEntities(
      txn,
      request.input.propMapBindingIds,
      deleteElementEdges,
    )
  }

  protected async validate({
    input: { propMapBindingIds },
    currentUser,
  }: DeletePropMapBindingRequest) {
    const ids = propMapBindingIds.join(',')

    const propMappings = await this.dgraph.transactionWrapper((txn) =>
      this.dgraph.getAllNamed<
        {
          '~propMapBindings': [DgraphEntity]
        } & DgraphEntity
      >(
        txn,
        `
          {
            query(func: uid(${ids})) @filter(eq(dgraph.type, "${DgraphEntityType.PropMapBinding}")) {
              uid
              ~propMapBindings {
                uid
              }
            }
          }
    `,
        'query',
      ),
    )

    for (const propMapping of propMappings) {
      await this.elementValidator.existsAndIsOwnedBy(
        propMapping['~propMapBindings'][0].uid,
        currentUser,
      )
    }

    return propMappings
  }
}
