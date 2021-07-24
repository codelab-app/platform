import { DgraphProvider, DgraphTokens, DgraphUseCase } from '@codelab/backend'
import { Inject, Injectable } from '@nestjs/common'
import { Mutation, Txn } from 'dgraph-js'
import { CreateLambdaRequest } from './create-lambda.request'

@Injectable()
export class CreateLambdaService extends DgraphUseCase<
  CreateLambdaRequest,
  any,
  any
> {
  constructor(
    @Inject(DgraphTokens.DgraphProvider)
    protected readonly dgraphProvider: DgraphProvider,
  ) {
    super(dgraphProvider)
  }

  async executeTransaction(request: CreateLambdaRequest, txn: Txn) {
    const mu = new Mutation()
    mu.setSetJson({
      uid: '_:lambda_id',
      'Lambda.name': request.input.name,
      'Lambda.ownerId': request.ownerId,
    })

    const mutationResult = await txn.mutate(mu)
    await txn.commit()

    // const lambdaId = mutationResult.getUidsMap().get('lambda_id')

    // const q = `{ lambda(func: eq(uid, ${lambdaId})){
    //   uid
    //   Lambda.name
    // }}`

    const _txn = this.dgraphProvider.client.newTxn()

    const q = `{
      lambda(func: type(Lambda)){
        uid
        Lambda.name
      }
    }`

    const results = await _txn.query(q)
    await _txn.discard()

    console.log(results.getJson())

    // await this.transactionWrapper(async (_txn) => {
    //   const q = `{
    //   lambda(func: type(Lambda)){
    //     uid
    //     Lambda.name
    //   }
    // }`

    //   const results = await _txn.query(q)
    //   await txn.commit()

    //   console.log(results.getJson())
    // })

    return mutationResult
  }
}
