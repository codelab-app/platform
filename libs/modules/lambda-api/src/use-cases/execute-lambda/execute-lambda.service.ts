import { DgraphUseCase } from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { ExecuteLambdaInput } from './execute-lambda.input'

@Injectable()
export class ExecuteLambdaService extends DgraphUseCase<
  ExecuteLambdaInput,
  any
> {
  async executeTransaction(input: ExecuteLambdaInput, txn: Txn) {
    console.log('execute lambda')
    // const q = `{ getLambda(func: uid("${input.lambdaId}")){
    //   id: uid
    //   name: Lambda.name
    //   body: Lambda.body
    //   ownerId: Lambda.ownerId
    // }}`

    // const results = await txn.query(q)

    // return results.getJson().getLambda[0]
    return null
  }
}
