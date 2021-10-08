import { DgraphUseCase } from '@codelab/backend/application'
import { DgraphRepository } from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Mutation, Txn } from 'dgraph-js-http'
import { ElementValidator } from '../../../application/element.validator'
import { DeleteElementRequest } from './delete-element.request'

/**
 * Deletes an element/component and all the descending elements and their props
 * Doesn't delete descendant component elements
 */
@Injectable()
export class DeleteElementService extends DgraphUseCase<DeleteElementRequest> {
  constructor(
    dgraph: DgraphRepository,
    private readonly elementValidator: ElementValidator,
  ) {
    super(dgraph)
  }

  protected async executeTransaction(
    request: DeleteElementRequest,
    txn: Txn,
  ): Promise<void> {
    await this.validate(request)
    await this.dgraph.executeMutation(
      txn,
      DeleteElementService.getMutation(request),
    )
  }

  private static getMutation({ input }: DeleteElementRequest) {
    const { elementId } = input

    const mutation: Mutation = {
      mutation: `
        upsert {
          query {
           descendants(func: uid(${elementId}))  @filter(type(Element)) @recurse {
                COMPONENT AS uid
                DESCENDANTS AS children @filter(NOT has(componentTag))
            }
          }
          mutation {
            delete {
              uid(COMPONENT) * * .
              uid(DESCENDANTS) * * .
            }
          }
        }
      `,
    }

    return mutation
  }

  private async validate({ input, currentUser }: DeleteElementRequest) {
    await this.elementValidator.existsAndIsOwnedBy(input.elementId, currentUser)

    await this.elementValidator.isNotRoot(input.elementId)

    await this.elementValidator.isOrphan(input.elementId)
  }
}
