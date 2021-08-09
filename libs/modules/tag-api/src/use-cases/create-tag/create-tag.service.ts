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
import { CreateTagInput } from './create-tag.input'
import { CreateTagRequest } from './create-tag.request'

@Injectable()
export class CreateTagService extends DgraphCreateUseCase<CreateTagRequest> {
  protected async executeTransaction(request: CreateTagRequest, txn: Txn) {
    return await this.dgraph.create(txn, (blankNodeUid) =>
      this.createMutation(request, blankNodeUid),
    )
  }

  private createMutation(
    request: CreateTagRequest,
    blankNodeUid: string,
  ): Mutation {
    const {
      input: { name },
    } = request

    const setJson: DgraphCreateMutationJson<DgraphTag> = {
      uid: blankNodeUid,
      name,
      'dgraph.type': [DgraphEntityType.Node, DgraphEntityType.Tag],
      children: [],
    }

    return { setJson }
  }
}
