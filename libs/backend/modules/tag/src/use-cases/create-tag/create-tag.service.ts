import { DgraphCreateUseCase } from '@codelab/backend/application'
import {
  DgraphCreateMutationJson,
  DgraphEntityType,
  DgraphTag,
  jsonMutation,
} from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { CreateTagRequest } from './create-tag.request'

@Injectable()
export class CreateTagService extends DgraphCreateUseCase<CreateTagRequest> {
  protected async executeTransaction(request: CreateTagRequest, txn: Txn) {
    if (request.input.parentTagId) {
      return await this.dgraph.create(txn, (blankNodeUid) =>
        CreateTagService.createTagMutation(request, blankNodeUid),
      )
    }

    return await this.dgraph.create(txn, (blankNodeUid) =>
      this.createRootTagMutation(request, blankNodeUid),
    )
  }

  private createRootTagMutation(
    request: CreateTagRequest,
    blankNodeUid: string,
  ) {
    const {
      input: { name },
      currentUser,
    } = request

    return jsonMutation<DgraphTag>({
      uid: blankNodeUid,
      name,
      owner: { uid: currentUser.id },
      parent: undefined,
      isRoot: true,
      'dgraph.type': [DgraphEntityType.Node, DgraphEntityType.Tag],
      children: [],
    })
  }

  private static createTagMutation(
    request: CreateTagRequest,
    blankNodeUid: string,
  ) {
    const {
      input: { name, parentTagId },
      currentUser,
    } = request

    if (!parentTagId) {
      throw new Error('Must have parent')
    }

    const createJson: DgraphCreateMutationJson<DgraphTag> = {
      uid: blankNodeUid,
      name,
      owner: { uid: currentUser.id },
      parent: { uid: parentTagId },
      isRoot: false,
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
}
