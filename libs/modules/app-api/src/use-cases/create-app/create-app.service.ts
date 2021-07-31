import {
  DgraphApp,
  DgraphCreateMutationJson,
  DgraphCreateUseCase,
  DgraphEntityType,
} from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { Mutation, Txn } from 'dgraph-js'
import { CreateAppRequest } from './create-app.request'

@Injectable()
export class CreateAppService extends DgraphCreateUseCase<CreateAppRequest> {
  protected executeTransaction(request: CreateAppRequest, txn: Txn) {
    return this.dgraph.create(txn, (nodeId) =>
      this.createMutation(request, nodeId),
    )
  }

  protected createMutation(
    { input: { name }, ownerId }: CreateAppRequest,
    blandNodeUid: string,
  ) {
    const mu = new Mutation()

    const setJson: DgraphCreateMutationJson<DgraphApp> = {
      uid: blandNodeUid,
      name,
      ownerId,
      'dgraph.type': [DgraphEntityType.App],
    }

    mu.setSetJson(setJson)

    return mu
  }
}
