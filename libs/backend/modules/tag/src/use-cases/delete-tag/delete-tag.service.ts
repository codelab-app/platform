import { DgraphUseCase } from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { DeleteTagRequest } from './delete-tag.request'

@Injectable()
export class DeleteTagService extends DgraphUseCase<DeleteTagRequest> {
  protected async executeTransaction(request: DeleteTagRequest, txn: Txn) {
    await this.dgraph.deleteEntity(txn, request.input.id)
  }
}
