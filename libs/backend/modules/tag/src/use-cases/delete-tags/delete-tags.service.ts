import { DgraphUseCase } from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Mutation, Txn } from 'dgraph-js-http'
import { DeleteTagsRequest } from './delete-tags.request'

@Injectable()
export class DeleteTagsService extends DgraphUseCase<DeleteTagsRequest> {
  protected async executeTransaction(request: DeleteTagsRequest, txn: Txn) {
    await this.dgraph.executeMutation(
      txn,
      DeleteTagsService.createMutation(request),
    )
  }

  private static createMutation({ input: { ids } }: DeleteTagsRequest) {
    const mu: Mutation = {
      deleteJson: [...ids.map((id) => ({ uid: id }))],
    }

    return mu
  }
}
