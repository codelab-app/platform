import { DgraphUseCase } from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { Mutation } from 'dgraph-js'
import { CreateLambdaRequest } from './create-lambda.request'

@Injectable()
export class CreateLambdaService extends DgraphUseCase<
  CreateLambdaRequest,
  any
> {
  async executeTransaction(request: CreateLambdaRequest) {
    // Mutation block
    const txn = this.dgraph.client.newTxn()
    const mu = new Mutation()
    mu.setSetJson({
      uid: '_:lambda_id',
      'dgraph.type': 'Lambda',
      'Lambda.name': request.input.name,
      'Lambda.body': request.input.body,
      'Lambda.ownerId': request.ownerId,
    })

    const mutationResult = await txn.mutate(mu)
    await txn.commit()
    await txn.discard()

    const lambdaId = mutationResult.getUidsMap().get('lambda_id')

    // Query block
    const q = `{ lambda(func: uid(${lambdaId})){
      id: uid
      ownerId: Lambda.ownerId
      name: Lambda.name
      body: Lambda.body
    }}`

    const _txn = this.dgraph.client.newTxn()
    const results = await _txn.query(q)

    await _txn.discard()

    return results.getJson().lambda[0]
  }
}
