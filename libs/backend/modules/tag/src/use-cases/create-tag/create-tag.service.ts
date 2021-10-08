import { DgraphCreateUseCase } from '@codelab/backend/application'
import { DgraphEntityType, jsonMutation } from '@codelab/backend/infra'
import { isAdmin } from '@codelab/shared/core'
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
      CreateTagService.createRootTagMutation(request, blankNodeUid),
    )
  }

  private static createRootTagMutation(
    request: CreateTagRequest,
    blankNodeUid: string,
  ) {
    const {
      input: { name },
      currentUser,
    } = request

    return jsonMutation({
      uid: blankNodeUid,
      name,
      owner: isAdmin(currentUser) ? null : { uid: currentUser.id },
      parent: undefined,
      isRoot: true,
      'dgraph.type': [DgraphEntityType.Tag],
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

    const createJson = {
      uid: blankNodeUid,
      name,
      owner: isAdmin(currentUser) ? null : { uid: currentUser.id },
      parent: { uid: parentTagId },
      isRoot: false,
      'dgraph.type': [DgraphEntityType.Tag],
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
