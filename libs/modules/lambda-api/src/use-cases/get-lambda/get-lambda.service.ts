import { DgraphUseCase } from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js'
import { GetLambdaInput } from './get-lambda.input'

@Injectable()
export class GetLambdaService extends DgraphUseCase<GetLambdaInput, any> {
  async executeTransaction(input: GetLambdaInput, txn: Txn) {
    const q = `{ getLambda(func: uid("${input.lambdaId}")) @filter(eq(dgraph.type, Lambda)) {
      id: uid
      name: Lambda.name
      body: Lambda.body
      ownerId: Lambda.ownerId
    }}`

    const results = await txn.query(q)

    return results.getJson().getLambda[0] ?? null
  }
}
