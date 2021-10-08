import { DgraphUseCase } from '@codelab/backend/application'
import { jsonMutation } from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { UpdateLambdaInput } from './update-lambda.input'

@Injectable()
export class UpdateLambdaService extends DgraphUseCase<UpdateLambdaInput> {
  async executeTransaction(request: UpdateLambdaInput, txn: Txn) {
    await this.dgraph.executeMutation(txn, this.createMutation(request))
  }

  createMutation(request: UpdateLambdaInput) {
    return jsonMutation<any>({
      uid: request.id,
      name: request.name,
      body: request.body,
    })
  }
}
