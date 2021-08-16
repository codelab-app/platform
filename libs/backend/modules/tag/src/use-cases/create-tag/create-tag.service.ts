import {
  DgraphCreateMutationJson,
  DgraphCreateUseCase,
  DgraphEntityType,
  DgraphTag,
  DgraphTagTree,
} from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Mutation, Txn } from 'dgraph-js-http'
import { CreateTagRequest } from './create-tag.request'

@Injectable()
export class CreateTagService extends DgraphCreateUseCase<CreateTagRequest> {
  protected async executeTransaction(request: CreateTagRequest, txn: Txn) {
    return await this.dgraph.create(txn, (blankNodeUid) =>
      CreateTagService.createMutation(request, blankNodeUid),
    )
  }

  private static createMutation(
    request: CreateTagRequest,
    blankNodeUid: string,
  ): Mutation {
    const {
      input: { isRoot },
    } = request

    if (isRoot) {
      request.input.parentTagId = ''
    }

    return CreateTagService.createTagMutation(request, blankNodeUid)
  }

  private static createTagMutation(
    request: CreateTagRequest,
    blankNodeUid: string,
  ) {
    const {
      input: { name, parentTagId },
      owner,
    } = request

    const createJson: DgraphCreateMutationJson<DgraphTag> = {
      uid: blankNodeUid,
      name,
      ownerId: owner.sub,
      'dgraph.type': [DgraphEntityType.Node, DgraphEntityType.Tag],
      children: [],
    }

    return {
      setJson: {
        uid: parentTagId,
        children: createJson,
      },
    }
  }

  private static createTagTreeMutation(
    request: CreateTagRequest,
    blankNodeUid: string,
  ) {
    const {
      input: { name },
      owner,
    } = request

    const createJson: DgraphCreateMutationJson<DgraphTagTree> = {
      uid: '_:tagTree',
      ownerId: owner.sub,
      'dgraph.type': [DgraphEntityType.Tree, DgraphEntityType.TagTree],
      root: {
        uid: blankNodeUid,
        name,
        ownerId: owner.sub,
        'dgraph.type': [DgraphEntityType.Node, DgraphEntityType.Tag],
        children: [],
      },
    }

    return {
      setJson: [createJson],
    }
  }
}
