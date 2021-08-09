import {
  DgraphApp,
  DgraphCreateMutationJson,
  DgraphCreateUseCase,
  DgraphEntityType,
  DgraphTag,
  DgraphUseCase,
} from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { Mutation, Txn } from 'dgraph-js-http'
import { Tag } from '../../tag.model'
import { DeleteTagInput } from './delete-tag.input'
import { DeleteTagRequest } from './delete-tag.request'

@Injectable()
export class DeleteTagService extends DgraphUseCase<any> {
  protected async executeTransaction(request: DeleteTagInput, txn: Txn) {
    await this.dgraph.deleteEntity(txn, request.id)
  }
}
