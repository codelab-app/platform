import { DgraphProvider, DgraphTokens, DgraphUseCase } from '@codelab/backend'
import { Inject, Injectable } from '@nestjs/common'
import { Mutation } from 'dgraph-js'
import { DeleteLambdaInput } from './delete-lambda.input'

@Injectable()
export class DeleteLambdaService extends DgraphUseCase<any, any, any> {
  constructor(
    @Inject(DgraphTokens.DgraphProvider)
    protected readonly dgraphProvider: DgraphProvider,
  ) {
    super(dgraphProvider)
  }

  async executeTransaction(input: DeleteLambdaInput) {
    // Query block
    const q = `{ lambda(func: uid(${input.lambdaId})){
      id: uid
      name: Lambda.name
      body: Lambda.body
      ownerId: Lambda.ownerId
    }}`

    const _txn = this.dgraphProvider.client.newTxn()
    const results = await _txn.query(q)
    const deletedLambda = results.getJson().lambda[0]

    await _txn.discard()

    // Mutation block
    const txn = this.dgraphProvider.client.newTxn()
    const mu = new Mutation()
    mu.setDeleteJson({ uid: input.lambdaId })
    await txn.commit()

    return deletedLambda
  }
}
