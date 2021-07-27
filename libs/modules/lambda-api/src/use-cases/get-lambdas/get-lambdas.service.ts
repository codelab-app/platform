import { DgraphProvider, DgraphTokens, DgraphUseCase } from '@codelab/backend'
import { Inject, Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js'
import { GetLambdasRequest } from './get-lambdas.request'

@Injectable()
export class GetLambdasService extends DgraphUseCase<
  GetLambdasRequest,
  any,
  any
> {
  constructor(
    @Inject(DgraphTokens.DgraphProvider)
    protected readonly dgraphProvider: DgraphProvider,
  ) {
    super(dgraphProvider)
  }

  async executeTransaction(request: GetLambdasRequest, txn: Txn) {
    const q = `{ getLambdas(func: eq(Lambda.ownerId, ${request.ownerId})){
      id: uid
      name: Lambda.name
      body: Lambda.body
      ownerId: Lambda.ownerId
    }}`

    const results = await txn.query(q)

    return results.getJson().getLambdas
  }
}
