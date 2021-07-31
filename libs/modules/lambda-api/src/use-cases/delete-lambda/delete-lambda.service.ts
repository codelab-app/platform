import { DgraphRepository, DgraphUseCase } from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { GetLambdaService } from '../get-lambda'
import { DeleteLambdaInput } from './delete-lambda.input'

@Injectable()
export class DeleteLambdaService extends DgraphUseCase<any, any> {
  constructor(
    dgraph: DgraphRepository,
    private readonly getLambdaService: GetLambdaService,
  ) {
    super(dgraph)
  }

  async executeTransaction(input: DeleteLambdaInput, txn: Txn) {
    const lambda = await this.getLambdaService.executeTransaction(
      { lambdaId: input.lambdaId },
      this.dgraph.client.newTxn(),
    )

    await this.dgraph.deleteEntity(txn, input.lambdaId)

    return lambda
  }
}
