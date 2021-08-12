import {
  DgraphCreateMutationJson,
  DgraphCreateUseCase,
  DgraphEntityType,
  DgraphTag,
} from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Mutation, Txn } from 'dgraph-js-http'
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
      input: { name, parentTagId },
      owner,
    } = request

    const mu: Mutation = {}

    const createTagJson: DgraphCreateMutationJson<DgraphTag> = {
      uid: blankNodeUid,
      name,
      ownerId: owner.sub,
      'dgraph.type': [DgraphEntityType.Node, DgraphEntityType.Tag],
      children: [],
    }

    mu.setJson = parentTagId
      ? {
          uid: parentTagId,
          children: createTagJson,
        }
      : createTagJson

    return mu
  }
}
