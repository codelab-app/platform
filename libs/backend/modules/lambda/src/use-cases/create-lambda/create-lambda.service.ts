import { DgraphCreateUseCase } from '@codelab/backend/application'
import { DgraphEntityType, jsonMutation } from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { CreateLambdaRequest } from './create-lambda.request'

@Injectable()
export class CreateLambdaService extends DgraphCreateUseCase<CreateLambdaRequest> {
  async executeTransaction(request: CreateLambdaRequest, txn: Txn) {
    return this.dgraph.create(txn, (blankNodeUid) =>
      this.createMutation(request, blankNodeUid),
    )
  }

  createMutation(request: CreateLambdaRequest, blankNodeUid: string) {
    const {
      input: { name, body },
      currentUser,
    } = request

    return jsonMutation<any>({
      uid: blankNodeUid,
      'dgraph.type': [DgraphEntityType.Lambda],
      name,
      body,
      ownerId: currentUser.id,
    })
  }
}
