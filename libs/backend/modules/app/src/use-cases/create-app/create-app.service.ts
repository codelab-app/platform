import { DgraphCreateUseCase } from '@codelab/backend/application'
import {
  DgraphApp,
  DgraphCreateMutationJson,
  DgraphEntityType,
  DgraphUpdateMutationJson,
  DgraphUser,
} from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Mutation, Txn } from 'dgraph-js-http'
import { CreateAppRequest } from './create-app.request'

@Injectable()
export class CreateAppService extends DgraphCreateUseCase<CreateAppRequest> {
  protected executeTransaction(request: CreateAppRequest, txn: Txn) {
    return this.dgraph.create(txn, (blankNodeUid) =>
      this.createMutation(request, blankNodeUid),
    )
  }

  protected createMutation(
    { input: { name }, currentUser }: CreateAppRequest,
    blankNodeUid: string,
  ): Mutation {
    const createAppJson: DgraphCreateMutationJson<DgraphApp> = {
      uid: blankNodeUid,
      'dgraph.type': [DgraphEntityType.App],
      name,
      ownerId: currentUser.id,
    }

    const updateUserJson: DgraphUpdateMutationJson<DgraphUser> = {
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
