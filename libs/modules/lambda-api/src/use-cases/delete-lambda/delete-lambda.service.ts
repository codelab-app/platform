import { DgraphProvider, DgraphTokens, DgraphUseCase } from '@codelab/backend'
import { Inject, Injectable } from '@nestjs/common'
import { Mutation, Txn } from 'dgraph-js'
import { DeleteLambdaInput } from './delete-lambda.input'

@Injectable()
export class DeleteLambdaService extends DgraphUseCase<any, any, any> {
  constructor(
    @Inject(DgraphTokens.DgraphProvider)
    protected readonly dgraphProvider: DgraphProvider,
  ) {
    super(dgraphProvider)
  }

  async executeTransaction(input: DeleteLambdaInput, txn: Txn) {
    // Query block
    const q = `{ lambda(func: uid("${input.lambdaId}")) @filter(eq(dgraph.type, Lambda)) {
      id: uid
      name: Lambda.name
      body: Lambda.body
      ownerId: Lambda.ownerId
    }}`

    const _txn = this.dgraphProvider.client.newTxn()
    const results = await _txn.query(q)
    const lambda = results.getJson().lambda[0]

    if (!lambda) {
      throw new Error('Lambda does not exist')
    }

    await _txn.discard()

    // Mutation block
    const mu = new Mutation()
    mu.setDeleteJson({ uid: input.lambdaId })

    await txn.mutate(mu)
    await txn.commit()

    return lambda
  }
}
