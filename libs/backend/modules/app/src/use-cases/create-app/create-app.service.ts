import { DgraphCreateUseCase } from '@codelab/backend/application'
import { DgraphEntityType } from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Mutation, Txn } from 'dgraph-js-http'
import { CreateAppRequest } from './create-app.request'

@Injectable()
export class CreateAppService extends DgraphCreateUseCase<CreateAppRequest> {
  protected async executeTransaction(request: CreateAppRequest, txn: Txn) {
    return this.dgraph.create(txn, (blankNodeUid) =>
      this.createMutation(request, blankNodeUid),
    )
  }

  protected createMutation(
    { input: { name }, currentUser }: CreateAppRequest,
    blankNodeUid: string,
  ): Mutation {
    const createAppJson = {
      uid: blankNodeUid,
      name,
      owner: {
        uid: currentUser.id,
      },
      pages: [],
      'dgraph.type': [DgraphEntityType.App],
    }

    const updateUserJson = {
      uid: currentUser.id,
      apps: {
        uid: blankNodeUid,
      },
    }

    return {
      setJson: [createAppJson, updateUserJson],
    }
  }
}
