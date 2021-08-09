import {
  DgraphApp,
  DgraphCreateMutationJson,
  DgraphCreateUseCase,
  DgraphEntityType,
  DgraphTag,
  DgraphUseCase,
  jsonMutation,
} from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { Mutation, Txn } from 'dgraph-js-http'
import { Tag } from '../../tag.model'
import { UpdateTagInput } from './update-tag.input'
import { UpdateTagRequest } from './update-tag.request'

@Injectable()
export class UpdateTagService extends DgraphUseCase<UpdateTagRequest> {
  protected async executeTransaction(request: UpdateTagRequest, txn: Txn) {
    await this.dgraph.executeMutation(txn, this.createMutation(request))
  }

  private createMutation(request: UpdateTagRequest): Mutation {
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
