import {
  DgraphEntityType,
  DgraphQueryBuilder,
  DgraphUseCase,
} from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js'
import { DeleteLambdaInput } from './delete-lambda.input'

@Injectable()
export class DeleteLambdaService extends DgraphUseCase<any, any> {
  async executeTransaction(input: DeleteLambdaInput, txn: Txn) {
    // Query block
    const q = new DgraphQueryBuilder()
      .setUidFunc(input.lambdaId)
      .addBaseFields()
      .addTypeFilterDirective(DgraphEntityType.Lambda)

    await this.dgraph.transactionWrapper(async (queryTxn) => {
      await this.dgraph.getOneOrThrow(
        queryTxn,
        q,
        () => new Error('Lambda does not exist'),
      )
    })

    // Mutation block
    await this.dgraph.deleteEntity(txn, input.lambdaId)
  }
}
