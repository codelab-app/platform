import { DgraphUseCase } from '@codelab/backend/application'
import {
  DgraphLambda,
  DgraphRepository,
  jsonMutation,
} from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { UpdateLambdaInput } from './update-lambda.input'

@Injectable()
export class UpdateLambdaService extends DgraphUseCase<UpdateLambdaInput> {
  constructor(dgraph: DgraphRepository) {
    super(dgraph)
  }

  async executeTransaction(request: UpdateLambdaInput, txn: Txn) {
    await this.dgraph.executeMutation(txn, this.createMutation(request))
  }

  createMutation(request: UpdateLambdaInput) {
    return jsonMutation<DgraphLambda>({
      uid: request.id,
      name: request.name,
      body: request.body,
    })
  }
}
