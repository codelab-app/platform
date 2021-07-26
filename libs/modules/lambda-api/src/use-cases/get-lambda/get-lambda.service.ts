import { DgraphProvider, DgraphTokens, DgraphUseCase } from '@codelab/backend'
import { Inject, Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js'
import { GetLambdaInput } from './get-lambda.input'

@Injectable()
export class GetLambdaService extends DgraphUseCase<GetLambdaInput, any, any> {
  constructor(
    @Inject(DgraphTokens.DgraphProvider)
    protected readonly dgraphProvider: DgraphProvider,
  ) {
    super(dgraphProvider)
  }

  async executeTransaction(input: GetLambdaInput, txn: Txn) {
    const q = `{ getLambda(func: uid(${input.lambdaId})){
      id: uid
      name: Lambda.name
      body: Lambda.body
      ownerId: Lambda.ownerId
    }}`

    const results = await txn.query(q)

    return results.getJson().getLambda[0]
  }
}
