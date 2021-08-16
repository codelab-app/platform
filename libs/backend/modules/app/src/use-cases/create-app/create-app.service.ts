import {
  DgraphApp,
  DgraphCreateUseCase,
  DgraphEntityType,
  jsonMutation,
} from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Mutation, Txn } from 'dgraph-js-http'
import { CreateAppRequest } from './create-app.request'

@Injectable()
export class CreateAppService extends DgraphCreateUseCase<CreateAppRequest> {
  protected executeTransaction(request: CreateAppRequest, txn: Txn) {
    return this.dgraph.create(txn, (nodeId) =>
      this.createMutation(request, nodeId),
    )
  }

  protected createMutation(
    { input: { name }, owner }: CreateAppRequest,
    blandNodeUid: string,
  ): Mutation {
    return jsonMutation<DgraphApp>({
      uid: blandNodeUid,
      name,
      ownerId: owner.sub,
      'dgraph.type': [DgraphEntityType.App],
    })
  }
}
