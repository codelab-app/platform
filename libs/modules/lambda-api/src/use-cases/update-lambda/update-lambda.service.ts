import {
  DgraphLambda,
  DgraphRepository,
  DgraphUseCase,
  jsonMutation,
} from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { GetLambdaService } from '../get-lambda'
import { UpdateLambdaInput } from './update-lambda.input'

@Injectable()
export class UpdateLambdaService extends DgraphUseCase<UpdateLambdaInput, any> {
  constructor(
    dgraph: DgraphRepository,
    private readonly getLambdaService: GetLambdaService,
  ) {
    super(dgraph)
  }

  // Assume ID exists
  async executeTransaction(input: UpdateLambdaInput, txn: Txn) {
    const updateMutation = jsonMutation<DgraphLambda>({
      uid: input.id,
      name: input.name,
      body: input.body,
    })

    await this.dgraph.executeMutation(txn, updateMutation)

    return await this.getLambdaService.executeTransaction(
      { lambdaId: input.id },
      this.dgraph.client.newTxn(),
    )
  }
}
