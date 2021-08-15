import { DgraphTag, DgraphUseCase, jsonMutation } from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Mutation, Txn } from 'dgraph-js-http'
import { UpdateTagRequest } from './update-tag.request'

@Injectable()
export class UpdateTagService extends DgraphUseCase<UpdateTagRequest> {
  protected async executeTransaction(request: UpdateTagRequest, txn: Txn) {
    await this.dgraph.executeMutation(
      txn,
      UpdateTagService.createMutation(request),
    )
  }

  private static createMutation(request: UpdateTagRequest): Mutation {
    const {
      input: {
        id,
        data: { name },
      },
    } = request

    return jsonMutation<DgraphTag>({
      uid: id,
      name,
    })
  }
}
