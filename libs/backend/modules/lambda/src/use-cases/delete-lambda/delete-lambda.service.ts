import { DgraphUseCase } from '@codelab/backend/application'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { DeleteLambdaInput } from './delete-lambda.input'

@Injectable()
export class DeleteLambdaService extends DgraphUseCase<DeleteLambdaInput> {
  async executeTransaction(input: DeleteLambdaInput, txn: Txn) {
    await this.dgraph.deleteEntity(txn, input.lambdaId)
  }
}
